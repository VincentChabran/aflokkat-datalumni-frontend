import { EmailIcon } from '@chakra-ui/icons';
import {
   Button,
   HStack,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
   useDisclosure,
   VStack,
} from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import InputField from '../../global/formikField/InputField';
import TextAreaField from '../../global/formikField/TextAreaField';

export interface ContactMentorMailProps {}

export function ContactMentorMail(props: ContactMentorMailProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const initialValues = {
      nom: '',
      prenom: '',
      email: '',
      sujet: '',
      description: '',
   };

   const submit = async (values: any, { setSubmitting }: FormikHelpers<any>) => {
      console.log(values);
   };

   return (
      <>
         <Button
            variant="outline"
            colorScheme="green"
            leftIcon={<EmailIcon />}
            onClick={onOpen}
            size={{ base: 'xs', xs: 'sm', lg: 'md' }}
         >
            Envoyer un email
         </Button>

         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Envoyer un email</ModalHeader>
               <ModalCloseButton top="4" />
               <ModalBody>
                  <Formik initialValues={initialValues} onSubmit={submit}>
                     {({ values, isSubmitting }) => (
                        <Form>
                           <VStack align="start">
                              <InputField name="nom" label="nom" placeholder="Nom" isRequired />
                              <InputField name="prenom" label="nom" placeholder="Prenom" isRequired />
                              <InputField name="email" label="Votre email" placeholder="Votre email" isRequired />

                              <InputField name="sujet" label="Sujet du mail" placeholder="Sujet du mail" isRequired />

                              <TextAreaField label="description" name="description" placeholder="Description" />

                              <HStack pt="5">
                                 <Button
                                    type="submit"
                                    colorScheme="green"
                                    size={{ base: 'sm', xs: 'md' }}
                                    isLoading={isSubmitting}
                                 >
                                    Valider
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
            </ModalContent>
         </Modal>
      </>
   );
}
