"use client";

import { useState } from 'react';
import { useBooks, useCategories } from '@/hooks/useBooks';
import BooksView from './BooksView';

export default function BooksContainer() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  
  const { 
    books, 
    totalItems, 
    isLoading: isBooksLoading, 
    error: booksError 
  } = useBooks(page, filters);
  
  const { 
    categories, 
    isLoading: isCategoriesLoading,
    error: categoriesError 
  } = useCategories();
  
  // Calcul des pages totales
  const itemsPerPage = 10;
  const totalPages = Math.ceil((totalItems || 0) / itemsPerPage);

  // Gestion des filtres
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Retour à la première page lors d'un changement de filtre
  };

  return (
    <BooksView 
      books={books}
      categories={categories}
      currentPage={page}
      totalPages={totalPages}
      isLoading={isBooksLoading || isCategoriesLoading}
      error={booksError || categoriesError}
      onPageChange={setPage}
      onFiltersChange={handleFiltersChange}
      activeFilters={filters}
    />
  );
}