import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'  // assuming React template
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

})
