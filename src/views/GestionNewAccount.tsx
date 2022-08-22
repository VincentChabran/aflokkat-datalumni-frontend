import {
   Box,
   Heading,
   Spinner,
   Table,
   TableCaption,
   TableContainer,
   Tbody,
   Th,
   Thead,
   Tr,
   useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'urql';
import { TableRow } from '../components/GestionNewAccount/TableRow';
import { useUserStore } from '../store/useUserStore';
import { bgColor } from '../themes/constants/bgColor';

export interface UsersNotActive {
   id: number;
   email: string;
   nom: string;
   prenom: string;
   roles: string[];
}

export interface GestionNewAccountProps {}

export function GestionNewAccount(props: GestionNewAccountProps) {
   const navigate = useNavigate();
   const { rolesUserStore } = useUserStore();

   const [{ data, fetching, error }, reExeUsersByIsNotActiveQuery] = useQuery({ query: usersByIsNotActiveQuery });

   const [users, setUsers] = useState<UsersNotActive[]>();

   useEffect(() => {
      if (data) setUsers(data.usersByIsNotActive);
   }, [fetching]);

   useEffect(() => {
      if (!rolesUserStore.includes('Admin')) navigate('/accueil');
   }, []);

   const bg = bgColor();
   const colorTable = useColorModeValue('orange', 'blue');

   return (
      <>
         {fetching ? (
            <Spinner />
         ) : (
            <Box py="10" px={{ base: '0', sm: '1', md: '8', lg: '10' }}>
               <Box py={{ base: '6', md: '8', lg: '14' }} px={{ base: '0', md: '5', lg: '10' }} borderRadius="md" bg={bg}>
                  <Heading as="h4" size="lg">
                     Validation de nouveau compte
                  </Heading>

                  <TableContainer my="6" overflow="initial">
                     <Table variant="striped" colorScheme={colorTable}>
                        <Thead>
                           <Tr>
                              <Th p={paddingTable}>Nom</Th>
                              <Th p={paddingTable}>Prenom</Th>
                              <Th p={paddingTable}>Email</Th>
                              <Th p={paddingTable}>Validation</Th>
                           </Tr>
                        </Thead>

                        <Tbody>
                           {users?.map((el) => (
                              <TableRow key={el.id} user={el} reExeUsersByIsNotActiveQuery={reExeUsersByIsNotActiveQuery} />
                           ))}
                        </Tbody>

                        <TableCaption>
                           {users && users.length > 0 ? 'Valider pour assigner les rôles.' : 'Aucun utilisateur en attente.'}
                        </TableCaption>
                     </Table>
                  </TableContainer>
               </Box>
            </Box>
         )}
      </>
   );
}

const usersByIsNotActiveQuery = `
query Query {
   usersByIsNotActive {
     id
     email
     nom
     prenom
     roles
   }
 }
`;

export const paddingTable = 2;
