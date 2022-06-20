import { Box, Grid, GridItem } from '@chakra-ui/react';

import { DisplayUserGrid } from '../components/global/DisplayUserGrid';

export interface AccueilProps {}

export function Accueil(props: AccueilProps) {
   return (
      <>
         <h1>hello accueil</h1>

         <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }}>
            <GridItem>
               <DisplayUserGrid columns={[1, 1, 2, 3, 3]} slice={[0, 3]} />
            </GridItem>

            <GridItem>
               <Box border="1px solid"> Mentorat BLA BLA BLA</Box>
            </GridItem>
         </Grid>
      </>
   );
}
