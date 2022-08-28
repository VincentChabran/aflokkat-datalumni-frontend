import { AddIcon } from '@chakra-ui/icons';
import {
   Button,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Text,
   useDisclosure,
   useToast,
   VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { Form, Formik, FormikHelpers } from 'formik';
import { getLocalStorageToken } from '../../../utils/jwtToken';
import { pathDomaineName } from '../../../utils/pathBackEnd';
import InputFileField from '../../global/formikField/InputFileField';

export interface AddUsersByCsvProps {}

export function AddUsersByCsv(props: AddUsersByCsvProps) {
   const toast = useToast();
   const { isOpen, onOpen, onClose } = useDisclosure();

   const submit = async (values: { file: null }, { setSubmitting }: FormikHelpers<{ file: null }>) => {
      if (values.file) {
         const formData = new FormData();
         const operations = {
            query: 'mutation Mutation($file: Upload!) {\r\n  uploadCsvFormation(file: $file)\r\n}',
            variables: {
               file: null,
            },
         };
         const map = { 0: ['variables.file'] };

         formData.append('operations', JSON.stringify(operations));
         formData.append('map', JSON.stringify(map));
         formData.append('0', values.file);

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
            title: res.data.data.uploadCsvFormation === 'valide' ? 'Utilisateur créé' : 'Erreur création',
            status: res.data.data.uploadCsvFormation === 'valide' ? 'success' : 'error',
            duration: 3000,
            position: 'top',
            isClosable: true,
            description: res.data.data.uploadCsvFormation === 'valide' ? '' : res.data.data.uploadCsvFormation,
         });

         if (res.data.data.uploadCsvFormation === 'valide') window.location.reload();
      }
   };

   return (
      <>
         <Button
            size={{ base: 'xs', sm: 'sm' }}
            variant="outline"
            colorScheme="green"
            onClick={onOpen}
            leftIcon={<AddIcon />}
         >
            Ajouter des utilisateurs
         </Button>

         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Upload Csv</ModalHeader>
               <ModalCloseButton top="4" />

               <ModalBody>
                  <Formik initialValues={{ file: null }} onSubmit={submit}>
                     {({ isSubmitting, setFieldValue }) => (
                        <VStack align="stretch" w="100%">
                           <Form>
                              <VStack align="start" gap="2">
                                 <InputFileField
                                    label="Csv Formation"
                                    name="file"
                                    value="file"
                                    setFieldValue={setFieldValue}
                                    isRequired
                                 />

                                 <Button
                                    type="submit"
                                    colorScheme="green"
                                    size={{ base: 'sm', sm: 'md' }}
                                    isLoading={isSubmitting}
                                 >
                                    Valider
                                 </Button>
                              </VStack>
                           </Form>
                        </VStack>
                     )}
                  </Formik>
               </ModalBody>

               <ModalFooter fontSize="sm" display="block">
                  Ajoutez un fichier au format CSV pour créer les utilisateurs, le fichier doit contenir les 4 champs
                  suivants:{' '}
                  <Text as="span" fontWeight="bold">
                     nom,prenom,password,email
                  </Text>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
}
