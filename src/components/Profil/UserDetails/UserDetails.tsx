import { Box, Flex, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../../store/useUserStore';
import { UserSpecifique } from '../../../views/Profil';
import { UserCard } from '../../Annuaire/UserCard';
import { ContactMentorMail } from './ContactMentorMail';
import { DeleteUserButton } from './DeleteUserButton';
import { UpdateUserButton } from './UpdateUserButton';

export interface UserDetailsProps {
   user: UserSpecifique;
   setUser: Dispatch<SetStateAction<UserSpecifique | undefined>>;
}

export function UserDetails({ user, setUser }: UserDetailsProps) {
   const { userId } = useParams();

   const { idUserStore, rolesUserStore } = useUserStore();

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

               <Flex flexDir="column" justify="center" align="center" gap="3">
                  {user.mentor && parseInt(userId ?? idUserStore.toString()) !== idUserStore && (
                     <Box>
                        <ContactMentorMail to={user.email} />
                     </Box>
                  )}

                  {/* Affiche la barre de settings que si c'est le bon user ou un admin */}
                  {(user.id === idUserStore || rolesUserStore.includes('Admin')) && (
                     <Flex justify="center" align="center" gap={{ base: 1, lg: 3 }}>
                        <UpdateUserButton user={user} setUser={setUser} />

                        <DeleteUserButton userId={user.id} />
                     </Flex>
                  )}
               </Flex>
            </SimpleGrid>
         </Box>
      </VStack>
   );
}
