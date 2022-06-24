import create from 'zustand';

interface UserState {
   id: number;
   email: string;
   nom: string;
   prenom: string;
   profilPictureName: string | undefined;
   roles: string[];
   mentor: boolean;
   setUser: (user: any) => void;
}

export const useUserStore = create<UserState>((set) => ({
   id: 0,
   email: 'sasuke.uchiwa@initial.com',
   nom: 'Uchiwa',
   prenom: 'Initial',
   profilPictureName: undefined,
   roles: ['BossDuShonen'],
   mentor: false,
   setUser: (user) =>
      set((state) => ({
         id: parseInt(user.id),
         email: user.email,
         nom: user.nom,
         prenom: user.prenom,
         profilPictureName: user.profilPictureName,
         roles: user.roles,
         mentor: user.mentor,
      })),
}));
