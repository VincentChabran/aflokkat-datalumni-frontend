import { CheckIcon } from '@chakra-ui/icons';
import {
   IconButton,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
   useDisclosure,
   useToast,
} from '@chakra-ui/react';
import { FormikHelpers } from 'formik';
import { OperationContext, useMutation } from 'urql';
import { formatRolesArray } from '../../tools/functions/formatRolesArray';
import { toastSuccessError } from '../../tools/functions/toastSuccessError';
import { UsersNotActive } from '../../views/GestionNewAccount';
import { FormUpdateRolesUser, ValuesFormUserRoles } from './FormUpdateRolesUser';

export interface ValiderButtonProps {
   user: UsersNotActive;
   reExeUsersByIsNotActiveQuery: (opts?: Partial<OperationContext> | undefined) => void;
}

export function ValiderButton({ user, reExeUsersByIsNotActiveQuery }: ValiderButtonProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const toast = useToast();

   const { id, nom, prenom, email } = user;

   const initialValues = {
      Admin: false,
      Equipe_administrative: false,
      Recruteur: false,
      Enseignant: false,
      Etudiant: true,
   };

   const [__, exeSendEmailValidationCreationAccountMutation] = useMutation(sendEmailValidationCreationAccountMutation);

   const sendEmail = async (nom: string, prenom: string, email: string) => {
      const variables = {
         validationCreationAccountInput: {
            nom,
            prenom,
            emailContact: email,
            status: 'valide',
         },
      };
      const { data, error } = await exeSendEmailValidationCreationAccountMutation(variables);
   };

   const [_, exeUpdatUserMutation] = useMutation(updateUserMutation);

   const submit = async (values: ValuesFormUserRoles, { setSubmitting }: FormikHelpers<ValuesFormUserRoles>) => {
      const { Admin, Equipe_administrative, Recruteur, Enseignant, Etudiant } = values;
      const roles = formatRolesArray(Admin, Equipe_administrative, Recruteur, Enseignant, Etudiant);

      const variables = {
         updateUserInput: {
            id,
            roles,
            isActive: true,
         },
      };

      setSubmitting(true);
      const { data, error } = await exeUpdatUserMutation(variables);

      if (data) {
         sendEmail(nom, prenom, email);
         reExeUsersByIsNotActiveQuery();
      }
      toastSuccessError(toast, 'Compte validé', 'Erreur validation', data, error);

      setSubmitting(false);
   };

   return (
      <>
         <IconButton
            size={{ base: 'xs', sm: 'sm' }}
            variant="outline"
            mr="1"
            colorScheme="green"
            icon={<CheckIcon />}
            aria-label="bouton valider un utilisateur"
            onClick={onOpen}
         />

         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Assigner les rôles</ModalHeader>
               <ModalCloseButton top="4" />
               <ModalBody>
                  <FormUpdateRolesUser initialValues={initialValues} submit={submit} onClose={onClose} />
               </ModalBody>
            </ModalContent>
         </Modal>
      </>
   );
}

const updateUserMutation = `
mutation Mutation($updateUserInput: UpdateUserInput!) {
   updateUser(updateUserInput: $updateUserInput) {
     id
     email
     nom
     prenom
     isActive
   }
 }
`;

const sendEmailValidationCreationAccountMutation = `
mutation Mutation($validationCreationAccountInput: ValidationCreationAccountInput!) {
   sendEmailValidationCreationAccount(validationCreationAccountInput: $validationCreationAccountInput)
 }
`;
