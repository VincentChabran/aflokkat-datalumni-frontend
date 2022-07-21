import { Box, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useQuery } from 'urql';
import { useActualitesDisplayStore } from '../../store/useActualitesDisplayStore';
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

export interface DisplayActualitesGridProps {}

export function DisplayActualitesGrid(props: DisplayActualitesGridProps) {
   const { actualites, setActualites, displayActualites, setDisplayActualites } = useActualitesDisplayStore();

   const [{ data, fetching, error }] = useQuery({ query: blogsQuery });

   useEffect(() => {
      if (!fetching && !error && data && !actualites) {
         setActualites(data.blogs);
         setDisplayActualites();
      }
   }, [fetching]);

   return (
      <>
         {fetching ? (
            <Spinner />
         ) : !fetching && (displayActualites ? displayActualites.length <= 0 : !displayActualites) ? (
            <Box>TODO Aucun résultat</Box>
         ) : (
            <SimpleGrid columns={[1, 1, 2, 3, 3]} spacing={7} mx={{ base: 4, lg: 5, xl: 14 }}>
               {displayActualites?.map((blog: ActualiteGrid) => (
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
