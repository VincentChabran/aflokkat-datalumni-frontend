import { Box, SimpleGrid, Skeleton, SkeletonText, useColorModeValue, VStack } from '@chakra-ui/react';
import * as React from 'react';
import { bgColor } from '../../../themes/constants/bgColor';

export interface SkeletonOffreDetailProps {}

export function SkeletonOffreDetail(props: SkeletonOffreDetailProps) {
   const bgBox = bgColor();

   const bgImpair = useColorModeValue('gray.100', 'blackAlpha.300');
   const bgPair = useColorModeValue('gray.300', 'blackAlpha.400');

   return (
      <Box bgColor={bgBox} borderRadius="lg" mx={{ base: 0, sm: 2, md: 10 }} my={8} p={{ base: 0, sm: 0, md: 8 }}>
         <VStack w="50%" m="auto" mb="10">
            <Skeleton w="60%" h="40px" />
         </VStack>

         <SimpleGrid
            columns={{ base: 1, sm: 2 }}
            maxW="780px"
            m="auto"
            py="8"
            pl={{ base: 1, sm: 0, md: 2 }}
            bg={bgImpair}
            borderTopRadius="md"
            overflow="hidden"
         >
            <SkeletonText noOfLines={5} w="80%" />
            <SkeletonText noOfLines={5} w="80%" />
         </SimpleGrid>

         {[1, 2, 3].map((el, i) => (
            <Box key={el} bg={i % 2 == 0 ? bgPair : bgImpair} py="6" px={{ base: '2', md: 8 }} w="100%" maxW="780px" m="auto">
               <Skeleton w="100%" h="200px" />
            </Box>
         ))}
      </Box>
   );
}
