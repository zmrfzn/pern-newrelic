import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  cacheDir: '.vite',
  optimizeDeps: {
    force: false
  },
  build: {
    minify: 'esbuild',
    reportCompressedSize: false
  },
  server: {
    port:80,
    allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0', '.instruqt.io', 'play.instruqt.com']
  }
})
