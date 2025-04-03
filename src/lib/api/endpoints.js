export const API_ENDPOINTS = {

  AUTH: {
    LOGIN: '/login_check',
    REGISTER: '/register',
    ME: '/user/me',
    },


  BOOKS: {
    ALL: '/books',
    SINGLE: (id) => `/books/${id}`,
    CATEGORIES: '/categories',
    // CATEGORIE: (id) => `/categories/${id}`,
    AUTHORS: '/authors',
    // AUTHOR: (id) => `/authors/${id}`,
  },

  // Autres endpoints...
};