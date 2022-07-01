import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
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
            <Heading borderBottom="1px solid orange" letterSpacing="bold" size="lg" mb="1">
               Formations
            </Heading>

            {(user.id === idUserStore || rolesUserStore.includes('Admin')) && (
               <Box pl="2" pt="4">
                  <CreateFormationButton reExeSpecifiqueUserQuery={reExeSpecifiqueUserQuery} />
               </Box>
            )}

            {formations?.map((el) => (
               <HStack key={el.id} spacing={10}>
                  <Box py="4" pl="3" maxW="60%">
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
                  </Box>

                  {(user.id === idUserStore || rolesUserStore.includes('Admin')) && (
                     <HStack>
                        <UpdateFormationButton formation={el} reExeSpecifiqueUserQuery={reExeSpecifiqueUserQuery} />

                        <DeleteFormationButton formationId={el.id} reExeSpecifiqueUserQuery={reExeSpecifiqueUserQuery} />
                     </HStack>
                  )}
               </HStack>
            ))}
         </Box>
      </VStack>
   );
}
