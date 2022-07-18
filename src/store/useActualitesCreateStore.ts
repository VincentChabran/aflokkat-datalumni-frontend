import create from 'zustand';

interface ActualitesCreateState {
   isCreatedOrDelete: boolean;
   setIsCreatedOrDelete: (isCreatedOrDelete: boolean) => void;
}

export const useActualitesCreateStore = create<ActualitesCreateState>((set) => ({
   isCreatedOrDelete: false,
   setIsCreatedOrDelete: (isCreatedOrDelete) => set((state) => ({ isCreatedOrDelete })),
}));
