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
import { dateToInputValue } from '../../../utils/formatDateForInputValue';
import { UserSpecifique } from '../../../views/Profil';
import CheckboxField from '../../global/formikField/CheckboxField';
import InputField from '../../global/formikField/InputField';

interface Values {
   email: string;
   nom: string;
   prenom: string;

   dateDeNaissance: string;
   mentor: boolean;
   rechercheEmploi: boolean;
}

export interface UpdateUserButtonProps {
   user: UserSpecifique;
   setUser: Dispatch<SetStateAction<UserSpecifique>>;
}

export function UpdateUserButton({ user, setUser }: UpdateUserButtonProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const { id, email, nom, prenom, telephone, dateDeNaissance, mentor, rechercheEmploi } = user;

   const initialValues = {
      email,
      nom,
      prenom,
      dateDeNaissance: dateDeNaissance ? dateToInputValue(dateDeNaissance) : '',
      mentor,
      rechercheEmploi,
   };

   const [result, exeUpdateUserMutation] = useMutation(udpateUserMutation);

   const submit = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
      console.log(values);

      const variables = {
         updateUserInput: {
            id,
            ...values,
            dateDeNaissance: values.dateDeNaissance === '' ? null : values.dateDeNaissance,
         },
      };

      const { data, error } = await exeUpdateUserMutation(variables);
      console.log(data);
      console.log(error);

      setUser({ ...user, ...values });
   };

   return (
      <>
         <Button variant="outline" colorScheme="purple" leftIcon={<FaUserEdit />} onClick={onOpen}>
            Modifier
         </Button>

         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Modifier le profil</ModalHeader>

               <ModalCloseButton />

               <ModalBody>
                  <Formik initialValues={initialValues} onSubmit={submit}>
                     {(formikProps) => (
                        <Form>
                           <VStack>
                              <InputField name="email" label="email" type="email" isRequired />
                              <InputField name="nom" label="nom" isRequired />
                              <InputField name="prenom" label="prenom" isRequired />
                              <InputField name="dateDeNaissance" label="date de naissance" type="date" />

                              <HStack spacing={10} pt="5">
                                 <CheckboxField name="mentor" label="Mentor" />
                                 <CheckboxField name="rechercheEmploi" label="Recherche d'emploi" />
                              </HStack>

                              <HStack pt="5">
                                 <Button type="submit" colorScheme="green" onClick={onClose}>
                                    Envoyer
                                 </Button>
                                 <Button colorScheme="red" mr={3} onClick={onClose}>
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
