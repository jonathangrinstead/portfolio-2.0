<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ref, onMounted, computed } from 'vue'

// Import all weather icons
const weatherIcons = {
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

const weatherData = ref(null)

const currentWeatherIcon = computed(() => {
  if (!weatherData.value) return new URL('@/assets/weatherIcons/cloudy.svg', import.meta.url).href
  const weatherCode = weatherData.value.weather[0].id.toString()
  return weatherIcons[weatherCode] || new URL('@/assets/weatherIcons/cloudy.svg', import.meta.url).href
})

const getWeather = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/weather?city=London');
    const data = await response.json();
    weatherData.value = data;
  } catch (error) {
    console.error('Failed to fetch weather:', error);
  }
}

onMounted(() => {
  getWeather();
})
</script>

<template>
  <Card class="shadow-lg">
    <CardHeader>
      <CardTitle class="flex items-center justify-between">
        <span>London</span>
        <img 
          :src="currentWeatherIcon" 
          class="w-24 h-24 text-primary" 
          alt="Weather icon"
        />
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div v-if="weatherData" class="space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-2xl font-bold">
            {{ Math.round(weatherData.main.temp - 273.15) }}°C
          </span>
          <span class="text-sm text-muted-foreground">
            Feels like {{ Math.round(weatherData.main.feels_like - 273.15) }}°C
          </span>
        </div>
        <div class="space-y-1">
          <p class="capitalize text-sm">{{ weatherData.weather[0].description }}</p>
          <div class="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Humidity: {{ weatherData.main.humidity }}%</span>
            <span>Wind: {{ Math.round(weatherData.wind.speed * 2.237) }} mph</span>
          </div>
        </div>
      </div>
      <div v-else class="flex items-center justify-center h-24">
        <p class="text-muted-foreground">Loading weather data...</p>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>
.text-primary {
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

</style>