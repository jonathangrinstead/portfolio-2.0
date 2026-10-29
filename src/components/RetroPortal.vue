<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref } from 'vue'
import RetroWorld from './RetroWorld.vue'

const active = ref(false)
const switching = ref(false)
const phase = ref('')
const world = ref<HTMLElement>()
let previousFocus: HTMLElement | null = null
let previousScroll = 0
let previousOverflow = ''
let timer: ReturnType<typeof setTimeout> | undefined
let disposed = false

async function reveal(destination: boolean) {
  active.value = destination
  await nextTick()
  if (disposed) return
  if (switching.value) return
  if (destination) world.value?.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true })
  else {
    window.scrollTo(0, previousScroll)
    const trigger = previousFocus?.isConnected ? previousFocus : document.getElementById('retro-trigger')
    trigger?.focus({ preventScroll: true })
  }
}

function switchMode(destination: boolean) {
  if (switching.value || active.value === destination) return
  if (destination) {
    previousFocus = document.activeElement as HTMLElement
    previousScroll = window.scrollY
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    void reveal(destination)
    if (!destination) document.body.style.overflow = previousOverflow
    return
  }
  switching.value = true
  phase.value = 'closing'
  timer = setTimeout(async () => {
    await reveal(destination)
    if (disposed) return
    phase.value = 'opening'
    timer = setTimeout(() => {
      switching.value = false
      void reveal(destination)
      if (!destination) document.body.style.overflow = previousOverflow
    }, 600)
  }, 650)
}

defineExpose({ enter: () => switchMode(true) })
onBeforeUnmount(() => {
  disposed = true
  clearTimeout(timer)
  if (active.value || switching.value) document.body.style.overflow = previousOverflow
})
</script>

<template>
  <div :inert="active || switching" :aria-hidden="active || undefined"><slot /></div>
  <Teleport to="body">
    <div v-if="active" ref="world" class="retro-viewport" :inert="switching" @keydown.esc="switchMode(false)">
      <RetroWorld @exit="switchMode(false)" />
    </div>
    <div v-if="switching" class="crt-transition" :class="phase" aria-hidden="true">
      <div class="shutter top"></div><div class="shutter bottom"></div><div class="crt-beam"></div>
    </div>
    <span class="sr-only" role="status">{{ switching ? 'Changing channels…' : active ? 'Retro portfolio loaded.' : '' }}</span>
  </Teleport>
</template>

<style scoped>
.retro-viewport { position: fixed; inset: 0; z-index: 1000; overflow: auto; overscroll-behavior: contain; background: #030309; }
.crt-transition { position: fixed; inset: 0; z-index: 1100; overflow: hidden; }
.shutter { position: absolute; left: 0; width: 100%; height: 50.1%; background: #030303; transform: scaleY(0); }
.top { top: 0; transform-origin: top; }
.bottom { bottom: 0; transform-origin: bottom; }
.closing .shutter { animation: shut 650ms cubic-bezier(.77,0,.175,1) both; }
.opening .shutter { animation: shut 600ms cubic-bezier(.77,0,.175,1) reverse both; }
.crt-beam { position: absolute; top: 50%; left: 5%; width: 90%; height: 2px; background: #d8f5ef; box-shadow: 0 0 10px 2px #a8e4df; opacity: 0; }
.closing .crt-beam { animation: beam 650ms both; }
.opening .crt-beam { animation: beam 600ms reverse both; }
@keyframes shut { 0% { transform: scaleY(0); } 55%,100% { transform: scaleY(1); } }
@keyframes beam { 0%,30% { opacity: 0; transform: scaleX(1); } 55% { opacity: .8; transform: scaleX(1); } 78% { opacity: .7; transform: scaleX(.005); } 90%,100% { opacity: 0; transform: scaleX(.005); } }
@media (prefers-reduced-motion:reduce) { .shutter,.crt-beam { animation: none !important; } }
</style>
