import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/nexora-web-saas/',
  plugins: [react()],
})
