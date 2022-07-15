import { AddIcon } from '@chakra-ui/icons';
import {
   Button,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
   useDisclosure,
   useToast,
} from '@chakra-ui/react';
import { FormikHelpers } from 'formik';
import { useParams } from 'react-router-dom';
import { OperationContext, useMutation } from 'urql';
import { formatOptionsRender } from '../../../tools/functions/formatOptionsRender';
import { toastSuccessError } from '../../../tools/functions/toastSuccessError';
import { optionsSecteurActiviter } from '../../../utils/tabOptionsSecteurActiviter';
import {
   FormFormationCreateUpdate,
   optionsDiplome,
   optionsObtentionOuNon,
   ValuesFormation,
} from './FormFormationCreateUpdate';

export interface CreateFormationButtonProps {
   reExeSpecifiqueUserQuery: (opts?: Partial<OperationContext> | undefined) => void;
}

export function CreateFormationButton({ reExeSpecifiqueUserQuery }: CreateFormationButtonProps) {
   const { userId } = useParams();
   const { isOpen, onOpen, onClose } = useDisclosure();
   const toast = useToast();

   const initialValues: ValuesFormation = {
      nomFormation: '',
      nomEtablissement: '',
      typeDiplome: '01',
      obtention: '03',
      anneeObtention: '',
      domaineActivite: '01',
      description: '',
   };

   const [_, exeCreateFormationMutation] = useMutation(createFormationMutation);
   const submit = async (values: ValuesFormation, { setSubmitting }: FormikHelpers<ValuesFormation>): Promise<void> => {
      const { typeDiplome, obtention, anneeObtention, domaineActivite, ...rest } = values;
      const variables = {
         createFormationInput: {
            userId: parseInt(userId || '0'),
            ...rest,
            anneeObtention: parseInt(anneeObtention),
            typeDiplome: formatOptionsRender(optionsDiplome, parseInt(typeDiplome)),
            obtention: formatOptionsRender(optionsObtentionOuNon, parseInt(obtention)),
            domaineActivite: formatOptionsRender(optionsSecteurActiviter, parseInt(domaineActivite)),
         },
      };

      setSubmitting(true);
      const { data, error } = await exeCreateFormationMutation(variables);
      reExeSpecifiqueUserQuery({ requestPolicy: 'network-only' });
      setSubmitting(false);

      toastSuccessError(toast, 'Formation crée', 'Erreur création', data, error);
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
            Ajouter une formation
         </Button>

         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Ajouter une formation</ModalHeader>
               <ModalCloseButton top="4" />
               <ModalBody>
                  <FormFormationCreateUpdate initialValues={initialValues} submit={submit} onClose={onClose} />
               </ModalBody>
            </ModalContent>
         </Modal>
      </>
   );
}

const createFormationMutation = `
mutation Mutation($createFormationInput: CreateFormationInput!) {
   createFormation(createFormationInput: $createFormationInput) {
     id
     nomFormation
     typeDiplome
     nomEtablissement
     obtention
   }
 }
`;
