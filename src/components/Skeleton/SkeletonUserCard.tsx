import { SimpleGrid, Skeleton, SkeletonCircle, SkeletonText, VStack } from '@chakra-ui/react';
import { bgColor } from '../../themes/constants/bgColor';

export interface SkeletonUserCardProps {
   columns: number[];
   max?: number;
}

export function SkeletonUserCard({ columns, max = 8 }: SkeletonUserCardProps) {
   const bgCard = bgColor();

   const nbSkeleton: number[] = [];
   for (let i = 0; i < max; i++) nbSkeleton.push(i);

   return (
      <SimpleGrid columns={columns} spacing={6} mx={{ base: 10, lg: 5, xl: 10 }}>
         {nbSkeleton.map((el) => (
            <VStack
               key={el + Date.now()}
               h="100%"
               py={7}
               px={3}
               spacing={4}
               border="1px"
               borderRadius="md"
               borderColor={'gray'}
               bg={bgCard}
               pos="relative"
            >
               <SkeletonCircle size="20" />

               <Skeleton height="20px" w="40%" />

               <SkeletonText mt="4" noOfLines={1} spacing="4" w="60%" />

               <SkeletonText mt="4" noOfLines={4} spacing="4" w="30%" />

               {/* <SkeletonText mt="4" noOfLines={1} spacing="4" w="30%" /> */}
            </VStack>
         ))}
      </SimpleGrid>
   );
}
