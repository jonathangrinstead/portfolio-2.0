<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { useColorMode } from '@vueuse/core'
import { watch, onMounted, ref } from 'vue'

const mode = useColorMode()

const toggleMode = () => {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}

const gradientHue = ref<number>(220)
const gradientEnabled = ref<boolean>(false)

const applyGradient = () => {
  if (gradientEnabled.value) {
    const hue = Number(gradientHue.value) || 0
    if (mode.value === 'light') {
      const color1 = `hsl(${hue} 70% 96%)`
      const color2 = `hsl(${(hue + 60) % 360} 70% 90%)`
      document.body.style.backgroundImage = `linear-gradient(135deg, ${color1}, ${color2})`
    } else {
      const color1 = `hsl(${hue} 25% 16%)`
      const color2 = `hsl(${(hue + 60) % 360} 22% 12%)`
      document.body.style.backgroundImage = `linear-gradient(135deg, ${color1}, ${color2})`
    }
  } else {
    document.body.style.backgroundImage = ''
  }
}

watch([mode, gradientHue, gradientEnabled], applyGradient, { immediate: true })

onMounted(() => {
  applyGradient()
})
</script>

<template>
  <Card class="h-full glass-card relative flex flex-col items-center p-8 shadow-lg">
    <div class="flex-1 w-full flex items-center justify-center">
      <div
        class="w-24 h-24 rounded-full flex items-center justify-center border-4 cursor-pointer transition-all duration-500"
        :class="[
          mode === 'dark'
            ? 'bg-yellow-400 border-yellow-300 shadow-yellow-200 shadow-2xl flicker'
            : 'bg-gray-200 border-gray-400'
        ]"
        @click="toggleMode"
        aria-label="Toggle light and dark mode"
        role="button"
        tabindex="0"
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
    </div>

    <div class="w-full mt-6">
      <div class="glass-slider w-full p-2 rounded-xl border" :class="{ dark: mode === 'dark' }">
        <input
          class="slider-input w-full cursor-pointer"
          type="range"
          min="0"
          max="360"
          step="1"
          v-model.number="gradientHue"
          @pointerdown="$emit('lock-grid-drag', true)"
          @pointerup="$emit('lock-grid-drag', false)"
          @touchstart="$emit('lock-grid-drag', true)"
          @touchend="$emit('lock-grid-drag', false)"
          @mousedown="$emit('lock-grid-drag', true)"
          @mouseup="$emit('lock-grid-drag', false)"
          @input="gradientEnabled = true"
          :style="{ '--hue': String(gradientHue), '--hue2': String((gradientHue + 60) % 360) }"
          aria-label="Background hue slider"
        />
      </div>
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

/* Liquid glass-esque slider shell */
.glass-slider {
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(14px) saturate(120%);
  -webkit-backdrop-filter: blur(14px) saturate(120%);
  border: 1px solid rgba(255, 255, 255, 0.28);
  box-shadow:
    0 6px 24px rgba(0, 0, 0, 0.06),
    inset 0 1px 2px rgba(255, 255, 255, 0.22);
}

.glass-slider.dark {
  background: rgba(17, 24, 39, 0.35);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow:
    0 8px 28px rgba(0, 0, 0, 0.35),
    inset 0 1px 2px rgba(255, 255, 255, 0.06);
}

/* Slider base styling using CSS vars */
.slider-input {
  --hue: 220;
  --hue2: 280;
  appearance: none;
  height: 14px;
  border-radius: 9999px;
  outline: none;
  background:
    linear-gradient(90deg,
      hsl(var(--hue), 70%, 92%),
      hsl(var(--hue2), 70%, 88%));
  border: 1px solid rgba(0, 0, 0, 0.06);
  position: relative;
}

.glass-slider.dark .slider-input {
  background:
    linear-gradient(90deg,
      hsl(var(--hue), 35%, 24%),
      hsl(var(--hue2), 30%, 18%));
  border-color: rgba(255, 255, 255, 0.08);
}

/* WebKit */
.slider-input::-webkit-slider-runnable-track {
  height: 14px;
  border-radius: 9999px;
  background: transparent;
}
.slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 22px;
  width: 22px;
  margin-top: -4px; /* center over 14px track */
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px) saturate(120%);
  -webkit-backdrop-filter: blur(8px) saturate(120%);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow:
    0 6px 18px rgba(0, 0, 0, 0.12),
    inset 0 1px 1px rgba(255, 255, 255, 0.8);
}

.glass-slider.dark .slider-input::-webkit-slider-thumb {
  background: rgba(255, 255, 255, 0.6);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.4),
    inset 0 1px 1px rgba(255, 255, 255, 0.6);
}

/* Firefox */
.slider-input::-moz-range-track {
  height: 14px;
  border-radius: 9999px;
  background: transparent;
}
.slider-input::-moz-range-thumb {
  height: 22px;
  width: 22px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow:
    0 6px 18px rgba(0, 0, 0, 0.12),
    inset 0 1px 1px rgba(255, 255, 255, 0.8);
}

.glass-slider.dark .slider-input::-moz-range-thumb {
  background: rgba(255, 255, 255, 0.6);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.4),
    inset 0 1px 1px rgba(255, 255, 255, 0.6);
}

.preview-chip {
  box-shadow:
    inset 0 1px 2px rgba(255, 255, 255, 0.6),
    0 6px 18px rgba(0, 0, 0, 0.08);
}
</style>