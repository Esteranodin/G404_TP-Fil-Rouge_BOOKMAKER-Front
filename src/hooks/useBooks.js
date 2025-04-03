"use client";

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { BookService } from '@/lib/services/bookService';

export function useBooks(page, filters) {
  const { data, isLoading, error, ...rest } = useQuery({
    queryKey: ['books', page, filters],
    queryFn: async () => {
      console.log("Appel API books avec:", { page, filters });
      const result = await BookService.getBooks(page, filters);
      console.log("Réponse API books:", result);
      return result;
    }
  });
  
  // Normalisation des données avec logs
  const normalizedData = useMemo(() => {
    console.log("Normalisation des données books:", data);
    
    if (!data) return { items: [], totalItems: 0 };
    
    let items = [];
    let totalItems = 0;
    
    if (Array.isArray(data)) {
      console.log("Format tableau détecté");
      items = data;
      totalItems = data.length;
    } else if (data['hydra:member']) {
      console.log("Format API Platform détecté");
      items = data['hydra:member'];
      totalItems = data['hydra:totalItems'] || items.length;
    } else if (data.items) {
      console.log("Format avec items détecté");
      items = data.items;
      totalItems = data.totalItems || items.length;
    } else {
      // Essai de déterminer le format
      console.log("Format inconnu, structure:", Object.keys(data));
      
      // Si c'est un objet avec des propriétés numériques (comme un objet simulant un tableau)
      if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
        const possibleItems = Object.values(data);
        if (possibleItems.length > 0) {
          console.log("Tentative d'utiliser Object.values");
          items = possibleItems;
          totalItems = possibleItems.length;
        }
      }
    }
    
    console.log("Données normalisées:", { items, totalItems });
    return { items, totalItems };
  }, [data]);
  
  return { 
    data: normalizedData, 
    rawData: data,
    isLoading,
    error,
    ...rest 
  };
}

export function useBook(id) {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => BookService.getBookById(id),
    enabled: !!id, // Ne s'exécute que si l'ID est fourni
  });
}

export function useCategories() {
  const { data, ...rest } = useQuery({
    queryKey: ['categories'],
    queryFn: () => BookService.getCategories()
  });
  
  // Normalisation des données
  const normalizedData = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (data['hydra:member']) return data['hydra:member'];
    if (data.items) return data.items;
    return [];
  }, [data]);
  
  return { data: normalizedData, ...rest };
}