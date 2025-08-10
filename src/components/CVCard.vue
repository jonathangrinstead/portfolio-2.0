<template>
    <Card class="glass-card flex flex-col relative w-full h-full">
        <div class="flex items-center justify-center h-full">
            <span class="text-2xl font-serif italic select-none">Curriculum Vitae</span>
        </div>
        <a
          href="/Jonathan Grinstead CV(2025).pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open CV (PDF) in new tab"
          class="absolute top-3 right-3 p-2 rounded-full border backdrop-blur shadow-md transition-all duration-200
                 bg-white/80 text-black border-white/60 hover:bg-white hover:scale-105 hover:-rotate-3
                 focus:outline-none focus:ring-2 focus:ring-black/20
                 dark:bg-black/60 dark:text-white dark:border-white/30 dark:hover:bg-black/70 dark:focus:ring-white/20"
        >
          <ExternalLink class="w-5 h-5" />
        </a>
    </Card>
  </template>

<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { ExternalLink } from 'lucide-vue-next'
</script>

<style scoped>
.glass-card {
    cursor: default;
}
a {
    text-decoration: none;
    font-weight: 900;
}
</style>