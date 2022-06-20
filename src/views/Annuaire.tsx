import { Box, Flex } from '@chakra-ui/react';

import { DisplayUserGrid } from '../components/global/DisplayUserGrid';

export interface AnnuaireProps {}

export function Annuaire(props: AnnuaireProps) {
   return (
      <>
         <Flex justify="center" py={5} h="100px">
            <h1>Todo Field de recherche</h1>
         </Flex>

         <Box>
            <DisplayUserGrid />
         </Box>
      </>
   );
}
