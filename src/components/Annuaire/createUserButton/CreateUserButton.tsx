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
import { useSelectUserDisplayStore } from '../../../store/useSelectUserDisplayStore';
import { formatRolesArray } from '../../../tools/functions/formatRolesArray';
import { toastSuccessError } from '../../../tools/functions/toastSuccessError';
import { FormUserCreate, ValuesUserCreate } from './FormUserCreate';

export interface CreateUserButtonProps {}

export function CreateUserButton(props: CreateUserButtonProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const toast = useToast();

   const { addUser, setDisplayUsers } = useSelectUserDisplayStore();

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

   const [__, exeSendEmailAfterCreateUserMutation] = useMutation(sendEmailAfterCreateUserMutation);

   const sendEmail = async (nom: string, prenom: string, email: string, password: string) => {
      await exeSendEmailAfterCreateUserMutation({
         creationAccountInput: {
            nom,
            prenom,
            email,
            password,
         },
      });
   };

   const [_, exeSignUpMutation] = useMutation(singUpMutation);

   const submit = async (values: ValuesUserCreate, { setSubmitting }: FormikHelpers<ValuesUserCreate>): Promise<void> => {
      const { Admin, Equipe_administrative, Recruteur, Enseignant, Etudiant, ...rest } = values;
      const roles = formatRolesArray(Admin, Equipe_administrative, Recruteur, Enseignant, Etudiant);

      const variables = {
         singupUserInput: {
            roles,
            ...rest,
            isActive: true,
         },
      };

      setSubmitting(true);
      const { data, error } = await exeSignUpMutation(variables);

      if (data) sendEmail(values.nom, values.prenom, values.email, values.password);
      setSubmitting(false);

      console.log(data);
      console.log(error);

      toastSuccessError(toast, 'Utilisateur créé', 'Erreur création', data, error);

      // Update de l'affiche sans requete grace au store
      addUser(data.singUp);
      setDisplayUsers();

      onClose();
   };

   return (
      <VStack>
         <Button
            size={{ base: 'xs', sm: 'sm' }}
            variant="outline"
            colorScheme="green"
            onClick={onOpen}
            leftIcon={<AddIcon />}
         >
            Créer un utilisateur
         </Button>

         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Créer un utilisateur</ModalHeader>
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

const sendEmailAfterCreateUserMutation = `
mutation Mutation($creationAccountInput: CreationAccountInput!) {
   sendEmailAfterCreateUser(creationAccountInput: $creationAccountInput)
 }
`;
