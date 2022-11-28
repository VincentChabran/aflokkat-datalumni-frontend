import { Box, Flex, Grid, Heading } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../../store/useUserStore';
import { UserSpecifique } from '../../../views/Profil';
import { ContactMentorMail } from './ContactMentorMail';
import { DeleteUserButton } from './DeleteUserButton';
import { UpdateUserButton } from './UpdateUserButton';
import { UpdateUserRolesButton } from './UpdateUserRolesButton';
import { UserCardDetail } from './UserCardDetail';

export interface UserDetailsProps {
   user: UserSpecifique;
   setUser: Dispatch<SetStateAction<UserSpecifique | undefined>>;
}

export function UserDetails({ user, setUser }: UserDetailsProps) {
   const { userId } = useParams();

   const { idUserStore, rolesUserStore } = useUserStore();

   return (
      <Box w="100%">
         <Heading borderBottom="1px solid orange" letterSpacing="bold" size="lg" mb="5" p="0">
            Profil
         </Heading>

         <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }}>
            <UserCardDetail user={user} />

            {/* Bouton */}
            <Flex flexDir="column" justify="center" align="start" gap="2" mt="3">
               {parseInt(userId ?? idUserStore.toString()) !== idUserStore && <ContactMentorMail to={user.email} />}

               {(user.id === idUserStore ||
                  rolesUserStore.includes('Admin') ||
                  rolesUserStore.includes('Equipe_administrative')) && (
                  <Flex justify="center" align="center" gap={{ base: 1, lg: 3 }} wrap="wrap">
                     {user.id === idUserStore && <UpdateUserButton user={user} setUser={setUser} />}

                     {(rolesUserStore.includes('Admin') || rolesUserStore.includes('Equipe_administrative')) && (
                        <UpdateUserRolesButton user={user} setUser={setUser} />
                     )}

                     <DeleteUserButton userId={user.id} />
                  </Flex>
               )}
            </Flex>
         </Grid>
      </Box>
   );
}
