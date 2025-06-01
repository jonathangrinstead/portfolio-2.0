<script setup lang="ts">
import CountButton from './components/CountButton.vue'
import ColourMode from './components/ColourMode.vue'
import TitleName from './components/TitleName.vue'
</script>

<template>
  <div>
    <div class="flex justify-between items-center p-4">
      <TitleName />
      <div class='pb-4'>
        <ColourMode />
      </div>
    </div>
    <div class="flex justify-between items-center">
      <CountButton />
    </div>
  </div>
</template>
