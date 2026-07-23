import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Allow browser-based loading of standard paths
    }
  },
  server: {
    port: 3000
  }
});
