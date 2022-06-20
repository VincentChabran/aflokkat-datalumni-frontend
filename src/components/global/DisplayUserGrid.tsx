import { Box, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';

import { UserCard } from './UserCard';

export interface DisplayUserGridProps {
   columns?: number[];
   slice?: number[] | undefined[];
}

export function DisplayUserGrid({ columns = [1, 1, 2, 3, 4], slice = [undefined] }: DisplayUserGridProps) {
   const [users, setUsers] = useState([]);

   const [{ data, fetching, error }, reExeUsersQuery] = useQuery({ query: usersQuery });

   useEffect(() => {
      if (!fetching && !error && data) {
         setUsers(data.users);
      }
   }, [fetching]);

   return (
      <>
         {fetching ? (
            <Spinner />
         ) : (
            <SimpleGrid columns={columns} spacing={6} mx={{ base: 10, lg: 5, xl: 10 }}>
               {users.slice(...slice).map((user: any) => (
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
     }
     experiencePro {
       id
       fonction
       entreprise
     }
   }
 }
`;
