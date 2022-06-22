import { Box, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useQuery } from 'urql';
import { useSelectUserDisplayStore } from '../../store/useSelectUserDisplayStore';
import { UserCard } from './UserCard';

export interface User {
   id: number;
   nom: string;
   prenom: string;
   profilPictureName: string;
   roles: string[];
   mentor: boolean;
   rechercheEmploi: boolean;
   formations: {
      id: number;
      nomFormation: string;
      nomEtablissement: string;
      anneeObtention: number;
      typeDiplome: string;
   }[];

   experiencePro: {
      id: number;
      fonction: string;
      entreprise: string;
   }[];
}

export interface DisplayUserGridProps {
   columns?: number[];
   slice?: number[] | undefined[];
   mentor?: boolean;
}

export function DisplayUserGrid({ columns = [1, 1, 2, 3, 4], slice = [undefined], mentor = false }: DisplayUserGridProps) {
   const { setUsers, displayUsers, setDisplayUsers } = useSelectUserDisplayStore();

   const [{ data, fetching, error }] = useQuery({ query: usersQuery });

   useEffect(() => {
      if (!fetching && !error && data) {
         let { users } = data;
         users.sort((a: any, b: any) => a.id - b.id); // sort id 1 à max
         if (mentor) users = users.filter((user: User) => user.mentor === true);
         setUsers(users);
         setDisplayUsers();
      }
   }, [fetching]);

   return (
      <>
         {fetching ? (
            <Spinner />
         ) : !fetching && (displayUsers ? displayUsers.length <= 0 : !displayUsers) ? (
            <Box>Todo affichage utilisateur non trouvé</Box>
         ) : (
            <SimpleGrid columns={columns} spacing={6} mx={{ base: 10, lg: 5, xl: 10 }}>
               {displayUsers?.slice(...slice).map((user: User) => (
                  <UserCard user={user} key={user.id} />
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
