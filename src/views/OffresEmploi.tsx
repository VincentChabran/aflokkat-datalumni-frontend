import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { DisplayOffreGrid } from '../components/OffresEmploi/DisplayOffreGrid';

export interface OffresEmploiProps {}

export function OffresEmploi(props: OffresEmploiProps) {
   const [display, setDisplay] = useState('offres');

   return (
      <>
         {display === 'offres' && (
            <>
               <Box h="16">TODO bar ADD</Box>

               <Box h="16">TODO bar de selection</Box>

               <DisplayOffreGrid />
            </>
         )}
      </>
   );
}
