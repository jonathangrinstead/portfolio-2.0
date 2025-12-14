import { onMounted, onUnmounted } from 'vue'

export function useLiquidGlass() {
  let rafId: number | null = null
  let lastEvent: MouseEvent | null = null
  let activeCard: HTMLElement | null = null
  let enabled = true

  const resetCard = (card: HTMLElement) => {
    card.style.setProperty('--cursor-x', '50%')
    card.style.setProperty('--cursor-y', '50%')
  }

  const updateFromEvent = (event: MouseEvent) => {
    const el = document.elementFromPoint(event.clientX, event.clientY) as Element | null
    const card = (el?.closest?.('.glass-card') as HTMLElement | null) ?? null

    if (card !== activeCard) {
      if (activeCard) resetCard(activeCard)
      activeCard = card
    }

    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Convert to percentage
    const xPercent = (x / rect.width) * 100
    const yPercent = (y / rect.height) * 100

    // Clamp values to prevent overflow
    const clampedX = Math.max(0, Math.min(100, xPercent))
    const clampedY = Math.max(0, Math.min(100, yPercent))

    // Update CSS custom properties (only for the card under the cursor)
    card.style.setProperty('--cursor-x', `${clampedX}%`)
    card.style.setProperty('--cursor-y', `${clampedY}%`)
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!enabled) return
    lastEvent = event
    if (rafId !== null) return

    rafId = window.requestAnimationFrame(() => {
      rafId = null
      if (!lastEvent) return
      updateFromEvent(lastEvent)
    })
  }

  const handleMouseLeave = () => {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId)
      rafId = null
    }
    lastEvent = null
    if (activeCard) {
      resetCard(activeCard)
      activeCard = null
    }
  }

  onMounted(() => {
    // Skip entirely on touch / coarse pointers (no hover, and avoids wasted work)
    try {
      enabled = window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches ?? true
    } catch {
      enabled = true
    }
    if (!enabled) return

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
  })

  onUnmounted(() => {
    if (!enabled) return
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseleave', handleMouseLeave)
  })

  return {
    handleMouseMove,
    handleMouseLeave
  }
} 