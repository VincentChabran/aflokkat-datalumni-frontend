import { Box, Flex } from '@chakra-ui/react';
import { DisplayUserGrid } from '../components/global/DisplayUserGrid';

export interface AnnuaireProps {}

export function Annuaire(props: AnnuaireProps) {
   return (
      <>
         <Flex justify="center" h="50px" border="1px solid">
            <h1>hello annuaire</h1>
         </Flex>

         <Box w="100vw">
            <DisplayUserGrid />
         </Box>
      </>
   );
}
