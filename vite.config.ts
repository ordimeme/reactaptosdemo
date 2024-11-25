import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './frontend'),
      }
    },
    define: {
      'import.meta.env.VITE_APTOS_API_KEY': JSON.stringify(env.VITE_APTOS_API_KEY)
    },
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis'
        }
      }
    },
    build: {
      rollupOptions: {
        external: ['buffer', 'util'],
      }
    }
  };
});
