<script setup lang="ts">
import { CalendarDays } from 'lucide-vue-next'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
</script>

<template>
  <HoverCard>
    <HoverCardTrigger>
      <p class="text-lg">Full Stack Software Developer</p>
    </HoverCardTrigger>
    <HoverCardContent>
      <p>Specialising in Ruby on Rails, Python and Vue.js</p>
      <div class="flex items-center pt-2">
        <CalendarDays class="mr-2 h-4 w-4 opacity-70" />
        <span class="text-xs text-muted-foreground">
          Currently at <a href="https://mmtm.io/" target="_blank" class="underline">mmtm</a> • Joined April 2025
        </span>
      </div>
    </HoverCardContent>
  </HoverCard>
</template>


<style scoped>
p {
  transition: all 0.3s ease;
}

.text-lg:hover {
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
}
</style>
