<script setup lang="ts">
import { ArrowUpRight, TvMinimal } from 'lucide-vue-next'
import { Card } from '@/components/ui/card'
defineEmits<{ activate: [] }>()
</script>

<template>
  <Card class="glass-card retro-card h-full">
    <TvMinimal class="tv-icon" :stroke-width="1" aria-hidden="true" />
    <div class="card-caption"><span>90s-ify</span><button id="retro-trigger" aria-label="90s-ify: enter the retro portfolio" @click="$emit('activate')"><ArrowUpRight :size="18" aria-hidden="true" /></button></div>
  </Card>
</template>

<style scoped>
.retro-card { position: relative; display: flex; align-items: center; justify-content: center; padding: 24px; }
.tv-icon { width: 62px; height: 62px; color: var(--muted-foreground); opacity: .65; margin-bottom: 12px; }
.card-caption { position: absolute; bottom: 20px; left: 24px; right: 20px; display: flex; align-items: center; justify-content: space-between; color: var(--muted-foreground); font-size: 16px; }
button { display: grid; place-items: center; width: 36px; height: 36px; border: 1px solid var(--border); border-radius: 50%; color: var(--foreground); background: var(--card); transition: transform 180ms cubic-bezier(.23,1,.32,1); }
button:focus-visible { outline: 2px solid var(--foreground); outline-offset: 4px; }
@media (hover:hover) { button:hover { transform: translate(1px,-1px); } }
@media (prefers-reduced-motion:reduce) { button { transition: none; } }
</style>
