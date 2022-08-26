import { Box, SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'urql';
import { useSelectUserDisplayStore } from '../../store/useSelectUserDisplayStore';
import { NotFound } from '../global/Error/NotFound';
import { ServeurError } from '../global/Error/ServeurError';
import { SkeletonUserCard } from '../Skeleton/SkeletonUserCard';
import { UserCard } from './UserCard';

export interface UsersGrid {
   id: number;
   nom: string;
   prenom: string;
   profilPictureName: string | null;
   roles: string[];
   mentor: boolean;
   rechercheEmploi: boolean;
   formations:
      | {
           id: number;
           nomFormation: string;
           nomEtablissement: string;
           anneeObtention: number;
           typeDiplome: string;
        }[]
      | null;
   experiencePro:
      | {
           id: number;
           fonction: string;
           entreprise: string;
        }[]
      | null;
}

export interface DisplayUserGridProps {
   columns?: number[];
   slice?: number | undefined;
}

export function DisplayUserGrid({ columns = [1, 1, 2, 3, 4], slice = undefined }: DisplayUserGridProps) {
   const { setUsers, displayUsers, setDisplayUsers } = useSelectUserDisplayStore();

   const navigate = useNavigate();

   const [{ data, fetching, error }] = useQuery({ query: usersQuery });

   useEffect(() => {
      if (!fetching && !error && data) {
         let { users } = data;
         users.sort((a: UsersGrid, b: UsersGrid) => a.id - b.id); // sort id 1 à max
         users.forEach((el: UsersGrid) => {
            el.formations?.sort((a, b) => a.id - b.id);
            el.experiencePro?.sort((a, b) => a.id - b.id);
         });
         setUsers(users);
         setDisplayUsers();
      }
   }, [fetching]);

   return (
      <>
         {fetching ? (
            <SkeletonUserCard columns={columns} max={slice ? -slice : 8} />
         ) : // Si ca ne fetch pas, et que la lenght de displayUser plus petit ou égal à 0
         !fetching && (displayUsers ? displayUsers.length <= 0 : !displayUsers) ? (
            <>
               {data ? (
                  <NotFound texte="Aucun utilisateur ne correspond à cette recherche, veuillez réessayer..." />
               ) : (
                  <ServeurError />
               )}
            </>
         ) : (
            <SimpleGrid columns={columns} spacing={6} mx={{ base: 2, lg: 5, xl: 10 }}>
               {displayUsers?.slice(slice).map((user: UsersGrid) => (
                  <Box key={user.id} h="100%" onClick={() => navigate(`/profil/${user.id}`)} _hover={{ cursor: 'pointer' }}>
                     <UserCard user={user} />
                  </Box>
               ))}
            </SimpleGrid>
         )}
      </>
   );
}

const usersQuery = `
query Query {
   users {
     id
     nom
     prenom
     roles
     mentor
     rechercheEmploi
     profilPictureName
     formations {
       id
       nomFormation
       nomEtablissement
       anneeObtention
       typeDiplome
     }
     experiencePro {
       id
       fonction
       entreprise
     }
   }
 }
`;
