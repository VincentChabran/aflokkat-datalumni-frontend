import { Box, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'urql';
import { useSelectUserDisplayStore } from '../../store/useSelectUserDisplayStore';
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
   mentor?: boolean;
}

export function DisplayUserGrid({ columns = [1, 1, 2, 3, 4], slice = undefined, mentor = false }: DisplayUserGridProps) {
   const { setUsers, displayUsers, setDisplayUsers } = useSelectUserDisplayStore();

   const navigate = useNavigate();

   const [{ data, fetching, error }] = useQuery({ query: usersQuery });

   useEffect(() => {
      if (!fetching && !error && data) {
         let { users } = data;
         users.sort((a: any, b: any) => a.id - b.id); // sort id 1 à max
         if (mentor) users = users.filter((user: UsersGrid) => user.mentor === true);
         setUsers(users);
         setDisplayUsers();
      }
   }, [fetching]);

   // const [load, setLoad] = useState(true);
   // useEffect(() => {
   //    const timer = setTimeout(() => {
   //       setLoad(false);
   //       clearTimeout(timer);
   //    }, 1000);
   // }, []);

   return (
      <>
         {fetching ? (
            <SkeletonUserCard columns={columns} max={slice ? -slice : 8} />
         ) : !fetching && (displayUsers ? displayUsers.length <= 0 : !displayUsers) ? (
            <Box>Todo affichage utilisateur non trouvé</Box>
         ) : (
            <SimpleGrid columns={columns} spacing={6} mx={{ base: 10, lg: 5, xl: 10 }}>
               {displayUsers?.slice(slice).map((user: UsersGrid) => (
                  <Box key={user.id} h="100%" onClick={() => navigate(`/profil/${user.id}`)} _hover={{ cursor: 'pointer' }}>
                     <UserCard user={user} />
                  </Box>
               ))}
            </SimpleGrid>
         )}
         <Box h="100px"></Box>
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
