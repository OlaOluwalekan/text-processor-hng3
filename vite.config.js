import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_TRANSLATOR_TOKEN': JSON.stringify(
      process.env.VITE_TRANSLATOR_TOKEN
    ),
    'process.env.VITE_DETECTOR_TOKEN': JSON.stringify(
      process.env.VITE_DETECTOR_TOKEN
    ),
    'process.env.VITE_SUMMARIZER_TOKEN': JSON.stringify(
      process.env.VITE_SUMMARIZER_TOKEN
    ),
  },
})
