import create from 'zustand';

interface ActualitesCreateState {
   isCreated: boolean;
   setIsCreated: (isCreated: boolean) => void;
}

export const useActualitesCreateStore = create<ActualitesCreateState>((set) => ({
   isCreated: false,
   setIsCreated: (isCreated) => set((state) => ({ isCreated })),
}));
