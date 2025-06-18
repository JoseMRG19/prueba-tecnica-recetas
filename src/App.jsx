import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import ScrollProgressBar from './components/ScrollProgressBar';
import './styles/globals.css';

const AppLayout = () => {
  const navigate = useNavigate();

  // Función para la búsqueda desde la Navbar
  const handleSearchSubmit = (searchTerm) => {
    navigate(searchTerm.trim() ? `/?search=${searchTerm.trim()}` : '/');
  };
  
  // Función para los filtros que también maneja el scroll
  const handleFilterNavigate = (filterUrl) => {
    navigate(filterUrl);
    
    // Hacemos scroll después de navegar
    setTimeout(() => {
      const resultsSection = document.getElementById('results');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <>
      <ScrollProgressBar />
      {/* Pasamos ambas funciones a la Navbar */}
      <Navbar onSearchSubmit={handleSearchSubmit} onFilterNavigate={handleFilterNavigate} />
      <main>
        {/* Pasamos la función de filtro al Outlet para que HomePage la use */}
        <Outlet context={{ handleFilterNavigate }} />
      </main>
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/recipe/:recipeId", element: <RecipeDetailPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;