// src/api/theMealDB.js

const API_URL = "https://www.themealdb.com/api/json/v1/1";

/**
 * Función genérica para realizar peticiones a la API.
 * Ahora maneja tanto respuestas de 'meals' como de 'categories'.
 * @param {string} endpoint - El endpoint de la API a consultar.
 * @returns {Promise<Array>} - Una promesa que resuelve a un array de resultados.
 */
const fetchAPI = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    
    // CORRECCIÓN CLAVE:
    // Ahora comprueba si la respuesta contiene 'meals' O 'categories'.
    // Si ninguno existe, devuelve un array vacío para evitar errores.
    return data.meals || data.categories || []; 

  } catch (error) {
    console.error(`Error al obtener datos del endpoint ${endpoint}:`, error);
    throw error; 
  }
};

// --- FUNCIONES EXPORTADAS ---

// Esta función ahora funcionará correctamente gracias a la corrección en fetchAPI.
export const getCategories = () => fetchAPI('categories.php');

export const getRecipesByCategory = (categoryName) => fetchAPI(`filter.php?c=${categoryName}`);

export const searchRecipeByName = (name) => fetchAPI(`search.php?s=${name}`);

/**
 * Busca una receta por su ID.
 * @param {string} id - El ID de la receta.
 * @returns {Promise<Object|null>} - Una promesa que resuelve al objeto de la receta o null si no se encuentra.
 */
export const getRecipeById = async (id) => {
  // Esta API devuelve un array con un solo objeto de receta, así que lo extraemos.
  const meals = await fetchAPI(`lookup.php?i=${id}`);
  
  // CORRECCIÓN CLAVE:
  // Devolvemos el primer (y único) elemento del array 'meals'.
  // Si el array está vacío, devuelve 'undefined', lo cual es manejado como 'null' gracias al '||'.
  return meals[0] || null;
};