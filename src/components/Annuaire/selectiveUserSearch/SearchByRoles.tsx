import { ChangeEvent, useEffect } from 'react';
import { Select } from '@chakra-ui/react';
import { useSelectUserDisplayStore } from '../../../store/useSelectUserDisplayStore';

const rolesOptions = [
   { role: 'Admin', display: 'Admin' },
   { role: 'Equipe_administrative', display: 'Équipe-Administrative' },
   { role: 'Recruteur', display: 'Recruteur' },
   { role: 'Enseignant', display: 'Enseignant' },
   { role: 'Etudiant', display: 'Étudiant' },
];

export function SearchByRoles() {
   const { setDisplayUsers, selectByRoles, setSelectByRoles } = useSelectUserDisplayStore();

   useEffect(() => {
      setDisplayUsers();
   }, [selectByRoles]);

   useEffect(() => {
      return () => setSelectByRoles('');
   }, []);

   return (
      <Select
         w="160px"
         size={{ base: 'xs', md: 'sm', lg: 'md' }}
         onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectByRoles(e.target.value)}
         value={selectByRoles}
         _hover={{ cursor: 'pointer' }}
      >
         <option value={''}>Tous les roles...</option>

         {rolesOptions.map(({ role, display }) => (
            <option key={role} value={role}>
               {display}
            </option>
         ))}
      </Select>
   );
}
