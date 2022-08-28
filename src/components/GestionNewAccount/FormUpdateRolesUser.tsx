import { Button, Flex, HStack, VStack } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { useUserStore } from '../../store/useUserStore';
import CheckboxField from '../global/formikField/CheckboxField';

export interface FormUpdateRolesUserProps {
   initialValues: ValuesFormUserRoles;
   submit: (values: ValuesFormUserRoles, { setSubmitting }: FormikHelpers<ValuesFormUserRoles>) => Promise<void>;
   onClose: () => void;
}

export function FormUpdateRolesUser({ initialValues, submit, onClose }: FormUpdateRolesUserProps) {
   const { rolesUserStore } = useUserStore();

   return (
      <Formik initialValues={initialValues} onSubmit={submit}>
         {({ isSubmitting }) => (
            <VStack align="stretch" w="100%">
               <Form>
                  <Flex wrap="wrap" gap="4">
                     {rolesUserStore.includes('Admin') && <CheckboxField name="Admin" label="Admin" />}
                     <CheckboxField name="Equipe_administrative" label="Équipe-Administrative" />
                     <CheckboxField name="Recruteur" label="Recruteur" />
                     <CheckboxField name="Enseignant" label="Enseignant" />
                     <CheckboxField name="Etudiant" label="Étudiant" />
                  </Flex>

                  <HStack pt="5" justify="center" w="100%">
                     <Button type="submit" colorScheme="green" size={{ base: 'sm', sm: 'md' }} isLoading={isSubmitting}>
                        Valider
                     </Button>

                     <Button colorScheme="red" mr={3} onClick={() => onClose()} size={{ base: 'sm', sm: 'md' }}>
                        Annuler
                     </Button>
                  </HStack>
               </Form>
            </VStack>
         )}
      </Formik>
   );
}

export interface ValuesFormUserRoles {
   Admin: boolean;
   Equipe_administrative: boolean;
   Recruteur: boolean;
   Enseignant: boolean;
   Etudiant: boolean;
}
