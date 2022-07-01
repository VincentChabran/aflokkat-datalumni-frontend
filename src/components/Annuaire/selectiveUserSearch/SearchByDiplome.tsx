import { Select } from '@chakra-ui/react';
import { ChangeEvent, useEffect } from 'react';
import { useSelectUserDisplayStore } from '../../../store/useSelectUserDisplayStore';

const diplomeOptions = [
   { diplome: '05-Baccalauréat', display: 'Baccalauréat' },
   { diplome: '08-BTS / BTSA', display: 'BTS / BTSA' },
   { diplome: '10-Bachelor / Licence / License Professionnelle', display: 'Bachelor / Licence / License Professionnelle' },
   { diplome: '11-Master1', display: 'Master 1' },
   { diplome: '12-Master 2', display: 'Master 2' },
   { diplome: "13-Diplôme d'ingénieur", display: 'Ingenieur' },
   { diplome: '14-Doctorat', display: 'Doctorat' },
];

export function SearchByDiplome() {
   const { setDisplayUsers, selectByDiplome, setSelectByDiplome } = useSelectUserDisplayStore();

   useEffect(() => {
      setDisplayUsers();
   }, [selectByDiplome]);

   useEffect(() => {
      return () => setSelectByDiplome('');
   }, []);

   return (
      <Select
         w="180px"
         size={{ base: 'xs', md: 'sm', lg: 'md' }}
         onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectByDiplome(e.target.value)}
         value={selectByDiplome}
         _hover={{ cursor: 'pointer' }}
      >
         <option value="">Tous les Diplôme...</option>

         {diplomeOptions.map(({ diplome, display }) => (
            <option key={diplome} value={diplome}>
               {display}
            </option>
         ))}
      </Select>
   );
}
