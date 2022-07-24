import { Box, SimpleGrid, Skeleton, SkeletonText, VStack } from '@chakra-ui/react';
import { bgColor } from '../../themes/constants/bgColor';

export interface SkeletonActualitesProps {}

const nbSkeleton: number[] = [];
for (let i = 0; i < 9; i++) nbSkeleton.push(i);

export function SkeletonActualites(props: SkeletonActualitesProps) {
   const bgCard = bgColor();

   return (
      <Box w="100%">
         <SimpleGrid columns={[1, 1, 2, 3, 3]} spacing={7}>
            {nbSkeleton.map((el) => (
               <Box border="2px solid" borderRadius="md" w="100%" maxH="660px" minH="660px" bg={bgCard} key={el}>
                  <Skeleton w="100%" h="30%" />

                  <VStack py={6} px={3} spacing={4} align="center" borderBottomRadius="md">
                     <Skeleton h="40px" w="100%" />

                     <SkeletonText noOfLines={20} w="100%" />
                  </VStack>
               </Box>
            ))}
         </SimpleGrid>
      </Box>
   );
}
