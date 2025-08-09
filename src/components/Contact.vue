<script setup lang="ts">
import { Mail } from 'lucide-vue-next'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
</script>

<template>
  <HoverCard>
    <HoverCardTrigger>
      <p class="text-lg">Contact</p>
    </HoverCardTrigger>
    <HoverCardContent>
      <p>If you want to say hi...</p>
      <div class="flex items-center pt-2">
        <Mail class="mr-2 h-4 w-4 opacity-70" />
        <span class="text-xs text-muted-foreground">
          <a href="mailto:jonathangrinstead@hey.com" class="underline">jonathangrinstead@hey.com</a>
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
