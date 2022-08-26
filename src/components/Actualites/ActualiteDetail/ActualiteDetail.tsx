import { Badge, Box, Button, Heading, HStack, Image, Spacer, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'urql';
import parse from 'html-react-parser';
import { bgColor } from '../../../themes/constants/bgColor';
import { pathBlogImg, pathDomaineName } from '../../../utils/pathBackEnd';
import { ActualiteGrid } from '../DisplayActualitesGrid';
import { UpdateActuButton } from './UpdateActuButton';
import { DeleteActuButton } from './DeleteActuButton';
import { formatDateDdMmYyyy } from '../../../tools/functions/formatDateDdMmYyyy';
import { BsFillPencilFill } from 'react-icons/bs';
import { useUserStore } from '../../../store/useUserStore';
import { NotFound } from '../../global/Error/NotFound';

export interface ActualiteDetailProps {}

export function ActualiteDetail(props: ActualiteDetailProps) {
   const { blogId } = useParams();
   const navigate = useNavigate();

   const { idUserStore, rolesUserStore } = useUserStore();

   const [display, setDisplay] = useState('detail');

   const [blog, setBlog] = useState<ActualiteGrid>();
   const [{ data, fetching, error }] = useQuery({ query: blogQuery, variables: { blogId: parseInt(blogId ?? '') } });

   useEffect(() => {
      if (!fetching && data) setBlog(data.blog);
   }, [fetching]);

   const bgBox = bgColor();

   return (
      <>
         {fetching ? (
            <Spinner />
         ) : !blog ? (
            <NotFound texte="L'actualité que vous cherchez n'existe pas." />
         ) : (
            <Box p={{ base: 3, sm: 9 }} px={{ base: 3, lg: 16 }}>
               {display === 'detail' && (
                  <Box bgColor={bgBox} borderRadius="lg" pb="4">
                     <Image
                        src={`${pathDomaineName}/${pathBlogImg}/${blog?.pathImg}`}
                        alt="Image article"
                        maxH="500px"
                        w="100%"
                        objectFit="cover"
                        borderTopRadius="lg"
                     />

                     <Box p={{ base: 3, sm: 8 }}>
                        <Heading>{blog?.title}</Heading>

                        <Box>{parse(blog?.content)}</Box>

                        <HStack mt="12">
                           <Badge variant="outline" colorScheme="orange" borderRadius="md">
                              {blog.categorie.slice(3)}
                           </Badge>
                           <Spacer />

                           <Text>Écrit par</Text>
                           <Text
                              fontWeight="bold"
                              _hover={{ cursor: 'pointer' }}
                              onClick={() => navigate(`/profil/${blog.userCreateur.id}`)}
                           >{` ${blog.userCreateur.prenom} ${blog.userCreateur.nom}`}</Text>
                           <Text fontSize="15px">le {formatDateDdMmYyyy(blog.dateCreation)}</Text>
                        </HStack>
                     </Box>

                     {(idUserStore === blog.userCreateur.id || rolesUserStore.includes('Admin')) && (
                        <HStack justify="center">
                           {idUserStore === blog.userCreateur.id && (
                              <Button
                                 variant="outline"
                                 colorScheme="purple"
                                 leftIcon={<BsFillPencilFill />}
                                 size={{ base: 'xs', xs: 'sm', lg: 'md' }}
                                 onClick={() => setDisplay('update')}
                              >
                                 Modifier
                              </Button>
                           )}

                           <DeleteActuButton blogId={blog.id} />
                        </HStack>
                     )}
                  </Box>
               )}

               {display === 'update' && <UpdateActuButton blog={blog} setBlog={setBlog} setDisplay={setDisplay} />}
            </Box>
         )}
      </>
   );
}

const blogQuery = `
query Blog($blogId: Int!) {
   blog(id: $blogId) {
     id
     title
     categorie
     content
     pathImg
     dateCreation
     userCreateur {
       id
       nom
       prenom
     }
   }
 }
`;
