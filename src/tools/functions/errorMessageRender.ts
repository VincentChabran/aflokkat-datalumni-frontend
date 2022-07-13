import { CombinedError } from 'urql';

interface errorExtensions {
   response: {
      statusCode: number;
      message: string[];
      error: string;
   };
}

// Format pour les toast
export const errorMessageToast = (errorRow: CombinedError) => {
   // Juste pour typer le .extensions car légèrement buger de base
   const formatResponse = [];
   console.log(errorRow);

   if (errorRow.message === '[Network] Failed to fetch') {
      formatResponse.push('Connexion au serveur impossible');
      return formatResponse;
   }

   if (errorRow?.graphQLErrors[0]?.extensions) {
      const { response } = errorRow?.graphQLErrors[0]?.extensions as unknown as errorExtensions;
      if (response?.message?.includes('email must be a lowercase string'))
         formatResponse.push("L'email doit être en minuscule");
   }

   return formatResponse;
};
