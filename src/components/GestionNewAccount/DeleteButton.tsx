import { CloseIcon } from '@chakra-ui/icons';
import { IconButton, useDisclosure, useToast } from '@chakra-ui/react';
import { OperationContext, useMutation } from 'urql';
import { toastSuccessError } from '../../tools/functions/toastSuccessError';
import { ModalConfirmationCustom } from '../global/ModalConfirmationCustom';

export interface DeleteButtonProps {
   userId: number;
   reExeUsersByIsNotActiveQuery: (opts?: Partial<OperationContext> | undefined) => void;
}

export function DeleteButton({ userId, reExeUsersByIsNotActiveQuery }: DeleteButtonProps) {
   const toast = useToast();
   const { isOpen, onOpen, onClose } = useDisclosure();

   const [_, exeDeleteUserMutation] = useMutation(deleteUserMutation);

   const handleValidate = async () => {
      const { data, error } = await exeDeleteUserMutation({ user: { id: userId } });
      if (data) reExeUsersByIsNotActiveQuery();

      toastSuccessError(toast, 'Utilisateur suprimé', 'Erreur suppression', data, error);
   };

   return (
      <>
         <IconButton
            icon={<CloseIcon />}
            size={{ base: 'xs', sm: 'sm' }}
            variant="outline"
            colorScheme="red"
            aria-label="Suprimer un utilisateur"
            onClick={onOpen}
         />

         <ModalConfirmationCustom isOpen={isOpen} onClose={onClose} handleValidate={handleValidate} />
      </>
   );
}

const deleteUserMutation = `
mutation Mutation($user: UpdateUserInput!) {
   removeUser(user: $user) {
     id
   }
 }
`;
