export default function ErrorState({ error, onRetry }) {
    const errorMessage = 
      error?.message || 
      error?.details?.detail ||
      "Une erreur est survenue lors du chargement des données.";
    
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12 text-red-500 mx-auto mb-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        
        <h2 className="text-lg font-semibold text-red-700 mb-2">
          Erreur de chargement
        </h2>
        
        <p className="text-gray-700 mb-4">{errorMessage}</p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-primary-green text-white rounded hover:bg-green-700 transition-colors"
          >
            Réessayer
          </button>
        )}
        
        {!onRetry && (
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-green text-white rounded hover:bg-green-700 transition-colors"
          >
            Actualiser la page
          </button>
        )}
      </div>
    );
  }