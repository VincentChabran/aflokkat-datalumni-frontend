import { Box, Flex, Grid, Heading, SimpleGrid, Skeleton, SkeletonCircle, SkeletonText, VStack } from '@chakra-ui/react';
import { bgColor } from '../../themes/constants/bgColor';

export interface SkeletonProfilProps {}

export function SkeletonProfil(props: SkeletonProfilProps) {
   const bgBox = bgColor();

   return (
      <Box p={{ base: 3, sm: 6 }} px={{ base: 0, lg: 12 }}>
         <Box p={{ base: 3, sm: 6 }} px={{ base: 1, lg: 10 }} bgColor={bgBox} borderRadius="lg">
            <Box w="100%">
               <Heading borderBottom="1px solid orange" letterSpacing="bold" size="lg" mb="5" p="0">
                  Profil
               </Heading>

               <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }}>
                  {/* <VStack h="100%" py={7} px={3} spacing={4} borderRadius="md">
                     <SkeletonCircle size="20" />
                     <SkeletonText mt="4" noOfLines={10} spacing="4" w="60%" />
                  </VStack> */}

                  <Flex flexDir={{ base: 'column', md: 'row' }} gap="4">
                     <Skeleton h="200px" w="200px" />

                     <SkeletonText noOfLines={10} w="70%" spacing={3} />
                  </Flex>
               </Grid>
            </Box>

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
