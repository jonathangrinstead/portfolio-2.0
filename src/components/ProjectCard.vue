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
    <DialogContent class="project-expand" :hide-close="true">
      <div class="relative w-full h-full">
        <!-- Centered close button -->
        <div class="absolute top-4 left-1/2 -translate-x-1/2 z-10">
          <DialogClose as-child>
            <Button variant="outline" size="icon" class="rounded-full w-10 h-10 shadow-md backdrop-blur cursor-pointer p-0">
              <X class="w-5 h-5" />
              <span class="sr-only">Close</span>
            </Button>
          </DialogClose>
        </div>

        <!-- Content -->
        <div class="flex flex-col items-center justify-center w-full h-full gap-3 p-6 text-center">
          <h2 class="text-3xl font-semibold">ACL-Insight</h2>
          <p class="text-muted-foreground">Coming soon...</p>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Brain, Maximize2, X } from 'lucide-vue-next'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
</script>