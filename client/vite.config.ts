import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // ... i dont know why this is needed. vite and simple-peer do not go together that is why i am using this
      "simple-peer": "simple-peer/simplepeer.min.js",
    },
  },
})
