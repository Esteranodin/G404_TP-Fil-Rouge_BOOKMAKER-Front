/**
 * Formate une erreur API en un objet standard
 * @param {Error} error - L'erreur à formater
 * @returns {Object} - Objet d'erreur formaté
 */
export function formatApiError(error) {
    const errorMessage = error.response?.data?.message 
      || error.response?.data?.detail
      || error.message 
      || 'Une erreur est survenue';
    
    return {
      message: errorMessage,
      status: error.response?.status,
      details: error.response?.data
    };
  }