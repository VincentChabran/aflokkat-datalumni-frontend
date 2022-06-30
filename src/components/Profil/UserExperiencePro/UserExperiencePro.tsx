import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { OperationContext } from 'urql';
import { UserSpecifique } from '../../../views/Profil';
import { UpdateExperienceProButton } from './UpdateExperienceProButton';

export interface UserExperienceProProps {
   user: UserSpecifique;
   setUser: Dispatch<SetStateAction<UserSpecifique | undefined>>;
   reExeSpecifiqueUserQuery: (opts?: Partial<OperationContext> | undefined) => void;
}

export function UserExperiencePro({ user, setUser, reExeSpecifiqueUserQuery }: UserExperienceProProps) {
   const { experiencePro } = user;

   return (
      <VStack mt="16">
         <Box w="100%">
            <Heading borderBottom="1px solid orange" letterSpacing="bold" size="lg">
               Expériences professionnelles
            </Heading>

            {/* TODO Boutton Add éxperience */}

            {experiencePro?.map((el) => (
               <HStack key={el.id} spacing={10}>
                  <Box py="4" pl="3" maxW="60%">
                     <Text fontSize={'lg'} fontWeight="bold">
                        {el.fonction}
                     </Text>
                     <Text fontSize={'xs'}>{el.entreprise}</Text>
                     <Text fontSize={'xs'}>{`${el.dateDebut} - ${el.dateFin}`}</Text>
                     <Text pt="4" fontSize={{ base: 'xs', sm: 'sm' }}>
                        {el.description}
                     </Text>
                  </Box>

                  <UpdateExperienceProButton experiencePro={el} reExeSpecifiqueUserQuery={reExeSpecifiqueUserQuery} />
               </HStack>
            ))}
         </Box>
      </VStack>
   );
}
