import apiClient from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { handleApiError } from '../utils/errorHandling';


class BookServiceClass {
  /**
   * Récupération de tous les livres avec pagination et filtres optionnels
   * @param {number} page 
   * @param {Object} filters
   * @returns {Promise<Object>}
   */
  async getBooks(page = 1, filters = {}) {
    const params = this.#prepareParams(page, filters);
    return this.#get(API_ENDPOINTS.BOOKS.ALL, { params });
  }

  /**
   * Récupération d'un livre spécifique par son identifiant
   * @param {string|number} id 
   * @returns {Promise<Object>} 
   */
  async getBookById(id) {
    return this.#get(API_ENDPOINTS.BOOKS.SINGLE(id));
  }

  /**
   * Récupération des catégories de livres
   * @returns {Promise<Object>} - Données des catégories
   */
  async getCategories() {
    return this.#get(API_ENDPOINTS.BOOKS.CATEGORIES);
  }

  /**
   * Préparation des paramètres de requête
   * @param {number} page 
   * @param {Object} filters 
   * @returns {Object} 
   */
  #prepareParams(page, filters) {
    const params = {
      page,
      itemsPerPage: 10,
    };
    
    // Gestion des filtres spécifiques
    if (filters.category) {
      params.category = filters.category;
    }
    
    if (filters.search) {
      params.title = filters.search;
    }
    
    // Autres filtres possibles
    ['author', 'publisher', 'minPrice', 'maxPrice'].forEach(key => {
      if (filters[key]) {
        params[key] = filters[key];
      }
    });
    
    return params;
  }

  /**
   * Méthode générique pour les requêtes GET
   * @param {string} endpoint 
   * @param {Object} options - Options axios
   * @returns {Promise<Object>} - Données de réponse
   * @throws {Error} 
   */
  async #get(endpoint, options = {}) {
    try {
      const response = await apiClient.get(endpoint, options);
      return response.data;
    } catch (error) {
     throw handleApiError(error);
    }
      };
}

export const BookService = new BookServiceClass();
export default BookService;