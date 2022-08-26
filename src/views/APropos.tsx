import { Box, Button, Flex, HStack, Spinner, useToast, VStack } from '@chakra-ui/react';
import parse from 'html-react-parser';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'urql';
import { CustomEditor } from '../components/global/CustomEditor';
import { bgColor } from '../themes/constants/bgColor';
import { FaEdit } from 'react-icons/fa';
import { useUserStore } from '../store/useUserStore';
import { toastSuccessError } from '../tools/functions/toastSuccessError';

export interface AProposProps {}

export function APropos(props: AProposProps) {
   const toast = useToast();

   const { rolesUserStore } = useUserStore();

   const [{ data, fetching, error }] = useQuery({ query: findAProposQuery, variables: { aPropoId: 1 } });

   const [messageState, setMessageState] = useState('');

   const [display, setDisplay] = useState('update');

   useEffect(() => {
      if (data) setMessageState(data.aPropo.message);
   }, [fetching]);

   const initialValue = {
      message: data?.aPropo?.message,
   };

   const [_, exeUpdateAProposMutation] = useMutation(updateAProposMutation);

   const submit = async (values: { message: string }, { setSubmitting }: FormikHelpers<{ message: string }>) => {
      const variables = {
         updateAPropoInput: {
            id: 1,
            message: values.message,
         },
      };

      setSubmitting(true);

      const { data, error } = await exeUpdateAProposMutation(variables);

      setSubmitting(false);

      toastSuccessError(toast, 'Modification éfféctuée', 'Erreur modifaction', data, error);
      setDisplay('update');
   };

   const bg = bgColor();

   return (
      <>
         {fetching ? (
            <Spinner />
         ) : (
            <Flex
               flexDir="column"
               my="10"
               mx={{ base: '0', md: '6', lg: '12' }}
               py={{ base: '6', md: '8', lg: '12' }}
               px={{ base: '2', md: '8', lg: '16' }}
               borderRadius="md"
               bg={bg}
               gap="10"
            >
               <Box>{parse(messageState)}</Box>

               {display === 'update' &&
                  (rolesUserStore.includes('Admin') || rolesUserStore.includes('Equipe_administrative')) && (
                     <VStack>
                        <Button
                           variant="outline"
                           colorScheme="purple"
                           leftIcon={<FaEdit />}
                           size={{ base: 'xs', xs: 'sm', lg: 'md' }}
                           onClick={() => setDisplay('formulaire')}
                        >
                           Modifier
                        </Button>
                     </VStack>
                  )}

               {display === 'formulaire' && (
                  <Formik initialValues={initialValue} onSubmit={submit}>
                     {({ isSubmitting, setFieldValue }) => (
                        <VStack w="100%">
                           <Form>
                              <CustomEditor
                                 initialValue={initialValue.message}
                                 label="Message"
                                 name="message"
                                 setFieldValue={setFieldValue}
                                 setFieldState={setMessageState}
                              />

                              <HStack pt="5" justify="center" w="100%">
                                 <Button
                                    type="submit"
                                    colorScheme="green"
                                    size={{ base: 'sm', sm: 'md' }}
                                    isLoading={isSubmitting}
                                 >
                                    Valider
                                 </Button>

                                 <Button
                                    colorScheme="red"
                                    mr={3}
                                    onClick={() => setDisplay('update')}
                                    size={{ base: 'sm', sm: 'md' }}
                                 >
                                    Annuler
                                 </Button>
                              </HStack>
                           </Form>
                        </VStack>
                     )}
                  </Formik>
               )}
            </Flex>
         )}
      </>
   );
}

const findAProposQuery = `
query APropo($aPropoId: Int!) {
   aPropo(id: $aPropoId) {
     id
     message
   }
 }
`;

const updateAProposMutation = `
mutation Mutation($updateAPropoInput: UpdateAPropoInput!) {
   updateAPropo(updateAPropoInput: $updateAPropoInput) {
     id
     message
   }
 }
`;
