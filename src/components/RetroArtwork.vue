<script setup lang="ts">
import { onMounted, ref } from 'vue'
const props = defineProps<{ kind: 'logo' | 'about' | 'projects' | 'toolbox' | 'github' | 'cv' | 'contact' }>()
const canvas = ref<HTMLCanvasElement>()

// Render at native early-web sizes, then enlarge with nearest-neighbour scaling.
// The ordered colour steps are intentional: these should feel like tiny GIFs.
onMounted(() => {
  const ctx = canvas.value?.getContext('2d')
  if (!ctx) return
  if (props.kind === 'logo') {
    ctx.translate(90, 53)
    ctx.rotate(-.14)
    ctx.strokeStyle = '#ef6027'
    ctx.lineWidth = 5
    ctx.beginPath(); ctx.ellipse(0, 0, 65, 24, -.55, 0, Math.PI * 2); ctx.stroke()
    ctx.strokeStyle = '#efe54f'; ctx.lineWidth = 2; ctx.stroke()
    ctx.textAlign = 'center'
    ctx.font = 'bold italic 23px Georgia'
    ctx.strokeStyle = '#192947'; ctx.lineWidth = 3
    ctx.strokeText("Jonathan's", 0, -5)
    ctx.fillStyle = '#cce58b'; ctx.fillText("Jonathan's", 0, -5)
    ctx.font = 'bold italic 39px Impact, Arial Black, sans-serif'
    ctx.strokeText('WORLD', 0, 30)
    const gradient = ctx.createLinearGradient(0, 0, 0, 32)
    gradient.addColorStop(0, '#ffff82'); gradient.addColorStop(.5, '#97d59b'); gradient.addColorStop(1, '#3774a9')
    ctx.fillStyle = gradient; ctx.fillText('WORLD', 0, 30)
    return
  }
  if (props.kind === 'cv') {
    ctx.fillStyle = '#6861b3'; ctx.fillRect(10, 7, 29, 34)
    ctx.fillStyle = '#a2a6ae'; ctx.fillRect(15, 7, 18, 12)
    ctx.fillStyle = '#30334d'; ctx.fillRect(26, 8, 4, 9)
    ctx.fillStyle = '#e3ddc7'; ctx.fillRect(14, 25, 21, 14)
    ctx.fillStyle = '#3a354b'; ctx.font = '8px monospace'; ctx.fillText('CV', 19, 35)
    return
  }
  if (props.kind === 'contact') {
    ctx.fillStyle = '#8f78aa'; ctx.fillRect(6, 13, 38, 25)
    ctx.fillStyle = '#d9c7e7'; ctx.fillRect(7, 13, 35, 22)
    ctx.strokeStyle = '#574475'; ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(7, 14); ctx.lineTo(25, 27); ctx.lineTo(42, 14); ctx.stroke()
    return
  }
  const palettes = { about: [46, 120, 224], projects: [238, 125, 28], toolbox: [54, 80, 218], github: [110, 231, 45] }
  const base = palettes[props.kind]
  for (let y = 4; y < 46; y++) for (let x = 4; x < 46; x++) {
    const dx = (x - 25) / 19, dy = (y - 24) / 19
    if (dx * dx + dy * dy > 1) continue
    let light = Math.max(.15, Math.min(1.15, .75 - dx * .35 - dy * .3))
    light = Math.round(light * 7 + ((x + y) % 2) * .3) / 7
    let color = base
    if (props.kind === 'about' && Math.sin(x * .3 + Math.cos(y * .4) * 2) + Math.cos(y * .4) > .6) color = [103, 217, 44]
    if (props.kind === 'projects' && Math.sin(y * .8 + x * .3) > .4) color = [173, 62, 140]
    ctx.fillStyle = `rgb(${color.map(c => Math.min(255, Math.round(c * light))).join(',')})`
    ctx.fillRect(x, y, 1, 1)
  }
  if (props.kind === 'toolbox') {
    ctx.strokeStyle = '#ef526c'; ctx.lineWidth = 3
    ctx.beginPath(); ctx.ellipse(25, 25, 24, 8, -.4, 0, Math.PI * 2); ctx.stroke()
  }
})
</script>

<template>
  <canvas ref="canvas" :width="kind === 'logo' ? 180 : 50" :height="kind === 'logo' ? 110 : 50" :class="{ logo: kind === 'logo' }" aria-hidden="true"></canvas>
</template>

<style scoped>
canvas { display: block; width: 65px; height: 65px; image-rendering: pixelated; }
canvas.logo { width: 240px; height: auto; max-width: 100%; }
</style>
