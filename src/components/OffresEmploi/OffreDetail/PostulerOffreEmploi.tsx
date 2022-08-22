import { Button, HStack, ModalBody, ModalCloseButton, ModalHeader, useToast, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { getLocalStorageToken } from '../../../utils/jwtToken';
import { pathDomaineName } from '../../../utils/pathBackEnd';
import InputField from '../../global/formikField/InputField';
import InputFileField from '../../global/formikField/InputFileField';
import TextAreaField from '../../global/formikField/TextAreaField';

const SUPPORTED_FORMATS = ['application/pdf', 'image/jpg', 'image/jpeg', 'image/png'];

const schema = yup.object().shape({
   nom: yup
      .string()
      .matches(/^([ \u00c0-\u01ffa-zA-Z'-])+$/, 'Le nom ne peut pas contenir de caractères spéciaux')
      .required('Le nom est requis...'),
   prenom: yup
      .string()
      .matches(/^([ \u00c0-\u01ffa-zA-Z'-])+$/, 'Le prénom ne peut pas contenir de caractères spéciaux')
      .required('Le prénom est requis...'),
   email: yup.string().email('Format non valide pour un email...').required('Champ requis'),
   message: yup.string(),
   file: yup
      .mixed()
      .test('fileSize', 'File too large', (value) => (value ? value.size <= 7000000 : true))
      .test('fileFormat', 'Unsupported Format', (value) => (value ? SUPPORTED_FORMATS.includes(value.type) : true))
      .required('Cv requis'),
   file2: yup
      .mixed()
      .test('fileSize', 'File too large', (value) => (value ? value.size <= 7000000 : true))
      .test('fileFormat', 'Unsupported Format', (value) => (value ? SUPPORTED_FORMATS.includes(value.type) : true))
      .required('Lettre de motivation requise'),
});

export interface PostulerOffreEmploiProps {
   onClose: () => void;
   nomDuPoste: string;
   emailContact: string;
}

export function PostulerOffreEmploi({ onClose, nomDuPoste, emailContact }: PostulerOffreEmploiProps) {
   const toast = useToast();

   const initialValues = {
      nom: '',
      prenom: '',
      email: '',
      message: '',
      file: null,
      file2: null,
   };

   const submit = async (values: ValuesMail, { setSubmitting }: FormikHelpers<any>) => {
      setSubmitting(true);

      if (values.file && values.file2) {
         const formData = new FormData();
         const operations = {
            query: 'mutation Mutation($createMailPostulerOffreInput: CreateMailPostulerOffreInput!, $file: Upload!, $file2: Upload!) {\r\n  sendEmailPostulerOffre(createMailPostulerOffreInput: $createMailPostulerOffreInput, file: $file, file2: $file2)\r\n}',
            variables: {
               createMailPostulerOffreInput: {
                  nomDuPoste,
                  destinataire: emailContact,
                  nom: values.nom,
                  prenom: values.prenom,
                  email: values.email,
                  message: values.message,
               },
               file: null,
               file2: null,
            },
         };
         const map = { 0: ['variables.file'], 1: ['variables.file2'] };

         formData.append('operations', JSON.stringify(operations));
         formData.append('map', JSON.stringify(map));
         formData.append('0', values.file);
         formData.append('1', values.file2);

         try {
            const res = await axios({
               method: 'post',
               url: `${pathDomaineName}/graphql`,
               data: formData,
               headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${getLocalStorageToken()}`,
               },
            });
            toast({
               title: 'Mail envoyé',
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
      onClose();
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

                        <InputFileField label="Cv" name="file" value="file" setFieldValue={setFieldValue} isRequired />
                        <InputFileField
                           label="Lettre de motivation"
                           name="file2"
                           value="file2"
                           setFieldValue={setFieldValue}
                           isRequired
                        />

                        <HStack pt="5" justify="center" w="100%">
                           <Button type="submit" colorScheme="green" size={{ base: 'sm', sm: 'md' }} isLoading={isSubmitting}>
                              Envoyer
                           </Button>

                           <Button colorScheme="red" mr={3} onClick={() => onClose()} size={{ base: 'sm', sm: 'md' }}>
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
   file2: null;
}
