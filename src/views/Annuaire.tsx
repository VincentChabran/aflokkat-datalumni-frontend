import { Box } from '@chakra-ui/react';
import { DisplayUserGrid } from '../components/Annuaire/DisplayUserGrid';
import { UserSearchBar } from '../components/Annuaire/UserSearchBar';

export function Annuaire() {
   return (
      <>
         <UserSearchBar />

         <Box>
            <DisplayUserGrid />
         </Box>
      </>
   );
}
