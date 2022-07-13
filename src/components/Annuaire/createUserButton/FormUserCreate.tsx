import { Box, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import CheckboxField from '../../global/formikField/CheckboxField';
import InputField from '../../global/formikField/InputField';

const schema = yup.object().shape({
   email: yup.string().email('Format non valide pour un email...').required('Email requis...'),
   password: yup
      .string()
      // .min(6, 'Le password dois avoir minimum 6 caractères')
      // .matches(
      //    /((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      //    'Le password doit contenir au moin, 1 Majuscule,\n 1 Minuscule,\n 1 Chiffre,\n 1 Caractère spéciale(ex: ?!&*)',
      // )
      .required('Password requis...'),
   nom: yup
      .string()
      .matches(/^([ \u00c0-\u01ffa-zA-Z'-])+$/, 'Le nom ne peut pas contenir de caractères spéciaux')
      .required('Le nom est requis...'),
   prenom: yup
      .string()
      .matches(/^([ \u00c0-\u01ffa-zA-Z'-])+$/, 'Le prenom ne peut pas contenir de caractères spéciaux')
      .required('Le prenom est requis...'),

   Admin: yup.boolean().typeError('Admin ne peut être que vrai ou faux'),
   Equipe_administrative: yup.boolean().typeError('Equipe_administrative ne peut être que vrai ou faux'),
   Recruteur: yup.boolean().typeError('Recruteur ne peut être que vrai ou faux'),
   Enseignant: yup.boolean().typeError('Enseignant ne peut être que vrai ou faux'),
   Etudiant: yup.boolean().typeError('Etudiant ne peut être que vrai ou faux'),
});

export interface FormUserCreateProps {
   initialValues: ValuesUserCreate;
   submit: (values: ValuesUserCreate, actions: FormikHelpers<ValuesUserCreate>) => Promise<void>;
   onClose: () => void;
}

export function FormUserCreate({ initialValues, submit, onClose }: FormUserCreateProps) {
   return (
      <Formik initialValues={initialValues} onSubmit={submit} validationSchema={schema}>
         {({ isSubmitting }) => (
            <Form>
               <VStack justify="center" w="100%">
                  <InputField name="email" label="Email" placeholder="Email" isRequired />
                  <InputField name="password" label="Password" placeholder="Password" isRequired />
                  <InputField name="nom" label="Nom" placeholder="Nom" isRequired />
                  <InputField name="prenom" label="Prenom" placeholder="Prenom" isRequired />

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

                  <HStack pt="5" justify="center" w="100%">
                     <Button type="submit" colorScheme="green" size={{ base: 'sm', sm: 'md' }} isLoading={isSubmitting}>
                        Valider
                     </Button>

                     <Button colorScheme="red" mr={3} onClick={() => onClose()} size={{ base: 'sm', sm: 'md' }}>
                        Annuler
                     </Button>
                  </HStack>
               </VStack>
            </Form>
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
