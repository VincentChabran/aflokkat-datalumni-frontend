import { Box, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import CheckboxField from '../../global/formikField/CheckboxField';
import InputField from '../../global/formikField/InputField';

const schema = yup.object().shape({
   email: yup.string().email('Format non valide pour un email...').required('Email requis...'),
   password: yup
      .string()
      .min(6, 'Le password doit avoir minimum 6 caractères')
      .matches(
         /((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
         '<div>Le password doit contenir au moin :<ul> <li>1 Majuscule</li> <li>1 Minuscule</li> <li>1 Chiffre</li> <li>1 Caractère spécial (ex: ?!&*)</li> </ul></div>',
      )
      .required('Password requis...'),
   nom: yup
      .string()
      .matches(/^([ \u00c0-\u01ffa-zA-Z'-])+$/, 'Le nom ne peut pas contenir de caractères spéciaux')
      .required('Le nom est requis...'),
   prenom: yup
      .string()
      .matches(/^([ \u00c0-\u01ffa-zA-Z'-])+$/, 'Le prénom ne peut pas contenir de caractères spéciaux')
      .required('Le prénom est requis...'),

   Admin: yup.boolean().typeError('Admin ne peut être que vrai ou faux'),
   Equipe_administrative: yup.boolean().typeError('Equipe_administrative ne peut être que vrai ou faux'),
   Recruteur: yup.boolean().typeError('Recruteur ne peut être que vrai ou faux'),
   Enseignant: yup.boolean().typeError('Enseignant ne peut être que vrai ou faux'),
   Etudiant: yup.boolean().typeError('Etudiant ne peut être que vrai ou faux'),
});

export interface FormUserCreateProps {
   initialValues: ValuesUserCreate;
   submit: (values: ValuesUserCreate, actions: FormikHelpers<ValuesUserCreate>) => Promise<void>;
   onClose?: () => void;
   isForInscription?: boolean;
}

export function FormUserCreate({ initialValues, submit, onClose, isForInscription }: FormUserCreateProps) {
   return (
      <Formik initialValues={initialValues} onSubmit={submit} validationSchema={schema}>
         {({ isSubmitting }) => (
            <VStack align="stretch" w="100%">
               <Form>
                  <InputField name="email" label="Email" placeholder="Email" isRequired />
                  <InputField name="password" label="Password" placeholder="Password" isRequired />
                  <InputField name="nom" label="Nom" placeholder="Nom" isRequired />
                  <InputField name="prenom" label="Prenom" placeholder="Prenom" isRequired />

                  {!isForInscription && (
                     <>
                        <Box w="100%" pt="4">
                           <Text fontWeight="semibold">Roles :</Text>
                        </Box>

                        <Flex wrap="wrap" gap="4">
                           <CheckboxField name="Admin" label="Admin" />
                           <CheckboxField name="Equipe_administrative" label="Équipe-Administrative" />
                           <CheckboxField name="Recruteur" label="Recruteur" />
                           <CheckboxField name="Enseignant" label="Enseignant" />
                           <CheckboxField name="Etudiant" label="Étudiant" />
                        </Flex>
                     </>
                  )}

                  <HStack pt="5" justify="center" w="100%">
                     <Button type="submit" colorScheme="green" size={{ base: 'sm', sm: 'md' }} isLoading={isSubmitting}>
                        Valider
                     </Button>

                     {!isForInscription && (
                        <Button
                           colorScheme="red"
                           mr={3}
                           onClick={() => {
                              if (onClose) onClose();
                           }}
                           size={{ base: 'sm', sm: 'md' }}
                        >
                           Annuler
                        </Button>
                     )}
                  </HStack>
               </Form>
            </VStack>
         )}
      </Formik>
   );
}

export interface ValuesUserCreate {
   email: string;
   password: string;
   nom: string;
   prenom: string;
   Admin: boolean;
   Equipe_administrative: boolean;
   Recruteur: boolean;
   Enseignant: boolean;
   Etudiant: boolean;
}
