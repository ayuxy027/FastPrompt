import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
plugins: [react()],
resolve: {
    alias: {
    '@': path.resolve(__dirname, './src'),
    },
},
build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
    output: {
        manualChunks: {
        vendor: ['react', 'react-dom'],
        },
    },
    },
    minify: 'terser',
    terserOptions: {
    compress: {
        drop_console: true,
        drop_debugger: true,
    },
    },
},
server: {
    port: 3000,
    open: true,
    cors: true,
    hmr: {
    overlay: true,
    },
},
css: {
    devSourcemap: true,
    postcss: {
    plugins: [tailwindcss, autoprefixer],
    },
},
esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
},
})
