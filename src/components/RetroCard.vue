<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { Card } from '@/components/ui/card'
defineEmits<{ activate: [] }>()
</script>

<template>
  <Card class="glass-card retro-card h-full">
    <button id="retro-trigger" class="retro-link" aria-label="90s-ify: enter the retro portfolio" @click="$emit('activate')">
      <span class="television" aria-hidden="true"><span class="screen"><span class="year">1996</span><span class="stars">✦ · ✧</span></span><span class="stand"></span></span>
      <span class="card-caption"><span><strong>90s-ify</strong><span class="description">Explore my retro website</span></span><span class="arrow"><ArrowUpRight :size="18" aria-hidden="true" /></span></span>
    </button>
  </Card>
</template>

<style scoped>
.retro-card { padding: 0; container-type: size; }
.retro-link { position: relative; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; padding: 24px; color: var(--foreground); text-align: left; cursor: pointer; }
.television { position: relative; width: 100px; height: 72px; margin-bottom: 36px; border: 2px solid var(--muted-foreground); border-radius: 12px; padding: 6px; opacity: .8; transition: transform 260ms cubic-bezier(.23,1,.32,1), border-color 200ms, opacity 200ms; }
.screen { position: relative; display: grid; place-items: center; height: 100%; overflow: hidden; border-radius: 6px; background: color-mix(in srgb,var(--muted-foreground) 8%,transparent); transition: background 200ms, box-shadow 200ms; }
.year { font: 18px monospace; letter-spacing: 3px; transition: color 200ms, transform 260ms cubic-bezier(.23,1,.32,1); }
.stars { position: absolute; inset: 0; display: grid; place-items: center; color: #c9f5ae; opacity: 0; transform: translateY(8px); font: 13px monospace; transition: transform 260ms cubic-bezier(.23,1,.32,1), opacity 200ms; }
.stand { position: absolute; width: 40px; bottom: -9px; left: 28px; border-bottom: 2px solid var(--muted-foreground); }
.card-caption { position: absolute; bottom: 22px; left: 24px; right: 22px; display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.card-caption strong { display: block; font-size: 18px; font-weight: 550; }.description { display: block; margin-top: 4px; color: var(--muted-foreground); font-size: 12px; }
.arrow { display: grid; place-items: center; flex-shrink: 0; width: 36px; height: 36px; border: 1px solid var(--border); border-radius: 50%; transition: transform 200ms, background 200ms; }
.retro-link:focus-visible { outline: 2px solid var(--foreground); outline-offset: -6px; border-radius: inherit; }
.retro-link:focus-visible .television { opacity: 1; border-color: #a4b990; transform: rotate(-5deg) scale(1.12); }
.retro-link:focus-visible .screen { background: #182322; box-shadow: 0 0 25px #b5e58e33; }
.retro-link:focus-visible .year { color: #d3f5ad; transform: translateY(-9px); }
.retro-link:focus-visible .stars { opacity: 1; transform: translateY(15px); }
@media (hover:hover) and (pointer:fine) {
  .retro-link:hover .television { opacity: 1; border-color: #a4b990; transform: rotate(-5deg) scale(1.12); }
  .retro-link:hover .screen { background: #182322; box-shadow: 0 0 25px #b5e58e33; }
  .retro-link:hover .year { color: #d3f5ad; transform: translateY(-9px); }
  .retro-link:hover .stars { opacity: 1; transform: translateY(15px); }
  .retro-link:hover .arrow { transform: translate(2px,-2px); background: color-mix(in srgb,var(--muted-foreground) 15%,transparent); }
}
@container (max-height:200px) { .television { margin: 0 0 0 auto; width: 84px; height: 60px; }.card-caption { right: 145px; top: 0; bottom: 0; }.stand { left: 20px; } }
@media (prefers-reduced-motion:reduce) { .television,.screen,.year,.stars,.arrow { transition: none; }.retro-link:hover .television,.retro-link:focus-visible .television,.retro-link:hover .arrow { transform: none; } }
</style>
