"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/FormField";
import FormContainer from "@/components/ui/FormContainer";

// Schéma pour le formulaire de profil
const profileSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Format d'email invalide").optional()
});

export default function UserDashboard() {
  const { user, loading, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: ""
    }
  });

  // Mettre à jour le formulaire lorsque les données utilisateur sont disponibles
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || ""
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    setGlobalError("");
    setSuccessMessage("");
    
    try {
      // Ici vous pourriez implémenter la mise à jour du profil via un service d'API
      console.log("Mise à jour du profil:", data);
      
      // Simulons une mise à jour réussie
      setSuccessMessage("Profil mis à jour avec succès!");
      setIsEditing(false);
    } catch (err) {
      setGlobalError("Erreur lors de la mise à jour du profil");
      console.error(err);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Si on annule l'édition, on réinitialise le formulaire
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || ""
      });
    }
    setIsEditing(!isEditing);
    setGlobalError("");
    setSuccessMessage("");
  };

  if (loading) {
    return <div className="text-center py-8">Chargement du profil...</div>;
  }

  if (!user) {
    return <div className="text-center py-8">Utilisateur non connecté</div>;
  }

  return (
    <FormContainer 
      title="Mon Tableau de Bord" 
      error={globalError}
    >
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      
      <div className="space-y-6">
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Prénom"
                id="firstName" 
                {...register("firstName")}
                error={errors.firstName?.message}
              />
              
              <FormField
                label="Nom"
                id="lastName"
                {...register("lastName")}
                error={errors.lastName?.message}
              />
            </div>
            
            <FormField
              label="Email"
              id="email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
              disabled
            />
            
            <div className="flex space-x-4">
              <Button type="submit" variant="pink">
                Enregistrer
              </Button>
              <Button type="button" variant="outline" onClick={handleEditToggle}>
                Annuler
              </Button>
            </div>
          </form>
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Prénom</h3>
                <p className="mt-1">{user.firstName || "-"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Nom</h3>
                <p className="mt-1">{user.lastName || "-"}</p>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1">{user.email}</p>
            </div>
            <div className="flex space-x-4">
              <Button onClick={handleEditToggle} variant="outline">
                Modifier le profil
              </Button>
              <Button onClick={logout} variant="destructive">
                Déconnexion
              </Button>
            </div>
          </div>
        )}
      </div>
    </FormContainer>
  );
}