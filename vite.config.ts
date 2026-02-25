import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte()
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'ObsidianGantt',
      fileName: () => 'main.js',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: ['obsidian', 'electron', '@codemirror/state', '@codemirror/view'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) return 'styles.css'
          return assetInfo.name ?? 'asset'
        },
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: 'inline',
    minify: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
