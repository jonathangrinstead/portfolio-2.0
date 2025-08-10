<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card'
</script>

<template>
  <Card class="glass-card shadow-lg h-full gap-1">
    <CardHeader class="flex justify-center pb-0">
      <img src="@/assets/memoji.png" alt="memoji" class="w-28 h-28">
    </CardHeader>
    <CardContent class="pt-0 -mt-3">
      <p class="text-sm text-center max-w-md mx-auto leading-relaxed">
        Hey i'm <span class="text-primary">Jonathan</span>, a full stack software developer from the UK. Im interested in building intuitive web applications, music, photography and travel.
      </p>
    </CardContent>
  </Card>
</template>


<style scoped>
.text-primary {
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
  font-size: 1.6rem;
}
</style>
