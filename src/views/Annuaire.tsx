import { Box } from '@chakra-ui/react';
import { CreateUserButton } from '../components/Annuaire/createUserButton/CreateUserButton';
import { DisplayUserGrid } from '../components/Annuaire/DisplayUserGrid';
import { UserSearchBar } from '../components/Annuaire/UserSearchBar';
import { useUserStore } from '../store/useUserStore';

export function Annuaire() {
   const { rolesUserStore } = useUserStore();

   return (
      <>
         {rolesUserStore.includes('Admin') && <CreateUserButton />}

         <UserSearchBar />

         <Box>
            <DisplayUserGrid />
         </Box>
      </>
   );
}
