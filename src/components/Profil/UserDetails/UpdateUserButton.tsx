import {
   Button,
   HStack,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   useDisclosure,
   useToast,
   VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { Form, Formik, FormikHelpers } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { useMutation } from 'urql';
import { dateToInputValue } from '../../../tools/functions/formatDateForInputValue';
import { UserSpecifique } from '../../../views/Profil';
import CheckboxField from '../../global/formikField/CheckboxField';
import InputField from '../../global/formikField/InputField';
import * as yup from 'yup';
import { getLocalStorageToken, setLocalStorageToken } from '../../../utils/jwtToken';
import InputFileField from '../../global/formikField/InputFileField';
import { pathDomaineName } from '../../../utils/pathBackEnd';
import { useUserStore } from '../../../store/useUserStore';
import { toastSuccessError } from '../../../tools/functions/toastSuccessError';

const FILE_SIZE = 1000000;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const schema = yup.object().shape({
   email: yup.string().email('Format non valide pour un email...').required('Email requis...'),
   nom: yup
      .string()
      .matches(/^([ \u00c0-\u01ffa-zA-Z'-])+$/, 'Le nom ne peut pas contenir de caractères spéciaux')
      .required('Le nom est requis...'),
   prenom: yup
      .string()
      .matches(/^([ \u00c0-\u01ffa-zA-Z'-])+$/, 'Le prenom ne peut pas contenir de caractères spéciaux')
      .required('Le prenom est requis...'),
   dateDeNaissance: yup.date().typeError('Format non valide pour une date').min('1920-11-13', 'Date trop petite'),
   mentor: yup.boolean().typeError('Mentor ne peut être que vrai ou faux'),
   rechercheEmploi: yup.boolean().typeError('Recherche emploi ne peut être que vrai ou faux'),
   file: yup
      .mixed()
      .test('fileSize', 'File too large', (value) => (value ? value.size <= FILE_SIZE : true))
      .test('fileFormat', 'Unsupported Format', (value) => (value ? SUPPORTED_FORMATS.includes(value.type) : true)),
});

export interface UpdateUserButtonProps {
   user: UserSpecifique;
   setUser: Dispatch<SetStateAction<UserSpecifique | undefined>>;
}

export function UpdateUserButton({ user, setUser }: UpdateUserButtonProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const toast = useToast();

   const { id, email, nom, prenom, telephone, dateDeNaissance, mentor, rechercheEmploi } = user;

   const { idUserStore, setUserStore } = useUserStore();

   const initialValues = {
      email,
      nom,
      prenom,
      dateDeNaissance: dateDeNaissance ? dateToInputValue(dateDeNaissance) : '',
      mentor,
      rechercheEmploi,
      file: null,
   };

   const uploadProfilImg = async (file: any): Promise<string | undefined> => {
      if (file) {
         const formData = new FormData();
         const operations = {
            query: 'mutation Mutation($file: Upload!, $user: UpdateUserInput!) {\r\n  uploadProfilePicture(file: $file, user: $user)\r\n}',
            variables: { file: null, user: { id } },
         };
         const map = { 0: ['variables.file'] };
         formData.append('operations', JSON.stringify(operations));
         formData.append('map', JSON.stringify(map));
         formData.append('0', file);

         try {
            const response = await axios({
               method: 'post',
               url: `${pathDomaineName}/graphql`,
               data: formData,
               headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${getLocalStorageToken()}`,
               },
            });
            return response.data.data.uploadProfilePicture;
         } catch (error) {
            console.log(error);
         }
      }
   };

   const [__, exeUpdateUserMutation] = useMutation(updateUserMutation);
   const submit = async (values: Values, { setSubmitting }: FormikHelpers<Values>): Promise<void> => {
      const { file, nom, prenom, email, ...rest } = values;
      const variables = {
         updateUserInput: {
            id,
            email: email.toLowerCase(),
            nom: nom.charAt(0).toUpperCase() + nom.slice(1),
            prenom: prenom.charAt(0).toUpperCase() + prenom.slice(1),
            ...rest,
            dateDeNaissance: values.dateDeNaissance === '' ? null : values.dateDeNaissance,
         },
      };

      setSubmitting(true);
      const profilPictureName = await uploadProfilImg(file);
      const { data, error } = await exeUpdateUserMutation(variables);
      setSubmitting(false);

      console.log(data);
      console.log(error);

      if (data && !error) {
         setUser(data.updateUser.user);
         if (user.id === idUserStore) {
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
            colorScheme="purple"
            leftIcon={<FaUserEdit />}
            onClick={onOpen}
            size={{ base: 'xs', xs: 'sm', lg: 'md' }}
         >
            Modifier
         </Button>

         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Modifier le profil</ModalHeader>

               <ModalCloseButton top="4" />

               <ModalBody>
                  <Formik initialValues={initialValues} onSubmit={submit} validationSchema={schema}>
                     {({ setFieldValue, isSubmitting }) => (
                        <Form>
                           <VStack>
                              <InputField name="email" label="email" type="email" isRequired />
                              <InputField name="nom" label="nom" isRequired />
                              <InputField name="prenom" label="prenom" isRequired />
                              <InputField name="dateDeNaissance" label="date de naissance" type="date" />

                              <HStack spacing={{ base: 3, xs: 10 }} py="5">
                                 <CheckboxField name="mentor" label="Mentor" size={{ base: 'sm', xs: 'md' }} />
                                 <CheckboxField
                                    name="rechercheEmploi"
                                    label="Recherche d'emploi"
                                    size={{ base: 'sm', xs: 'md' }}
                                 />
                              </HStack>

                              <InputFileField label="profil image" name="file" value="file" setFieldValue={setFieldValue} />

                              <HStack pt="5">
                                 <Button
                                    type="submit"
                                    colorScheme="green"
                                    size={{ base: 'sm', xs: 'md' }}
                                    isLoading={isSubmitting}
                                 >
                                    Envoyer
                                 </Button>
                                 <Button colorScheme="red" mr={3} onClick={onClose} size={{ base: 'sm', xs: 'md' }}>
                                    Annuler
                                 </Button>
                              </HStack>
                           </VStack>
                        </Form>
                     )}
                  </Formik>
               </ModalBody>

               <ModalFooter></ModalFooter>
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

interface Values {
   email: string;
   nom: string;
   prenom: string;
   dateDeNaissance: string;
   mentor: boolean;
   rechercheEmploi: boolean;
   file: null;
}
