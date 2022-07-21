import create from 'zustand';
import { ActualiteGrid } from '../components/Actualites/DisplayActualitesGrid';

interface ActualitesDisplayState {
   actualites: ActualiteGrid[] | undefined;
   setActualites: (actualites: ActualiteGrid[]) => void;
   addActualites: (actu: ActualiteGrid) => void;

   displayActualites: ActualiteGrid[] | undefined;
   setDisplayActualites: () => void;
}

export const useActualitesDisplayStore = create<ActualitesDisplayState>((set) => ({
   actualites: undefined,
   setActualites: (actualites) => set((state) => ({ actualites })),
   addActualites: (actu) => set((state) => ({ actualites: state.actualites?.concat(actu) })),

   displayActualites: undefined,
   setDisplayActualites: () => set((state) => ({ displayActualites: state.actualites })),
}));
