import { defineConfig } from 'vite'

export default defineConfig({
  root: '_site',
  server: {
    port: 3000,
    open: true,
    watch: {
      usePolling: true,
      interval: 100
    }
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
})
