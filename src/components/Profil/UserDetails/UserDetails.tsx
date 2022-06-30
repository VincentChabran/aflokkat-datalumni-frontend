import { Box, Flex, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { useUserStore } from '../../../store/useUserStore';
import { UserSpecifique } from '../../../views/Profil';
import { UserCard } from '../../Annuaire/UserCard';
import { DeleteUserButton } from './DeleteUserButton';
import { UpdateUserButton } from './UpdateUserButton';

export interface UserDetailsProps {
   user: UserSpecifique;
   setUser: Dispatch<SetStateAction<UserSpecifique | undefined>>;
}

export function UserDetails({ user, setUser }: UserDetailsProps) {
   const { id, roles } = useUserStore();

   return (
      <VStack>
         <Box w="100%">
            <Heading borderBottom="1px solid orange" letterSpacing="bold" size="lg" mb="5">
               Profil
            </Heading>

            <SimpleGrid columns={[1, 1, 1, 1, 2]}>
               <UserCard
                  user={user}
                  nomPrenomSize={{ base: 'md', sm: 'xl' }}
                  rolesSize={{ base: 'xs', lg: 'md' }}
                  formationsSize={{ base: 'sm', sm: 'md' }}
                  experienceProSize={{ base: 'sm', sm: 'lg' }}
                  borderCard={false}
               />

               {/* Affiche la barre de settings que si c'est le bon user ou un admin */}
               {(user.id === id || roles.includes('Admin')) && (
                  <Flex m={{ base: '0', xs: 'auto' }} justify="center" align="center" gap={{ base: 1, lg: 3 }}>
                     <UpdateUserButton user={user} setUser={setUser} />

                     <DeleteUserButton userId={user.id} />
                  </Flex>
               )}
            </SimpleGrid>
         </Box>
      </VStack>
   );
}
