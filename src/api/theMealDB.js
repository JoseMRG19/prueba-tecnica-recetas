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
    throw error; // Propaga el error para que el componente que llama pueda manejarlo.
  }
};

// --- FUNCIONES EXPORTADAS ---

export const getCategories = () => fetchAPI('categories.php');

export const getRecipesByCategory = (categoryName) => fetchAPI(`filter.php?c=${categoryName}`);

export const searchRecipeByName = (name) => fetchAPI(`search.php?s=${name}`);

export const getRecipeById = async (id) => {
  const meals = await fetchAPI(`lookup.php?i=${id}`);
  // La API devuelve un array con un solo elemento. Lo extraemos.
  // Si el array está vacío, meals[0] será undefined, y '|| null' lo convertirá en null.
  return meals[0] || null;
};

/**
 * NUEVA FUNCIÓN: Obtiene una selección variada de recetas de categorías populares.
 * Simula una vista de "Todas las recetas" ya que la API no tiene un endpoint para ello.
 * @returns {Promise<Array>} - Una promesa que resuelve a un array de recetas mezcladas.
 */
export const getFeaturedRecipes = async () => {
  // Lista de categorías populares para una muestra variada.
  const featuredCategories = ['Seafood', 'Chicken', 'Beef', 'Pasta', 'Dessert', 'Vegetarian'];
  
  // Creamos un array de promesas, una por cada petición a la API.
  const promises = featuredCategories.map(category => 
    fetch(`${API_URL}/filter.php?c=${category}`).then(res => res.json())
  );
  
  try {
    // Ejecutamos todas las promesas en paralelo para máxima eficiencia.
    const results = await Promise.all(promises);
    
    // Unimos los resultados de todas las llamadas en un solo array plano.
    const allMeals = results.flatMap(result => result.meals || []);

    // Mezclamos el array para que la presentación sea más interesante y no agrupada por categoría.
    return allMeals.sort(() => 0.5 - Math.random());
    
  } catch (error) {
    console.error("Error al obtener las recetas destacadas:", error);
    return []; // En caso de error, devuelve un array vacío para no romper la UI.
  }
};