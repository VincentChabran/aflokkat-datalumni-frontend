// Pour l'attribution des roles au moment de la création du user
export const formatRolesArray = (
   Admin: boolean,
   Equipe_administrative: boolean,
   Recruteur: boolean,
   Enseignant: boolean,
   Etudiant: boolean,
): string[] => {
   const result = [];

   if (Admin) result.push('Admin');
   if (Equipe_administrative) result.push('Equipe_administrative');
   if (Recruteur) result.push('Recruteur');
   if (Enseignant) result.push('Enseignant');
   if (Etudiant) result.push('Etudiant');

   return result;
};
