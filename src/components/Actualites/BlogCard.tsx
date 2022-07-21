import { Badge, Box, Heading, Image, VStack } from '@chakra-ui/react';
import { ActualiteGrid } from './DisplayActualitesGrid';
import parse from 'html-react-parser';
import { bgColor } from '../../themes/constants/bgColor';
import { pathBlogImg, pathDomaineName } from '../../utils/pathBackEnd';
import { useNavigate } from 'react-router-dom';

export interface BlogCardProps {
   blog: ActualiteGrid;
}

export function BlogCard({ blog }: BlogCardProps) {
   const navigate = useNavigate();

   const { id, title, dateCreation, content, categorie, pathImg } = blog;

   const bgCard = bgColor();

   return (
      <Box
         border="2px solid"
         borderRadius="md"
         onClick={() => navigate(`/actualites/${id}`)}
         _hover={{ cursor: 'pointer' }}
         maxH="660px"
         minH="660px"
         bg={bgCard}
         overflow="hidden"
      >
         <Box pos="relative" mb="1">
            <Image
               src={`${pathDomaineName}/${pathBlogImg}/${pathImg}`}
               alt="Image article"
               h="200px"
               w="100%"
               objectFit="cover"
               borderTopRadius="md"
            />

            <Badge variant="outline" pos="absolute" bottom="-6" left="3" colorScheme="orange" borderRadius="md">
               {categorie.slice(3)}
            </Badge>
         </Box>

         <VStack py={6} px={3} spacing={4} align="start" borderBottomRadius="md">
            <Heading as={'h3'} textAlign="start" size="md" p="0">
               {title}
            </Heading>

            <Box noOfLines={11} fontSize={['xs', 'sm', 'sm', 'md']}>
               {parse(content)}
            </Box>
         </VStack>
      </Box>
   );
}
