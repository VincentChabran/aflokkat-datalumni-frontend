import { Box, HStack, VStack } from '@chakra-ui/react';
import { AddUsersByCsv } from '../components/Annuaire/createUserButton/AddUsersByCsv';
import { CreateUserButton } from '../components/Annuaire/createUserButton/CreateUserButton';
import { DisplayUserGrid } from '../components/Annuaire/DisplayUserGrid';
import { UserSearchBar } from '../components/Annuaire/UserSearchBar';
import { useUserStore } from '../store/useUserStore';

export function Annuaire() {
   const { rolesUserStore } = useUserStore();

   return (
      <VStack py={6}>
         {(rolesUserStore.includes('Admin') || rolesUserStore.includes('Equipe_administrative')) && (
            <HStack>
               <CreateUserButton />
               <AddUsersByCsv />
            </HStack>
         )}

         <UserSearchBar />

         <Box w="100%">
            <DisplayUserGrid />
         </Box>
      </VStack>
   );
}
