// src/App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import './styles/globals.css';

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/recipe/:recipeId", element: <RecipeDetailPage /> },
]);

function App() {
  // Simplemente renderiza el RouterProvider
  return <RouterProvider router={router} />;
}

export default App;