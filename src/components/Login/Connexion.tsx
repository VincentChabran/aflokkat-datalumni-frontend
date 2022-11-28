import { Button, Flex, Heading, VStack } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { useMutation } from 'urql';
import * as yup from 'yup';
import { setLocalStorageToken } from '../../utils/jwtToken';
import InputField from '../global/formikField/InputField';
import InputPassword from '../global/formikField/InputPassword';

interface Values {
   email: string;
   password: string;
}

const schema = yup.object().shape({
   email: yup.string().email('Format non valide pour un email...').required('Email requis...'),
   password: yup.string().required('Mot de passe requis...'),
});

export function Connexion() {
   const [title, setTitle] = useState('Accédez à votre réseau');
   const [_, execLoginUserMutation] = useMutation(loginUserMutation);

   const submit = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
      const variables = {
         login: {
            email: values.email,
            password: values.password,
         },
      };
      setSubmitting(true);
      const { data, error } = await execLoginUserMutation(variables);

      if (error?.message.includes("[GraphQL] Votre compte n'est pas encore activé"))
         setTitle("Votre compte n'est pas encore activé");
      else if (error?.message.includes('[Network] Failed to fetch'))
         setTitle('Connexion au serveur impossible. Veuillez réessayer');
      else if (error) setTitle('Identifiants incorrects... Veuillez réessayer.');

      if (data) {
         const { accessToken, user } = data.login;

         if (accessToken && user) {
            setLocalStorageToken(accessToken);
            window.location.reload();
         }
      }
      setSubmitting(false);
   };

   return (
      <VStack w="100%" my={10}>
         <Heading as="h4" textAlign="center" size="sm" variant="custom" p="0">
            {title}
         </Heading>

         <Flex justify="center" w="80%">
            <Formik initialValues={{ email: '', password: '' }} onSubmit={submit} validationSchema={schema}>
               {(formikProps) => (
                  <VStack align="stretch" w="100%">
                     <Form>
                        <VStack align="stretch" w="100%">
                           <InputField label="email" name="email" type="email" placeholder="Email" borderRadius="full" />

                           <InputPassword label="password" name="password" placeholder="Password" borderRadius="full" />

                           <Button type="submit" borderRadius="full" colorScheme="purple">
                              Connexion
                           </Button>
                        </VStack>
                     </Form>
                  </VStack>
               )}
            </Formik>
         </Flex>
      </VStack>
   );
}

const loginUserMutation = `
mutation Mutation($login: LoginUserInput!) {
   login(loginUserInput: $login) {
     accessToken
     user {
       id
       email
       nom
       prenom
       profilPictureName
       roles
       mentor
 
     }
   }
 }
`;
