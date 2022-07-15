import { Box, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { ActualiteGrid } from './DisplayActualitesGrid';
import parse from 'html-react-parser';
import { bgColor } from '../../themes/constants/bgColor';
import { pathBlogImg, pathDomaineName } from '../../utils/pathBackEnd';
import { formatDateDdMmYyyy } from '../../tools/functions/formatDateDdMmYyyy';

export interface BlogCardProps {
   blog: ActualiteGrid;
}

export function BlogCard({ blog }: BlogCardProps) {
   const { title, dateCreation, content, pathImg } = blog;

   const bgCard = bgColor();

   return (
      <Box border="2px solid" borderRadius="md">
         <Image
            src={`${pathDomaineName}/${pathBlogImg}/${pathImg}`}
            alt="Imagae article"
            maxH="200px"
            w="100%"
            objectFit="cover"
            borderTopRadius="md"
         />

         <VStack h="100%" py={7} px={3} spacing={4} bg={bgCard} align="start" borderBottomRadius="md">
            <Heading as={'h3'} textAlign="center">
               {title}
            </Heading>

            <Text fontSize="sm">{formatDateDdMmYyyy(dateCreation)}</Text>

            <Box>{parse(content)}</Box>
         </VStack>
      </Box>
   );
}
