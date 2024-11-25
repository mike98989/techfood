import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Allow access from any IP
    port: 5173,
  },
  // base: '/frontend/', // Match your deployment path
  // build: {
  //   outDir: 'dist', // Ensure this matches your deployment folder
  // },
})