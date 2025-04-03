import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useMutation } from '@tanstack/react-query';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth doit être utilisé à l'intérieur d'un AuthProvider`);
  }
  return context;
}

// Ajoutez ces logs pour déboguer
export function useLogin() {
  const mutation = useMutation({
    mutationFn: async (credentials) => {
      console.log("Tentative de connexion avec:", credentials);
      try {
        const result = await AuthService.login(credentials);
        console.log("Réponse connexion:", result);
        return result;
      } catch (error) {
        console.error("Erreur connexion:", error);
        throw error;
      }
    }
  });
  
  return mutation;
}