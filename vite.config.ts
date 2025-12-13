import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  esbuild: {
    // Safe production-only win: strip debug logging from the final bundle.
    // (No visual/behavioral impact for users; keeps dev logs intact.)
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
  build: {
    rollupOptions: {
      output: {
        // Split out large, relatively stable libraries to reduce initial JS payload and improve caching.
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          // Mapbox is by far the heaviest dependency.
          if (id.includes('mapbox-gl')) return 'mapbox'

          // Grid layout tends to pull in a fair amount of code.
          if (id.includes('vue3-grid-layout')) return 'grid'

          // UI/icon libraries are stable and cache well.
          if (
            id.includes('lucide-vue-next') ||
            id.includes('@iconify') ||
            id.includes('reka-ui')
          ) {
            return 'ui'
          }

          // IMPORTANT: avoid forcing Vue itself into a dedicated chunk.
          // In some cases this can create cross-chunk circular execution order issues in production
          // (e.g. "can't access lexical declaration before initialization").
          //
          // Let Rollup decide the rest.
          return
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})