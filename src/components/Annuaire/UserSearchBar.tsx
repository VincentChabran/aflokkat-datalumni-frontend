import { Flex, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelectUserDisplayStore } from '../../store/useSelectUserDisplayStore';
import { SearchWithSelect } from '../global/SearchWithSelect';
import { optionsAnneeObtention, optionsDiplome } from '../Profil/UserFormation/FormFormationCreateUpdate';
import { CheckboxIsMentor } from './selectiveUserSearch/CheckboxIsMentor';
import { CheckboxJobSearch } from './selectiveUserSearch/CheckboxJobSearch';
import { ResetSearch } from './selectiveUserSearch/ResetSearch';

const rolesOptions = [
   // { value: 'Admin', label: 'Admin' },
   { value: 'Equipe_administrative', label: 'Équipe-Administrative' },
   { value: 'Recruteur', label: 'Recruteur' },
   { value: 'Enseignant', label: 'Enseignant' },
   { value: 'Etudiant', label: 'Étudiant' },
];

export interface UserSearchBarProps {}

export function UserSearchBar(props: UserSearchBarProps) {
   // Récup les filtres + les seteurs depuis le store
   const {
      setDisplayUsers,
      selectByDiplome,
      setSelectByDiplome,
      selectByRoles,
      setSelectByRoles,
      selectByPromotion,
      setSelectByPromotion,
   } = useSelectUserDisplayStore();

   // Si un filtre change Set le display
   useEffect(() => {
      setDisplayUsers();
   }, [selectByDiplome, selectByRoles, selectByPromotion]);

   // reset les filtres quand le composant est détruit
   useEffect(
      () => () => {
         setSelectByDiplome('');
         setSelectByRoles('');
         setSelectByPromotion('0');
      },
      [],
   );

   const tabDisplay = [
      {
         selectByX: selectByRoles,
         setSelectByX: setSelectByRoles,
         title: 'Tous les rôles',
         optionsSelect: rolesOptions,
      },
      {
         selectByX: selectByDiplome,
         setSelectByX: setSelectByDiplome,
         title: 'Tous les diplômes',
         optionsSelect: optionsDiplome,
      },
      {
         selectByX: selectByPromotion,
         setSelectByX: setSelectByPromotion,
         title: 'Promotion',
         optionsSelect: optionsAnneeObtention,
      },
   ];

   return (
      <VStack w="100%" p="10" spacing={5}>
         <Flex w="100%" wrap="wrap" gap={4} justify="center">
            {tabDisplay.map((el) => (
               <SearchWithSelect
                  key={el.title}
                  selectByX={el.selectByX}
                  setSelectByX={el.setSelectByX}
                  title={el.title}
                  optionsSelect={el.optionsSelect}
               />
            ))}
         </Flex>

         <Flex w="100%" wrap="wrap" gap={4} justify="center">
            <CheckboxJobSearch />

            <CheckboxIsMentor />

            <ResetSearch />
         </Flex>
      </VStack>
   );
}
