import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'build',
        chunkSizeWarningLimit: 500000,
    },
    resolve: {
        alias: {
            src: "/src",
        },
    },
    assetsInclude: [
        "**/*.xlsx"
    ],
})
