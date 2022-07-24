import { Box, Heading, VStack } from '@chakra-ui/react';
import { DisplayActualitesGrid } from '../components/Actualites/DisplayActualitesGrid';
import { DisplayUserGrid } from '../components/Annuaire/DisplayUserGrid';
import { DisplayOffreGrid } from '../components/OffresEmploi/DisplayOffreGrid';

export function Accueil() {
   return (
      <VStack py="10" px="2" spacing={14} w="100%">
         <Box w="100%">
            <Heading textAlign="center" borderBottom="1px solid orange" mb="8" p="0">
               Ils ont récemment rejoint mon réseau
            </Heading>

            <DisplayUserGrid slice={-4} />
         </Box>

         <VStack w="100%" align="stretch">
            <Heading textAlign="center" borderBottom="1px solid orange" mb="8" p="0">
               Dernières annonces publiées
            </Heading>

            <DisplayOffreGrid accueil />
         </VStack>

         <VStack w="100%" align="stretch">
            <Heading textAlign="center" borderBottom="1px solid orange" mb="8" p="0">
               Les dernières actualités
            </Heading>

            <DisplayActualitesGrid accueil />
         </VStack>
      </VStack>
   );
}
