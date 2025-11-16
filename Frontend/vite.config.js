// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const logRequests = () => ({
  name: 'log-requests',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // 👇 2. Imprime la méthode et l'URL de chaque requête
      console.log(`[REQ]: ${req.method} ${req.url}`);
      next(); // Passe la requête à Vite
    });
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      logRequests()
    ],
    base: env.BASE || "",
    server: {
      port: parseInt(env.VITE_PORT) || 3000,
      host: '127.0.0.1',
      allowedHosts: ['pollamothe.fr'],
    },
    optimizeDeps: {
        include: ['@radix-ui/themes'],
    },
  }
})
