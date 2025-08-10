<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ref, onMounted, computed } from 'vue'

type WeatherApi = {
  weather: { id: number; description: string }[]
  main: { temp: number; feels_like: number; humidity: number }
  wind: { speed: number }
}

// Import all weather icons
const weatherIcons: Record<string, string> = {
  // Clear
  '800': new URL('@/assets/weatherIcons/clear-day.svg', import.meta.url).href,
  // Clouds
  '801': new URL('@/assets/weatherIcons/partly-cloudy-day.svg', import.meta.url).href,
  '802': new URL('@/assets/weatherIcons/partly-cloudy-day.svg', import.meta.url).href,
  '803': new URL('@/assets/weatherIcons/cloudy.svg', import.meta.url).href,
  '804': new URL('@/assets/weatherIcons/overcast.svg', import.meta.url).href,
  // Rain
  '500': new URL('@/assets/weatherIcons/rain.svg', import.meta.url).href,
  '501': new URL('@/assets/weatherIcons/rain.svg', import.meta.url).href,
  '502': new URL('@/assets/weatherIcons/rain.svg', import.meta.url).href,
  '503': new URL('@/assets/weatherIcons/rain.svg', import.meta.url).href,
  '504': new URL('@/assets/weatherIcons/rain.svg', import.meta.url).href,
  '511': new URL('@/assets/weatherIcons/sleet.svg', import.meta.url).href,
  '520': new URL('@/assets/weatherIcons/rain.svg', import.meta.url).href,
  '521': new URL('@/assets/weatherIcons/rain.svg', import.meta.url).href,
  '522': new URL('@/assets/weatherIcons/rain.svg', import.meta.url).href,
  '531': new URL('@/assets/weatherIcons/rain.svg', import.meta.url).href,
  // Drizzle
  '300': new URL('@/assets/weatherIcons/drizzle.svg', import.meta.url).href,
  '301': new URL('@/assets/weatherIcons/drizzle.svg', import.meta.url).href,
  '302': new URL('@/assets/weatherIcons/drizzle.svg', import.meta.url).href,
  '310': new URL('@/assets/weatherIcons/drizzle.svg', import.meta.url).href,
  '311': new URL('@/assets/weatherIcons/drizzle.svg', import.meta.url).href,
  '312': new URL('@/assets/weatherIcons/drizzle.svg', import.meta.url).href,
  '313': new URL('@/assets/weatherIcons/drizzle.svg', import.meta.url).href,
  '314': new URL('@/assets/weatherIcons/drizzle.svg', import.meta.url).href,
  '321': new URL('@/assets/weatherIcons/drizzle.svg', import.meta.url).href,
  // Snow
  '600': new URL('@/assets/weatherIcons/snow.svg', import.meta.url).href,
  '601': new URL('@/assets/weatherIcons/snow.svg', import.meta.url).href,
  '602': new URL('@/assets/weatherIcons/snow.svg', import.meta.url).href,
  '611': new URL('@/assets/weatherIcons/sleet.svg', import.meta.url).href,
  '612': new URL('@/assets/weatherIcons/sleet.svg', import.meta.url).href,
  '613': new URL('@/assets/weatherIcons/sleet.svg', import.meta.url).href,
  '615': new URL('@/assets/weatherIcons/sleet.svg', import.meta.url).href,
  '616': new URL('@/assets/weatherIcons/sleet.svg', import.meta.url).href,
  '620': new URL('@/assets/weatherIcons/snow.svg', import.meta.url).href,
  '621': new URL('@/assets/weatherIcons/snow.svg', import.meta.url).href,
  '622': new URL('@/assets/weatherIcons/snow.svg', import.meta.url).href,
  // Thunderstorm
  '200': new URL('@/assets/weatherIcons/thunderstorms.svg', import.meta.url).href,
  '201': new URL('@/assets/weatherIcons/thunderstorms-rain.svg', import.meta.url).href,
  '202': new URL('@/assets/weatherIcons/thunderstorms-rain.svg', import.meta.url).href,
  '210': new URL('@/assets/weatherIcons/thunderstorms.svg', import.meta.url).href,
  '211': new URL('@/assets/weatherIcons/thunderstorms.svg', import.meta.url).href,
  '212': new URL('@/assets/weatherIcons/thunderstorms.svg', import.meta.url).href,
  '221': new URL('@/assets/weatherIcons/thunderstorms.svg', import.meta.url).href,
  '230': new URL('@/assets/weatherIcons/thunderstorms-rain.svg', import.meta.url).href,
  '231': new URL('@/assets/weatherIcons/thunderstorms-rain.svg', import.meta.url).href,
  '232': new URL('@/assets/weatherIcons/thunderstorms-rain.svg', import.meta.url).href,
  // Atmosphere
  '701': new URL('@/assets/weatherIcons/mist.svg', import.meta.url).href,
  '711': new URL('@/assets/weatherIcons/smoke.svg', import.meta.url).href,
  '721': new URL('@/assets/weatherIcons/haze.svg', import.meta.url).href,
  '731': new URL('@/assets/weatherIcons/dust.svg', import.meta.url).href,
  '741': new URL('@/assets/weatherIcons/fog.svg', import.meta.url).href,
  '751': new URL('@/assets/weatherIcons/dust.svg', import.meta.url).href,
  '761': new URL('@/assets/weatherIcons/dust.svg', import.meta.url).href,
  '762': new URL('@/assets/weatherIcons/dust.svg', import.meta.url).href,
  '771': new URL('@/assets/weatherIcons/wind.svg', import.meta.url).href,
  '781': new URL('@/assets/weatherIcons/tornado.svg', import.meta.url).href,
}

const homeWeatherData = ref<WeatherApi | null>(null)
const userWeatherData = ref<WeatherApi | null>(null)
const isFetching = ref(false)
const isFlipped = ref(false)
const homeLabel = ref('London')
const userLabel = ref('Your location')

const homeWeatherIcon = computed<string>(() => {
  if (!homeWeatherData.value) return new URL('@/assets/weatherIcons/cloudy.svg', import.meta.url).href
  const weatherCode = homeWeatherData.value.weather[0].id.toString()
  return weatherIcons[weatherCode] || new URL('@/assets/weatherIcons/cloudy.svg', import.meta.url).href
})

const userWeatherIcon = computed<string>(() => {
  if (!userWeatherData.value) return new URL('@/assets/weatherIcons/cloudy.svg', import.meta.url).href
  const weatherCode = userWeatherData.value.weather[0].id.toString()
  return weatherIcons[weatherCode] || new URL('@/assets/weatherIcons/cloudy.svg', import.meta.url).href
})

const getHomeWeather = async () => {
  try {
    isFetching.value = true
    const response = await fetch('http://localhost:3001/api/weather?city=London')
    const data = await response.json()
    homeWeatherData.value = data
    if ((data as any)?.name) homeLabel.value = (data as any).name
  } catch (error) {
    console.error('Failed to fetch weather:', error)
  } finally {
    isFetching.value = false
  }
}

const getUserWeather = async (): Promise<void> => {
  try {
    isFetching.value = true
    userLabel.value = 'Locating...'
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      if (!navigator.geolocation) return reject(new Error('Geolocation unsupported'))
      navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 8000 })
    })
    const lat = position.coords.latitude.toString()
    const lon = position.coords.longitude.toString()
    const response = await fetch(`http://localhost:3001/api/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`)
    const data = await response.json()
    userWeatherData.value = data
    userLabel.value = (data as any)?.name || 'Your location'
  } catch (error) {
    console.error('Failed to fetch location weather:', error)
    userLabel.value = (userWeatherData.value as any)?.name || 'Your location'
  } finally {
    isFetching.value = false
  }
}

const toggleFlip = async () => {
  if (!isFlipped.value) {
    isFlipped.value = true
    if (!userWeatherData.value) await getUserWeather()
  } else {
    isFlipped.value = false
  }
}

onMounted(() => {
  getHomeWeather()
})
</script>

<template>
  <Card class="glass-card shadow-lg w-full h-full relative overflow-hidden">
    <div class="flip-container h-full">
      <div class="flip-inner h-full" :class="{ flipped: isFlipped }">
        <!-- Front: Me -->
        <div class="flip-face flip-front h-full">
          <CardHeader>
            <CardTitle class="flex items-center justify-between">
              <span>Me · {{ homeLabel }}</span>
              <img :src="homeWeatherIcon" class="w-24 h-24 text-primary" alt="Weather icon" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div v-if="homeWeatherData" class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-2xl font-bold">{{ Math.round(homeWeatherData.main.temp - 273.15) }}°C</span>
                <span class="text-sm text-muted-foreground">Feels like {{ Math.round(homeWeatherData.main.feels_like - 273.15) }}°C</span>
              </div>
              <div class="space-y-1">
                <p class="capitalize text-sm">{{ homeWeatherData.weather[0].description }}</p>
                <div class="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Humidity: {{ homeWeatherData.main.humidity }}%</span>
                  <span>Wind: {{ Math.round(homeWeatherData.wind.speed * 2.237) }} mph</span>
                </div>
              </div>
            </div>
            <div v-else class="flex items-center justify-center h-24">
              <p class="text-muted-foreground">Loading weather data...</p>
            </div>
          </CardContent>
        </div>

        <!-- Back: You -->
        <div class="flip-face flip-back h-full">
          <CardHeader>
            <CardTitle class="flex items-center justify-between">
              <span>You · {{ userLabel }}</span>
              <img :src="userWeatherIcon" class="w-24 h-24 text-primary" alt="Weather icon" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div v-if="userWeatherData" class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-2xl font-bold">{{ Math.round(userWeatherData.main.temp - 273.15) }}°C</span>
                <span class="text-sm text-muted-foreground">Feels like {{ Math.round(userWeatherData.main.feels_like - 273.15) }}°C</span>
              </div>
              <div class="space-y-1">
                <p class="capitalize text-sm">{{ userWeatherData.weather[0].description }}</p>
                <div class="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Humidity: {{ userWeatherData.main.humidity }}%</span>
                  <span>Wind: {{ Math.round(userWeatherData.wind.speed * 2.237) }} mph</span>
                </div>
              </div>
            </div>
            <div v-else class="flex flex-col items-center justify-center h-24 gap-2">
              <div class="animate-spin-slow rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
              <p class="text-muted-foreground text-sm">{{ userLabel }}</p>
            </div>
          </CardContent>
        </div>
      </div>
    </div>

    <!-- Flip toggle button -->
    <button
      aria-label="Toggle me/you weather"
      @click="toggleFlip()"
      class="absolute bottom-3 right-3 z-10 pl-2 pr-3 py-2 rounded-full border backdrop-blur shadow-md transition-all duration-300 flex items-center gap-2
             bg-white/80 text-black border-white/60 hover:bg-white hover:scale-105
             focus:outline-none focus:ring-2 focus:ring-black/20
             dark:bg-black/60 dark:text-white dark:border-white/30 dark:hover:bg-black/70 dark:focus:ring-white/20"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" :class="{ 'animate-spin-slow': isFetching }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      <span class="text-sm font-medium">{{ isFlipped ? 'Me' : 'You' }}</span>
    </button>
  </Card>
</template>

<style scoped>
.text-primary {
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Flip card styles */
.flip-container { perspective: 1200px; }
.flip-inner { position: relative; width: 100%; height: 100%; min-height: 100%; transform-style: preserve-3d; transition: transform 0.7s ease; }
.flip-inner.flipped { transform: rotateY(180deg); }
.flip-face { position: absolute; inset: 0; display: flex; flex-direction: column; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.flip-face * { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.flip-back { transform: rotateY(180deg); }

/* Ensure only the visible face accepts interactions and is painted */
.flip-inner:not(.flipped) .flip-back { opacity: 0; pointer-events: none; }
.flip-inner.flipped .flip-front { opacity: 0; pointer-events: none; }

@keyframes spin360slow {
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin360slow 1.2s linear infinite;
}

</style>