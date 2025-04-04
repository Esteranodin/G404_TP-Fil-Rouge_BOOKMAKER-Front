"use client";

import { useQuery } from '@tanstack/react-query';
import { BookService } from '@/lib/services/bookService';
import { normalizeCollection } from '@/lib/utils/normalizeData';

/**
 * Hook pour récupérer les livres avec pagination et filtres
 * @param {number} page - Numéro de page
 * @param {Object} filters - Filtres à appliquer
 */
export function useBooks(page = 1, filters = {}) {
  const queryResult = useQuery({
    queryKey: ['books', page, filters],
    queryFn: () => BookService.getBooks(page, filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true,  // Garde les données précédentes pendant le chargement
  });
  
  const { data } = queryResult;
  
  // Normalisation des données pour une utilisation cohérente
  const { items: books, totalItems } = normalizeCollection(data);
  
  return {
    books,
    totalItems,
    ...queryResult,
  };
}

/**
 * Hook pour récupérer les catégories
 */
export function useCategories() {
  const queryResult = useQuery({
    queryKey: ['categories'],
    queryFn: () => BookService.getCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes (les catégories changent rarement)
  });
  
  const { data } = queryResult;
  
  // Normalisation des données
  const { items: categories } = normalizeCollection(data);
  
  return {
    categories,
    ...queryResult,
  };
}

/**
 * Hook pour récupérer un livre par son ID
 * @param {string|number} id 
 */
export function useBook(id) {
  const queryResult = useQuery({
    queryKey: ['book', id],
    queryFn: () => BookService.getBookById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
  
  return queryResult;
}