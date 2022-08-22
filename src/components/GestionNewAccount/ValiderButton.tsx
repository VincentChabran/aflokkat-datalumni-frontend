import { CheckIcon } from '@chakra-ui/icons';
import {
   Button,
   Flex,
   HStack,
   IconButton,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
   useDisclosure,
   useToast,
   VStack,
} from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { OperationContext, useMutation } from 'urql';
import { formatRolesArray } from '../../tools/functions/formatRolesArray';
import { toastSuccessError } from '../../tools/functions/toastSuccessError';
import { UsersNotActive } from '../../views/GestionNewAccount';
import CheckboxField from '../global/formikField/CheckboxField';

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

   const submit = async (values: ValuesUserValidate, { setSubmitting }: FormikHelpers<ValuesUserValidate>) => {
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
                  <Formik initialValues={initialValues} onSubmit={submit}>
                     {({ isSubmitting }) => (
                        <VStack align="stretch" w="100%">
                           <Form>
                              <Flex wrap="wrap" gap="4">
                                 <CheckboxField name="Admin" label="Admin" />
                                 <CheckboxField name="Equipe_administrative" label="Équipe-Administrative" />
                                 <CheckboxField name="Recruteur" label="Recruteur" />
                                 <CheckboxField name="Enseignant" label="Enseignant" />
                                 <CheckboxField name="Etudiant" label="Étudiant" />
                              </Flex>

                              <HStack pt="5" justify="center" w="100%">
                                 <Button
                                    type="submit"
                                    colorScheme="green"
                                    size={{ base: 'sm', sm: 'md' }}
                                    isLoading={isSubmitting}
                                 >
                                    Valider
                                 </Button>

                                 <Button colorScheme="red" mr={3} onClick={() => onClose()} size={{ base: 'sm', sm: 'md' }}>
                                    Annuler
                                 </Button>
                              </HStack>
                           </Form>
                        </VStack>
                     )}
                  </Formik>
               </ModalBody>
            </ModalContent>
         </Modal>
      </>
   );
}

export interface ValuesUserValidate {
   Admin: boolean;
   Equipe_administrative: boolean;
   Recruteur: boolean;
   Enseignant: boolean;
   Etudiant: boolean;
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
