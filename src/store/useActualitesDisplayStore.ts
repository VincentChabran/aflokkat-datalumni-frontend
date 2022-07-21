import create from 'zustand';
import { ActualiteGrid } from '../components/Actualites/DisplayActualitesGrid';

interface ActualitesDisplayState {
   actualites: ActualiteGrid[] | undefined;
   setActualites: (actualites: ActualiteGrid[]) => void;
   addActualite: (actu: ActualiteGrid) => void;
   updateActualite: (actu: ActualiteGrid) => void;
   deleteActualite: (id: number) => void;

   displayActualites: ActualiteGrid[] | undefined;
   setDisplayActualites: () => void;

   selectByCategorie: string;
   setSelectByCategorie: (selectByCategorie: string) => void;

   sortByMoreRecent: string;
   setSortByMoreRecent: (sortByMoreRecent: string) => void;
}

export const useActualitesDisplayStore = create<ActualitesDisplayState>((set) => ({
   actualites: undefined,
   setActualites: (actualites) => set((state) => ({ actualites })),
   addActualite: (actu) => set((state) => ({ actualites: state.actualites?.concat(actu) })),
   updateActualite: (actu) =>
      set((state) => {
         const index = state.actualites?.findIndex((el) => el.id === actu.id);
         state.actualites?.splice(index!, 1, actu);
         return { actualites: state.actualites };
      }),
   deleteActualite: (id) =>
      set((state) => {
         const index = state.actualites?.findIndex((el) => el.id === id);
         state.actualites?.splice(index!, 1);
         return { actualites: state.actualites };
      }),

   displayActualites: undefined,
   setDisplayActualites: () =>
      set((state) => ({
         displayActualites: state.actualites
            ?.filter((actu) => actu.categorie.includes(state.selectByCategorie))
            .sort(
               (a, b) =>
                  new Date((!state.sortByMoreRecent ? b : a).dateCreation).getTime() -
                  new Date((!state.sortByMoreRecent ? a : b).dateCreation).getTime(),
            ),
      })),

   selectByCategorie: '',
   setSelectByCategorie: (selectByCategorie) => set(() => ({ selectByCategorie })),

   sortByMoreRecent: '',
   setSortByMoreRecent: (sortByMoreRecent) => set(() => ({ sortByMoreRecent })),
}));
