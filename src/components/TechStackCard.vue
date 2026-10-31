<template>
    <Card
      class="techstack-card glass-card w-full h-full p-6 flex flex-col items-center justify-center overflow-hidden select-none relative"
    >
      <!-- Card View -->
      <div
        ref="deck"
        class="relative techstack-deck techstack-swipe"
        :class="{ 'is-dragging': pointerId !== null }"
        @pointerdown.stop="startDrag"
        @pointermove.stop="onDrag"
        @pointerup.stop="endDrag"
        @pointercancel.stop="cancelDrag"
        @lostpointercapture="cancelDrag"
      >
        <div class="absolute inset-0">
          <div
            v-for="(card, index) in cards"
            :key="card.name"
            :data-card="index"
            :aria-hidden="depth(index) !== 0"
            class="techstack-playing-card absolute w-full h-full flex flex-col items-center justify-center text-center border rounded-[2rem] shadow-lg p-4 bg-card text-foreground"
            :class="{ 'is-controlled': index === controlledCard }"
            :style="cardStyle(index)"
          >
            <!-- Top left: First letter + icon -->
            <div class="absolute top-2 left-2 flex flex-col items-center">
              <span class="text-xs font-bold mb-1" :style="{ color: textColor(card) }">
                {{ card.name.charAt(0).toUpperCase() }}
              </span>
              <i :class="deviconClass(card)" class="text-[16px]"></i>
            </div>
            
            <!-- Top right: icon only -->
            <i :class="deviconClass(card)" class="text-[24px] absolute top-4 right-4 leading-none"></i>
            
            <!-- Bottom left: icon only -->
            <i :class="deviconClass(card)" class="text-[24px] absolute bottom-4 left-4 leading-none"></i>
            
            <!-- Bottom right: First letter + icon (upside down) -->
            <div class="absolute bottom-2 right-2 flex flex-col items-center transform rotate-180">
              <span class="text-xs font-bold mb-1" :style="{ color: textColor(card) }">
                {{ card.name.charAt(0).toUpperCase() }}
              </span>
              <i :class="deviconClass(card)" class="text-[16px] leading-none"></i>
            </div>

            <!-- Center content -->
            <i :class="deviconClass(card)" class="text-[64px] mb-4 leading-none"></i>
            <h2 class="text-2xl font-bold" :style="{ color: textColor(card) }">{{ card.name }}</h2>
          </div>
        </div>
      </div>
    </Card>
  </template>
  
  <script setup lang="ts">
import { ref, nextTick, onBeforeUnmount } from 'vue'
import { useColorMode, usePreferredReducedMotion, useEventListener } from '@vueuse/core'
  import { Card } from '@/components/ui/card'

const emit = defineEmits<{
  (e: 'lock-grid-drag', locked: boolean): void
}>()
  
  type CardItem = { name: string; key: string; color: string; variant?: 'plain' | 'original' }

  const cards: CardItem[] = [
    { name: 'Ruby', key: 'ruby', color: '#CC342D' },
    { name: 'Vue', key: 'vuejs', color: '#42b883' },
    { name: 'Python', key: 'python', color: '#3776AB' },
    { name: 'JavaScript', key: 'javascript', color: '#f7df1e' },
    { name: 'Rails', key: 'rails', color: '#CC0000' },
    { name: 'Flask', key: 'flask', color: '#000000', variant: 'original' },
    { name: 'Django', key: 'django', color: '#092E20' },
    { name: 'PyTorch', key: 'pytorch', color: '#EE4C2C', variant: 'original' },
    { name: 'Sass', key: 'sass', color: '#CD6799' },
    { name: 'Tailwind', key: 'tailwindcss', color: '#06B6D4' },
    { name: 'Java', key: 'java', color: '#007396' },
    { name: 'TypeScript', key: 'typescript', color: '#3178C6' },
  ]

  const mode = useColorMode()

  function textColor(card: CardItem): string {
    return mode.value === 'dark' ? '#ffffff' : card.color
  }

  function deviconClass(card: CardItem): string[] {
    // Use 'plain' (inherits text color) by default; fall back to 'original' for specific icons.
    const variant = card.variant ?? 'plain'
    const classes = [`devicon-${card.key}-${variant}`]
    if (mode.value === 'light') classes.push('colored')
    return classes
  }
  
const deck = ref<HTMLElement | null>(null)
const currentIndex = ref(0)
const dragOffset = ref(0)
const pointerId = ref<number | null>(null)
const controlledCard = ref<number | null>(null)
const reducedMotion = usePreferredReducedMotion()
const threshold = 80
const easing = 'cubic-bezier(0.23, 1, 0.32, 1)'
let dragStart = 0
let pendingIndex: number | null = null
let animation: Animation | null = null
let generation = 0

function depth(index: number) {
  return (index - currentIndex.value + cards.length) % cards.length
}

function restingTransform(index: number) {
  const position = depth(index)
  if (position === 0) return 'translateX(0px) scale(1) rotate(0deg)'
  return 'translateX(' + (position === 1 ? 30 : -30) + 'px) scale(0.95) rotate(0deg)'
}

function dragTransform(offset: number) {
  return 'translateX(' + offset + 'px) scale(1) rotate(' + offset / 24 + 'deg)'
}

function cardStyle(index: number) {
  const position = depth(index)
  return {
    transform: position === 0 ? dragTransform(dragOffset.value) : restingTransform(index),
    opacity: position === 0 ? 1 : position < 3 ? 0.7 : 0,
    zIndex: cards.length - position,
  }
}

// Commit a pending destination and remove all animation fills on interruption.
// Stale animation promises must never reset a newer gesture.
function settle() {
  generation++
  if (pendingIndex !== null) currentIndex.value = pendingIndex
  pendingIndex = null
  animation?.cancel()
  animation = null
  controlledCard.value = null
  dragOffset.value = 0
}

async function animateRelease(offset: number, advance: boolean) {
  const index = currentIndex.value
  const element = deck.value?.querySelector<HTMLElement>('[data-card="' + index + '"]')
  const destination = (index + (offset > 0 ? -1 : 1) + cards.length) % cards.length
  const token = ++generation
  pendingIndex = advance ? destination : null
  controlledCard.value = index
  const from = dragTransform(offset)

  if (!element || reducedMotion.value === 'reduce') {
    settle()
    return
  }

  try {
    if (advance) {
      // Clear the deck before lowering the outgoing card beneath it.
      const exit = Math.sign(offset) * Math.max(element.offsetWidth + 40, Math.abs(offset))
      const outside = 'translateX(' + exit + 'px) scale(1) rotate(' + Math.sign(offset) * 12 + 'deg)'
      animation = element.animate([{ transform: from }, { transform: outside }], {
        duration: 140, easing, fill: 'both',
      })
      await animation.finished
      if (token !== generation) return
      currentIndex.value = destination
      dragOffset.value = 0
      await nextTick()
      if (token !== generation) return
      animation.cancel()
      animation = element.animate([
        { transform: outside, opacity: 0.7 },
        { transform: restingTransform(index), opacity: depth(index) < 3 ? 0.7 : 0 },
      ], { duration: 140, easing, fill: 'both' })
    } else {
      dragOffset.value = 0
      animation = element.animate([{ transform: from }, { transform: restingTransform(index) }], {
        duration: 180, easing, fill: 'both',
      })
    }
    await animation.finished
  } catch {
    // Cancellation is expected when a new gesture starts or the view disappears.
  } finally {
    if (token === generation) settle()
  }
}

function startDrag(event: PointerEvent) {
  if (!event.isPrimary || event.button !== 0 || pointerId.value !== null) return
  settle()
  pointerId.value = event.pointerId
  dragStart = event.clientX
  controlledCard.value = currentIndex.value
  deck.value?.setPointerCapture(event.pointerId)
  emit('lock-grid-drag', true)
}

function onDrag(event: PointerEvent) {
  if (event.pointerId !== pointerId.value) return
  dragOffset.value = event.clientX - dragStart
}

function releasePointer() {
  const id = pointerId.value
  if (id === null) return
  pointerId.value = null
  if (deck.value?.hasPointerCapture(id)) deck.value.releasePointerCapture(id)
  emit('lock-grid-drag', false)
}

function endDrag(event: PointerEvent) {
  if (event.pointerId !== pointerId.value) return
  const offset = event.clientX - dragStart
  releasePointer()
  void animateRelease(offset, Math.abs(offset) > threshold)
}

function cancelDrag(event?: PointerEvent) {
  if (pointerId.value === null || (event && event.pointerId !== pointerId.value)) return
  const offset = dragOffset.value
  releasePointer()
  void animateRelease(offset, false)
}

useEventListener(window, 'blur', () => {
  releasePointer()
  settle()
})
useEventListener(document, 'visibilitychange', () => {
  if (document.hidden) {
    releasePointer()
    settle()
  }
})
onBeforeUnmount(() => {
  releasePointer()
  settle()
})
</script>

<style scoped>
.techstack-card { container-type: size; }
.techstack-deck { width: min(72cqw, 63.75cqh, 240px); aspect-ratio: 3 / 4; flex-shrink: 0; }
.techstack-swipe {
  cursor: grab;
  touch-action: pan-y;
}
.techstack-swipe.is-dragging {
  cursor: grabbing;
}
.techstack-playing-card {
  transition: transform 220ms cubic-bezier(0.23, 1, 0.32, 1), opacity 220ms cubic-bezier(0.23, 1, 0.32, 1);
  pointer-events: none;
}
.techstack-playing-card.is-controlled {
  transition: none;
}
@media (prefers-reduced-motion: reduce) {
  .techstack-playing-card {
    transition: opacity 140ms ease-out;
  }
}
</style>
