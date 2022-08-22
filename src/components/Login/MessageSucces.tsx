import { Box, Link, Text, VStack } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

export interface MessageSuccesProps {
   setDisplay: Dispatch<SetStateAction<string>>;
}

export function MessageSucces({ setDisplay }: MessageSuccesProps) {
   return (
      <VStack w="100%" my={10} spacing={6}>
         <Box>
            <Text textAlign="center" fontSize="lg" mb={1}>
               Votre compte a été créé avec{' '}
               <Text as="span" color="green.300">
                  succès.
               </Text>
            </Text>
            <Text textAlign="center">Un email vous sera envoyé lorsqu'il sera validé par notre équipe.</Text>
         </Box>

         <Link color="blue" onClick={() => setDisplay('connexion')}>
            Retour au login
         </Link>
      </VStack>
   );
}
