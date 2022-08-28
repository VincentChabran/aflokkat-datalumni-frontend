import { CloseIcon } from '@chakra-ui/icons';
import { IconButton, useDisclosure, useToast } from '@chakra-ui/react';
import { OperationContext, useMutation } from 'urql';
import { toastSuccessError } from '../../tools/functions/toastSuccessError';
import { UsersNotActive } from '../../views/GestionNewAccount';
import { ModalConfirmationCustom } from '../global/ModalConfirmationCustom';

export interface DeleteButtonProps {
   user: UsersNotActive;
   reExeUsersByIsNotActiveQuery: (opts?: Partial<OperationContext> | undefined) => void;
}

export function DeleteButton({ user, reExeUsersByIsNotActiveQuery }: DeleteButtonProps) {
   const toast = useToast();
   const { isOpen, onOpen, onClose } = useDisclosure();

   const { id, nom, prenom, email } = user;

   const [_, exeDeleteUserMutation] = useMutation(deleteUserMutation);

   const [__, exeSendEmailValidationCreationAccountMutation] = useMutation(sendEmailValidationCreationAccountMutation);

   const sendEmail = async (nom: string, prenom: string, email: string) => {
      const variables = {
         validationCreationAccountInput: {
            nom,
            prenom,
            emailContact: email,
            status: 'invalide',
         },
      };
      const { data, error } = await exeSendEmailValidationCreationAccountMutation(variables);
   };

   const handleValidate = async () => {
      const { data, error } = await exeDeleteUserMutation({ user: { id } });
      if (data) {
         sendEmail(nom, prenom, email);
         reExeUsersByIsNotActiveQuery();
      }

      if (error) console.log(error);

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

const sendEmailValidationCreationAccountMutation = `
mutation Mutation($validationCreationAccountInput: ValidationCreationAccountInput!) {
   sendEmailValidationCreationAccount(validationCreationAccountInput: $validationCreationAccountInput)
 }
`;
