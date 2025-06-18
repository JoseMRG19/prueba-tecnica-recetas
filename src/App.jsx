import React from 'react';
import { 
  createBrowserRouter, 
  RouterProvider, 
  Outlet, 
  useNavigate 
} from 'react-router-dom';

// Importación de Componentes de Layout y Páginas
import Navbar from './components/Navbar';
import ScrollProgressBar from './components/ScrollProgressBar'; // <-- CAMBIO: Importamos el nuevo componente
import HomePage from './pages/HomePage';
import RecipeDetailPage from './pages/RecipeDetailPage';

// Importación de Estilos Globales
import './styles/globals.css';

/**
 * AppLayout es el componente principal que define la estructura visual de toda la aplicación.
 * Contiene elementos persistentes como la barra de navegación y el indicador de progreso de scroll.
 */
const AppLayout = () => {
  const navigate = useNavigate();

  // Función que se pasa a la Navbar para manejar el envío de una búsqueda.
  const handleSearchSubmit = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm.trim()}`);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      {/* --- CAMBIO --- */}
      {/* Reemplazamos NavigationLoader por ScrollProgressBar */}
      <ScrollProgressBar />
      
      <Navbar onSearchSubmit={handleSearchSubmit} />

      <main>
        {/* Outlet renderizará la página activa */}
        <Outlet />
      </main>
    </>
  );
};

// Configuración del enrutador de la aplicación.
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { 
        path: "/", 
        element: <HomePage /> 
      },
      { 
        path: "/recipe/:recipeId", 
        element: <RecipeDetailPage /> 
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;