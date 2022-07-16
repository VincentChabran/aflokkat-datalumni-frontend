import { Box, Flex, Grid, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { OperationContext } from 'urql';
import { useUserStore } from '../../../store/useUserStore';
import { UserSpecifique } from '../../../views/Profil';
import { CreateExperienceProButton } from './CreateExperienceProButton';
import { DeleteExperienceProButton } from './DeleteExperienceProButton';
import { UpdateExperienceProButton } from './UpdateExperienceProButton';

export interface UserExperienceProProps {
   user: UserSpecifique;
   reExeSpecifiqueUserQuery: (opts?: Partial<OperationContext> | undefined) => void;
}

export function UserExperiencePro({ user, reExeSpecifiqueUserQuery }: UserExperienceProProps) {
   const { idUserStore, rolesUserStore } = useUserStore();

   const { experiencePro } = user;

   return (
      <VStack mt="16">
         <Box w="100%">
            <Heading borderBottom="1px solid orange" letterSpacing="bold" size="lg" mb="1" p="0">
               Expériences professionnelles
            </Heading>

            {(user.id === idUserStore || rolesUserStore.includes('Admin')) && (
               <Box pl={{ base: '0', xs: '2' }} pt="4">
                  <CreateExperienceProButton reExeSpecifiqueUserQuery={reExeSpecifiqueUserQuery} />
               </Box>
            )}

            {experiencePro?.length !== 0 ? (
               <>
                  {experiencePro?.map((el) => (
                     <Grid key={el.id} templateColumns={{ base: '2fr 1fr', sm: '1fr 1fr' }} mt="2">
                        <Flex flexDir="column" py="4" pl={{ base: '0', sm: '3' }}>
                           <Text fontSize={'lg'} fontWeight="bold">
                              {el.fonction}
                           </Text>
                           <Text fontSize={'xs'}>{el.entreprise}</Text>
                           <Text fontSize={'xs'}>{`${el.dateDebut} - ${el.dateFin}`}</Text>
                           {el.description && (
                              <Text pt="4" fontSize={{ base: 'xs', sm: 'sm' }} maxW="80%">
                                 {el.description}
                              </Text>
                           )}
                        </Flex>

                        {(user.id === idUserStore || rolesUserStore.includes('Admin')) && (
                           <Flex gap={{ base: 2, sm: 1 }} justify="center" align="center">
                              <UpdateExperienceProButton
                                 experiencePro={el}
                                 reExeSpecifiqueUserQuery={reExeSpecifiqueUserQuery}
                              />

                              <DeleteExperienceProButton
                                 experienceProId={el.id}
                                 reExeSpecifiqueUserQuery={reExeSpecifiqueUserQuery}
                              />
                           </Flex>
                        )}
                     </Grid>
                  ))}
               </>
            ) : (
               <Box py="4" pl={{ base: '0', sm: '3' }} h="20">
                  Aucune expérience n'a été renseigné
               </Box>
            )}
         </Box>
      </VStack>
   );
}
