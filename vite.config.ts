import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // Ensure absolute paths for Vercel deployment
  base: '/',
  
  plugins: [
    react(),
    // NOTE: Image optimization plugins will be added after installation
    // Run: npm install -D vite-imagetools vite-plugin-image-optimizer sharp vite-plugin-compression2
  ],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  // Build optimizations
  build: {
    // Output directory for Vercel
    outDir: 'dist',
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', 'framer-motion'],
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Minify options - using default terser (removes console in production)
    minify: 'terser',
    // Asset inlining threshold
    assetsInlineLimit: 4096, // 4kb
    // CSS code splitting
    cssCodeSplit: true,
    // Source maps for debugging (disable in production for smaller builds)
    sourcemap: false,
  },
  
  // Preview server optimization
  preview: {
    port: 3000,
    strictPort: true,
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
  
  // Dev server optimization
  server: {
    port: 5173,
    strictPort: true,
    headers: {
      'Cache-Control': 'no-cache',
    },
  },
})
