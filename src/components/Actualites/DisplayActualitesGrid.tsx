import { Box, SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useQuery } from 'urql';
import { useActualitesDisplayStore } from '../../store/useActualitesDisplayStore';
import { NotFound } from '../global/Error/NotFound';
import { ServeurError } from '../global/Error/ServeurError';
import { SkeletonActualites } from '../Skeleton/SkeletonActualites';
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
   accueil?: boolean;
}

export function DisplayActualitesGrid({ accueil }: DisplayActualitesGridProps) {
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
            <SkeletonActualites />
         ) : !fetching && (displayActualites ? displayActualites.length <= 0 : !displayActualites) ? (
            <>{data ? <NotFound texte="Aucun article ne correspond à cette recherche.." /> : <ServeurError />}</>
         ) : (
            <SimpleGrid columns={[1, 1, 2, 3, 3]} spacing={7} mx={{ base: 4, lg: 5, xl: 14 }}>
               {displayActualites?.slice(0, accueil ? 3 : undefined).map((blog: ActualiteGrid) => (
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
