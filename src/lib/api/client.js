import axios from 'axios';

// Récupération de l'URL de l'API depuis les variables d'environnement
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Création d'une instance axios avec une configuration de base
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/ld+json',
  },
});

// Ajoutez ces logs pour déboguer

// Intercepteur pour les requêtes
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log("Envoi requête API:", config.url, "avec token:", token ? "présent" : "absent");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Erreur requête API:", error);
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
apiClient.interceptors.response.use(
  (response) => {
    console.log("Réponse API:", response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error("Erreur réponse API:", 
      error.response ? `${error.response.status} - ${error.response.config.url}` : error.message);
    return Promise.reject(error);
  }
);

export default apiClient;