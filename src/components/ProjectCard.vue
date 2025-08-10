<template>
  <Dialog>
    <Card class="glass-card relative w-full h-full overflow-hidden">
      <div class="absolute top-4 left-4">
        <CardDescription class="text-base">Project</CardDescription>
      </div>
      <div class="absolute top-4 right-4 opacity-70">
        <Brain class="w-10 h-10" />
      </div>
      <div class="flex h-full items-end p-6">
        <div>
          <CardTitle class="text-3xl">ACL-Insight</CardTitle>
          <CardDescription class="text-base">A machine learning approach to diagnosing ACL injuries</CardDescription>
        </div>
      </div>

      <!-- Dialog trigger icon button -->
      <DialogTrigger class="absolute bottom-4 right-4">
        <button
          aria-label="Open project details"
          class="p-2 rounded-full border backdrop-blur shadow-md transition-all duration-200
                 bg-white/80 text-black border-white/60 hover:bg-white hover:scale-105 hover:rotate-3
                 focus:outline-none focus:ring-2 focus:ring-black/20
                 dark:bg-black/60 dark:text-white dark:border-white/30 dark:hover:bg-black/70 dark:focus:ring-white/20"
        >
          <Maximize2 class="w-5 h-5" />
        </button>
      </DialogTrigger>
    </Card>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>ACL-Insight</DialogTitle>
        <DialogDescription>Coming soon...</DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Brain, Maximize2 } from 'lucide-vue-next'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
</script>