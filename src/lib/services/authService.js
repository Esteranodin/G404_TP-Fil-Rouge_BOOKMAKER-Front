import axios from "axios";

// Il est préférable de ne pas hardcoder l'URL de l'API ici. Utilisez une variable d'environnement ou un fichier de configuration.
const API_URL = "https://localhost:8000/api";

// Configuration Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/ld+json",
  },
});

// Intercepteur pour ajouter le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const AuthService = {
  /**
   * Inscription d'un nouvel utilisateur
   * @param {Object} userData - données de l'utilisateur
   * @returns {Promise} - promesse résolue avec les données de l'utilisateur
   */
  register: async (userData) => {
    try {
      const response = await api.post("/register", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erreur d'inscription" };
    }
  },

  /**
   * Connexion d'un utilisateur
   * @param {string} email - adresse email
   * @param {string} password - mot de passe
   * @returns {Promise} - promesse résolue avec le token JWT
   */
  login: async (email, password) => {
    try {
      const response = await api.post("/login_check", {
        username: email, // Souvent, l'API JWT attend "username" même si c'est un email
        password,
      });
      
      // Stocke le token JWT dans le localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erreur de connexion" };
    }
  },

  /**
   * Déconnexion de l'utilisateur
   */
  logout: () => {
    localStorage.removeItem("token");
  },

  /**
   * Vérifier si l'utilisateur est connecté
   * @returns {boolean} - vrai si l'utilisateur est connecté
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  /**
   * Récupère les informations de l'utilisateur actuel
   * @returns {Promise} - promesse résolue avec les données de l'utilisateur
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get("/user/me");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erreur d'obtention des données utilisateur" };
    }
  },
};

export default AuthService;