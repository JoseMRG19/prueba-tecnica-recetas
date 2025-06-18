// src/utils/countryUtils.js

// Esta es la ÚNICA declaración de la constante.
// La palabra 'export' al principio hace que esté disponible para otros archivos.
export const areaToCountryCode = {
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
};

// Esta función se queda exactamente igual.
export const getFlagUrl = (area) => {
  const countryCode = areaToCountryCode[area];
  if (!countryCode) {
    return null;
  }
  return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
};