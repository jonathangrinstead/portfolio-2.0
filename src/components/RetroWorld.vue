<script setup lang="ts">
import { nextTick, ref } from 'vue'
import portrait from '@/assets/memoji.png'
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
    <div class="starfield" aria-hidden="true"><i v-for="star in 100" :key="star" :style="{ left: `${(star * 73.79) % 100}%`, top: `${(star * 31.17) % 100}%`, opacity: .25 + (star % 6) / 8, width: star % 9 === 0 ? '3px' : '1px', height: star % 9 === 0 ? '3px' : '1px' }"></i></div>
    <header class="retro-toolbar"><span><b>●</b> YOU ARE NOW SURFING IN 1996</span><button @click="$emit('exit')">Back to the future ↗</button></header>
    <div class="welcome">★ WELCOME TO MY CORNER OF THE WORLD WIDE WEB ★</div>
    <section class="universe" aria-label="Explore Jonathan's world">
      <div class="orbit" aria-hidden="true"></div>
      <div class="world-logo">
        <span class="logo-kicker">THE OFFICIAL HOMEPAGE OF</span>
        <h1 tabindex="-1"><span>Jonathan's</span><strong>WORLD</strong></h1>
        <span class="logo-tail">FULL-STACK DEVELOPER · EARTH, UK</span>
        <p>A small human.<br>A whole universe of ideas.</p>
      </div>
      <button class="destination about" @click="explore('about')"><span class="planet portrait"><img :src="portrait" alt="" /></span><span class="planet-label">Who on Earth?</span></button>
      <button class="destination projects" @click="explore('projects')"><span class="planet striped"><span class="new-badge">NEW!</span></span><span class="planet-label">Project planet</span></button>
      <button class="destination toolbox" @click="explore('toolbox')"><span class="planet saturn"><span class="planet-ring"></span><span class="code">&lt;/&gt;</span></span><span class="planet-label">The toolbox</span></button>
      <a class="destination github" href="https://github.com/jonathangrinstead" target="_blank" rel="noopener noreferrer"><span class="planet moon"><span>{ }</span></span><span class="planet-label">Code galaxy ↗</span></a>
      <a class="destination cv" href="/Jonathan%20Grinstead%20CV(2025).pdf" target="_blank" rel="noopener noreferrer"><span class="disk" aria-hidden="true"><i></i><b>JG</b><small>CV.pdf</small></span><span class="planet-label">Download my CV ↗</span></a>
      <a class="destination contact" href="mailto:jonathangrinstead@hey.com"><span class="envelope" aria-hidden="true">✉</span><span class="planet-label">You've got mail!</span></a>
      <span class="space-note note-one" aria-hidden="true">NO PLUG-INS<br>REQUIRED :)</span>
      <span class="space-note note-two" aria-hidden="true">THIS WAY TO<br>THE GOOD STUFF ↑</span>
    </section>
    <div class="explore-hint">Choose a planet. Get a little lost.</div>
    <section v-if="selected" ref="panel" class="info-window" tabindex="-1" :aria-labelledby="`retro-${selected}-title`">
      <div class="window-bar"><span>jonathan / {{ selected }}.html</span><button aria-label="Close details" @click="closeDetails">×</button></div>
      <div class="window-content" v-if="selected === 'about'"><h2 id="retro-about-title">Greetings, fellow earthling.</h2><p>I'm Jonathan Grinstead, a full-stack software developer from the UK. I build intuitive web applications and enjoy music, photography, and travel.</p><p>Welcome to the slightly more intergalactic version of my portfolio. Have a look around — the internet is supposed to be fun.</p><a href="https://www.linkedin.com/in/jonathangrinstead/" target="_blank" rel="noopener noreferrer">Find me on LinkedIn ↗</a></div>
      <div class="window-content" v-else-if="selected === 'projects'"><span class="eyebrow">TRANSMISSION 001 · MSc COMPUTING, CARDIFF UNIVERSITY</span><h2 id="retro-projects-title">ACL-Insight</h2><p>A machine learning approach to diagnosing ACL injuries. My dissertation explores deep learning for knee MRI analysis, using three scan planes to help identify tears.</p><div class="tech-tags"><span>Python</span><span>PyTorch</span><span>DenseNet-121</span></div><p>Explore more of what I'm building in my <a href="https://github.com/jonathangrinstead" target="_blank" rel="noopener noreferrer">GitHub repositories ↗</a>.</p></div>
      <div class="window-content" v-else><h2 id="retro-toolbox-title">Tools for building worlds.</h2><p>A few of the languages, frameworks, and tools in my orbit:</p><div class="tech-tags"><span v-for="tool in ['Ruby', 'Rails', 'Vue', 'Python', 'JavaScript', 'TypeScript', 'Flask', 'Django', 'PyTorch', 'Sass', 'Tailwind', 'Java']" :key="tool">{{ tool }}</span></div></div>
    </section>
    <footer class="retro-footer">
      <div class="construction"><span aria-hidden="true">🚧</span> ALWAYS UNDER CONSTRUCTION <span aria-hidden="true">🚧</span></div>
      <p>Hand-coded on planet Earth. Best viewed with a sense of adventure.</p>
      <div class="web-badges"><span><b>100%</b> HUMAN IDEAS</span><span><b>WWW</b> WORLD WIDE WEIRD</span><span><b>1996</b> SPIRIT · MODERN CODE</span></div>
      <p class="credits">A love letter to the early web. Inspired by <a href="https://www.spacejam.com/1996/" target="_blank" rel="noopener noreferrer">Space Jam '96 ↗</a>.</p>
      <button class="footer-exit" @click="$emit('exit')">[ return to the present ]</button>
    </footer>
  </main>
</template>

<style scoped>
.retro-world { position: relative; isolation: isolate; min-height: 100%; overflow: hidden; padding: 0 24px 32px; background: radial-gradient(ellipse at 50% 40%,#15102b88,transparent 58%),#030309; color: #f0e9ff; font-family: 'Courier New',monospace; letter-spacing: 0; }
.starfield { position: absolute; inset: 0; z-index: -1; pointer-events: none; background-image: radial-gradient(circle,#b8c5df 0 .7px,transparent 1px),radial-gradient(circle,#b8c5df88 0 .6px,transparent 1px); background-size: 113px 127px,71px 83px; background-position: 31px 19px,13px 57px; }
.starfield i { position: absolute; background: white; box-shadow: 0 0 6px 1px #bdd7ff88; }
.starfield i:nth-child(9n)::after { content: '+'; position: absolute; top: -10px; left: -4px; font: 18px serif; color: #c3dbff; }
.retro-toolbar { display: flex; justify-content: space-between; align-items: center; gap: 16px; max-width: 1280px; margin: auto; padding: 22px 0; border-bottom: 1px solid #bcb2e52b; font-size: 10px; letter-spacing: 1.5px; color: #b5abc9; }
.retro-toolbar b { color: #b9f285; margin-right: 8px; }
.retro-toolbar button { color: #e8e2f7; border: 1px solid #766389; padding: 10px 14px; font: 11px 'Courier New',monospace; background: #21182b; box-shadow: 2px 2px #655476; }
.welcome { text-align: center; font-size: 10px; letter-spacing: 2px; color: #c3b3e0; margin: 30px 0 0; }
.universe { position: relative; width: min(100%, 930px); height: 610px; margin: 0 auto; }
.orbit { position: absolute; left: 17%; top: 15%; width: 66%; height: 73%; border: 1px dashed #9384b128; border-radius: 50%; transform: rotate(-22deg); }
.world-logo { position: absolute; top: 30%; left: 20%; width: 60%; text-align: center; transform: rotate(-7deg); }
.logo-kicker { font-size: 9px; letter-spacing: 4px; color: #ccbfdd; }
h1 { margin: 15px 0 4px; line-height: .86; outline-offset: 16px; }
h1 span { display: block; font: italic 900 clamp(34px,5vw,63px)/1 Georgia,serif; color: #f3e6b8; text-shadow: 2px 3px #7c426d,4px 5px #24183e; }
h1 strong { display: block; font: italic 1000 clamp(70px,10vw,122px)/.95 Impact,'Arial Black',sans-serif; letter-spacing: -4px; background: linear-gradient(#ffffcc 7%,#ecca66 25%,#f4fdcc 42%,#a7d8b6 45%,#71aab0 60%,#7279b1 79%,#d0c2ef 95%); background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(3px 4px 0 #573577) drop-shadow(1px 1px 0 #f5d790); }
.logo-tail { display: block; margin-top: 17px; color: #e0bf79; font-size: 10px; letter-spacing: 2px; }
.world-logo p { margin: 23px 0 0; font: italic 15px/1.5 Georgia,serif; color: #a99abd; }
.destination { position: absolute; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 13px; width: 170px; min-height: 130px; background: none; border: none; text-decoration: none; }
.planet-label { color: #e7e9a5; font: bold italic 17px Georgia,serif; text-shadow: 2px 2px #3a264f; white-space: nowrap; }
.planet { position: relative; display: grid; place-items: center; width: 80px; height: 80px; border-radius: 50%; box-shadow: inset -14px -11px 17px #0009,0 0 25px #8289fe20; transition: transform 220ms cubic-bezier(.23,1,.32,1); }
.about { left: 13%; top: 7%; transform: rotate(-8deg); }
.portrait { background: radial-gradient(circle at 35% 28%,#c3eab6,#537c80 55%,#28213e); }
.portrait img { width: 92px; max-width: none; height: 92px; object-fit: contain; transform: translateY(-5px); }
.projects { left: 51%; top: 2%; transform: rotate(7deg); }
.striped { background: repeating-linear-gradient(-25deg,#eaad57 0 8px,#c95d72 10px 16px,#764a8e 18px 21px); width: 94px; height: 94px; }
.new-badge { position: absolute; top: -7px; right: -27px; background: #d7f194; color: #202030; padding: 3px 7px; font: bold 10px monospace; transform: rotate(12deg); box-shadow: 2px 2px #664185; }
.toolbox { right: 0; top: 33%; transform: rotate(10deg); }
.saturn { background: radial-gradient(circle at 30% 25%,#cfc2fa,#8b75c7 45%,#363254); width: 80px; height: 80px; }
.planet-ring { position: absolute; width: 142px; height: 32px; border: 7px solid #b2d8a1; border-left-color: #5d958a; border-radius: 50%; transform: rotate(-30deg); box-shadow: 0 2px #456b63; }
.code { font: bold 23px monospace; z-index: 1; color: #f3ecff; text-shadow: 1px 2px #2b2041; }
.github { left: 0; top: 43%; transform: rotate(-9deg); }
.moon { background: radial-gradient(circle at 30% 26%,#dde5e9,#90a6ae 50%,#4a5266); width: 69px; height: 69px; color: #26374c; font: bold 30px monospace; }
.cv { left: 20%; bottom: 2%; transform: rotate(8deg); }
.disk { display: flex; position: relative; flex-direction: column; justify-content: flex-end; width: 70px; height: 77px; padding: 8px; color: #252141; background: #9582bd; border: 3px outset #b6a1d9; border-radius: 3px; box-shadow: 4px 5px #151122; }
.disk i { position: absolute; top: 0; left: 11px; width: 39px; height: 27px; background: linear-gradient(90deg,#c9ccd0 60%,#524b60 60% 80%,#b9bac6 80%); }
.disk b,.disk small { background: #f1e9cc; text-align: center; line-height: 16px; font-size: 10px; }
.contact { right: 16%; bottom: 4%; transform: rotate(-8deg); }
.envelope { font: 93px/.8 Georgia,serif; color: #dbc7ed; text-shadow: 3px 4px #7e5c9f; }
.space-note { position: absolute; font-size: 8px; line-height: 1.8; letter-spacing: 2px; color: #7d738f; }
.note-one { left: 2%; top: 21%; transform: rotate(-12deg); }.note-two { right: 1%; bottom: 12%; transform: rotate(9deg); }
.explore-hint { text-align: center; color: #a89cbf; font-size: 11px; letter-spacing: 1px; margin: 15px 0 30px; }
.info-window { max-width: 640px; margin: 25px auto 40px; border: 2px outset #8b7ea3; background: #151124; box-shadow: 6px 6px #000; scroll-margin: 20px; }
.window-bar { display: flex; align-items: center; justify-content: space-between; padding: 7px 10px; background: linear-gradient(90deg,#483875,#24204c); font-size: 11px; }
.window-bar button { width: 25px; height: 25px; border: 2px outset #d7cde8; color: #211b30; background: #bdb2cc; font: bold 19px/1 monospace; }
.window-content { padding: 26px; font: 15px/1.8 Georgia,serif; color: #d6cee5; }
.window-content h2 { margin: 0 0 13px; color: #e9e8a9; font: bold 28px/1.2 Georgia,serif; }.window-content p { margin: 12px 0; }
.window-content a,.credits a { color: #c4b2fc; text-decoration: underline; text-underline-offset: 3px; }
.eyebrow { display: block; font: 9px/1.8 monospace; letter-spacing: 1px; margin-bottom: 12px; }
.tech-tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 17px 0; }.tech-tags span { padding: 3px 9px; border: 1px solid #796990; font: 12px/1.8 monospace; color: #d0eeb4; }
.retro-footer { text-align: center; max-width: 930px; margin: auto; padding-top: 25px; border-top: 1px solid #bcb2e52b; font-size: 10px; color: #9f93b2; }
.construction { font-size: 9px; letter-spacing: 2px; color: #dbbd70; }.construction span { margin: 0 8px; }
.retro-footer p { margin-top: 15px; }.web-badges { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 20px; }.web-badges span { border: 2px outset #88759e; background: #1c1729; padding: 4px 7px; font: 8px monospace; color: #c7bdcf; }.web-badges b { color: #dfde9f; margin-right: 5px; }.credits { font-size: 9px; }.footer-exit { color: #dcccf4; margin-top: 18px; padding: 10px; font: 11px monospace; }
button:focus-visible,a:focus-visible,h1:focus-visible,.info-window:focus-visible { outline: 2px dashed #e6e99e; outline-offset: 6px; }
@media (hover:hover) { .destination:hover .planet { transform: translateY(-5px) rotate(8deg); }.destination:hover .planet-label { color: white; text-decoration: underline; }.retro-toolbar button:hover { background: #3b2b4c; } }
@media (max-width:650px) {
  .retro-world { padding-inline: 16px; }.retro-toolbar { font-size: 8px; letter-spacing: .5px; gap: 10px; }.retro-toolbar span { max-width: 145px; }.retro-toolbar button { font-size: 10px; padding: 9px; }.welcome { font-size: 8px; line-height: 1.8; letter-spacing: 1px; margin-top: 24px; }
  .universe { height: auto; display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 22px 8px; padding: 27px 0 12px; }.world-logo { position: relative; top: auto; left: auto; width: 100%; grid-column: 1 / -1; margin: 15px 0 30px; }.logo-kicker { font-size: 8px; letter-spacing: 2px; }h1 span { font-size: 45px; }h1 strong { font-size: 88px; }.logo-tail { font-size: 8px; letter-spacing: 1px; }.world-logo p { font-size: 13px; margin-top: 15px; }.destination { position: relative; inset: auto; width: 100%; min-height: 130px; }.planet-label { font-size: 15px; }.space-note,.orbit { display: none; }.construction { font-size: 8px; letter-spacing: 1px; }.construction span { margin: 0 2px; }.window-content { padding: 20px; }
}
@media (prefers-reduced-motion:reduce) { .planet { transition: none; } }
</style>
