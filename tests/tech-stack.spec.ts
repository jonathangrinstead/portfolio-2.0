import { expect, test, type Page } from '@playwright/test'

async function swipe(page: Page, distance: number) {
  const deck = page.locator('.techstack-swipe')
  await deck.scrollIntoViewIfNeeded()
  await deck.hover()
  const box = (await deck.boundingBox())!
  const x = box.x + box.width / 2
  const y = box.y + box.height / 2
  await page.mouse.move(x, y)
  await page.mouse.down()
  await expect(deck).toHaveClass(/is-dragging/)
  await page.mouse.move(x + distance, y, { steps: 4 })
  await page.mouse.up()
}

async function expectSettled(page: Page, name: string) {
  const deck = page.locator('.techstack-swipe')
  await expect(deck.locator('.is-controlled')).toHaveCount(0)
  await expect(deck).not.toHaveClass(/is-dragging/)
  await expect.poll(() => deck.evaluate(element => {
    const cards = [...element.querySelectorAll<HTMLElement>('[data-card]')]
    const top = cards.find(card => getComputedStyle(card).zIndex === '12')!
    const matrix = new DOMMatrix(getComputedStyle(top).transform)
    return { name: top.querySelector('h2')?.textContent, x: matrix.m41, scale: matrix.a,
      animations: element.getAnimations({ subtree: true }).length,
      escaped: cards.some(card => Math.abs(new DOMMatrix(getComputedStyle(card).transform).m41) > 31) }
  })).toEqual({ name, x: 0, scale: 1, animations: 0, escaped: false })
}

test.beforeEach(async ({ page }) => {
  await page.route('**/api/**', route => route.fulfill({ status: 503, body: '{}' }))
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await expect(page.locator('.techstack-swipe')).toBeVisible()
})

test('cycles the complete deck in both directions without leaving cards outside', async ({ page }) => {
  const names = ['Vue', 'Python', 'JavaScript', 'Rails', 'Flask', 'Django', 'PyTorch', 'Sass', 'Tailwind', 'Java', 'TypeScript', 'Ruby']
  for (const name of names) {
    await swipe(page, -110)
    await expectSettled(page, name)
  }
  await swipe(page, 110)
  await expectSettled(page, 'TypeScript')
})

test('rapid alternating gestures settle without stale animation callbacks', async ({ page }) => {
  for (let i = 0; i < 10; i++) await swipe(page, i % 2 ? 110 : -110)
  await expectSettled(page, 'Ruby')
  await swipe(page, -110)
  await page.waitForTimeout(180) // Interrupt the return phase, not just the exit.
  await swipe(page, -110)
  await expectSettled(page, 'Python')
})

test('small drags snap back and releases outside the deck complete', async ({ page }) => {
  await swipe(page, -45)
  await expectSettled(page, 'Ruby')
  await swipe(page, 210)
  await expectSettled(page, 'TypeScript')
})

test('pointer cancellation and lost capture reset the drag', async ({ page }) => {
  const deck = page.locator('.techstack-swipe')
  for (const type of ['pointercancel', 'lostpointercapture']) {
    await deck.scrollIntoViewIfNeeded()
    await deck.hover()
    const box = (await deck.boundingBox())!
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
    await page.mouse.down()
    await expect(deck).toHaveClass(/is-dragging/)
    await page.mouse.move(box.x + 30, box.y + box.height / 2)
    await deck.dispatchEvent(type, { pointerId: 1 })
    await page.mouse.up()
    await expectSettled(page, 'Ruby')
  }
})

test('reduced motion still advances and settles', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await swipe(page, -110)
  await expectSettled(page, 'Vue')
  await swipe(page, 110)
  await expectSettled(page, 'Ruby')
})

test('window blur releases an active drag and ignores extra pointers', async ({ page }) => {
  const deck = page.locator('.techstack-swipe')
  await deck.scrollIntoViewIfNeeded()
  await deck.hover()
  const box = (await deck.boundingBox())!
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  await page.mouse.down()
  await expect(deck).toHaveClass(/is-dragging/)
  await page.mouse.move(box.x + 35, box.y + box.height / 2)
  await deck.dispatchEvent('pointerdown', { pointerId: 9, isPrimary: false, button: 0, clientX: 500 })
  await deck.dispatchEvent('pointerup', { pointerId: 9, clientX: 10 })
  await page.evaluate(() => window.dispatchEvent(new Event('blur')))
  await page.mouse.up()
  await expectSettled(page, 'Ruby')
  await swipe(page, -110)
  await expectSettled(page, 'Vue')
})

test('touch swipes advance while vertical touch gestures can scroll', async ({ page, browserName, isMobile }) => {
  test.skip(browserName !== 'chromium' || !isMobile, 'Uses Chromium touch input on the mobile viewport')
  const deck = page.locator('.techstack-swipe')
  await deck.scrollIntoViewIfNeeded()
  await deck.hover()
  const box = (await deck.boundingBox())!
  const session = await page.context().newCDPSession(page)
  const x = box.x + box.width / 2
  const y = box.y + box.height / 2
  await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] })
  await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x - 110, y }] })
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  await expectSettled(page, 'Vue')
  const scrollBefore = await page.evaluate(() => window.scrollY)
  await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] })
  for (let delta = 20; delta <= 120; delta += 20) {
    await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y - delta }] })
  }
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  await expectSettled(page, 'Vue')
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(scrollBefore)
})
