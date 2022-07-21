import create from 'zustand';
import { OffreGrid } from '../components/OffresEmploi/DisplayOffreGrid';

interface useOffresEmploiDisplayState {
   // Tous les offres après la requete du back pour le displayUserGrid
   offres: OffreGrid[] | undefined;
   setOffres: (offres: OffreGrid[]) => void;
   addOffre: (offre: OffreGrid) => void;
   updateOffre: (offre: OffreGrid) => void;
   deleteOffre: (id: number) => void;

   // Pour l'affichage avec la sélection des champs de recherche
   displayOffres: OffreGrid[] | undefined;
   setDisplayOffres: () => void;

   selectByMotsClesNomDuPoste: string;
   setSelectByMotsClesNomDuPoste: (search: string) => void;
}

export const useOffresEmploiDisplayStore = create<useOffresEmploiDisplayState>((set) => ({
   offres: undefined,
   setOffres: (offres) => set(() => ({ offres })),
   addOffre: (offre) => set((state) => ({ offres: state.offres?.concat(offre) })),
   updateOffre: (offre) =>
      set((state) => {
         const index = state.offres?.findIndex((el) => el.id === offre.id);
         state.offres?.splice(index!, 1, offre);
         return { offres: state.offres };
      }),
   deleteOffre: (id) =>
      set((state) => {
         const index = state.offres?.findIndex((el) => el.id === id);
         state.offres?.splice(index!, 1);
         return { offres: state.offres };
      }),

   displayOffres: undefined,
   setDisplayOffres: () =>
      set((state) => ({
         displayOffres: state.offres?.filter((offre) =>
            offre.nomDuPoste.toLocaleLowerCase().includes(state.selectByMotsClesNomDuPoste),
         ),
      })),

   selectByMotsClesNomDuPoste: '',
   setSelectByMotsClesNomDuPoste: (search) => set(() => ({ selectByMotsClesNomDuPoste: search })),
}));
