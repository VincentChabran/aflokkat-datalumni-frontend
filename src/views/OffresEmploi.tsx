import { VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { CreateOffreButton } from '../components/OffresEmploi/CreateOffreButton';
import { DisplayOffreGrid } from '../components/OffresEmploi/DisplayOffreGrid/DisplayOffreGrid';
import { OffreSearchBar } from '../components/OffresEmploi/OffreSearchBar';

export interface OffresEmploiProps {}

export function OffresEmploi(props: OffresEmploiProps) {
   const [search, setSearch] = useState('');

   return (
      <VStack align="normal" py="4" px={{ base: '1', sm: '2', md: '4' }} spacing={10}>
         <CreateOffreButton />

         <OffreSearchBar search={search} setSearch={setSearch} />

         <DisplayOffreGrid search={search} />
      </VStack>
   );
}
