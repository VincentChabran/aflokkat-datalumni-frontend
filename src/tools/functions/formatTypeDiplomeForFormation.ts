import { optionsDiplome } from '../../components/Profil/UserFormation/FormFormationCreateUpdate';

export const formatTypeDiplome = (numero: number): string => {
   const currentDiplome = optionsDiplome[numero - 1];
   return `${currentDiplome.value}-${currentDiplome.label}`;
};
