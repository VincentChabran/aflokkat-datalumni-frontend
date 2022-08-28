import { Td, Tr } from '@chakra-ui/react';
import { OperationContext } from 'urql';
import { paddingTable, UsersNotActive } from '../../views/GestionNewAccount';
import { DeleteButton } from './DeleteButton';
import { ValiderButton } from './ValiderButton';

export interface TableRowProps {
   user: UsersNotActive;
   reExeUsersByIsNotActiveQuery: (opts?: Partial<OperationContext> | undefined) => void;
}

export function TableRow({ user, reExeUsersByIsNotActiveQuery }: TableRowProps) {
   const { id, nom, prenom, email } = user;

   return (
      <Tr fontSize={{ base: 'xs', sm: 'sm' }}>
         <Td px={paddingTable}>{nom}</Td>
         <Td px={paddingTable}>{prenom}</Td>
         <Td px={paddingTable}>{email}</Td>
         <Td px={paddingTable}>
            <ValiderButton user={user} reExeUsersByIsNotActiveQuery={reExeUsersByIsNotActiveQuery} />

            <DeleteButton user={user} reExeUsersByIsNotActiveQuery={reExeUsersByIsNotActiveQuery} />
         </Td>
      </Tr>
   );
}
