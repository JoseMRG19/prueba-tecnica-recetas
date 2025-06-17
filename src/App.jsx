import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import Navbar from './components/Navbar';
import './styles/globals.css';

const AppLayout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Función para manejar la búsqueda desde la Navbar
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term) {
      navigate(`/?search=${term}`);
    } else {
      navigate('/'); // Si la búsqueda se borra, vuelve a la home principal
    }
  };

  return (
    <>
      <Navbar onSearch={handleSearch} initialSearchTerm={searchTerm} />
      <main>
        {/* Pasamos el término de búsqueda a través del contexto del Outlet */}
        <Outlet context={{ searchTerm, setSearchTerm: handleSearch }} />
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