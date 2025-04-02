// hooks React Query dans hooks/ pour gérer les appels API, le cache et les états de chargement"use client";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
  return useContext(AuthContext);
}