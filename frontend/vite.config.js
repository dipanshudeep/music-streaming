import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server:{
        proxy: {
      '/api': 'https://music-streaming-q2j7.onrender.com',
      '/upload': 'https://music-streaming-q2j7.onrender.com',
      '/api/admin/add-music': 'https://music-streaming-q2j7.onrender.com',

      // '/': 'https://music-streaming-q2j7.onrender.com',

      // '/api': 'http://localhost:4000',
      // '/upload': 'http://localhost:4000',
    },
  },
  plugins: [tailwindcss(),react()],
})
