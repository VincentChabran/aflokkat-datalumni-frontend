import create from 'zustand';
import { User } from '../components/Annuaire/DisplayUserGrid';

interface SelectUserDisplayState {
   // Tous les users après la requete vers le back pour le displayUserGrid
   users: User[] | undefined;
   setUsers: (users: User[]) => void;

   // Pour l'affichage avec la sélection des champs de recherche Select
   displayUsers: User[] | undefined;
   setDisplayUsers: () => void;

   // Pour la valeur du search by roles
   selectByRoles: string;
   setSelectByRoles: (role: string) => void;

   // Pour la valeur de searchByDiplome
   selectByDiplome: string;
   setSelectByDiplome: (diplome: string) => void;

   // Pour la valeur de searchByPromotion
   selectByPromotion: number;
   setSelectByPromotion: (promo: number) => void;

   // Pour la valeur de checkboxJobSearch
   selectByJobSearch: boolean;
   setSelectByJobSearch: (checked: boolean) => void;

   selectByMentor: boolean;
   setSelectByMentor: (checked: boolean) => void;

   resetFilter: () => void;
}

export const useSelectUserDisplayStore = create<SelectUserDisplayState>((set) => ({
   users: undefined,
   setUsers: (users) => set(() => ({ users })),

   displayUsers: undefined,
   setDisplayUsers: () =>
      set((state) => ({
         displayUsers: state.users?.filter(
            (user) =>
               (state.selectByRoles ? user.roles.includes(state.selectByRoles) : user) &&
               (state.selectByDiplome ? user.formations.some((f) => f.typeDiplome === state.selectByDiplome) : user) &&
               (state.selectByPromotion ? user.formations.some((f) => f.anneeObtention === state.selectByPromotion) : user) &&
               (state.selectByJobSearch ? user.rechercheEmploi : user) &&
               (state.selectByMentor ? user.mentor : user),
         ),
      })),

   selectByRoles: '',
   setSelectByRoles: (role) => set(() => ({ selectByRoles: role })),

   selectByDiplome: '',
   setSelectByDiplome: (diplome) => set(() => ({ selectByDiplome: diplome })),

   selectByPromotion: 0,
   setSelectByPromotion: (promotion) => set(() => ({ selectByPromotion: promotion })),

   selectByJobSearch: false,
   setSelectByJobSearch: (isChecked) => set(() => ({ selectByJobSearch: isChecked })),

   selectByMentor: false,
   setSelectByMentor: (isChecked) => set(() => ({ selectByMentor: isChecked })),

   resetFilter: () =>
      set(() => ({
         selectByRoles: '',
         selectByDiplome: '',
         selectByPromotion: 0,
         selectByJobSearch: false,
         selectByMentor: false,
      })),
}));
