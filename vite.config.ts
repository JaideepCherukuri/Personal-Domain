import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('@tanstack/react-router')) return 'router';
            if (id.includes('gsap')) return 'gsap';
            if (id.includes('lenis')) return 'lenis';
          }
        },
      },
    },
    // Increase warning limit since we have large case study pages
    chunkSizeWarningLimit: 600,
  },
})
