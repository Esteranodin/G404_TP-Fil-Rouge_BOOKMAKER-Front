/**
 * Utilitaire pour normaliser les données provenant de différentes sources d'API
 */

/**
 * Normalise un objet ou tableau de données pour obtenir un tableau d'items
 * @param {Object|Array} data - Les données à normaliser
 * @returns {Object} - Objet normalisé avec items et totalItems
 */
export function normalizeCollection(data) {
  if (!data) return { items: [], totalItems: 0 };
  
  let items = [];
  let totalItems = 0;
  
  if (Array.isArray(data)) {
    items = data;
    totalItems = data.length;
  } else if (data['hydra:member']) {
    items = data['hydra:member'];
    totalItems = data['hydra:totalItems'] || items.length;
  } else if (data.member) {
    items = data.member;
    totalItems = data.totalItems || items.length;
  } else if (data.items) {
    items = data.items;
    totalItems = data.totalItems || items.length;
  } else {
    // Fallback pour les formats inconnus mais structurés
    if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
      const possibleItems = Object.values(data).filter(val => typeof val === 'object' && val !== null);
      if (possibleItems.length > 0) {
        items = possibleItems;
        totalItems = possibleItems.length;
      }
    }
  }
  
  return { items, totalItems };
}

/**
 * Extrait l'ID à partir d'un IRI (Internationalized Resource Identifier)
 * @param {string} iri - IRI de la ressource (/api/books/1)
 * @returns {string|null} - ID extrait ou null
 */
export function extractIdFromIri(iri) {
  if (!iri || typeof iri !== 'string') return null;
  
  // Extrait le dernier segment de l'URI
  const segments = iri.split('/');
  return segments[segments.length - 1] || null;
}

/**
 * Extrait les IDs d'un tableau d'IRIs
 * @param {Array<string>} iris - Tableau d'IRIs
 * @returns {Array<string>} - Tableau d'IDs
 */
export function extractIdsFromIriArray(iris) {
  if (!Array.isArray(iris)) return [];
  
  return iris.map(iri => extractIdFromIri(iri)).filter(Boolean);
}