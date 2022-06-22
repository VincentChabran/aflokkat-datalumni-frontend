import { Box } from '@chakra-ui/react';
import { DisplayUserGrid } from '../components/user/DisplayUserGrid';
import { UserSearchBar } from '../components/user/UserSearchBar';

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
