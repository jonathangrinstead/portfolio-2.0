<template>
  <Card class="glass-card flex flex-col relative w-full h-full p-4">
    <div class="flex h-full flex-col min-h-0">
      <!-- Loading state -->
      <div v-if="isFetching" class="flex h-full flex-col gap-4">
        <div class="flex items-center justify-between">
          <div class="h-5 w-28 rounded-md bg-black/5 dark:bg-white/10 animate-pulse" />
          <div class="h-9 w-9 rounded-full bg-black/5 dark:bg-white/10 animate-pulse" />
        </div>
        <div class="flex flex-1 items-center gap-4">
          <div class="h-24 w-24 rounded-2xl bg-black/5 dark:bg-white/10 animate-pulse" />
          <div class="flex-1 space-y-2">
            <div class="h-6 w-4/5 rounded-md bg-black/5 dark:bg-white/10 animate-pulse" />
            <div class="h-4 w-2/5 rounded-md bg-black/5 dark:bg-white/10 animate-pulse" />
            <div class="h-4 w-3/5 rounded-md bg-black/5 dark:bg-white/10 animate-pulse" />
          </div>
        </div>
        <div class="h-2 w-full rounded-full bg-black/5 dark:bg-white/10 animate-pulse" />
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="flex h-full flex-col items-center justify-center gap-2 text-center">
        <p class="text-sm font-medium text-red-600 dark:text-red-400">Failed to load Spotify</p>
        <p class="text-xs text-muted-foreground">Check your connection and try again.</p>
        <p class="text-xs text-muted-foreground/70">{{ errorMessage }}</p>
      </div>

      <!-- Spotify data -->
      <div v-else-if="track" class="relative flex-1 min-h-0">
        <div class="relative z-10 flex items-center gap-3">
          <svg class="h-10 w-10 shrink-0 text-green-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <div class="min-w-0">
            <div class="text-sm font-semibold leading-tight">Spotify</div>
            <div class="text-xs opacity-70 truncate">
              <span v-if="playedAgo">{{ playedAgo }}</span>
              <span v-else>Recently played</span>
            </div>
          </div>
        </div>

        <!-- Bottom-anchor the content block, but center art to text stack -->
        <div class="relative z-10 mt-10 flex-1 min-h-0 flex flex-col justify-end">
          <div class="flex items-center gap-4 min-w-0">
            <div class="relative h-32 w-32 flex-shrink-0">
              <img
                v-if="track.albumImage"
                :src="track.albumImage"
                :alt="track.album"
                class="h-full w-full rounded-2xl object-cover shadow-md ring-1 ring-border/60"
              />
              <div
                v-else
                class="h-full w-full rounded-2xl bg-muted/30 ring-1 ring-border/60 flex items-center justify-center"
              >
                <span class="text-xs text-muted-foreground">No art</span>
              </div>
            </div>

            <div class="min-w-0 flex-1">
              <a
                v-if="track.externalUrl"
                :href="track.externalUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="block text-base font-semibold leading-snug text-foreground hover:text-foreground/80 transition-colors line-clamp-2"
                :title="track.name"
              >
                {{ track.name }}
              </a>
              <p v-else class="text-base font-semibold leading-snug text-foreground line-clamp-2">
                {{ track.name }}
              </p>

              <p class="mt-1 text-sm text-muted-foreground line-clamp-1" :title="track.artist">
                {{ track.artist }}
              </p>

              <p class="mt-1 text-xs text-muted-foreground/80 line-clamp-1" :title="track.album">
                {{ track.album }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- No data state -->
      <div v-else class="flex h-full flex-col items-center justify-center gap-1 text-center">
        <p class="text-sm font-medium text-muted-foreground">No recent tracks</p>
        <p class="text-xs text-muted-foreground/80">Start listening and I’ll show it here.</p>
      </div>
    </div>

    <a
      v-if="track?.externalUrl"
      :href="track.externalUrl"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Spotify track"
      class="absolute z-20 top-3 right-3 p-2 rounded-full border backdrop-blur shadow-md transition-all duration-200 pointer-events-auto
             bg-white/80 text-black border-white/60 hover:bg-white hover:scale-105 hover:-rotate-3
             focus:outline-none focus:ring-2 focus:ring-black/20
             dark:bg-black/60 dark:text-white dark:border-white/30 dark:hover:bg-black/70 dark:focus:ring-white/20"
    >
      <Play class="w-5 h-5" />
    </a>
  </Card>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { Play } from 'lucide-vue-next'
import { useFetch } from '@vueuse/core'
import { computed } from 'vue'

const { data: rawData, error, isFetching } = useFetch('/api/spotify')

type SpotifyTrack = {
  name: string
  artist: string
  album: string
  albumImage?: string
  externalUrl?: string
  playedAt?: string
  duration?: number
  popularity?: number
}

const errorMessage = computed(() => {
  const e = error.value as unknown
  if (!e) return ''
  if (typeof e === 'string') return e
  if (typeof e === 'object' && e && 'message' in e) return String((e as any).message)
  return String(e)
})

// Parse the JSON string into an object (some environments return stringified JSON)
const parsed = computed<SpotifyTrack | null>(() => {
  const v = rawData.value as unknown
  if (!v) return null
  if (typeof v === 'string') {
    try {
      return JSON.parse(v) as SpotifyTrack
    } catch (e) {
      console.error('Failed to parse JSON:', e)
      return null
    }
  }
  return v as SpotifyTrack
})

const track = computed<SpotifyTrack | null>(() => {
  const t = parsed.value
  return t && typeof t.name === 'string' && t.name.length > 0 ? t : null
})

function formatRelativeTime(iso?: string) {
  if (!iso) return ''
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return ''
  const now = Date.now()
  const diffSeconds = Math.round((then - now) / 1000)
  const abs = Math.abs(diffSeconds)

  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' })
  if (abs < 60) return rtf.format(diffSeconds, 'second')
  if (abs < 60 * 60) return rtf.format(Math.round(diffSeconds / 60), 'minute')
  if (abs < 60 * 60 * 24) return rtf.format(Math.round(diffSeconds / (60 * 60)), 'hour')
  return rtf.format(Math.round(diffSeconds / (60 * 60 * 24)), 'day')
}

const playedAgo = computed(() => {
  const s = formatRelativeTime(track.value?.playedAt)
  return s ? `Played ${s}` : ''
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

/* Custom animation for the header bars */
@keyframes spotifyBars {
  0%, 100% {
    height: 4px;
  }
  50% {
    height: 16px;
  }
}

.spotify-bar {
  animation: spotifyBars 1s ease-in-out infinite;
}
</style>
