import apiClient from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

export const BookService = {
  /**
   * Récupération de tous les livres avec pagination et filtres optionnels
   */
  getBooks: async (page = 1, filters = {}) => {
    try {
      const params = { page, ...filters };
      const response = await apiClient.get(API_ENDPOINTS.BOOKS.ALL, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erreur de récupération des livres" };
    }
  },

  /**
   * Récupération d'un livre spécifique par son identifiant
   */
  getBookById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BOOKS.SINGLE(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erreur de récupération du livre" };
    }
  },

  /**
   * Récupération des catégories de livres
   */
  getCategories: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BOOKS.CATEGORIES);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erreur de récupération des catégories" };
    }
  },

  /**
   * Récupération d'une catégorie'
   */
  // getCategorieById: async (id) => {
  //   try {
  //     const response = await apiClient.get(API_ENDPOINTS.BOOKS.CATEGORIES.CATEGORIE(id));
  //     return response.data;
  //   } catch (error) {
  //     throw error.response?.data || { message: "Erreur de récupération de la catégorie" };
  //   }
  // },

  /**
   * Récupération de tous les auteurs
   */
  // getAuthors: async (page = 1, filters = {}) => {
  //   try {
  //     const params = { page, ...filters };
  //     const response = await apiClient.get(API_ENDPOINTS.BOOKS.AUTHORS, { params });
  //     return response.data;
  //   } catch (error) {
  //     throw error.response?.data || { message: "Erreur de récupération des livres" };
  //   }
  // },

  
  /**
   * Récupération d'un auteur'
   */
  // getAuthorById: async (id) => {
  //   try {
  //     const response = await apiClient.get(API_ENDPOINTS.BOOKS.AUTHORS.AUTHOR(id));
  //     return response.data;
  //   } catch (error) {
  //     throw error.response?.data || { message: "Erreur de récupération de la catégorie" };
  //   }
  // },
};

export default BookService;