<template>
    <Card class="glass-card h-[300px] w-[400px] flex flex-col relative">
        <!-- Refresh button in top-right corner -->
        <button 
            class="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 z-10 cursor-pointer"
            @click="fetchQuote"
            :disabled="isLoading"
            :class="{'opacity-50 cursor-not-allowed': isLoading}"
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 transition-transform duration-500"
                :class="{'rotate-360': isLoading}"
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
    try {
        isLoading.value = true;
        const response = await fetch('http://localhost:3001/api/quotes');
        const data = await response.json();
        quote.value = data.quote;
        author.value = data.author;
    } catch (error) {
        console.error('Failed to fetch quote:', error);
    } finally {
        isLoading.value = false;
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

.rotate-360 {
    transform: rotate(360deg);
}
</style>