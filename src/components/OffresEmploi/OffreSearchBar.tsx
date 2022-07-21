import { VStack } from '@chakra-ui/react';
import { MostClesNomDuPoste } from './OffreSearchBar/MotsClesNomDuPoste';

export interface OffreSearchBarProps {}

export function OffreSearchBar(props: OffreSearchBarProps) {
   return (
      <VStack align="center">
         <MostClesNomDuPoste />
      </VStack>
   );
}
