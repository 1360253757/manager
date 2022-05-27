import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 8080,
        host: '127.0.0.1',
        proxy: {
            "/api": {
                target: "http://localhost:3000/"
            }
        }
    },
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    build: {
        target: "es2019",
        brotliSize: false,
        chunkSizeWarningLimit: 2000
    }
})
