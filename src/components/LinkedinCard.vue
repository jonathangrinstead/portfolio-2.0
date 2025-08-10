<template>
    <Card class="glass-card flex flex-col relative w-full h-full">
        <div class="flex items-center justify-center h-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
        </div>
        <a
            href="https://www.linkedin.com/in/jonathangrinstead/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open LinkedIn profile"
            class="absolute top-3 right-3 p-2 rounded-full border backdrop-blur shadow-md transition-all duration-200
                   bg-white/80 text-black border-white/60 hover:bg-white hover:scale-105 hover:-rotate-3
                   focus:outline-none focus:ring-2 focus:ring-black/20
                   dark:bg-black/60 dark:text-white dark:border-white/30 dark:hover:bg-black/70 dark:focus:ring-white/20"
        >
            <ExternalLink class="w-5 h-5" />
        </a>
    </Card>
</template>
<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { ExternalLink } from 'lucide-vue-next'
</script>
<style scoped>
.glass-card {
    cursor: default;
}
</style>