<script setup lang="ts">
import ColourMode from './components/ColourMode.vue'
import TitleName from './components/TitleName.vue'
import JobName from './components/JobName.vue'
import AboutMeCard from './components/AboutMeCard.vue'
import WeatherCard from './components/WeatherCard.vue'
import LightSwitchCard from './components/LightSwitchCard.vue'
</script>

<template>
  <div class="container mx-auto mt-8">
    <div class="flex justify-between items-center p-6">
      <div class="flex flex-col gap-2">
        <TitleName />
        <JobName />
      </div>
      <div class='pb-4'>
        <ColourMode />
      </div>
    </div>
    <div class="flex justify-between items-center p-6">
      <AboutMeCard />
      <WeatherCard />
      <LightSwitchCard />
    </div>
  </div>
</template>
