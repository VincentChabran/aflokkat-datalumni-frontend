import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useOffresEmploiDisplayStore } from '../../../store/useOffresEmploiDisplayStore';

export interface MostClesNomDuPosteProps {}

export function MostClesNomDuPoste(props: MostClesNomDuPosteProps) {
   const { setDisplayOffres, selectByMotsClesNomDuPoste, setSelectByMotsClesNomDuPoste } = useOffresEmploiDisplayStore();

   useEffect(() => {
      setDisplayOffres();
   }, [selectByMotsClesNomDuPoste]);

   useEffect(
      () => () => {
         setSelectByMotsClesNomDuPoste('');
         setDisplayOffres();
      },
      [],
   );

   return (
      <FormControl maxW="600px">
         <FormLabel htmlFor="search" textAlign="center" fontWeight="normal">
            Mots-clés nom de poste
         </FormLabel>

         <Input
            id="search"
            value={selectByMotsClesNomDuPoste}
            onChange={(e) => setSelectByMotsClesNomDuPoste(e.target.value)}
            placeholder="Mots-clés nom de poste"
         />
      </FormControl>
   );
}
