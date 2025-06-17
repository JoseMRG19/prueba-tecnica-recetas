import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import Navbar from './components/Navbar';
import './styles/globals.css';

const AppLayout = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm.trim()}`);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      {/* La Navbar ahora está en el nivel superior, sin contenedores que la limiten */}
      <Navbar onSearchSubmit={handleSearchSubmit} />
      <main>
        {/* El Outlet renderizará las páginas, que tendrán su propio .container */}
        <Outlet />
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