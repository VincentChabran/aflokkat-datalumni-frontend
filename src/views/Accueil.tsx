import { Box, Grid, GridItem, Heading, VStack } from '@chakra-ui/react';
import { DisplayUserGrid } from '../components/Annuaire/DisplayUserGrid';
import { DisplayOffreGrid } from '../components/OffresEmploi/DisplayOffreGrid/DisplayOffreGrid';

export function Accueil() {
   return (
      <Box py="10" px="2">
         <Heading textAlign="center" borderBottom="1px solid orange" mb="8" p="0">
            Ils ont récemment rejoint mon réseau
         </Heading>

         <DisplayUserGrid slice={-4} />
         {/* <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }}>
            <GridItem>
            </GridItem>
            
            <GridItem>
               <Box border="1px solid"> Mentorat BLA BLA BLA</Box>
            </GridItem>
         </Grid> */}
         <VStack w="100%" align="stretch">
            <Heading textAlign="center" borderBottom="1px solid orange" mb="8" p="0">
               Dernières annonces publiées
            </Heading>

            <DisplayOffreGrid accueil />
         </VStack>
      </Box>
   );
}
