// Usamos la nueva ruta del proxy
const BASE_URL = "/api-proxy/json/v1/1";

/**
 * Función genérica y robusta para peticiones a través del proxy.
 */
const fetchFromApi = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error de red o del servidor: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error en fetchFromApi para ${endpoint}:`, error);
    throw error;
  }
};

// --- FUNCIONES EXPORTADAS ---

export const getCategories = async () => {
  const data = await fetchFromApi('categories.php');
  return data.categories || [];
};

export const getRecipesByCategory = async (categoryName) => {
  const data = await fetchFromApi(`filter.php?c=${categoryName}`);
  return data.meals || [];
};

// --- FUNCIÓN AÑADIDA Y CORREGIDA ---
export const getRecipesByArea = async (areaName) => {
  const data = await fetchFromApi(`filter.php?a=${areaName}`);
  return data.meals || [];
};

export const searchRecipeByName = async (name) => {
  const data = await fetchFromApi(`search.php?s=${name}`);
  return data.meals || [];
};

export const getRecipeById = async (id) => {
  const data = await fetchFromApi(`lookup.php?i=${id}`);
  return data.meals ? data.meals[0] : null;
};

export const getFeaturedRecipes = async () => {
  const featuredCategories = ['Seafood', 'Chicken', 'Beef', 'Pasta', 'Dessert', 'Vegetarian'];
  const promises = featuredCategories.map(category => getRecipesByCategory(category));
  
  try {
    const results = await Promise.all(promises);
    const allMeals = results.flatMap(result => result || []);
    return allMeals.sort(() => 0.5 - Math.random()).slice(0, 24);
  } catch (error) {
    console.error("Error al obtener las recetas destacadas:", error);
    return [];
  }
};

export const getFullRecipesDetails = async (basicRecipes) => {
  if (!basicRecipes || basicRecipes.length === 0) return [];
  const detailPromises = basicRecipes.map(recipe => getRecipeById(recipe.idMeal));
  
  try {
    const fullRecipes = await Promise.all(detailPromises);
    return fullRecipes.filter(recipe => recipe !== null);
  } catch (error) {
    console.error("Error al obtener los detalles completos:", error);
    return [];
  }
};