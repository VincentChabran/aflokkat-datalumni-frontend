import create from 'zustand';

interface UserState {
   idUserStore: number;
   emailUserStore: string;
   nomUserStore: string;
   prenomUserStore: string;
   profilPictureNameUserStore: string | null;
   rolesUserStore: string[];
   mentorUserStore: boolean;
   setUserStore: (user: any) => void;
   setProfilPictureNameUserStore: (imgName: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
   idUserStore: 0,
   emailUserStore: 'sasuke.uchiwa@initial.com',
   nomUserStore: 'Uchiwa',
   prenomUserStore: 'Initial',
   profilPictureNameUserStore: null,
   rolesUserStore: ['BossDuShonen'],
   mentorUserStore: false,
   setUserStore: (user) =>
      set((state) => ({
         idUserStore: parseInt(user.id),
         emailUserStore: user.email,
         nomUserStore: user.nom,
         prenomUserStore: user.prenom,
         profilPictureNameUserStore: user.profilPictureName,
         rolesUserStore: user.roles,
         mentorUserStore: user.mentor,
      })),
   setProfilPictureNameUserStore: (imgName) => set((state) => ({ profilPictureNameUserStore: imgName })),
}));
