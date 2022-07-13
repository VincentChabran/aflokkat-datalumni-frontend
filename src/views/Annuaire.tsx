import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { CreateUserButton } from '../components/Annuaire/createUserButton/CreateUserButton';
import { DisplayUserGrid } from '../components/Annuaire/DisplayUserGrid';
import { UserSearchBar } from '../components/Annuaire/UserSearchBar';
import { useUserStore } from '../store/useUserStore';

export function Annuaire() {
   const { rolesUserStore } = useUserStore();

   const [isCreated, setIsCreated] = useState(false);
   return (
      <>
         {rolesUserStore.includes('Admin') && <CreateUserButton setIsCreated={setIsCreated} />}

         <UserSearchBar />

         <Box>
            <DisplayUserGrid isCreated={isCreated} setIsCreated={setIsCreated} />
         </Box>
      </>
   );
}
