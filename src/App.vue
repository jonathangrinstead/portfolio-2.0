<script setup lang="ts">
import Contact from './components/Contact.vue'
import TitleName from './components/TitleName.vue'
import JobName from './components/JobName.vue'
import AboutMeCard from './components/AboutMeCard.vue'
import WeatherCard from './components/WeatherCard.vue'
import LightSwitchCard from './components/LightSwitchCard.vue'
import SnakeCard from './components/SnakeCard.vue'
import TechStackCard from './components/TechStackCard.vue'
import QuotesCard from './components/QuotesCard.vue'
import LinkedinCard from './components/LinkedinCard.vue'
import GitHubCard from './components/GitHubCard.vue'
import CVCard from './components/CVCard.vue'
import SpotifyCard from './components/SpotifyCard.vue'
import MapCard from './components/MapCard.vue'
import ProjectCard from './components/ProjectCard.vue'
import { useLiquidGlass } from './composables/useLiquidGlass'
import { GridLayout, GridItem } from 'vue3-grid-layout'
import { ref } from 'vue'

// Initialize liquid glass cursor tracking
useLiquidGlass()

const layout = ref([
  // Top row widths remain equal; increase vertical room for About and Light
  { x: 0,  y: 0,  w: 3, h: 3, i: 'about' },
  { x: 3,  y: 0,  w: 3, h: 3, i: 'weather' },
  { x: 6,  y: 0,  w: 3, h: 3, i: 'light' },
  { x: 9,  y: 0,  w: 3, h: 3, i: 'map' },

  // Second row starts at y:3 to align below top row
  { x: 0,  y: 3,  w: 6, h: 4, i: 'tech' },
  { x: 6,  y: 3,  w: 6, h: 4, i: 'quotes' },

  // Third row
  { x: 0,  y: 7,  w: 3, h: 3, i: 'linkedin' },
  { x: 3,  y: 7,  w: 3, h: 3, i: 'github' },
  { x: 6,  y: 7,  w: 3, h: 3, i: 'cv' },
  { x: 9,  y: 7,  w: 3, h: 3, i: 'spotify' },

  // Bottom large: Snake (shifted accordingly)
  { x: 0,  y: 10, w: 7, h: 6, i: 'snake' },
  { x: 7,  y: 10, w: 5, h: 6, i: 'project' },
])

const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }
const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
const rowHeight = 80
const margin: [number, number] = [16, 16]

const isGridDragLocked = ref(false)

function setGridDragLocked(locked: boolean) {
  isGridDragLocked.value = locked
}
</script>

<template>
  <div class="container mx-auto mt-8">
    <div class="flex justify-between items-center p-6">
      <div class="flex flex-col gap-2">
        <TitleName />
        <JobName />
      </div>
      <div class='pb-4'>
        <Contact />
      </div>
    </div>

    <grid-layout
      v-model:layout="layout"
      :col-num="cols.lg"
      :row-height="rowHeight"
      :is-draggable="!isGridDragLocked"
      :is-resizable="false"
      :responsive="true"
      draggable-cancel=".techstack-swipe"
      :breakpoints="breakpoints"
      :cols="cols"
      :margin="margin"
      :use-css-transforms="true"
      class="px-6"
    >
      <grid-item
        v-for="item in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :drag-ignore-from="item.i === 'tech' ? 'a, button, .techstack-swipe' : 'a, button'"
      >
        <component :is="
          item.i === 'about' ? AboutMeCard :
          item.i === 'weather' ? WeatherCard :
          item.i === 'light' ? LightSwitchCard :
          item.i === 'snake' ? SnakeCard :
          item.i === 'tech' ? TechStackCard :
          item.i === 'quotes' ? QuotesCard :
          item.i === 'linkedin' ? LinkedinCard :
          item.i === 'github' ? GitHubCard :
          item.i === 'cv' ? CVCard :
          item.i === 'spotify' ? SpotifyCard :
          item.i === 'map' ? MapCard :
          ProjectCard
        " 
        v-on="item.i === 'tech' ? { 'lock-grid-drag': setGridDragLocked } : {}"/>
      </grid-item>
    </grid-layout>
  </div>
  
</template>

<style scoped>
  /* Placeholder (drop target) styling while dragging */
  :deep(.vue-grid-layout .vue-grid-placeholder) {
    border-radius: 2rem;
  background: rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
    /* Use deep, natural dark-grey shadows (Tailwind gray-900 tone) */
    box-shadow:
      0 26px 80px rgba(17, 24, 39, 0.52),
      0 12px 32px rgba(17, 24, 39, 0.36),
      0 2px 10px rgba(17, 24, 39, 0.24);
  transition: background 150ms ease, box-shadow 150ms ease;
}

/* Dark mode tweak for placeholder */
  :deep(.dark .vue-grid-layout .vue-grid-placeholder) {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
    /* Slightly stronger in dark mode but still dark-grey, not pure black */
    box-shadow:
      0 28px 88px rgba(17, 24, 39, 0.66),
      0 12px 34px rgba(17, 24, 39, 0.48),
      0 2px 10px rgba(17, 24, 39, 0.30);
  }

/* Dragging item shadow and radius to match cards */
  :deep(.vue-grid-item.vue-grid-item-dragging, .vue-grid-item.vue-draggable-dragging) {
    border-radius: 2rem;
    /* Natural dark-grey stack for the moving card */
    box-shadow:
      0 28px 88px rgba(17, 24, 39, 0.58),
      0 12px 34px rgba(17, 24, 39, 0.40),
      0 2px 10px rgba(17, 24, 39, 0.26);
  }

  :deep(.dark .vue-grid-item.vue-grid-item-dragging, .dark .vue-grid-item.vue-draggable-dragging) {
    border-radius: 2rem;
    box-shadow:
      0 30px 92px rgba(17, 24, 39, 0.70),
      0 14px 38px rgba(17, 24, 39, 0.52),
      0 2px 12px rgba(17, 24, 39, 0.32);
  }
</style>
