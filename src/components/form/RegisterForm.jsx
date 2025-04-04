"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FormContainer from "./FormContainer";
import FormField from "@/components/ui/form-field";
import { handleApiError, showSuccess } from "@/lib/utils/errorHandling";
import { useState } from "react";

// Définition du schéma de validation avec Zod
const registerSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Format d'email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  confirmPassword: z.string().min(1, "Veuillez confirmer votre mot de passe")
}).refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { register: registerUser } = useAuth();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const { confirmPassword, ...registrationData } = data;
      await registerUser(registrationData);
      showSuccess("Inscription réussie !");
      router.push("/login?registered=true");
    } catch (err) {
      handleApiError(err, "Échec de l'inscription. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const footer = (
    <p className="text-sm">
      Déjà inscrit ?{" "}
      <Link href="/login" className="text-primary-green hover:underline">
        Se connecter
      </Link>
    </p>
  );

  return (
    <FormContainer title="Créer un compte" footer={footer}>
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
        />
        
        <FormField
          label="Mot de passe"
          id="password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        
        <FormField
          label="Confirmer le mot de passe"
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="pink"
          className="w-full"
        >
          {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
        </Button>
      </form>
    </FormContainer>
  );
}
