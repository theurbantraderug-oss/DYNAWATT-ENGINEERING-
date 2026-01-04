import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    base: '/', // Fixes blank screen by ensuring assets are loaded from root
    plugins: [react()],
    define: {
      // Replace process.env.API_KEY with the actual value during build
      // Default to empty string to prevent "undefined" crashes during build
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ""),
    },
    build: {
      outDir: 'dist',
    }
  };
});