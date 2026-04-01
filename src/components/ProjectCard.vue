<template>
  <Dialog v-model:open="isOpen">
    <!-- Card face (unchanged) -->
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

    <!-- Fullscreen presentation -->
    <DialogContent class="project-expand" :hide-close="true">
      <div
        ref="presEl"
        class="acl-pres"
        tabindex="0"
        @keydown="handleKey"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <!-- Close -->
        <div class="absolute top-4 left-1/2 -translate-x-1/2 z-50">
          <DialogClose as-child>
            <Button variant="outline" size="icon" class="rounded-full w-10 h-10 shadow-md backdrop-blur cursor-pointer p-0">
              <X class="w-5 h-5" />
              <span class="sr-only">Close</span>
            </Button>
          </DialogClose>
        </div>

        <!-- Slides -->
        <Transition :name="transitionName" mode="out-in">

          <!-- 0 · Hero -->
          <div v-if="slide === 0" key="s0" class="slide">
            <div class="slide-inner">
              <div class="reveal"><Brain class="w-16 h-16 text-blue-500 mx-auto mb-6 hero-pulse" /></div>
              <h1 class="reveal rd1 text-5xl sm:text-6xl font-bold tracking-tight">
                <span class="acl-gradient">ACL-Insight</span>
              </h1>
              <p class="reveal rd2 text-xl sm:text-2xl text-muted-foreground mt-4 max-w-lg mx-auto">
                Deep Learning for ACL Injury Detection
              </p>
              <p class="reveal rd3 text-sm text-muted-foreground/60 mt-3">
                MSc Computing Dissertation · Cardiff University
              </p>
              <div class="reveal rd4 mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground/50">
                <ChevronRight class="w-4 h-4 bounce-x" />
                <span>Tap or press → to explore</span>
              </div>
            </div>
          </div>

          <!-- 1 · The Story -->
          <div v-else-if="slide === 1" key="s1" class="slide">
            <div class="slide-inner">
              <div class="reveal"><Clock class="w-12 h-12 text-red-400 mx-auto mb-4" /></div>
              <h2 class="reveal rd1 text-4xl sm:text-5xl font-bold"><span class="text-red-400">6+ Weeks</span></h2>
              <p class="reveal rd2 text-lg text-muted-foreground mt-2">Average NHS wait for an MRI diagnosis</p>
              <blockquote class="reveal rd3 mt-8 max-w-md mx-auto border-l-4 border-blue-500/40 pl-4 text-left italic text-muted-foreground">
                "After fully tearing my ACL during sport, I waited more than six weeks following my MRI scan before receiving an official diagnosis through the NHS."
              </blockquote>
              <p class="reveal rd4 text-sm text-muted-foreground/60 mt-4">- The motivation behind this project</p>
            </div>
          </div>

          <!-- 2 · What is an ACL? -->
          <div v-else-if="slide === 2" key="s2" class="slide">
            <div class="slide-inner">
              <h2 class="reveal text-3xl sm:text-4xl font-bold">What is an <span class="text-blue-500">ACL</span>?</h2>
              <p class="reveal rd1 text-muted-foreground mt-2 max-w-lg mx-auto">
                The Anterior Cruciate Ligament - a critical stabiliser inside your knee
              </p>
              <div class="reveal rd2 mt-8 flex justify-center">
                <div class="knee-diagram">
                  <div class="bone femur">Femur</div>
                  <div class="lig acl-lig">ACL</div>
                  <div class="lig pcl-lig">PCL</div>
                  <div class="bone tibia">Tibia</div>
                </div>
              </div>
              <div class="reveal rd3 mt-8 grid grid-cols-3 gap-4 max-w-xs mx-auto text-center">
                <div class="stat-pill"><span class="text-2xl">⚽</span><span class="text-[10px] text-muted-foreground">Football</span></div>
                <div class="stat-pill"><span class="text-2xl">🏀</span><span class="text-[10px] text-muted-foreground">Basketball</span></div>
                <div class="stat-pill"><span class="text-2xl">⛷️</span><span class="text-[10px] text-muted-foreground">Skiing</span></div>
              </div>
              <p class="reveal rd4 text-sm text-muted-foreground/70 mt-6 max-w-md mx-auto">
                70-80% of ACL tears happen <strong>without contact</strong> - sudden stops, pivots, or bad landings
              </p>
            </div>
          </div>

          <!-- 3 · The Idea -->
          <div v-else-if="slide === 3" key="s3" class="slide">
            <div class="slide-inner">
              <h2 class="reveal text-3xl sm:text-4xl font-bold">The <span class="text-purple-500">Idea</span></h2>
              <p class="reveal rd1 text-muted-foreground mt-2 max-w-lg mx-auto">
                What if AI could read knee MRI scans and flag ACL tears instantly?
              </p>
              <div class="reveal rd2 mt-8 mri-planes">
                <div class="mri-plane">
                  <div class="plane-box sagittal">S</div>
                  <span class="text-xs mt-1 text-muted-foreground">Sagittal</span>
                  <span class="text-[10px] text-muted-foreground/50">Side view</span>
                </div>
                <div class="mri-plane">
                  <div class="plane-box coronal">C</div>
                  <span class="text-xs mt-1 text-muted-foreground">Coronal</span>
                  <span class="text-[10px] text-muted-foreground/50">Front view</span>
                </div>
                <div class="mri-plane">
                  <div class="plane-box axial">A</div>
                  <span class="text-xs mt-1 text-muted-foreground">Axial</span>
                  <span class="text-[10px] text-muted-foreground/50">Top-down</span>
                </div>
              </div>
              <p class="reveal rd3 text-sm text-muted-foreground mt-6 max-w-md mx-auto">
                Each MRI study captures the knee from <strong>3 different angles</strong> - the model processes all three for a complete picture
              </p>
              <div class="reveal rd4 mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium">
                <Database class="w-4 h-4" />
                1,370 MRI studies from Stanford University
              </div>
            </div>
          </div>

          <!-- 4 · How It Works -->
          <div v-else-if="slide === 4" key="s4" class="slide">
            <div class="slide-inner">
              <h2 class="reveal text-3xl sm:text-4xl font-bold">How It <span class="text-blue-500">Works</span></h2>
              <p class="reveal rd1 text-sm text-muted-foreground mt-1">Multi-Plane CNN Architecture</p>
              <div class="reveal rd2 pipeline mt-8">
                <div class="pipe-stage">
                  <div class="pipe-node input-node"><Eye class="w-5 h-5" /></div>
                  <span class="pipe-label">MRI Scan</span>
                </div>
                <span class="pipe-arrow">→</span>
                <div class="pipe-stage pipe-branches">
                  <div class="branch"><div class="pipe-node sag-node">S</div><span class="pipe-label">DenseNet</span></div>
                  <div class="branch"><div class="pipe-node cor-node">C</div><span class="pipe-label">DenseNet</span></div>
                  <div class="branch"><div class="pipe-node axi-node">A</div><span class="pipe-label">DenseNet</span></div>
                </div>
                <span class="pipe-arrow">→</span>
                <div class="pipe-stage">
                  <div class="pipe-node merge-node"><Layers class="w-5 h-5" /></div>
                  <span class="pipe-label">Merge</span>
                </div>
                <span class="pipe-arrow">→</span>
                <div class="pipe-stage">
                  <div class="pipe-node result-node"><Activity class="w-5 h-5" /></div>
                  <span class="pipe-label">Tear?</span>
                </div>
              </div>
              <div class="reveal rd3 mt-6 flex flex-wrap justify-center gap-2">
                <span class="tech-tag">PyTorch</span>
                <span class="tech-tag">DenseNet-121</span>
                <span class="tech-tag">~24M Parameters</span>
                <span class="tech-tag">Apple MPS</span>
              </div>
              <p class="reveal rd4 text-xs text-muted-foreground/50 mt-4">Trained on a MacBook Pro M4 · 10 epochs · ~5 hours total</p>
            </div>
          </div>

          <!-- 5 · Results -->
          <div v-else-if="slide === 5" key="s5" class="slide">
            <div class="slide-inner">
              <h2 class="reveal text-3xl sm:text-4xl font-bold">The <span class="text-green-500">Results</span></h2>
              <p class="reveal rd1 text-sm text-muted-foreground mt-1">Validated on 120 unseen MRI studies</p>
              <div class="reveal rd2 mt-8 grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <div class="result-card"><span class="result-num text-blue-500">{{ st.accuracy }}%</span><span class="result-lbl">Accuracy</span></div>
                <div class="result-card"><span class="result-num text-purple-500">{{ st.precision }}%</span><span class="result-lbl">Precision</span></div>
                <div class="result-card"><span class="result-num text-pink-500">{{ st.recall }}%</span><span class="result-lbl">Recall</span></div>
                <div class="result-card"><span class="result-num text-green-500">{{ st.f1 }}%</span><span class="result-lbl">F1-Score</span></div>
              </div>
              <div class="reveal rd3 mt-6 conf-grid max-w-[220px] mx-auto">
                <div class="conf-cell conf-tn">62<span>True Neg</span></div>
                <div class="conf-cell conf-fp">4<span>False Pos</span></div>
                <div class="conf-cell conf-fn">6<span>False Neg</span></div>
                <div class="conf-cell conf-tp">48<span>True Pos</span></div>
              </div>
              <p class="reveal rd4 text-xs text-muted-foreground/60 mt-4">110 out of 120 cases correctly classified</p>
            </div>
          </div>

          <!-- 6 · Prototype -->
          <div v-else-if="slide === 6" key="s6" class="slide">
            <div class="slide-inner">
              <h2 class="reveal text-3xl sm:text-4xl font-bold">The <span class="text-blue-500">Prototype</span></h2>
              <p class="reveal rd1 text-muted-foreground mt-2 max-w-lg mx-auto">Beyond just a model - a working clinical interface</p>
              <div class="reveal rd2 mt-8 proto-flow">
                <div class="proto-step">
                  <div class="proto-icon"><Upload class="w-6 h-6" /></div>
                  <span class="text-sm font-medium">Upload</span>
                  <span class="text-[10px] text-muted-foreground">MRI scan (.npy)</span>
                </div>
                <span class="proto-arrow">→</span>
                <div class="proto-step">
                  <div class="proto-icon"><Cpu class="w-6 h-6" /></div>
                  <span class="text-sm font-medium">Process</span>
                  <span class="text-[10px] text-muted-foreground">Multi-plane CNN</span>
                </div>
                <span class="proto-arrow">→</span>
                <div class="proto-step">
                  <div class="proto-icon"><CheckCircle2 class="w-6 h-6" /></div>
                  <span class="text-sm font-medium">Result</span>
                  <span class="text-[10px] text-muted-foreground">In 1-2 seconds</span>
                </div>
              </div>
              <div class="reveal rd3 mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-blue-600/10 border border-blue-500/20">
                <div class="nhs-badge">NHS</div>
                <span class="text-sm text-muted-foreground">Built with the NHS Design System for clinical familiarity</span>
              </div>
              <div class="reveal rd4 mt-4 flex flex-wrap justify-center gap-2">
                <span class="tech-tag">Flask</span>
                <span class="tech-tag">PyTorch</span>
                <span class="tech-tag">Jinja2</span>
                <span class="tech-tag">NHS UI</span>
              </div>
            </div>
          </div>

          <!-- 7 · What's Next -->
          <div v-else-if="slide === 7" key="s7" class="slide">
            <div class="slide-inner">
              <h2 class="reveal text-3xl sm:text-4xl font-bold">What's <span class="acl-gradient">Next</span></h2>
              <div class="reveal rd1 mt-8 max-w-md mx-auto space-y-4 text-left">
                <div class="insight-row"><CheckCircle2 class="w-5 h-5 text-green-500 shrink-0" /><span>Strong on clear-cut tears - <strong>91.67% accuracy</strong></span></div>
                <div class="insight-row"><AlertTriangle class="w-5 h-5 text-yellow-500 shrink-0" /><span>Struggles with subtle or partial tears</span></div>
                <div class="insight-row"><Shield class="w-5 h-5 text-blue-500 shrink-0" /><span>Best used as a <strong>clinical aide</strong>, not a replacement</span></div>
                <div class="insight-row"><TrendingUp class="w-5 h-5 text-purple-500 shrink-0" /><span>More data + 3D models = even better accuracy</span></div>
              </div>
              <div class="reveal rd2 mt-8 p-4 rounded-2xl bg-foreground/5 max-w-md mx-auto">
                <p class="text-sm text-muted-foreground italic">
                  "Technical progress alone is not enough. Reliable clinical tools need larger datasets, thorough evaluation, and careful attention to how clinicians actually interact with diagnostic systems."
                </p>
              </div>
              <p class="reveal rd3 text-sm text-muted-foreground/60 mt-6">
                Supervised by Dr. Paddy Slator · Cardiff University · 2025
              </p>
            </div>
          </div>
        </Transition>

        <!-- Navigation bar -->
        <div class="nav-bar">
          <button @click="prev" :disabled="slide === 0" class="nav-btn" aria-label="Previous slide">
            <ChevronLeft class="w-5 h-5" />
          </button>
          <div class="nav-dots">
            <button
              v-for="i in TOTAL"
              :key="i"
              @click="goTo(i - 1)"
              :class="['nav-dot', { active: slide === i - 1 }]"
              :aria-label="`Slide ${i}`"
            />
          </div>
          <button @click="next" :disabled="slide === TOTAL - 1" class="nav-btn" aria-label="Next slide">
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>
        <div class="slide-counter">{{ slide + 1 }} / {{ TOTAL }}</div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onUnmounted, nextTick } from 'vue'
import {
  Brain, Maximize2, X, Clock, ChevronLeft, ChevronRight, Database,
  Eye, Layers, Activity, Upload, Cpu, CheckCircle2, AlertTriangle,
  Shield, TrendingUp
} from 'lucide-vue-next'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger, DialogContent, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const TOTAL = 8
const isOpen = ref(false)
const slide = ref(0)
const transitionName = ref('slide-left')
const presEl = ref<HTMLElement | null>(null)

// Animated stats
const st = reactive({ accuracy: '0.00', precision: '0.00', recall: '0.00', f1: '0.00' })
let statsRan = false
const frames: number[] = []

function animNum(target: number, key: keyof typeof st, dec: number, delay: number) {
  setTimeout(() => {
    const dur = 1400
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      st[key] = (e * target).toFixed(dec)
      if (p < 1) frames.push(requestAnimationFrame(tick))
    }
    frames.push(requestAnimationFrame(tick))
  }, delay)
}

function next() { if (slide.value < TOTAL - 1) { transitionName.value = 'slide-left'; slide.value++ } }
function prev() { if (slide.value > 0) { transitionName.value = 'slide-right'; slide.value-- } }
function goTo(n: number) { transitionName.value = n > slide.value ? 'slide-left' : 'slide-right'; slide.value = n }

function handleKey(e: KeyboardEvent) {
  if (e.key === 'ArrowRight') { e.preventDefault(); next() }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
}

let touchX = 0
function onTouchStart(e: TouchEvent) { touchX = e.touches[0].clientX }
function onTouchEnd(e: TouchEvent) {
  const dx = e.changedTouches[0].clientX - touchX
  if (Math.abs(dx) > 50) { dx < 0 ? next() : prev() }
}

watch(isOpen, async (open) => {
  if (open) {
    slide.value = 0; statsRan = false
    st.accuracy = '0.00'; st.precision = '0.00'; st.recall = '0.00'; st.f1 = '0.00'
    await nextTick()
    presEl.value?.focus()
  }
})

watch(slide, (s) => {
  if (s === 5 && !statsRan) {
    statsRan = true
    animNum(91.67, 'accuracy', 2, 300)
    animNum(92.31, 'precision', 2, 500)
    animNum(88.89, 'recall', 2, 700)
    animNum(90.57, 'f1', 2, 900)
  }
})

onUnmounted(() => frames.forEach(id => cancelAnimationFrame(id)))
</script>

<style scoped>
/* ── Presentation shell ── */
.acl-pres {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: none;
  background: var(--background);
}

/* ── Slide layout ── */
.slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem 5rem;
}
.slide-inner {
  text-align: center;
  max-width: 640px;
  width: 100%;
}

/* ── Slide transitions ── */
.slide-left-enter-active, .slide-left-leave-active,
.slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-left-enter-from  { opacity: 0; transform: translateX(80px); }
.slide-left-leave-to    { opacity: 0; transform: translateX(-80px); }
.slide-right-enter-from { opacity: 0; transform: translateX(-80px); }
.slide-right-leave-to   { opacity: 0; transform: translateX(80px); }

/* ── Reveal animation ── */
.reveal { animation: revealUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
.rd1 { animation-delay: 0.08s; }
.rd2 { animation-delay: 0.16s; }
.rd3 { animation-delay: 0.26s; }
.rd4 { animation-delay: 0.38s; }
@keyframes revealUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Gradient text ── */
.acl-gradient {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Hero animations ── */
.hero-pulse { animation: pulse 2s ease-in-out infinite; }
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50%      { transform: scale(1.08); opacity: 1; }
}
.bounce-x { animation: bounceX 1.5s ease-in-out infinite; }
@keyframes bounceX {
  0%, 100% { transform: translateX(0); }
  50%      { transform: translateX(6px); }
}

/* ── Navigation ── */
.nav-bar {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 40;
}
.nav-dots { display: flex; gap: 0.5rem; }
.nav-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--muted-foreground); opacity: 0.25;
  transition: all 0.3s ease; cursor: pointer; border: none; padding: 0;
}
.nav-dot.active {
  opacity: 1; width: 24px; border-radius: 4px;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
}
.nav-btn {
  display: flex; align-items: center; justify-content: center;
  width: 36px; height: 36px; border-radius: 50%;
  border: 1px solid var(--border); background: transparent;
  color: var(--foreground); cursor: pointer; transition: all 0.2s; opacity: 0.6;
}
.nav-btn:hover:not(:disabled) { opacity: 1; background: var(--accent); }
.nav-btn:disabled { opacity: 0.15; cursor: default; }
.slide-counter {
  position: absolute; bottom: 0.5rem; left: 50%; transform: translateX(-50%);
  font-size: 0.65rem; color: var(--muted-foreground); opacity: 0.35;
}

/* ── Knee diagram ── */
.knee-diagram { position: relative; width: 160px; height: 200px; margin: 0 auto; }
.bone {
  position: absolute; width: 100px; height: 48px; border-radius: 1rem;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.7rem; font-weight: 600; left: 50%; transform: translateX(-50%);
  background: linear-gradient(135deg, rgba(59,130,246,0.12), rgba(59,130,246,0.04));
  border: 1px solid rgba(59,130,246,0.25); color: #3b82f6;
}
.femur { top: 0; }
.tibia { bottom: 0; }
.lig {
  position: absolute; left: 50%; top: 50%;
  font-size: 0.6rem; font-weight: 700;
  padding: 0.2rem 0.5rem; border-radius: 0.5rem;
}
.acl-lig {
  transform: translate(-80%, -50%) rotate(-15deg);
  background: linear-gradient(135deg, #ef4444, #f97316); color: white;
  animation: aclGlow 2s ease-in-out infinite;
}
.pcl-lig {
  transform: translate(20%, -50%) rotate(15deg);
  background: rgba(156,163,175,0.15); color: var(--muted-foreground);
  border: 1px solid rgba(156,163,175,0.25);
}
@keyframes aclGlow {
  0%, 100% { box-shadow: 0 0 8px rgba(239,68,68,0.25); }
  50%      { box-shadow: 0 0 20px rgba(239,68,68,0.45); }
}

/* ── Stat pills ── */
.stat-pill {
  display: flex; flex-direction: column; align-items: center; gap: 0.2rem;
  padding: 0.6rem; border-radius: 1rem;
  background: var(--accent); border: 1px solid var(--border);
}

/* ── MRI planes ── */
.mri-planes { display: flex; justify-content: center; gap: 1.5rem; }
.mri-plane { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }
.plane-box {
  width: 76px; height: 76px; border-radius: 1rem;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.4rem; font-weight: 700; color: white;
  transition: transform 0.3s;
}
.plane-box:hover { transform: scale(1.06) rotate(-2deg); }
.sagittal { background: linear-gradient(135deg, #3b82f6, #6366f1); }
.coronal  { background: linear-gradient(135deg, #8b5cf6, #a855f7); }
.axial    { background: linear-gradient(135deg, #ec4899, #f43f5e); }

/* ── Pipeline diagram ── */
.pipeline {
  display: flex; align-items: center; justify-content: center;
  gap: 0.6rem; flex-wrap: wrap; max-width: 600px; margin: 0 auto;
}
.pipe-stage { display: flex; flex-direction: column; align-items: center; gap: 0.2rem; }
.pipe-node {
  width: 44px; height: 44px; border-radius: 0.75rem;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid var(--border); background: var(--accent); color: var(--foreground);
}
.input-node  { background: linear-gradient(135deg, rgba(59,130,246,0.12), rgba(59,130,246,0.04)); color: #3b82f6; }
.merge-node  { background: linear-gradient(135deg, rgba(139,92,246,0.12), rgba(139,92,246,0.04)); color: #8b5cf6; }
.result-node { background: linear-gradient(135deg, rgba(34,197,94,0.12), rgba(34,197,94,0.04)); color: #22c55e; }
.sag-node { background: linear-gradient(135deg, #3b82f6, #6366f1); color: white; font-weight: 700; font-size: 0.85rem; }
.cor-node { background: linear-gradient(135deg, #8b5cf6, #a855f7); color: white; font-weight: 700; font-size: 0.85rem; }
.axi-node { background: linear-gradient(135deg, #ec4899, #f43f5e); color: white; font-weight: 700; font-size: 0.85rem; }
.pipe-branches { display: flex; gap: 0.4rem; }
.branch { display: flex; flex-direction: column; align-items: center; gap: 0.2rem; }
.pipe-arrow { font-size: 1.2rem; color: var(--muted-foreground); opacity: 0.3; }
.pipe-label { font-size: 0.65rem; color: var(--muted-foreground); }

/* ── Tech tags ── */
.tech-tag {
  display: inline-block; padding: 0.2rem 0.65rem; border-radius: 9999px;
  font-size: 0.7rem; background: var(--accent); border: 1px solid var(--border);
  color: var(--muted-foreground);
}

/* ── Result cards ── */
.result-card {
  display: flex; flex-direction: column; align-items: center;
  padding: 1rem; border-radius: 1.25rem;
  background: var(--accent); border: 1px solid var(--border);
}
.result-num {
  font-size: 1.75rem; font-weight: 700;
  font-variant-numeric: tabular-nums; line-height: 1;
}
.result-lbl { font-size: 0.7rem; color: var(--muted-foreground); margin-top: 0.2rem; }

/* ── Confusion matrix ── */
.conf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; }
.conf-cell {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 0.6rem; border-radius: 0.6rem; font-weight: 700; font-size: 1.1rem;
}
.conf-cell span { font-size: 0.5rem; font-weight: 400; opacity: 0.6; margin-top: 0.1rem; }
.conf-tn { background: rgba(34,197,94,0.08); color: #22c55e; }
.conf-fp { background: rgba(239,68,68,0.08); color: #ef4444; }
.conf-fn { background: rgba(239,68,68,0.08); color: #ef4444; }
.conf-tp { background: rgba(34,197,94,0.08); color: #22c55e; }

/* ── Prototype flow ── */
.proto-flow { display: flex; align-items: center; justify-content: center; gap: 1rem; }
.proto-step { display: flex; flex-direction: column; align-items: center; gap: 0.2rem; }
.proto-icon {
  width: 52px; height: 52px; border-radius: 1rem;
  display: flex; align-items: center; justify-content: center;
  background: var(--accent); border: 1px solid var(--border); color: #3b82f6;
}
.proto-arrow { color: var(--muted-foreground); opacity: 0.3; font-size: 1.2rem; }

/* ── NHS badge ── */
.nhs-badge {
  background: #005eb8; color: white;
  font-weight: 700; font-size: 0.85rem;
  padding: 0.2rem 0.5rem; border-radius: 0.35rem;
}

/* ── Insight rows (What's Next) ── */
.insight-row {
  display: flex; align-items: flex-start; gap: 0.75rem;
  font-size: 0.9rem; color: var(--foreground);
}

/* ── Mobile adjustments ── */
@media (max-width: 480px) {
  .pipeline { gap: 0.4rem; }
  .pipe-node { width: 36px; height: 36px; }
  .pipe-node svg { width: 16px; height: 16px; }
  .proto-flow { gap: 0.5rem; }
  .proto-icon { width: 44px; height: 44px; }
  .mri-planes { gap: 1rem; }
  .plane-box { width: 60px; height: 60px; font-size: 1.1rem; }
  .result-num { font-size: 1.35rem; }
  .slide { padding: 3.5rem 1rem 4.5rem; }
}
</style>
