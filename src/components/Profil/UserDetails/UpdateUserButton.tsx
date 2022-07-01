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
   VStack,
} from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { useMutation } from 'urql';
import { dateToInputValue } from '../../../tools/functions/formatDateForInputValue';
import { UserSpecifique } from '../../../views/Profil';
import CheckboxField from '../../global/formikField/CheckboxField';
import InputField from '../../global/formikField/InputField';
import * as yup from 'yup';

const schema = yup.object().shape({
   email: yup.string().email('Format non valide pour un email...').required('Email requis...'),
   nom: yup.string().required('Le nom est requis...'),
   prenom: yup.string().required('Le prenom est requis...'),
   dateDeNaissance: yup.date().typeError('Format non valide pour une date').min('1920-11-13', 'Date trop petite'),
   mentor: yup.boolean().typeError('Mentor ne peut être que vrai ou faux'),
   rechercheEmploi: yup.boolean().typeError('Recherche emploi ne peut être que vrai ou faux'),
});

export interface UpdateUserButtonProps {
   user: UserSpecifique;
   setUser: Dispatch<SetStateAction<UserSpecifique | undefined>>;
}

export function UpdateUserButton({ user, setUser }: UpdateUserButtonProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const { id, email, nom, prenom, telephone, dateDeNaissance, mentor, rechercheEmploi } = user;
   // TODO telephone input
   const initialValues = {
      email,
      nom,
      prenom,
      dateDeNaissance: dateDeNaissance ? dateToInputValue(dateDeNaissance) : '',
      mentor,
      rechercheEmploi,
   };

   const [_, exeUpdateUserMutation] = useMutation(udpateUserMutation);

   const submit = async (values: Values, { setSubmitting }: FormikHelpers<Values>): Promise<void> => {
      console.log(values);

      const variables = {
         updateUserInput: {
            id,
            ...values,
            dateDeNaissance: values.dateDeNaissance === '' ? null : values.dateDeNaissance,
         },
      };
      setSubmitting(true);
      const { data, error } = await exeUpdateUserMutation(variables);
      if (error) console.log(error);

      setUser({ ...user, ...values });
      onClose();
      setSubmitting(false);
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
                     {(formikProps) => (
                        <Form>
                           <VStack>
                              <InputField name="email" label="email" type="email" isRequired />
                              <InputField name="nom" label="nom" isRequired />
                              <InputField name="prenom" label="prenom" isRequired />
                              <InputField name="dateDeNaissance" label="date de naissance" type="date" />

                              <HStack spacing={{ base: 3, xs: 10 }} pt="5">
                                 <CheckboxField name="mentor" label="Mentor" size={{ base: 'sm', xs: 'md' }} />
                                 <CheckboxField
                                    name="rechercheEmploi"
                                    label="Recherche d'emploi"
                                    size={{ base: 'sm', xs: 'md' }}
                                 />
                              </HStack>

                              <HStack pt="5">
                                 <Button type="submit" colorScheme="green" size={{ base: 'sm', xs: 'md' }}>
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

const udpateUserMutation = `
mutation UpdateUser($updateUserInput: UpdateUserInput!) {
   updateUser(updateUserInput: $updateUserInput) {
     id
     email
     nom
     prenom
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
}
