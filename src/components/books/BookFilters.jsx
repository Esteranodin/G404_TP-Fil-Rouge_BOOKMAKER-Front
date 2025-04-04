"use client";
import { useState } from 'react';
import { extractIdFromIri } from '@/lib/utils/normalizeData';

export default function BookFilters({ categories = [], activeFilters = {}, onFiltersChange }) {
  const [searchTerm, setSearchTerm] = useState(activeFilters.search || '');
  
  // Gestion du changement de catégorie
  const handleCategoryChange = (categoryId) => {
    onFiltersChange({
      ...activeFilters,
      category: categoryId === 'all' ? undefined : categoryId
    });
  };
  
  // Gestion de la recherche
  const handleSearch = (e) => {
    e.preventDefault();
    onFiltersChange({
      ...activeFilters,
      search: searchTerm.trim() || undefined
    });
  };
  
  return (
    <div className="mb-6 space-y-4">
      {/* Barre de recherche */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Rechercher un titre..."
          className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-green"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          type="submit"
          className="px-4 py-2 button-green text-white rounded transition-colors"
        >
          Rechercher
        </button>
      </form>
      
      {/* Filtres par catégorie */}
      {Array.isArray(categories) && categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button 
            className={`px-3 py-1 rounded ${!activeFilters.category ? 'button-pink  text-white' : 'button-green  hover:bg-gray-300'}`}
            onClick={() => handleCategoryChange('all')}
          >
            Toutes les catégories
          </button>
          {categories.map(category => {
            const categoryId = category.id || extractIdFromIri(category['@id']);
            const categoryName = category.name || category.label || 'Sans nom';
            
            return (
              <button
                key={categoryId}
                className={`px-3 py-1 rounded ${activeFilters.category === categoryId ? 'button-pink text-white' : 'button-green  hover:bg-gray-300'}`}
                onClick={() => handleCategoryChange(categoryId)}
              >
                {categoryName}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}