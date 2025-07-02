<script setup lang="ts">
import ContactCard from './components/ContactCard.vue'
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
import { useLiquidGlass } from './composables/useLiquidGlass'

// Initialize liquid glass cursor tracking
useLiquidGlass()
</script>

<template>
  <div class="container mx-auto mt-8">
    <div class="flex justify-between items-center p-6">
      <div class="flex flex-col gap-2">
        <TitleName />
        <JobName />
      </div>
      <div class='pb-4'>
        <ContactCard />
      </div>
    </div>
    <div class="flex justify-between items-center p-6">
      <AboutMeCard />
      <WeatherCard />
      <LightSwitchCard />
      <SnakeCard />
    </div>
    <div class="flex justify-between items-center p-6">
      <TechStackCard />
      <QuotesCard />
    </div>
    <div class="flex justify-between items-center p-6">
      <LinkedinCard />
      <GitHubCard />
    </div>
    <div class="flex justify-between items-center p-6">
      <CVCard />
    </div>
  </div>
</template>
