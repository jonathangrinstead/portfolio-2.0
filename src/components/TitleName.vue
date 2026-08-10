<template>
  <h1 class="nameplate">
    <span>Jonathan Grinstead</span>
    <span class="wave" aria-hidden="true">👋</span>
  </h1>
</template>

<style scoped>
  .nameplate {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: clamp(2rem, 4vw, 2.75rem);
    font-weight: 750;
    line-height: 0.98;
    letter-spacing: -0.045em;
    font-optical-sizing: auto;
    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .wave {
    font-size: 0.82em;
    letter-spacing: 0;
  }

  @media (max-width: 479px) {
    .nameplate {
      max-width: 14rem;
      flex-wrap: wrap;
      gap: 0.2rem 0.4rem;
    }
  }
</style>
