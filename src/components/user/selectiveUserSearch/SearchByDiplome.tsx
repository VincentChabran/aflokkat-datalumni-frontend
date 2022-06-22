import { Select } from '@chakra-ui/react';
import { ChangeEvent, useEffect } from 'react';
import { useSelectUserDisplayStore } from '../../../store/useSelectUserDisplayStore';

const diplomeOptions = [
   { diplome: 'baccalaureat', display: 'Baccalauréat' },
   { diplome: 'BTS_BTSA', display: 'BTS / BTSA' },
   { diplome: 'Bachelor_licence_licensePro', display: 'Bachelor / Licence / License Professionnelle' },
   { diplome: 'master1', display: 'Master 1' },
   { diplome: 'master2', display: 'Master 2' },
   { diplome: 'ingenieur', display: 'Ingenieur' },
   { diplome: 'doctorat', display: 'Doctorat' },
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
