<template>
    <Card
      class="glass-card w-full h-full p-6 flex flex-col items-center justify-center overflow-hidden select-none relative transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
    >
      <!-- Card View -->
      <div
        class="relative w-72 h-96 cursor-grab transition-transform duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
        @mousedown="startDrag"
        @mousemove="onDrag"
        @mouseup="endDrag"
        @mouseleave="endDrag"
        @touchstart="startTouch"
        @touchmove="onTouch"
        @touchend="endTouch"
      >
        <TransitionGroup name="slide" tag="div" class="absolute inset-0">
          <div
            v-for="(card, index) in visibleCards"
            :key="card.name"
            class="absolute w-full h-full flex flex-col items-center justify-center text-center border rounded-xl shadow-lg p-4 bg-card text-foreground transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
            :class="{ 'z-10': index === 1, 'z-0': index !== 1 }"
            :style="cardStyle(index)"
          >
            <!-- Top left: First letter + icon -->
            <div class="absolute top-2 left-2 flex flex-col items-center">
              <span class="text-xs font-bold mb-1" :style="{ color: card.color }">
                {{ card.name.charAt(0).toUpperCase() }}
              </span>
              <img :src="card.icon" class="w-4 h-4" :alt="card.name + ' icon'" />
            </div>
            
            <!-- Top right: icon only -->
            <img :src="card.icon" class="w-6 h-6 absolute top-4 right-4" :alt="card.name + ' icon'" />
            
            <!-- Bottom left: icon only -->
            <img :src="card.icon" class="w-6 h-6 absolute bottom-4 left-4" :alt="card.name + ' icon'" />
            
            <!-- Bottom right: First letter + icon (upside down) -->
            <div class="absolute bottom-2 right-2 flex flex-col items-center transform rotate-180">
              <span class="text-xs font-bold mb-1" :style="{ color: card.color }">
                {{ card.name.charAt(0).toUpperCase() }}
              </span>
              <img :src="card.icon" class="w-4 h-4" :alt="card.name + ' icon'" />
            </div>

            <!-- Center content -->
            <img :src="card.icon" :alt="card.name" class="w-16 h-16 mb-4" />
            <h2 class="text-2xl font-bold" :style="{ color: card.color }">{{ card.name }}</h2>
          </div>
        </TransitionGroup>
      </div>
    </Card>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { Card } from '@/components/ui/card'
  
  const cards = [
    { name: 'Ruby', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg', color: '#CC342D' },
    { name: 'Vue', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', color: '#42b883' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776AB' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#f7df1e' },
    { name: 'Rails', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-plain.svg', color: '#CC0000' },
    { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', color: '#000000' },
    { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', color: '#092E20' },
    { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', color: '#EE4C2C' },
    { name: 'Sass', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg', color: '#CD6799' },
    { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: '#38B2AC' },
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', color: '#007396' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178C6' },
  ]
  
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
  }
  
  // Touch events for mobile
  function startTouch(e: TouchEvent) {
    touchStart.value = e.touches[0].clientX
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
  </style>