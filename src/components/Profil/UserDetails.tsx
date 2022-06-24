import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import { useUserStore } from '../../store/useUserStore';
import { UserSpecifique } from '../../views/Profil';
import { UserCard } from '../Annuaire/UserCard';
import { UpdateUserButton } from './UserDetails/UpdateUserButton';

export interface UserDetailsProps {
   dataUser: UserSpecifique;
}

export function UserDetails({ dataUser }: UserDetailsProps) {
   const { id, roles } = useUserStore();

   const [user, setUser] = useState(dataUser);

   return (
      <Box gap={10}>
         <SimpleGrid columns={[1, 1, 1, 2]}>
            <UserCard
               user={user}
               nomPrenomSize="xl"
               rolesSize={{ base: 'sm', md: 'md' }}
               formationsSize="md"
               experienceProSize="lg"
               borderCard={false}
            />

            {/* Affiche la barre de settings que si c'est le bon user ou un admin */}
            {(dataUser.id === id || roles.includes('Admin')) && (
               <Flex m="auto" justify="center" align="center" gap={5}>
                  <UpdateUserButton user={user} setUser={setUser} />

                  <Button variant="outline" colorScheme="red" leftIcon={<DeleteIcon />}>
                     Delete User
                  </Button>
               </Flex>
            )}
         </SimpleGrid>
      </Box>
   );
}
