"use client";

import { useState } from 'react';
import { useBooks, useCategories } from '@/hooks/useBooks';
import CardBook from "@/components/layout/CardBook";

export default function BooksPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  
  // Utiliser les hooks avec les données normalisées
  const { data: { items: books, totalItems }, isLoading, error, rawData } = useBooks(page, filters);
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  
  // Logs de débogage
  console.log("BooksPage - Données brutes:", rawData);
  console.log("BooksPage - Livres normalisés:", books);
  console.log("BooksPage - Catégories:", categories);
  
  const totalPages = Math.ceil((totalItems || 0) / 10);

  // Gestion du changement de catégorie
  const handleCategoryChange = (categoryId) => {
    setFilters(prev => ({
      ...prev,
      category: categoryId === 'all' ? undefined : categoryId
    }));
    setPage(1);
  };

  if (isLoading) return <div className="text-center py-10">Chargement des livres...</div>;
  
  if (error) return (
    <div className="text-center py-10 text-red-500">
      Une erreur est survenue: {error.message}
    </div>
  );

  // Si les données ne sont pas encore disponibles
  if (!books) return null;

  return (
    <main className="flex flex-col items-center justify-between p-6 md:p-24">
      <h1 className="mb-8">Explorer notre collection</h1>
      
      {/* Filtres de catégories si disponibles */}
      {Array.isArray(categories) && categories.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <button 
            className={`px-3 py-1 rounded ${!filters.category ? 'bg-primary-green text-white' : 'bg-gray-200'}`}
            onClick={() => handleCategoryChange('all')}
          >
            Toutes les catégories
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-3 py-1 rounded ${filters.category === category.id ? 'bg-primary-green text-white' : 'bg-gray-200'}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
      
      {/* Grille de livres */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(books) && books.length > 0 ? (
          books.map((book) => (
            <CardBook key={book.id} book={book} />
          ))
        ) : (
          <p className="col-span-full text-center py-10">Aucun livre disponible.</p>
        )}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-2 mt-8">
          <button 
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 disabled:opacity-50"
          >
            Précédent
          </button>
          <span className="px-4 py-2">
            Page {page} sur {totalPages}
          </span>
          <button 
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      )}
    </main>
  );
}