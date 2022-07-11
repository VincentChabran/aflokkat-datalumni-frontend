import { Button, HStack, ModalBody, ModalCloseButton, ModalHeader, useToast, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { Form, Formik, FormikHelpers } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import * as yup from 'yup';
import { getLocalStorageToken } from '../../../../utils/jwtToken';
import { pathDomaineName } from '../../../../utils/pathBackEnd';
import InputField from '../../../global/formikField/InputField';
import InputFileField from '../../../global/formikField/InputFileField';
import TextAreaField from '../../../global/formikField/TextAreaField';

const SUPPORTED_FORMATS = ['application/pdf', 'image/jpg', 'image/jpeg', 'image/png'];

const schema = yup.object().shape({
   nom: yup.string().required('Champ requis'),
   prenom: yup.string().required('Champ requis'),
   email: yup.string().email('Format non valide pour un email...').required('Champ requis'),
   message: yup.string(),
   file: yup
      .mixed()
      .test('fileSize', 'File too large', (value) => (value ? value.size <= 7000000 : true))
      .test('fileFormat', 'Unsupported Format', (value) => (value ? SUPPORTED_FORMATS.includes(value.type) : true))
      .required('Cv requis'),
});

export interface PostulerOffreEmploiProps {
   setDisplay: Dispatch<SetStateAction<string>>;
   onClose: () => void;
   nomDuPoste: string;
   emailContact: string;
}

export function PostulerOffreEmploi({ setDisplay, onClose, nomDuPoste, emailContact }: PostulerOffreEmploiProps) {
   const toast = useToast();

   const initialValues = {
      nom: '',
      prenom: '',
      email: '',
      message: '',
      file: null,
   };

   const submit = async (values: ValuesMail, { setSubmitting }: FormikHelpers<any>) => {
      setSubmitting(true);

      if (values.file) {
         const formData = new FormData();
         const operations = {
            query: 'mutation Mutation($createMailInput: CreateMailInput!, $file: Upload!) {\r\n  sendEmail(createMailInput: $createMailInput, file: $file)\r\n}',
            variables: {
               createMailInput: {
                  nomDuPoste,
                  destinataire: emailContact,
                  nom: values.nom,
                  prenom: values.prenom,
                  email: values.email,
                  message: values.message,
               },
               file: null,
            },
         };
         const map = { 0: ['variables.file'] };

         formData.append('operations', JSON.stringify(operations));
         formData.append('map', JSON.stringify(map));
         formData.append('0', values.file);

         try {
            await axios({
               method: 'post',
               url: `${pathDomaineName}/graphql`,
               data: formData,
               headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${getLocalStorageToken()}`,
               },
            });
            toast({
               title: 'Mail envoyée',
               status: 'success',
               duration: 3000,
               position: 'top',
               isClosable: true,
            });
         } catch (error) {
            console.log(error);
            toast({
               title: 'Mail error',
               status: 'error',
               duration: 3000,
               position: 'top',
               isClosable: true,
            });
         }
      }
      setSubmitting(false);
      setDisplay('infos');
   };

   return (
      <>
         <ModalHeader>Postuler pour l'offre "{nomDuPoste}"</ModalHeader>
         <ModalCloseButton />

         <ModalBody>
            <Formik initialValues={initialValues} onSubmit={submit} validationSchema={schema}>
               {({ isSubmitting, setFieldValue }) => (
                  <Form>
                     <VStack justify="center" w="100%">
                        <InputField name="nom" label="Nom" placeholder="Nom" isRequired />
                        <InputField name="prenom" label="Prenom" placeholder="Prenom" isRequired />
                        <InputField name="email" label="Email" placeholder="Email" type="email" isRequired />

                        <TextAreaField name="message" label="message" placeholder="Message" />

                        <InputFileField label="Cv" name="file" setFieldValue={setFieldValue} isRequired />

                        <HStack pt="5" justify="center" w="100%">
                           <Button type="submit" colorScheme="green" size={{ base: 'sm', sm: 'md' }} isLoading={isSubmitting}>
                              Envoyer
                           </Button>

                           <Button
                              colorScheme="red"
                              mr={3}
                              onClick={() => {
                                 if (setDisplay) setDisplay('infos');
                                 else if (onClose) onClose();
                              }}
                              size={{ base: 'sm', sm: 'md' }}
                           >
                              Annuler
                           </Button>
                        </HStack>
                     </VStack>
                  </Form>
               )}
            </Formik>
         </ModalBody>
      </>
   );
}

interface ValuesMail {
   nom: string;
   prenom: string;
   email: string;
   message: string;
   file: null;
}
