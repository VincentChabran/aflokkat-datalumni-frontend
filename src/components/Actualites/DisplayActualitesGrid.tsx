import { Box, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useQuery } from 'urql';
import { useActualitesCreateStore } from '../../store/useActualitesCreateStore';
import { BlogCard } from './BlogCard';

export interface ActualiteGrid {
   id: number;
   title: string;
   categorie: string;
   content: string;
   pathImg: string;
   dateCreation: Date;
   userCreateur: {
      id: number;
      nom: string;
      prenom: string;
   };
}

export interface DisplayActualitesGridProps {
   selectByCategorie?: string;
}

export function DisplayActualitesGrid({ selectByCategorie }: DisplayActualitesGridProps) {
   const { isCreatedOrDelete, setIsCreatedOrDelete } = useActualitesCreateStore();

   const [{ data, fetching, error }, reExeBlogsQuery] = useQuery({ query: blogsQuery });

   useEffect(() => {
      if (!fetching && !error && data) {
      }
   }, [fetching]);

   useEffect(() => {
      if (isCreatedOrDelete) {
         reExeBlogsQuery({ requestPolicy: 'network-only' });
         setIsCreatedOrDelete(false);
      }
   }, [isCreatedOrDelete]);

   return (
      <>
         {fetching ? (
            <Spinner />
         ) : !data || data?.blogs?.filter((el: ActualiteGrid) => el.categorie.includes(selectByCategorie ?? '')) == 0 ? (
            <Box>TODO Aucun résultat</Box>
         ) : (
            <SimpleGrid columns={[1, 1, 2, 3, 3]} spacing={7} mx={{ base: 4, lg: 5, xl: 14 }}>
               {data?.blogs
                  ?.filter((el: ActualiteGrid) => el.categorie.includes(selectByCategorie ?? ''))
                  .map((blog: ActualiteGrid) => (
                     <Box key={blog.id}>
                        <BlogCard blog={blog} />
                     </Box>
                  ))}
            </SimpleGrid>
         )}
      </>
   );
}

const blogsQuery = `
query Query {
   blogs {
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
