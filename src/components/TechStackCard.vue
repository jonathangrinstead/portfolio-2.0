<template>
    <Card
      class="glass-card w-full h-full p-6 flex flex-col items-center justify-center overflow-hidden select-none relative transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
    >
      <!-- Card View -->
      <div
        class="relative w-72 h-96 cursor-grab transition-transform duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] techstack-swipe"
        @mousedown.stop.prevent="startDrag"
        @mousemove.stop.prevent="onDrag"
        @mouseup.stop="endDrag"
        @mouseleave.stop="endDrag"
        @touchstart.stop.prevent="startTouch"
        @touchmove.stop.prevent="onTouch"
        @touchend.stop="endTouch"
      >
        <TransitionGroup name="slide" tag="div" class="absolute inset-0">
          <div
            v-for="(card, index) in visibleCards"
            :key="card.name"
            class="absolute w-full h-full flex flex-col items-center justify-center text-center border rounded-[2rem] shadow-lg p-4 bg-card text-foreground transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
            :class="{ 'z-10': index === 1, 'z-0': index !== 1 }"
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
        </TransitionGroup>
      </div>
    </Card>
  </template>
  
  <script setup lang="ts">
import { ref, computed } from 'vue'
import { useColorMode } from '@vueuse/core'
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
  
  const currentIndex = ref(0)
  const dragOffset = ref(0)
  const dragStart = ref<number | null>(null)
  const touchStart = ref<number | null>(null)
  const threshold = 80
  
  const visibleCards = computed(() => {
    const prevIndex = (currentIndex.value - 1 + cards.length) % cards.length
    const nextIndex = (currentIndex.value + 1) % cards.length
    return [cards[prevIndex], cards[currentIndex.value], cards[nextIndex]]
  })
  
  function cardStyle(index: number) {
    if (index === 1) {
      return {
        transform: `translateX(${dragOffset.value}px)`
      }
    } else if (index === 0) {
      return {
        transform: 'translateX(-30px) scale(0.95)',
        opacity: '0.7'
      }
    } else {
      return {
        transform: 'translateX(30px) scale(0.95)',
        opacity: '0.7'
      }
    }
  }
  
  // Mouse events
  function startDrag(e: MouseEvent) {
    dragStart.value = e.clientX
    emit('lock-grid-drag', true)
  }
  
  function onDrag(e: MouseEvent) {
    if (dragStart.value !== null) {
      dragOffset.value = e.clientX - dragStart.value
    }
  }
  
  function endDrag() {
    if (Math.abs(dragOffset.value) > threshold) {
      if (dragOffset.value > 0) {
        currentIndex.value = (currentIndex.value - 1 + cards.length) % cards.length
      } else {
        currentIndex.value = (currentIndex.value + 1) % cards.length
      }
    }
    dragOffset.value = 0
    dragStart.value = null
    emit('lock-grid-drag', false)
  }
  
  // Touch events for mobile
  function startTouch(e: TouchEvent) {
    touchStart.value = e.touches[0].clientX
    emit('lock-grid-drag', true)
  }
  
  function onTouch(e: TouchEvent) {
    e.preventDefault() // Prevent scrolling
    if (touchStart.value !== null) {
      dragOffset.value = e.touches[0].clientX - touchStart.value
    }
  }
  
  function endTouch() {
    if (Math.abs(dragOffset.value) > threshold) {
      if (dragOffset.value > 0) {
        currentIndex.value = (currentIndex.value - 1 + cards.length) % cards.length
      } else {
        currentIndex.value = (currentIndex.value + 1) % cards.length
      }
    }
    dragOffset.value = 0
    touchStart.value = null
    emit('lock-grid-drag', false)
  }
  </script>
  
  <style scoped>
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.7s ease, opacity 0.7s ease;
  }
  .slide-enter-from {
    transform: translateX(100%);
    opacity: 0;
  }
  .slide-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }
  /* Make devicon SVGs appear white in dark mode while keeping color in light */
  .dark :deep(.tech-icon) {
    filter: brightness(0) invert(1);
  }
  
  </style>