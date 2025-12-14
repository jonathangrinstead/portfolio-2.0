<template>
    <Card class="glass-card flex flex-col relative w-full h-full p-4">
        <div class="flex flex-col items-center justify-center flex-1 gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-[rgb(14,118,168)]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <div class="text-sm font-semibold leading-tight">LinkedIn</div>
            <div class="text-xs opacity-70 truncate">/in/jonathangrinstead</div>
        </div>

        <a
            :href="linkedInUrl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect on LinkedIn"
            class="mx-auto w-fit mb-1 px-4 py-2 rounded-full border backdrop-blur shadow-md transition-all duration-200
                   bg-white/80 text-black border-white/60 hover:bg-white hover:scale-105 hover:-rotate-2
                   focus:outline-none focus:ring-2 focus:ring-black/20
                   dark:bg-black/60 dark:text-white dark:border-white/30 dark:hover:bg-black/70 dark:focus:ring-white/20"
        >
            <span class="flex items-center gap-1.5">
                <span class="text-xs font-semibold">Connect</span>
                <Handshake class="w-4 h-4" />
            </span>
        </a>
    </Card>
</template>
<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { Handshake } from 'lucide-vue-next'

const linkedInUrl = 'https://www.linkedin.com/in/jonathangrinstead/'
</script>
<style scoped>
.glass-card {
    cursor: default;
}
</style>