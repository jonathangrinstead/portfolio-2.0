<script setup lang="ts">
defineEmits<{ activate: [] }>()
</script>

<template>
  <button id="retro-trigger" class="retro-card" @click="$emit('activate')" aria-label="90s-ify: enter the retro portfolio">
    <span class="card-top"><span>TIME MACHINE</span><span class="live-dot">● CH 96</span></span>
    <span class="television" aria-hidden="true">
      <span class="tv-screen"><span class="channel">AV 1</span><strong>90s<span>-ify</span></strong><span class="screen-caption">BE KIND. REWIND.</span></span>
      <span class="tv-controls"><i></i><i></i><span>▥</span><b>●</b></span>
    </span>
    <span class="card-bottom"><span>Take the internet back.</span><span class="power">⏻</span></span>
  </button>
</template>

<style scoped>
.retro-card { width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between; gap: 12px; padding: 22px; border-radius: 20px; border: 1px solid #574a70; color: #eae3f8; background: radial-gradient(ellipse at 50% 45%, #49345c, #211b2e 75%); text-align: left; box-shadow: inset 0 1px #ffffff25, 0 10px 30px #0002; transition: transform 180ms cubic-bezier(.23,1,.32,1); }
.card-top,.card-bottom { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.card-top { font: 10px 'Courier New', monospace; letter-spacing: 2px; color: #c5b4d5; }
.live-dot { color: #c4fa8b; white-space: nowrap; letter-spacing: 0; }
.television { display: flex; align-self: center; width: min(100%, 280px); height: 150px; padding: 10px; gap: 10px; background: linear-gradient(145deg,#c8c3b2,#777264); border: 3px solid #38372f; border-radius: 17px; box-shadow: 7px 9px 0 #100c19, inset 2px 2px #fff7; transform: rotate(-4deg); transition: transform 220ms cubic-bezier(.23,1,.32,1); }
.tv-screen { position: relative; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; border: 5px solid #26282a; border-radius: 45% / 12%; color: #d4ff9a; background: repeating-linear-gradient(0deg,#0003 0 1px,transparent 1px 3px),radial-gradient(ellipse,#34453e,#101b1b); text-shadow: 0 0 9px #9efc7580; }
.tv-screen strong { font: italic 900 36px Georgia,serif; letter-spacing: -3px; }
.tv-screen strong span { color: #f1b8f1; }
.channel { position: absolute; top: 6px; left: 8px; font: 9px monospace; }
.screen-caption { margin-top: 8px; font: 7px monospace; letter-spacing: 2px; }
.tv-controls { width: 20px; display: flex; flex-direction: column; align-items: center; gap: 9px; color: #3c3b34; }
.tv-controls i { width: 17px; height: 17px; border-radius: 50%; border: 3px solid #414137; background: #8e8c7c; }
.tv-controls b { color: #a0ec77; font-size: 9px; }
.card-bottom { font-size: 13px; color: #d4c5e4; }
.power { font-size: 23px; color: #c4fa8b; }
.retro-card:focus-visible { outline: 3px solid #a78bfa; outline-offset: 4px; }
.retro-card:active { transform: scale(.98); }
@media (hover:hover) { .retro-card:hover .television { transform: rotate(0deg) translateY(-3px); } }
@media (prefers-reduced-motion:reduce) { .retro-card,.television { transition: none; } }
</style>
