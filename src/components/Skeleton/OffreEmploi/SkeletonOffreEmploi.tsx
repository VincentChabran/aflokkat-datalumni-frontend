import { Box, Flex, Grid, SimpleGrid, Skeleton, SkeletonCircle, SkeletonText, VStack } from '@chakra-ui/react';
import { bgColor } from '../../../themes/constants/bgColor';

export interface SkeletonOffreEmploiProps {}

const nbSkeleton: number[] = [];
for (let i = 0; i < 8; i++) nbSkeleton.push(i);

export function SkeletonOffreEmploi(props: SkeletonOffreEmploiProps) {
   return (
      <SimpleGrid columns={[1, 1, 2, 2, 3]} spacing={4} mx={{ base: 4, lg: 5, xl: 10 }}>
         {nbSkeleton.map((el) => (
            <VStack
               key={el}
               h="100%"
               py={7}
               px={{ base: 1, sm: 3 }}
               gap={2}
               border={'2px solid'}
               borderColor="blue.200"
               borderRadius="sm"
               bg={bgColor()}
               align="start"
            >
               <Grid templateColumns={'2fr 1fr'} w="100%">
                  <Skeleton w="60%" />
                  <SkeletonText noOfLines={2} />
               </Grid>

               <Box w="100%">
                  <SkeletonText noOfLines={2} w="70%" />
               </Box>

               <Flex justify="space-between" align="center" w="100%">
                  <VStack align="start" spacing={5} w="100%">
                     <Box w="100%">
                        <SkeletonText noOfLines={2} w="70%" />
                     </Box>

                     <Box w="100%">
                        <SkeletonText noOfLines={2} w="70%" />
                     </Box>
                  </VStack>

                  <SkeletonCircle size="14" />
               </Flex>
            </VStack>
         ))}
      </SimpleGrid>
   );
}
