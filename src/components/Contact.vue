<script setup lang="ts">
import { Mail } from 'lucide-vue-next'
</script>

<template>
  <a
    class="contact-button"
    href="mailto:jonathangrinstead@hey.com"
    aria-label="Email Jonathan Grinstead"
  >
    <Mail class="h-4 w-4" aria-hidden="true" />
    <span>Let's talk</span>
  </a>
</template>

<style scoped>
  .contact-button {
    display: inline-flex;
    min-height: 2.75rem;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.65rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.62);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.62);
    box-shadow: 0 8px 24px rgba(16, 24, 40, 0.09), inset 0 1px 0 rgba(255, 255, 255, 0.78);
    backdrop-filter: blur(18px) saturate(160%);
    -webkit-backdrop-filter: blur(18px) saturate(160%);
    color: var(--foreground);
    font-size: 0.875rem;
    font-weight: 650;
    letter-spacing: -0.01em;
    text-decoration: none;
    transition: transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1), background-color 180ms ease, box-shadow 180ms ease;
  }

  .contact-button:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.78);
    box-shadow: 0 12px 30px rgba(16, 24, 40, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9);
  }

  .contact-button:active {
    transform: scale(0.96);
    transition-duration: 90ms;
  }

  .contact-button:focus-visible {
    outline: 3px solid color-mix(in oklab, #3b82f6 42%, transparent);
    outline-offset: 3px;
  }

  :global(.dark) .contact-button {
    border-color: rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }

  @media (max-width: 479px) {
    .contact-button {
      width: 2.75rem;
      padding-inline: 0;
    }

    .contact-button span {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  }
</style>
