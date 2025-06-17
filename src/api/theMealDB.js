const API_URL = "https://www.themealdb.com/api/json/v1/1";

/**
 * Función genérica para realizar peticiones a la API.
 * Maneja respuestas de 'meals' y 'categories', y errores de red.
 * @param {string} endpoint - El endpoint de la API a consultar.
 * @returns {Promise<Array>} - Una promesa que resuelve a un array de resultados.
 */
const fetchAPI = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error de red: ${response.status}`);
    }
    const data = await response.json();
    return data.meals || data.categories || [];
  } catch (error) {
    console.error(`Error al obtener datos del endpoint ${endpoint}:`, error);
    throw error;
  }
};

// --- FUNCIONES EXPORTADAS PRINCIPALES ---

export const getCategories = () => fetchAPI('categories.php');

export const getRecipesByCategory = (categoryName) => fetchAPI(`filter.php?c=${categoryName}`);

export const searchRecipeByName = (name) => fetchAPI(`search.php?s=${name}`);

export const getRecipeById = async (id) => {
  const meals = await fetchAPI(`lookup.php?i=${id}`);
  return meals[0] || null;
};

export const getFeaturedRecipes = async () => {
  const featuredCategories = ['Seafood', 'Chicken', 'Beef', 'Pasta', 'Dessert', 'Vegetarian'];
  
  const promises = featuredCategories.map(category => 
    fetch(`${API_URL}/filter.php?c=${category}`).then(res => res.json())
  );
  
  try {
    const results = await Promise.all(promises);
    const allMeals = results.flatMap(result => result.meals || []);
    // Tomamos una muestra y la mezclamos para un resultado más variado y rápido de cargar
    return allMeals.sort(() => 0.5 - Math.random()).slice(0, 24); 
  } catch (error) {
    console.error("Error al obtener las recetas destacadas:", error);
    return [];
  }
};


// --- NUEVA FUNCIÓN DE AYUDA AVANZADA ---

/**
 * Dado un array de recetas básicas (con solo id, nombre e imagen),
 * obtiene los detalles completos de cada una (incluyendo área, categoría, etc.).
 * Esto es necesario para mostrar información enriquecida en las tarjetas de la HomePage.
 * @param {Array} basicRecipes - Array de recetas básicas.
 * @returns {Promise<Array>} - Un array de recetas con todos sus detalles.
 */
export const getFullRecipesDetails = async (basicRecipes) => {
  if (!basicRecipes || basicRecipes.length === 0) {
    return [];
  }
  
  // Creamos un array de promesas, una por cada receta, para llamar a getRecipeById
  const detailPromises = basicRecipes.map(recipe => getRecipeById(recipe.idMeal));
  
  try {
    // Esperamos a que todas las promesas se resuelvan
    const fullRecipes = await Promise.all(detailPromises);
    
    // Filtramos cualquier resultado nulo que pueda haber ocurrido si una receta falló
    return fullRecipes.filter(recipe => recipe !== null);
  } catch (error) {
    console.error("Error al obtener los detalles completos de las recetas:", error);
    return []; // Devolvemos un array vacío en caso de error
  }
};