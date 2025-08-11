<template>
    <Card class="glass-card w-full h-full flex flex-col relative">
        <!-- Refresh button in top-right corner -->
        <button
            aria-label="Refresh quote"
            @click="fetchQuote"
            :disabled="isLoading"
            class="absolute top-3 right-3 z-10 p-2 rounded-full border backdrop-blur shadow-md transition-all duration-200
                   bg-white/80 text-black border-white/60 hover:bg-white hover:scale-105 hover:-rotate-3
                   focus:outline-none focus:ring-2 focus:ring-black/20
                   disabled:opacity-50 disabled:cursor-not-allowed
                   dark:bg-black/60 dark:text-white dark:border-white/30 dark:hover:bg-black/70 dark:focus:ring-white/20"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                :class="{ 'rotate-360': isLoading }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
            </svg>
        </button>

        <CardHeader class="flex-grow overflow-y-auto pr-12">
            <div class="min-h-0">
                <Transition name="fade" mode="out-in">
                    <div :key="quote">
                        <CardTitle class="text-2xl font-serif italic">"{{ quote }}"</CardTitle>
                        <CardDescription class="text-right mt-4">- {{ author }}</CardDescription>
                    </div>
                </Transition>
            </div>
        </CardHeader>
    </Card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
    Card,
    CardHeader,
    CardTitle, 
    CardDescription
} from "@/components/ui/card"

const quote = ref('');
const author = ref('');
const isLoading = ref(false);

const fetchQuote = async () => {
    const startedAt = Date.now();
    try {
        isLoading.value = true;
        const response = await fetch('/api/quotes');
        const data = await response.json();
        quote.value = data.quote;
        author.value = data.author;
    } catch (error) {
        console.error('Failed to fetch quote:', error);
    } finally {
        const elapsed = Date.now() - startedAt;
        const minimumMs = 500;
        const stop = () => { isLoading.value = false; };
        if (elapsed < minimumMs) setTimeout(stop, minimumMs - elapsed); else stop();
    }
}

onMounted(() => {
    fetchQuote();
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@keyframes spin360 {
  to { transform: rotate(360deg); }
}

.rotate-360 {
  animation: spin360 1.2s linear infinite;
}
</style>