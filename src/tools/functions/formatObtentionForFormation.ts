import { optionsObtention } from '../../components/Profil/UserFormation/FormFormationCreateUpdate';

export const formatObtention = (numero: number): string => {
   const currentObtention = optionsObtention[numero];
   return `${currentObtention.value}-${currentObtention.label}`;
};
