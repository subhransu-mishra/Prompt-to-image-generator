import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      components: path.resolve(__dirname, './src/components')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Split vendor chunks
            if (id.includes('react-router-dom')) return 'vendor-react-router';
            if (id.includes('framer-motion')) return 'vendor-framer-motion';
            if (id.includes('react-icons')) return 'vendor-react-icons';
            if (id.includes('axios')) return 'vendor-axios';
            if (id.includes('react')) return 'vendor-react';
            return 'vendor-other';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Set warning limit to 1000KB
  }
})