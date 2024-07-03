import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://skillsync-api-deployment.vercel.app'
      // '/api': 'http://localhost:5000'
    }
  },
  plugins: [react()],
})
