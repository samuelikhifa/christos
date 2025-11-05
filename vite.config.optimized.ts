import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { imagetools } from 'vite-imagetools'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { compression } from 'vite-plugin-compression2'

// OPTIMIZED VITE CONFIG
// Use this after installing: npm install -D vite-imagetools vite-plugin-image-optimizer sharp vite-plugin-compression2
// To activate: rename this file to vite.config.ts (backup the current one first)

export default defineConfig({
  plugins: [
    react(),
    
    // Image optimization with automatic format conversion
    imagetools({
      defaultDirectives: new URLSearchParams({
        format: 'webp;avif;jpg',
        quality: '80',
        w: '400;800;1200',
      }),
    }),
    
    // Optimize existing images during build
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
      exclude: undefined,
      include: undefined,
      includePublic: true,
      logStats: true,
      ansiColors: true,
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                cleanupNumericValues: false,
                removeViewBox: false,
              },
            },
          },
          'sortAttrs',
          {
            name: 'addAttributesToSVGElement',
            params: {
              attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
            },
          },
        ],
      },
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
      avif: {
        quality: 70,
      },
    }),
    
    // Gzip and Brotli compression
    compression({
      algorithms: ['gzip'],
    }),
    compression({
      algorithms: ['brotliCompress'],
    }),
  ],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  // Build optimizations
  build: {
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
