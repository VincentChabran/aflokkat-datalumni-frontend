import { Flex, Heading, VStack } from '@chakra-ui/react';
import { FormikHelpers } from 'formik';
import { Dispatch, SetStateAction, useState } from 'react';
import { useMutation } from 'urql';
import { formatRolesArray } from '../../tools/functions/formatRolesArray';
import { FormUserCreate, ValuesUserCreate } from '../Annuaire/createUserButton/FormUserCreate';

export interface InscriptionProps {
   setDisplay: Dispatch<SetStateAction<string>>;
}

export function Inscription({ setDisplay }: InscriptionProps) {
   const [titleState, setTitleState] = useState('title');

   const initialValues = {
      email: '',
      password: '',
      nom: '',
      prenom: '',
      Admin: false,
      Equipe_administrative: false,
      Recruteur: false,
      Enseignant: false,
      Etudiant: true,
   };

   const [__, exeSendEmailDemandeCreationAccount] = useMutation(sendEmailDemandeCreationAccount);

   const sendMail = async (nom: string, prenom: string, email: string) => {
      const { data, error } = await exeSendEmailDemandeCreationAccount({
         demandeCreationAccountInput: { nom, prenom, email },
      });
   };

   const [_, exeSignUpMutation] = useMutation(singUpMutation);

   const submit = async (values: ValuesUserCreate, { setSubmitting }: FormikHelpers<ValuesUserCreate>) => {
      const { Admin, Equipe_administrative, Recruteur, Enseignant, Etudiant, ...rest } = values;
      const roles = formatRolesArray(Admin, Equipe_administrative, Recruteur, Enseignant, Etudiant);

      const variables = {
         singupUserInput: {
            roles,
            ...rest,
            isActive: false,
         },
      };

      setSubmitting(true);
      const { data, error } = await exeSignUpMutation(variables);
      if (data) {
         setDisplay('messageSucces');
         await sendMail(values.nom, values.prenom, values.email);
      }
      if (error?.message.includes('[GraphQL] Conflict')) setTitleState('error');

      setSubmitting(false);
   };

   return (
      <VStack w="100%" my={10}>
         <Heading
            as="h3"
            textAlign="center"
            size="sm"
            variant="custom"
            p="0"
            color={titleState === 'title' ? undefined : 'red'}
         >
            {titleState === 'title' && 'Inscrivez-vous'}
            {titleState === 'error' && 'Cet email est déjà utilisé'}
         </Heading>

         <Flex justify="center" w="80%">
            <FormUserCreate initialValues={initialValues} submit={submit} isForInscription />
         </Flex>
      </VStack>
   );
}

const singUpMutation = `
mutation Mutation($singupUserInput: CreateUserInput!) {
   singUp(singupUserInput: $singupUserInput) {
     id
     nom
     prenom    
   }
 }
`;

const sendEmailDemandeCreationAccount = `
mutation Mutation($demandeCreationAccountInput: DemmandeCreationAccountInput!) {
   sendEmailDemandeCreationAccount(demandeCreationAccountInput: $demandeCreationAccountInput)
 }
`;
