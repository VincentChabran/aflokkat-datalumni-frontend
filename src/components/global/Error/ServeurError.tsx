import { Box, Heading, Text, VStack } from '@chakra-ui/react';

export interface ServeurErrorProps {}

export function ServeurError(props: ServeurErrorProps) {
   return (
      <VStack>
         <Box maxW="600px" maxH="600px" pos="relative">
            <Heading textAlign="center">Code 500 ...</Heading>

            <Text>Connexion avec le serveur échoué...</Text>
         </Box>
      </VStack>
   );
}
