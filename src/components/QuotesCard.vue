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
            <RefreshCw class="w-5 h-5" :class="{ 'rotate-360': isLoading }" />
        </button>

        <CardHeader class="flex-grow overflow-y-auto pr-12">
            <div class="min-h-0">
                <Transition name="fade" mode="out-in">
                    <div v-if="error" :key="'error'" class="flex flex-col items-center justify-center h-full gap-1 text-center">
                        <p class="text-sm text-red-500 dark:text-red-400">Failed to load quote</p>
                        <p class="text-xs text-muted-foreground">Tap refresh to try again.</p>
                    </div>
                    <div v-else :key="quote">
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
import { RefreshCw } from 'lucide-vue-next';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card"

const quote = ref('');
const author = ref('');
const isLoading = ref(false);
const error = ref(false);

const fetchQuote = async () => {
    const startedAt = Date.now();
    try {
        isLoading.value = true;
        error.value = false;
        const response = await fetch('/api/quotes');
        const data = await response.json();
        quote.value = data.quote;
        author.value = data.author;
    } catch (err) {
        console.error('Failed to fetch quote:', err);
        error.value = true;
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