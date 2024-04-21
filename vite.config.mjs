import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    build: {
      sourcemap: process.env.NODE_ENV !== 'production',
      target: 'es2020',
    },
    plugins: [vue()],
    resolve: {
      alias: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
