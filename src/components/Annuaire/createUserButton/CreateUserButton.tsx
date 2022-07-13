import { AddIcon } from '@chakra-ui/icons';
import {
   Button,
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
import { FormikHelpers } from 'formik';
import { useMutation } from 'urql';
import { formatRolesArray } from '../../../tools/functions/formatRolesArray';
import { toastSuccessError } from '../../../tools/functions/toastSuccessError';
import { FormUserCreate, ValuesUserCreate } from './FormUserCreate';

export interface CreateUserButtonProps {
   setIsCreated: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateUserButton({ setIsCreated }: CreateUserButtonProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const toast = useToast();

   const initialValues = {
      email: '',
      password: '',
      nom: '',
      prenom: '',
      Admin: false,
      Equipe_administrative: false,
      Recruteur: false,
      Enseignant: false,
      Etudiant: true,
   };

   const [_, exeSignUpMutation] = useMutation(singUpMutation);

   const submit = async (values: ValuesUserCreate, { setSubmitting }: FormikHelpers<ValuesUserCreate>): Promise<void> => {
      const { Admin, Equipe_administrative, Recruteur, Enseignant, Etudiant, ...rest } = values;
      const roles = formatRolesArray(Admin, Equipe_administrative, Recruteur, Enseignant, Etudiant);

      const variables = {
         singupUserInput: {
            roles,
            ...rest,
         },
      };

      setSubmitting(true);
      const { data, error } = await exeSignUpMutation(variables);
      setSubmitting(false);

      toastSuccessError(toast, 'Utilisateur crée', 'Erreur création', data, error);
      if (data && !error) setIsCreated(true);
      onClose();
   };

   return (
      <VStack mt="4">
         <Button
            size={{ base: 'xs', sm: 'sm' }}
            variant="outline"
            colorScheme="green"
            onClick={onOpen}
            leftIcon={<AddIcon />}
         >
            Crer un utilisateur
         </Button>

         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Crer un utilisateur</ModalHeader>
               <ModalCloseButton top="4" />
               <ModalBody>
                  <FormUserCreate initialValues={initialValues} submit={submit} onClose={onClose} />
               </ModalBody>
            </ModalContent>
         </Modal>
      </VStack>
   );
}

const singUpMutation = `
mutation Mutation($singupUserInput: CreateUserInput!) {
   singUp(singupUserInput: $singupUserInput) {
     id
     nom
     prenom
   }
 }
`;
