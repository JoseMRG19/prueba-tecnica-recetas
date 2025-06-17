import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Configuración del servidor de desarrollo
  server: {
    proxy: {
      // Cualquier petición que tu aplicación haga a una ruta que empiece con '/api-proxy'
      // será interceptada por este proxy.
      '/api-proxy': {
        // El destino real al que se hará la petición.
        target: 'https://www.themealdb.com',
        
        // Esencial para que el servidor de destino no rechace la petición por venir de 'localhost'.
        changeOrigin: true,
        
        // Reescribe la ruta de la petición antes de enviarla.
        // Quitamos '/api-proxy' y lo reemplazamos con '/api', que es lo que TheMealDB espera.
        // Ejemplo: '/api-proxy/json/v1/1/categories.php' se convierte en '/api/json/v1/1/categories.php'
        rewrite: (path) => path.replace(/^\/api-proxy/, '/api'),
      },
    }
  }
});