import { WarningIcon } from '@chakra-ui/icons';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

export interface NotFoundProps {
   texte: string;
}

export function NotFound({ texte }: NotFoundProps) {
   return (
      <VStack>
         <Box maxW="600px" maxH="600px" pos="relative">
            {/* <Box borderLeft="1px solid" w="1px" h="80px" />
         <Box borderLeft="1px solid" w="1px" h="80px" transform="rotate(-45deg)" pos="absolute" top="68px" left="7" />
      <Box borderBottom="1px solid" w="80px" h="0px" pos="absolute" top="135px" left="14" /> */}
            <Heading textAlign="center">
               <WarningIcon mr="4" />
               404 ...
            </Heading>
            <Text>{texte}</Text>
         </Box>
      </VStack>
   );
}
