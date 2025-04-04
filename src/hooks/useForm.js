import { useState } from 'react';

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Mettre à jour les valeurs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur du champ lorsqu'il est modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Valider un formulaire selon des règles
  const validate = (validationRules) => {
    const newErrors = {};
    let isValid = true;

    Object.entries(validationRules).forEach(([field, rules]) => {
      if (rules.required && !values[field]) {
        newErrors[field] = 'Ce champ est requis';
        isValid = false;
      } else if (rules.minLength && values[field]?.length < rules.minLength) {
        newErrors[field] = `Ce champ doit contenir au moins ${rules.minLength} caractères`;
        isValid = false;
      } else if (rules.pattern && !rules.pattern.test(values[field])) {
        newErrors[field] = rules.message || 'Format invalide';
        isValid = false;
      } else if (rules.match && values[field] !== values[rules.match]) {
        newErrors[field] = rules.message || 'Les valeurs ne correspondent pas';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Réinitialiser le formulaire
  const resetForm = (newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setGlobalError('');
    setSuccessMessage('');
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    isLoading,
    setIsLoading,
    globalError,
    setGlobalError,
    successMessage,
    setSuccessMessage,
    handleChange,
    validate,
    resetForm
  };
}