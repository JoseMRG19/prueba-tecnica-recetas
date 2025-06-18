# MyRecipeBook - Aplicación de Búsqueda de Recetas

¡Bienvenido a MyRecipeBook! Esta es una aplicación web moderna y completamente funcional construida con React, diseñada para ofrecer una experiencia de usuario fluida y atractiva al explorar, buscar y descubrir recetas de cocina de todo el mundo, utilizando la API de TheMealDB.

**✨Copia y pega el link prueba-tecnica-recetas.vercel.app Ver la aplicación en vivo✨** 
---

## 🚀 Características Principales

*   **Diseño Profesional y Responsivo:** Una interfaz elegante y moderna, inspirada en las mejores webs de recetas, que se adapta perfectamente a dispositivos de escritorio, tablets y móviles.
*   **Carrusel de Recetas Destacadas:** Una sección "héroe" dinámica en la página de inicio que muestra recetas populares de forma automática para captar la atención del usuario.
*   **Búsqueda Inteligente en la Navbar:** Una barra de búsqueda siempre accesible con:
    *   **Autocompletado:** Ofrece sugerencias en tiempo real a medida que el usuario escribe.
    *   **Optimización `useDebounce`:** Evita llamadas excesivas a la API, mejorando el rendimiento.
*   **Filtros Visuales Avanzados:**
    *   **Filtro por Categoría:** Con iconos para una identificación rápida y visual.
    *   **Filtro por País:** Con banderas para una experiencia internacional.
*   **Navegación Fluida y Profesional:**
    *   **Barra de Progreso de Scroll:** Una delgada línea en la parte superior que indica la posición del usuario en la página.
    *   **Navbar Dinámica:** Transparente al inicio, se vuelve sólida y con sombra al hacer scroll.
    *   **Scroll Suave Automático:** Al seleccionar un filtro, la página se desplaza elegantemente a la sección de resultados.
*   **Página de Detalle Completa y Legible:**
    *   Muestra toda la información clave: imagen/video de YouTube, categoría, área, ingredientes y una lista de instrucciones numerada y estilizada para una fácil lectura.
*   **Manejo de Estado en la URL:** El estado de los filtros se refleja en la URL (`?category=...`, `?area=...`), permitiendo a los usuarios compartir enlaces a vistas específicas.

---

## 🛠️ Stack Tecnológico y Decisiones Clave

*   **Framework:** **React.js** (con **Vite** para un entorno de desarrollo ultrarrápido).
*   **Routing:** **React Router DOM v6**, utilizando una arquitectura de Layouts con `<Outlet />` para una estructura limpia y escalable.
*   **Estilos:** **CSS puro** con una organización modular. Se utilizan variables CSS para un temizado consistente y media queries para un diseño completamente responsivo.
*   **Llamadas a API:** `fetch` nativo con `async/await` para un código asíncrono moderno y legible.
*   **Librerías Adicionales:**
    *   **React Icons:** Para la iconografía de la UI.
    *   **React Responsive Carousel:** Para el carrusel de la página de inicio.
    *   **React Transition Group:** Para las animaciones del megamenú.

### Decisiones de Arquitectura Destacadas

*   **Proxy en Vite:** Se configuró un proxy de desarrollo para solucionar elegantemente los problemas de **CORS** con la API externa, una solución robusta a un problema común del mundo real.
*   **Enriquecimiento de Datos:** Para superar las limitaciones de la API (que no devuelve todos los datos en las listas), se implementó una lógica de obtención de datos en dos pasos (`getFullRecipesDetails`). Esto permite mostrar información más rica en las tarjetas (como la categoría y la bandera) a costa de una carga inicial controlada, priorizando la experiencia del usuario.
*   **Resiliencia de la API:** La función de `fetch` se mejoró con un sistema de **reintentos y backoff exponencial**, haciendo la aplicación más resistente a fallos temporales del servidor de la API (errores 500 o de red).
*   **Gestión de Estado Centralizada:** La lógica de navegación se centralizó en `App.jsx`, permitiendo que componentes como la `Navbar` y los filtros se comuniquen de forma desacoplada y eficiente.

---

## 🔧 Instalación y Ejecución Local

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/JoseMRG19/prueba-tecnica-recetas.git
    ```
2.  **Navega a la carpeta del proyecto:**
    ```bash
    cd prueba-tecnica-recetas
    ```
3.  **Instala las dependencias:**
    ```bash
    npm install
    ```
4.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
5.  Abre [http://localhost:5173](http://localhost:5173) (o el puerto que indique Vite) en tu navegador para ver la aplicación.

---

¡Gracias por revisar mi proyecto!
