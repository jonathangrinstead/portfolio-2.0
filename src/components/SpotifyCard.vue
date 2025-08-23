<template>
    <Card class="glass-card flex flex-col relative w-full h-full overflow-hidden">
        <div class="flex flex-col h-full">
            <!-- Loading state -->
            <div v-if="isFetching" class="flex flex-col items-center justify-center flex-1 p-4">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <p class="text-sm text-gray-500 mt-2">Loading...</p>
            </div>
            
            <!-- Error state -->
            <div v-else-if="error" class="flex flex-col items-center justify-center flex-1 p-4">
                <p class="text-red-500 text-sm">Failed to load Spotify data</p>
                <p class="text-xs text-gray-500 mt-1">Check your connection</p>
                <p class="text-xs text-gray-400 mt-1">{{ error }}</p>
            </div>
            
            <!-- Spotify data -->
            <div v-else-if="data && data.name" class="flex flex-col h-full items-center justify-center p-6">
                <!-- Compact header above content -->
                <div class="w-full max-w-xl mx-auto">
                    <div class="flex items-center justify-between">
                        <p class="text-sm text-gray-500">Now Playing</p>
                    </div>
                    <div class="mt-2 flex items-center justify-between h-5">
                        <div class="flex items-end space-x-1 h-5">
                            <div class="w-1.5 bg-green-600 rounded-full animate-pulse" style="animation-delay: 0ms;"></div>
                            <div class="w-1.5 bg-green-600 rounded-full animate-pulse" style="animation-delay: 150ms;"></div>
                            <div class="w-1.5 bg-green-600 rounded-full animate-pulse" style="animation-delay: 300ms;"></div>
                            <div class="w-1.5 bg-green-600 rounded-full animate-pulse" style="animation-delay: 450ms;"></div>
                        </div>
                        <svg class="w-10 h-10 text-green-600 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                    </div>
                </div>

                <!-- Two-column layout: album art left, info right -->
                <div class="mt-4 flex items-center gap-6 w-full max-w-xl mx-auto">
                    <!-- Album artwork on the left (slightly bigger) -->
                    <div class="w-44 h-44 flex-shrink-0">
                        <img 
                            v-if="data.albumImage"
                            :src="data.albumImage" 
                            :alt="data.album"
                            class="w-full h-full object-cover rounded-lg shadow-md"
                        >
                        <div v-else class="w-full h-full bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                            <span class="text-gray-500 text-xs">No image</span>
                        </div>
                    </div>

                    <!-- Info on the right -->
                    <div class="flex-1 flex flex-col">
                        <!-- Track info -->
                        <div class="mt-3">
                            <p class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {{ data.artist }}
                            </p>
                            <a 
                                :href="data.externalUrl" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                class="text-base text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 cursor-pointer block"
                            >
                                {{ data.name }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- No data state -->
            <div v-else class="flex flex-col items-center justify-center flex-1 p-4">
                <p class="text-sm text-gray-500">No recent tracks</p>
                <p class="text-xs text-gray-400 mt-1">Start listening to music</p>
            </div>
        </div>
    </Card>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { useFetch } from '@vueuse/core'
import { computed } from 'vue'

const { data: rawData, error, isFetching } = useFetch('/api/spotify')

// Parse the JSON string into an object
const data = computed(() => {
  if (typeof rawData.value === 'string') {
    try {
      return JSON.parse(rawData.value)
    } catch (e) {
      console.error('Failed to parse JSON:', e)
      return null
    }
  }
  return rawData.value
})
</script>

<style scoped>
.line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-clamp: 1;
}

.line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
}

/* Custom animation for the playing bars */
@keyframes pulse {
  0%, 100% {
    height: 4px;
  }
  50% {
    height: 20px;
  }
}

.animate-pulse {
  animation: pulse 1s ease-in-out infinite;
}
</style>
