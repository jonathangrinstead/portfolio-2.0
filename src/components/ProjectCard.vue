<template>
  <Dialog>
    <DialogTrigger class="block w-full h-full">
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
      </Card>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>ACL-Insight</DialogTitle>
        <DialogDescription>Coming soon...</DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Brain } from 'lucide-vue-next'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
</script>