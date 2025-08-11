<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { X } from "lucide-vue-next"
import {
  DialogClose,
  DialogContent,

  DialogPortal,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@/lib/utils"
import DialogOverlay from "./DialogOverlay.vue"

const props = defineProps<DialogContentProps & { class?: HTMLAttributes["class"], hideClose?: boolean }>()
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = reactiveOmit(props, "class", "hideClose")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay class="project-overlay-slow glass-overlay" />
    <DialogContent
      data-slot="dialog-content"
      v-bind="forwarded"
      :class="
        cn(
          'bg-background glass-dialog data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          props.class,
        )"
    >
      <slot />

      <DialogClose
        v-if="!props.hideClose"
        class="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
      >
        <X />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>

<style scoped>
/* Fullscreen expanding style for project card */
.project-expand {
  position: fixed !important;
  inset: 0 !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  max-width: none !important;
  transform: none !important;
  translate: none !important;
  border-radius: 0 !important;
  border: 0 !important;
  padding: 0 !important;
  box-shadow: none !important;
  overflow: hidden !important;
}

@keyframes project-expand-in {
  0% {
    opacity: 0;
    transform: scale(0.94);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes project-expand-out {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.94);
  }
}

/* Apply custom expand/collapse animation when using .project-expand */
.project-expand[data-state="open"] {
  animation: project-expand-in 500ms cubic-bezier(0.16, 1, 0.3, 1);
}
.project-expand[data-state="closed"] {
  animation: project-expand-out 420ms cubic-bezier(0.4, 0, 1, 1);
}
</style>

<style>
/* Global styles (non-scoped) so overlay/content can receive frosted backgrounds */
.glass-overlay {
  /* Light mode: very soft translucent sheet with blur */
  background:
    radial-gradient(1200px 800px at 50% 20%, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.15) 40%, transparent 70%),
    rgba(255, 255, 255, 0.35) !important;
  backdrop-filter: blur(14px) saturate(120%);
  -webkit-backdrop-filter: blur(14px) saturate(120%);
}
.dark .glass-overlay {
  /* Dark mode: darker acrylic fog */
  background:
    radial-gradient(1200px 800px at 50% 20%, rgba(17, 24, 39, 0.55), rgba(17, 24, 39, 0.35) 40%, transparent 70%),
    rgba(0, 0, 0, 0.45) !important;
  backdrop-filter: blur(16px) saturate(115%);
  -webkit-backdrop-filter: blur(16px) saturate(115%);
}

.glass-dialog {
  /* Light mode frosted content */
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.62), rgba(255, 255, 255, 0.38)) !important;
  border: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow:
    0 18px 64px rgba(16, 24, 40, 0.14),
    0 10px 28px rgba(16, 24, 40, 0.10),
    inset 0 1px 0 rgba(255, 255, 255, 0.65),
    inset 0 -1px 0 rgba(16, 24, 40, 0.04) !important;
  backdrop-filter: blur(24px) saturate(140%);
  -webkit-backdrop-filter: blur(24px) saturate(140%);
}
.dark .glass-dialog {
  background: rgba(255, 255, 255, 0.04) !important;
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow:
    0 22px 72px rgba(0, 0, 0, 0.44),
    0 12px 32px rgba(0, 0, 0, 0.30),
    inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
  backdrop-filter: blur(18px) saturate(120%);
  -webkit-backdrop-filter: blur(18px) saturate(120%);
}

/* Keep a subtle perimeter sheen similar to cards */
.glass-dialog::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.10)) border-box;
  -webkit-mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  padding: 1px;
  opacity: 0.85;
}
</style>