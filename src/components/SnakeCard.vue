<template>
    <Card class="glass-card w-full h-full p-0 overflow-hidden relative">
      <div v-if="!started && !gameOver" class="w-full h-full flex flex-col items-center justify-center text-foreground text-center">
        <h1 class="text-4xl mb-2 font-bold">SNAKE</h1>
        <p class="text-sm mb-4">High Score: {{ highScore }}</p>
        <button
          @click="startGame"
          aria-label="Play Snake"
          class="pl-3 pr-4 py-2 rounded-full border backdrop-blur shadow-md transition-all duration-300 flex items-center gap-2
                 bg-white/80 text-black border-white/60 hover:bg-white hover:scale-105
                 focus:outline-none focus:ring-2 focus:ring-black/20
                 dark:bg-black/60 dark:text-white dark:border-white/30 dark:hover:bg-black/70 dark:focus:ring-white/20"
        >
          <Play class="w-4 h-4" />
          <span class="text-sm font-medium">Play</span>
        </button>
      </div>
  
      <div v-if="gameOver" class="w-full h-full flex flex-col items-center justify-center text-foreground text-center">
        <h1 class="text-4xl mb-2 animate-pulse font-bold">Game Over</h1>
        <p class="text-sm mb-2">Score: {{ score }}</p>
        <p class="text-sm mb-4">High Score: {{ highScore }}</p>
        <button
          @click="resetGame"
          aria-label="Try again"
          class="pl-3 pr-4 py-2 rounded-full border backdrop-blur shadow-md transition-all duration-300 flex items-center gap-2
                 bg-white/80 text-black border-white/60 hover:bg-white hover:scale-105
                 focus:outline-none focus:ring-2 focus:ring-black/20
                 dark:bg-black/60 dark:text-white dark:border-white/30 dark:hover:bg-black/70 dark:focus:ring-white/20"
        >
          <RotateCcw class="w-4 h-4" />
          <span class="text-sm font-medium">Try Again</span>
        </button>
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
  import { ref, onUnmounted, nextTick } from 'vue'
  import { Card } from '@/components/ui/card'
  import { Play, RotateCcw } from 'lucide-vue-next'
  
  const canvas = ref<HTMLCanvasElement | null>(null)
  const ctx = ref<CanvasRenderingContext2D | null>(null)
  const score = ref(0)
  const highScore = ref(Number(localStorage.getItem('snakeHighScore') || 0))
  const snake = ref([{ x: 10, y: 10 }])
  const direction = ref({ x: 1, y: 0 }) // direction used for movement on each tick
  const nextDirection = ref({ x: 1, y: 0 }) // queued direction change to be applied at the next tick
  const food = ref({ x: 5, y: 5 })
  let intervalId: number | undefined
  const started = ref(false)
  const gameOver = ref(false)
  
  // Board/grid configuration
  const GRID_SIZE = 30
  const boardCssSize = ref(300) // size in CSS pixels (unscaled)
  const cellSize = ref(10) // size of one grid cell in CSS pixels
  const devicePixelRatioValue = window.devicePixelRatio || 1
  
  // Scroll locking state
  let originalBodyOverflow: string | null = null
  let originalBodyTouchAction: string | null = null
  let originalBodyOverscrollBehavior: string | null = null
  
  const lockScroll = () => {
    if (originalBodyOverflow === null) {
      originalBodyOverflow = document.body.style.overflow
      originalBodyTouchAction = document.body.style.touchAction
      originalBodyOverscrollBehavior = document.body.style.overscrollBehavior as string
    }
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    ;(document.body.style as any).overscrollBehavior = 'none'
  }
  
  const unlockScroll = () => {
    if (originalBodyOverflow !== null) document.body.style.overflow = originalBodyOverflow
    if (originalBodyTouchAction !== null) document.body.style.touchAction = originalBodyTouchAction
    if (originalBodyOverscrollBehavior !== null) (document.body.style as any).overscrollBehavior = originalBodyOverscrollBehavior
    originalBodyOverflow = null
    originalBodyTouchAction = null
    originalBodyOverscrollBehavior = null
  }
  
  const draw = () => {
    if (!ctx.value) return
  
    // Clear canvas with transparent background (use CSS pixel units after DPR scaling)
    ctx.value.clearRect(0, 0, boardCssSize.value, boardCssSize.value)
  
    ctx.value.fillStyle = '#8b5cf6' // Snake color (purple)
    snake.value.forEach((segment) => {
      ctx.value?.fillRect(
        segment.x * cellSize.value,
        segment.y * cellSize.value,
        cellSize.value,
        cellSize.value
      )
    })
  
    ctx.value.fillStyle = '#3b82f6' // Food color (blue)
    ctx.value.fillRect(
      food.value.x * cellSize.value,
      food.value.y * cellSize.value,
      cellSize.value,
      cellSize.value
    )
  }
  
  const move = () => {
    // Apply at most one direction change per tick to prevent 180-degree instant reversals via rapid key presses
    direction.value = { ...nextDirection.value }

    const head = { ...snake.value[0] }
    head.x += direction.value.x
    head.y += direction.value.y
  
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      endGame()
      return
    }
  
    // Self collision: consider whether the tail will move this frame
    const willEat = head.x === food.value.x && head.y === food.value.y
    const bodyToCheck = willEat ? snake.value : snake.value.slice(0, -1)
    const hitSelf = bodyToCheck.some((segment) => segment.x === head.x && segment.y === head.y)
    if (hitSelf) {
      endGame()
      return
    }

    snake.value.unshift(head)
  
    if (willEat) {
      score.value++
      // Place new food; simple placement (may rarely spawn on the snake)
      food.value = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }
    } else {
      snake.value.pop()
    }
  
    draw()
  }
  
  const handleKey = (e: KeyboardEvent) => {
    const isArrow = e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight'
    if (isArrow) e.preventDefault()
    // Determine desired direction; compare against current movement direction to disallow instant reversal
    let desired: { x: number; y: number } | null = null
    if (e.key === 'ArrowUp') desired = { x: 0, y: -1 }
    else if (e.key === 'ArrowDown') desired = { x: 0, y: 1 }
    else if (e.key === 'ArrowLeft') desired = { x: -1, y: 0 }
    else if (e.key === 'ArrowRight') desired = { x: 1, y: 0 }

    if (!desired) return

    const isOpposite = desired.x === -direction.value.x && desired.y === -direction.value.y
    if (isOpposite) return

    // Queue a single direction change; further key presses before next tick will overwrite the queue but not cause multiple turns in a single tick
    nextDirection.value = desired
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
    unlockScroll()
  }
  
  const resetGame = () => {
    score.value = 0
    snake.value = [{ x: 10, y: 10 }]
    direction.value = { x: 1, y: 0 }
    nextDirection.value = { x: 1, y: 0 }
    food.value = { x: 5, y: 5 }
    started.value = false
    gameOver.value = false
  }
  
  const startGame = async () => {
    score.value = 0
    snake.value = [{ x: 10, y: 10 }]
    direction.value = { x: 1, y: 0 }
    nextDirection.value = { x: 1, y: 0 }
    food.value = { x: 5, y: 5 }
    started.value = true
    gameOver.value = false
    await nextTick()
    if (canvas.value) {
      // Compute a square board size based on available space, aligned to the grid for crispness
      const container = canvas.value.parentElement as HTMLElement
      const maxSize = Math.floor(Math.min(container.clientWidth, container.clientHeight))
      const alignedSize = Math.max(GRID_SIZE, Math.floor(maxSize / GRID_SIZE) * GRID_SIZE)
      boardCssSize.value = alignedSize
      cellSize.value = alignedSize / GRID_SIZE

      // Apply CSS size to keep the canvas square and avoid stretching
      canvas.value.style.width = `${alignedSize}px`
      canvas.value.style.height = `${alignedSize}px`

      // Set backing store size for high-DPI displays and scale context to CSS pixels
      canvas.value.width = Math.floor(alignedSize * devicePixelRatioValue)
      canvas.value.height = Math.floor(alignedSize * devicePixelRatioValue)

      ctx.value = canvas.value.getContext('2d')
      if (!ctx.value) return
      ctx.value.setTransform(devicePixelRatioValue, 0, 0, devicePixelRatioValue, 0, 0)
      ;(ctx.value as any).imageSmoothingEnabled = false

      draw()
      intervalId = window.setInterval(move, 150)
      window.addEventListener('keydown', handleKey, { passive: false })
      lockScroll()
    }
  }
  
  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
    window.removeEventListener('keydown', handleKey)
    unlockScroll()
  })
  </script>
  
  <style scoped>
  canvas {
    display: block;
  }
  </style>