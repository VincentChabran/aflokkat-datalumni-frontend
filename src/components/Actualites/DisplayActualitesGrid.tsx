import { Box, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useQuery } from 'urql';
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
   const [{ data, fetching, error }, reExeBlogsQuery] = useQuery({ query: blogsQuery });
   console.log(data);

   useEffect(() => {
      if (!fetching && !error && data) {
      }
   }, [fetching]);

   return (
      <>
         {fetching ? (
            <Spinner />
         ) : !data ? (
            <Box>TODO Aucun résultat</Box>
         ) : (
            <SimpleGrid columns={[1, 1, 2, 2, 3]} spacing={7} mx={{ base: 4, lg: 5, xl: 14 }}>
               {data?.blogs?.map((blog: ActualiteGrid) => (
                  <>
                     <Box key={blog.id}>
                        <BlogCard blog={blog} />
                     </Box>
                     <Box key={blog.id}>
                        <BlogCard blog={blog} />
                     </Box>
                     <Box key={blog.id}>
                        <BlogCard blog={blog} />
                     </Box>
                  </>
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
