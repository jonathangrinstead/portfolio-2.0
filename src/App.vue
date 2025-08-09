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
  { x: 0,  y: 0,  w: 4, h: 3, i: 'about' },
  { x: 4,  y: 0,  w: 3, h: 3, i: 'weather' },
  { x: 7,  y: 0,  w: 2, h: 3, i: 'light' },
  { x: 9,  y: 0,  w: 3, h: 3, i: 'snake' },

  { x: 0,  y: 3,  w: 6, h: 4, i: 'tech' },
  { x: 6,  y: 3,  w: 6, h: 4, i: 'quotes' },

  { x: 0,  y: 7,  w: 3, h: 3, i: 'linkedin' },
  { x: 3,  y: 7,  w: 3, h: 3, i: 'github' },
  { x: 6,  y: 7,  w: 3, h: 3, i: 'cv' },
  { x: 9,  y: 7,  w: 3, h: 3, i: 'spotify' },

  { x: 0,  y: 10, w: 7, h: 6, i: 'map' },
  { x: 7,  y: 10, w: 5, h: 6, i: 'project' },
])

const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }
const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
const rowHeight = 80
const margin: [number, number] = [16, 16]
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
      :is-draggable="true"
      :is-resizable="false"
      :responsive="true"
      :breakpoints="breakpoints"
      :cols="cols"
      :margin="margin"
      :use-css-transforms="true"
      class="px-6"
    >
      <grid-item v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i">
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
        " />
      </grid-item>
    </grid-layout>
  </div>
  
</template>

<style scoped>
/* Placeholder (drop target) styling while dragging */
:deep(.vue-grid-layout .vue-grid-placeholder) {
  border-radius: 1rem; /* matches rounded-2xl */
  background: rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
  transition: background 150ms ease, box-shadow 150ms ease;
}

/* Dark mode tweak for placeholder */
:deep(.dark .vue-grid-layout .vue-grid-placeholder) {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
}

/* Dragging item shadow and radius to match cards */
:deep(.vue-grid-item.vue-grid-item-dragging) {
  border-radius: 1rem; /* matches rounded-2xl */
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
}
</style>
