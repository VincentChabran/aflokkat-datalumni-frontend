export const formatDateFinExperiencePro = (dateFinMois: string, dateFinAnnee: string, aujourdhui: boolean): string => {
   if (aujourdhui) return "Aujourd'hui";
   else return dateFinMois + '/' + dateFinAnnee;
};
