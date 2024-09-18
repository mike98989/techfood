import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        port: 5173,          // Specify the port you want Vite to run on
        host: '0.0.0.0',    // Bind to all network interfaces to make it accessible outside the container

    },
});
