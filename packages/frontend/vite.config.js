import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  cacheDir: '.vite',
  build: {
    minify: 'esbuild',
    reportCompressedSize: false,
    sourcemap: true,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('/react-router') || id.includes('/react-dom/') || id.match(/\/react\/[^/]+$/)) return 'react-vendor';
          if (id.includes('/primereact/') || id.includes('/@primeuix/') || id.includes('/@primereact/')) return 'primereact-vendor';
          if (id.includes('/chart.js/')) return 'chart-vendor';
        },
      },
    },
  },
  server: {
    port:80,
    allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0', '.instruqt.io', 'play.instruqt.com']
  }
})
