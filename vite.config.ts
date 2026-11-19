import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

const API_TARGET = process.env.API_TARGET || 'http://localhost:3000'

const proxy = {
  '/api': { target: API_TARGET, changeOrigin: true },
  '/uploads': { target: API_TARGET, changeOrigin: true },
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(projectRoot, './src'),
    },
  },
  server: { proxy },
  preview: { proxy },
})
