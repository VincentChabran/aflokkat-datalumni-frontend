import { Box, Flex, Grid, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { OperationContext } from 'urql';
import { useUserStore } from '../../../store/useUserStore';
import { UserSpecifique } from '../../../views/Profil';
import { CreateFormationButton } from './CreateFormationButton';
import { DeleteFormationButton } from './DeleteFormationButton';
import { UpdateFormationButton } from './UpdateFormationButton';

export interface UserFormationsProps {
   user: UserSpecifique;
   reExeSpecifiqueUserQuery: (opts?: Partial<OperationContext> | undefined) => void;
}

export function UserFormations({ user, reExeSpecifiqueUserQuery }: UserFormationsProps) {
   const { idUserStore, rolesUserStore } = useUserStore();
   const { formations } = user;

   return (
      <VStack mt="8">
         <Box w="100%">
            <Heading borderBottom="1px solid orange" letterSpacing="bold" size="lg" mb="1" p="0">
               Formations
            </Heading>

            {(user.id === idUserStore || rolesUserStore.includes('Admin')) && (
               <Box pl={{ base: '0', xs: '2' }} pt="4">
                  <CreateFormationButton reExeSpecifiqueUserQuery={reExeSpecifiqueUserQuery} />
               </Box>
            )}

            {formations?.length !== 0 ? (
               <>
                  {formations?.map((el) => (
                     <Grid key={el.id} templateColumns={{ base: '2fr 1fr', sm: '1fr 1fr' }} mt="2">
                        <Flex flexDir="column" py="4" pl={{ base: '0', sm: '3' }}>
                           <Text fontSize={'lg'} fontWeight="bold">
                              {el.nomFormation}
                           </Text>
                           <Text fontSize={'xs'}>{`${el.typeDiplome.slice(3)} (${el.anneeObtention})`}</Text>
                           <Text fontSize={'xs'}>{`${el.nomEtablissement} `}</Text>
                           {el.description && (
                              <Text pt="4" fontSize={{ base: 'xs', sm: 'sm' }}>
                                 {el.description}
                              </Text>
                           )}
                        </Flex>

                        {(user.id === idUserStore || rolesUserStore.includes('Admin')) && (
                           <Flex gap={{ base: 2, sm: 1 }} justify="center" align="center">
                              <UpdateFormationButton formation={el} reExeSpecifiqueUserQuery={reExeSpecifiqueUserQuery} />

                              <DeleteFormationButton
                                 formationId={el.id}
                                 reExeSpecifiqueUserQuery={reExeSpecifiqueUserQuery}
                              />
                           </Flex>
                        )}
                     </Grid>
                  ))}
               </>
            ) : (
               <Box py="4" pl={{ base: '0', sm: '3' }} h="20">
                  Aucune formation n'a été renseigné
               </Box>
            )}
         </Box>
      </VStack>
   );
}
