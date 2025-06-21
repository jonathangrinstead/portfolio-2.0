import { onMounted, onUnmounted } from 'vue'

export function useLiquidGlass() {
  const handleMouseMove = (event: MouseEvent) => {
    const cards = document.querySelectorAll('.glass-card')
    
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      
      // Convert to percentage
      const xPercent = (x / rect.width) * 100
      const yPercent = (y / rect.height) * 100
      
      // Clamp values to prevent overflow
      const clampedX = Math.max(0, Math.min(100, xPercent))
      const clampedY = Math.max(0, Math.min(100, yPercent))
      
      // Update CSS custom properties
      ;(card as HTMLElement).style.setProperty('--cursor-x', `${clampedX}%`)
      ;(card as HTMLElement).style.setProperty('--cursor-y', `${clampedY}%`)
    })
  }

  const handleMouseLeave = () => {
    const cards = document.querySelectorAll('.glass-card')
    
    cards.forEach((card) => {
      // Reset to center when mouse leaves
      ;(card as HTMLElement).style.setProperty('--cursor-x', '50%')
      ;(card as HTMLElement).style.setProperty('--cursor-y', '50%')
    })
  }

  onMounted(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseleave', handleMouseLeave)
  })

  return {
    handleMouseMove,
    handleMouseLeave
  }
} 