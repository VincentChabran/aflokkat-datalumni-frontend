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
   useToast,
   VStack,
} from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useMutation } from 'urql';
import { useUserStore } from '../../../store/useUserStore';
import { toastSuccessError } from '../../../tools/functions/toastSuccessError';
import InputField from '../../global/formikField/InputField';
import TextAreaField from '../../global/formikField/TextAreaField';

const schema = yup.object().shape({
   nom: yup
      .string()
      .matches(/^([ \u00c0-\u01ffa-zA-Z'-])+$/, 'Le nom ne peut pas contenir de caractères spéciaux')
      .required('Le nom est requis...'),
   prenom: yup
      .string()
      .matches(/^([ \u00c0-\u01ffa-zA-Z'-])+$/, 'Le prenom ne peut pas contenir de caractères spéciaux')
      .required('Le prenom est requis...'),
   email: yup.string().email('Format non valide pour un email...').required('Email requis...'),
   objet: yup.string().required('Champ requis'),
   description: yup.string().required('Champ requis'),
});

export interface ContactMentorMailProps {
   to: string;
}

export function ContactMentorMail({ to }: ContactMentorMailProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const toast = useToast();
   const { emailUserStore, nomUserStore, prenomUserStore } = useUserStore();

   const initialValues = {
      nom: nomUserStore,
      prenom: prenomUserStore,
      email: emailUserStore,
      objet: '',
      description: '',
   };

   const [_, exeSendEmailMentorMutation] = useMutation(sendEmailMentorMutation);

   const submit = async (values: ValuesContactMentor, { setSubmitting }: FormikHelpers<ValuesContactMentor>) => {
      const { email, ...rest } = values;

      const variables = {
         mailMentorInput: {
            to,
            email: email.toLocaleLowerCase(),
            ...rest,
         },
      };

      setSubmitting(true);
      const { data, error } = await exeSendEmailMentorMutation(variables);
      setSubmitting(false);

      toastSuccessError(toast, 'Mail envoyée', 'Envoi fail', data, error);
      onClose();
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
                  <Formik initialValues={initialValues} onSubmit={submit} validationSchema={schema}>
                     {({ values, isSubmitting }) => (
                        <Form>
                           <VStack align="start">
                              <InputField name="nom" label="nom" placeholder="Nom" isRequired />
                              <InputField name="prenom" label="prenom" placeholder="Prenom" isRequired />
                              <InputField name="email" label="Votre email" placeholder="Votre email" isRequired />

                              <InputField name="objet" label="Objet du mail" placeholder="Objet du mail" isRequired />
                              <TextAreaField label="description" name="description" placeholder="Description" isRequired />

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

interface ValuesContactMentor {
   nom: string;
   prenom: string;
   email: string;
   objet: string;
   description: string;
}

const sendEmailMentorMutation = `
mutation Mutation($mailMentorInput: MailMentorInput!) {
   sendEmailMentor(mailMentorInput: $mailMentorInput)
 }
`;
