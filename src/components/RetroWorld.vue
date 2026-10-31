<script setup lang="ts">
import { nextTick, ref } from 'vue'
import RetroArtwork from './RetroArtwork.vue'
defineEmits<{ exit: [] }>()
type Destination = 'about' | 'projects' | 'toolbox'
const selected = ref<Destination | null>(null)
const panel = ref<HTMLElement>()
let destinationTrigger: HTMLElement | null = null
async function closeDetails() {
  selected.value = null
  await nextTick()
  destinationTrigger?.focus()
}
async function explore(destination: Destination) {
  destinationTrigger = document.activeElement as HTMLElement
  selected.value = destination
  await nextTick()
  panel.value?.focus({ preventScroll: true })
  panel.value?.scrollIntoView({ behavior: 'instant', block: 'nearest' })
}
</script>

<template>
  <main class="retro-world">
    <section class="universe" aria-label="Explore Jonathan's world">
      <h1 tabindex="-1" class="world-logo"><span class="sr-only">Jonathan's World</span><RetroArtwork kind="logo" /></h1>
      <button class="destination about" @click="explore('about')"><RetroArtwork kind="about" /><span>About me</span></button>
      <button class="destination projects" @click="explore('projects')"><RetroArtwork kind="projects" /><span>Projects</span></button>
      <button class="destination toolbox" @click="explore('toolbox')"><RetroArtwork kind="toolbox" /><span>Toolbox</span></button>
      <a class="destination github" href="https://github.com/jonathangrinstead" target="_blank" rel="noopener noreferrer"><RetroArtwork kind="github" /><span>GitHub</span></a>
      <a class="destination cv" href="/Jonathan%20Grinstead%20CV(2025).pdf" target="_blank" rel="noopener noreferrer"><RetroArtwork kind="cv" /><span>My CV</span></a>
      <a class="destination contact" href="mailto:jonathangrinstead@hey.com"><RetroArtwork kind="contact" /><span>Email me</span></a>
    </section>
    <section v-if="selected" ref="panel" class="info-window" tabindex="-1" :aria-labelledby="`retro-${selected}-title`">
      <div class="window-bar"><span>jonathan / {{ selected }}.html</span><button aria-label="Close details" @click="closeDetails">×</button></div>
      <div class="window-content" v-if="selected === 'about'"><h2 id="retro-about-title">Greetings, fellow earthling.</h2><p>I'm Jonathan Grinstead, a full-stack software developer from the UK. I build intuitive web applications and enjoy music, photography, and travel.</p><a href="https://www.linkedin.com/in/jonathangrinstead/" target="_blank" rel="noopener noreferrer">Find me on LinkedIn ↗</a></div>
      <div class="window-content" v-else-if="selected === 'projects'"><span class="eyebrow">TRANSMISSION 001 · MSc COMPUTING, CARDIFF UNIVERSITY</span><h2 id="retro-projects-title">ACL-Insight</h2><p>A machine learning approach to diagnosing ACL injuries. My dissertation explores deep learning for knee MRI analysis, using three scan planes to help identify tears.</p><div class="tech-tags"><span>Python</span><span>PyTorch</span><span>DenseNet-121</span></div><p>Explore more of what I'm building in my <a href="https://github.com/jonathangrinstead" target="_blank" rel="noopener noreferrer">GitHub repositories ↗</a>.</p></div>
      <div class="window-content" v-else><h2 id="retro-toolbox-title">Tools for building worlds.</h2><p>A few of the languages, frameworks, and tools in my orbit:</p><div class="tech-tags"><span v-for="tool in ['Ruby', 'Rails', 'Vue', 'Python', 'JavaScript', 'TypeScript', 'Flask', 'Django', 'PyTorch', 'Sass', 'Tailwind', 'Java']" :key="tool">{{ tool }}</span></div></div>
    </section>
    <footer><button @click="$emit('exit')">Back to the present</button><span> · </span><a href="https://www.spacejam.com/1996/" target="_blank" rel="noopener noreferrer">Inspired by Space Jam '96</a></footer>
  </main>
</template>

<style scoped>
.retro-world { display: flex; flex-direction: column; justify-content: center; min-height: 100dvh; padding: 35px 12px; background: #000 url('/retro-stars.svg') repeat; color: #fff; font-family: 'Times New Roman', serif; letter-spacing: normal; }
.universe { flex-shrink: 0; position: relative; width: min(560px,100%); height: 420px; margin: 0 auto 45px; }
.world-logo { position: absolute; display: grid; place-items: center; width: 44%; top: 33%; left: 28%; margin: 0; }
.destination { position: absolute; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; width: 100px; min-height: 88px; border: 0; background: transparent; text-decoration: none; }
.destination span { color: #e8ed69; text-transform: uppercase; font: bold 11px/1.2 'Times New Roman',serif; text-shadow: 1px 1px #4e4a1b; }
.about { top: 5%; left: 21%; }.projects { top: 3%; right: 18%; }.toolbox { top: 36%; right: 0; }.github { top: 41%; left: 0; }.cv { bottom: 3%; left: 18%; }.contact { bottom: 4%; right: 17%; }
footer { text-align: center; color: #b58c8c; font-size: 11px; }footer button,footer a { color: inherit; text-decoration: underline; text-underline-offset: 2px; }footer button { min-height: 44px; padding: 8px; }footer a { display: inline-block; padding: 8px 0; }
button:focus-visible,a:focus-visible,h1:focus-visible,.info-window:focus-visible { outline: 1px dotted #ffff8b; outline-offset: 5px; }
@media (hover:hover) { .destination:hover span,footer a:hover,footer button:hover { color: white; } }
@media (max-width:480px) { .universe { height: 340px; margin-bottom: 35px; }.destination { width: 78px; }.destination :deep(canvas) { width: 54px; height: 54px; }.destination span { font-size: 10px; }.world-logo { width: 48%; left: 26%; top: 36%; }.about { left: 14%; }.projects { right: 13%; }.cv { left: 12%; }.contact { right: 10%; } }
.info-window { width: min(640px, 100%); flex-shrink: 0; max-width: 640px; margin: 25px auto 40px; border: 2px outset #8b7ea3; background: #151124; box-shadow: 6px 6px #000; scroll-margin: 20px; }
.window-bar { display: flex; align-items: center; justify-content: space-between; padding: 7px 10px; background: linear-gradient(90deg,#483875,#24204c); font-size: 11px; }
.window-bar button { width: 25px; height: 25px; border: 2px outset #d7cde8; color: #211b30; background: #bdb2cc; font: bold 19px/1 monospace; }
.window-content { padding: 26px; font: 15px/1.8 Georgia,serif; color: #d6cee5; }
.window-content h2 { margin: 0 0 13px; color: #e9e8a9; font: bold 28px/1.2 Georgia,serif; }.window-content p { margin: 12px 0; }
.window-content a,.credits a { color: #c4b2fc; text-decoration: underline; text-underline-offset: 3px; }
.eyebrow { display: block; font: 9px/1.8 monospace; letter-spacing: 1px; margin-bottom: 12px; }
.tech-tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 17px 0; }.tech-tags span { padding: 3px 9px; border: 1px solid #796990; font: 12px/1.8 monospace; color: #d0eeb4; }

</style>
