<script setup lang="ts">
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()

const toggleMode = () => {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
    <Card class="glass-card flex items-center justify-center p-16 shadow-lg">
      <!-- Clickable Bulb -->
      <div
        class="w-24 h-24 rounded-full flex items-center justify-center border-4 cursor-pointer transition-all duration-500"
        :class="[
          mode === 'dark'
            ? 'bg-yellow-400 border-yellow-300 shadow-yellow-200 shadow-2xl flicker'
            : 'bg-gray-200 border-gray-400'
        ]"
        @click="toggleMode"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 text-white drop-shadow-lg transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3c-3.5 0-6 2.5-6 5.5 0 2.3 1.8 4.3 3.3 5.5h5.4c1.5-1.2 3.3-3.2 3.3-5.5C18 5.5 15.5 3 12 3zM9 19h6M10 22h4"
          />
        </svg>
      </div>
    </Card>
  </template>
  
  <style scoped>
@keyframes flicker {
  0%, 100% {
    opacity: 1;
    filter: drop-shadow(0 0 8px rgba(255, 237, 74, 0.5));
  }
  30% {
    opacity: 0.9;
    filter: drop-shadow(0 0 5px rgba(255, 237, 74, 0.4));
  }
  60% {
    opacity: 1;
    filter: drop-shadow(0 0 10px rgba(255, 237, 74, 0.6));
  }
  80% {
    opacity: 0.95;
    filter: drop-shadow(0 0 6px rgba(255, 237, 74, 0.5));
  }
}

.flicker {
  animation: flicker 2s infinite;
}
</style>