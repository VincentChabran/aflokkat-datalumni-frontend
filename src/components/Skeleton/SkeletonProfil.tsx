import { Box, Heading, SimpleGrid, SkeletonCircle, SkeletonText, VStack } from '@chakra-ui/react';
import { bgColor } from '../../themes/constants/bgColor';

export interface SkeletonProfilProps {}

export function SkeletonProfil(props: SkeletonProfilProps) {
   const bgBox = bgColor();

   return (
      <Box p={{ base: 3, sm: 9 }} px={{ base: 3, lg: 20 }}>
         <Box p={{ base: 3, sm: 8 }} px={{ base: 3, lg: 16 }} bgColor={bgBox} borderRadius="lg">
            <VStack>
               <Box w="100%">
                  <Heading borderBottom="1px solid orange" letterSpacing="bold" size="lg" mb="5">
                     Profil
                  </Heading>

                  <SimpleGrid columns={[1, 1, 1, 1, 2]}>
                     <VStack h="100%" py={7} px={3} spacing={4} borderRadius="md">
                        <SkeletonCircle size="20" />
                        <SkeletonText mt="4" noOfLines={10} spacing="4" w="60%" />
                     </VStack>
                  </SimpleGrid>
               </Box>
            </VStack>

            <VStack mt="16">
               <Box w="100%">
                  <Heading borderBottom="1px solid orange" letterSpacing="bold" size="lg" mb="1">
                     Expériences professionnelles
                  </Heading>

                  <VStack align="start" pt="4" spacing={14}>
                     <SkeletonText mt="4" noOfLines={4} spacing="4" w="40%" />
                     <SkeletonText mt="4" noOfLines={4} spacing="4" w="40%" />
                  </VStack>
               </Box>
            </VStack>

            <VStack mt="8">
               <Box w="100%">
                  <Heading borderBottom="1px solid orange" letterSpacing="bold" size="lg" mb="1">
                     Formations
                  </Heading>

                  <VStack align="start" pt="4" spacing={14}>
                     <SkeletonText mt="4" noOfLines={4} spacing="4" w="40%" />
                     <SkeletonText mt="4" noOfLines={4} spacing="4" w="40%" />
                  </VStack>
               </Box>
            </VStack>
         </Box>
      </Box>
   );
}
