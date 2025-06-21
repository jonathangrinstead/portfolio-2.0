<template>
    <Card class="glass-card w-full max-w-md mx-auto p-0 overflow-hidden relative h-[300px]">
      <div v-if="!started && !gameOver" class="w-full h-full flex flex-col items-center justify-center text-foreground text-center">
        <h1 class="text-4xl mb-2 font-bold">SNAKE</h1>
        <p class="text-sm mb-4">High Score: {{ highScore }}</p>
        <Button @click="startGame" class="bg-primary text-primary-foreground hover:bg-primary/80">Play</Button>
      </div>
  
      <div v-if="gameOver" class="w-full h-full flex flex-col items-center justify-center text-foreground text-center">
        <h1 class="text-4xl mb-2 animate-pulse font-bold">Game Over</h1>
        <p class="text-sm mb-2">Score: {{ score }}</p>
        <p class="text-sm mb-4">High Score: {{ highScore }}</p>
        <Button @click="resetGame" class="bg-primary text-primary-foreground hover:bg-primary/80">Try Again</Button>
      </div>
  
      <canvas
        v-if="started"
        ref="canvas"
        width="300"
        height="300"
        class="block w-full h-full"
      />
  
      <div
        v-if="started"
        class="absolute top-2 left-2 text-xs bg-primary/80 backdrop-blur-sm text-primary-foreground px-2 py-1 rounded shadow"
      >
        Score: {{ score }}
      </div>
    </Card>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted, nextTick } from 'vue'
  import { Card } from '@/components/ui/card'
  import { Button } from '@/components/ui/button'
  
  const canvas = ref<HTMLCanvasElement | null>(null)
  const ctx = ref<CanvasRenderingContext2D | null>(null)
  const score = ref(0)
  const highScore = ref(Number(localStorage.getItem('snakeHighScore') || 0))
  const snake = ref([{ x: 10, y: 10 }])
  const direction = ref({ x: 1, y: 0 })
  const food = ref({ x: 5, y: 5 })
  let intervalId: number | undefined
  const started = ref(false)
  const gameOver = ref(false)
  
  const draw = () => {
    if (!ctx.value) return
  
    // Clear canvas with transparent background
    ctx.value.clearRect(0, 0, 300, 300)
  
    ctx.value.fillStyle = '#8b5cf6' // Snake color (purple)
    snake.value.forEach((segment) => {
      ctx.value?.fillRect(segment.x * 10, segment.y * 10, 10, 10)
    })
  
    ctx.value.fillStyle = '#3b82f6' // Food color (blue)
    ctx.value.fillRect(food.value.x * 10, food.value.y * 10, 10, 10)
  }
  
  const move = () => {
    const head = { ...snake.value[0] }
    head.x += direction.value.x
    head.y += direction.value.y
  
    if (head.x < 0 || head.x >= 30 || head.y < 0 || head.y >= 30) {
      endGame()
      return
    }
  
    snake.value.unshift(head)
  
    if (head.x === food.value.x && head.y === food.value.y) {
      score.value++
      food.value = {
        x: Math.floor(Math.random() * 30),
        y: Math.floor(Math.random() * 30),
      }
    } else {
      snake.value.pop()
    }
  
    draw()
  }
  
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' && direction.value.y !== 1) direction.value = { x: 0, y: -1 }
    else if (e.key === 'ArrowDown' && direction.value.y !== -1) direction.value = { x: 0, y: 1 }
    else if (e.key === 'ArrowLeft' && direction.value.x !== 1) direction.value = { x: -1, y: 0 }
    else if (e.key === 'ArrowRight' && direction.value.x !== -1) direction.value = { x: 1, y: 0 }
  }
  
  const endGame = () => {
    clearInterval(intervalId)
    if (score.value > highScore.value) {
      highScore.value = score.value
      localStorage.setItem('snakeHighScore', highScore.value.toString())
    }
    started.value = false
    gameOver.value = true
    window.removeEventListener('keydown', handleKey)
  }
  
  const resetGame = () => {
    score.value = 0
    snake.value = [{ x: 10, y: 10 }]
    direction.value = { x: 1, y: 0 }
    food.value = { x: 5, y: 5 }
    started.value = false
    gameOver.value = false
  }
  
  const startGame = async () => {
    score.value = 0
    snake.value = [{ x: 10, y: 10 }]
    direction.value = { x: 1, y: 0 }
    food.value = { x: 5, y: 5 }
    started.value = true
    gameOver.value = false
    await nextTick()
    if (canvas.value) {
      ctx.value = canvas.value.getContext('2d')
      draw()
      intervalId = window.setInterval(move, 150)
      window.addEventListener('keydown', handleKey)
    }
  }
  
  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
    window.removeEventListener('keydown', handleKey)
  })
  </script>
  
  <style scoped>
  canvas {
    display: block;
  }
  </style>