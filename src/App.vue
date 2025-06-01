<script setup lang="ts">
import CountButton from './components/CountButton.vue'
import ColourMode from './components/ColourMode.vue'
import TitleName from './components/TitleName.vue'
import JobName from './components/JobName.vue'
</script>

<template>
  <div>
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
      <CountButton />
    </div>
  </div>
</template>
