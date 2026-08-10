<template>
  <div class="role-lockup">
    <p class="role">Full-stack software developer</p>
    <p class="specialism">Ruby on Rails · Python · Vue.js</p>
  </div>
</template>

<style scoped>
  .role-lockup {
    display: grid;
    gap: 0.15rem;
  }

  .role {
    font-size: clamp(1rem, 1.7vw, 1.125rem);
    font-weight: 570;
    line-height: 1.3;
    letter-spacing: -0.012em;
  }

  .specialism {
    color: var(--muted-foreground);
    font-size: 0.78rem;
    font-weight: 540;
    letter-spacing: 0.015em;
  }

  @media (max-width: 479px) {
    .specialism {
      display: none;
    }
  }
</style>
