import { EditIcon } from '@chakra-ui/icons';
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
} from '@chakra-ui/react';
import { FormikHelpers } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'urql';
import { useUserStore } from '../../../store/useUserStore';
import { formatRolesArray } from '../../../tools/functions/formatRolesArray';
import { toastSuccessError } from '../../../tools/functions/toastSuccessError';
import { setLocalStorageToken } from '../../../utils/jwtToken';
import { UserSpecifique } from '../../../views/Profil';
import { FormUpdateRolesUser, ValuesFormUserRoles } from '../../GestionNewAccount/FormUpdateRolesUser';

export interface UpdateUserRolesButtonProps {
   user: UserSpecifique;
   setUser: Dispatch<SetStateAction<UserSpecifique | undefined>>;
}

export function UpdateUserRolesButton({ user, setUser }: UpdateUserRolesButtonProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const toast = useToast();

   const { idUserStore, rolesUserStore, setUserStore } = useUserStore();

   const { id, roles } = user;

   const initialValues = {
      Admin: rolesUserStore.includes('Admin') ? roles.includes('Admin') : false,
      Equipe_administrative: roles.includes('Equipe_administrative'),
      Recruteur: roles.includes('Recruteur'),
      Enseignant: roles.includes('Enseignant'),
      Etudiant: roles.includes('Etudiant'),
   };

   const [_, exeUpdateUserMutation] = useMutation(updateUserMutation);

   const submit = async (values: ValuesFormUserRoles, { setSubmitting }: FormikHelpers<ValuesFormUserRoles>) => {
      const { Admin, Equipe_administrative, Recruteur, Enseignant, Etudiant } = values;
      const roles = formatRolesArray(Admin, Equipe_administrative, Recruteur, Enseignant, Etudiant);

      const variables = {
         updateUserInput: {
            id,
            roles,
         },
      };

      setSubmitting(true);
      const { data, error } = await exeUpdateUserMutation(variables);
      setSubmitting(false);

      if (data && !error) {
         setUser(data.updateUser.user);
         if (idUserStore === user.id) {
            setUserStore(data.updateUser.user);
            setLocalStorageToken(data.updateUser.accessToken);
         }
      }
      toastSuccessError(toast, 'Profil modifié', 'Erreur modification', data, error);
      onClose();
   };

   return (
      <>
         <Button
            variant="outline"
            colorScheme="yellow"
            leftIcon={<EditIcon />}
            onClick={onOpen}
            size={{ base: 'xs', xs: 'sm', lg: 'md' }}
         >
            Assigner les rôles
         </Button>

         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Modifier les Rôles</ModalHeader>
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
     accessToken
     user {
       id
       email
       nom
       prenom
       profilPictureName
       roles
       mentor
     }
   }
 }
`;
