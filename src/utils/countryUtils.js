// Mapeo de áreas de TheMealDB a códigos de país ISO 3166-1 alfa-2
const areaToCountryCode = {
  "American": "US",
  "British": "GB",
  "Canadian": "CA",
  "Chinese": "CN",
  "Croatian": "HR",
  "Dutch": "NL",
  "Egyptian": "EG",
  "Filipino": "PH",
  "French": "FR",
  "Greek": "GR",
  "Indian": "IN",
  "Irish": "IE",
  "Italian": "IT",
  "Jamaican": "JM",
  "Japanese": "JP",
  "Kenyan": "KE",
  "Malaysian": "MY",
  "Mexican": "MX",
  "Moroccan": "MA",
  "Polish": "PL",
  "Portuguese": "PT",
  "Russian": "RU",
  "Spanish": "ES",
  "Thai": "TH",
  "Tunisian": "TN",
  "Turkish": "TR",
  "Vietnamese": "VN",
  "Unknown": "AQ", // Usamos la Antártida para "desconocido"
};

/**
 * Obtiene la URL de la bandera de un país a partir del área de la receta.
 * @param {string} area - El área de la receta (ej. "Italian").
 * @returns {string|null} - La URL de la imagen de la bandera o null si no se encuentra.
 */
export const getFlagUrl = (area) => {
  const countryCode = areaToCountryCode[area];
  if (!countryCode) {
    return null; // Si no tenemos el código, no mostramos bandera
  }
  // Usamos la API de flagcdn.com, que es gratuita y rápida.
  return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
};