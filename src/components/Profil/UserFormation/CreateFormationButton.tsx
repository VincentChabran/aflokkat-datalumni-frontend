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
} from '@chakra-ui/react';
import { FormikHelpers } from 'formik';
import { useParams } from 'react-router-dom';
import { OperationContext, useMutation } from 'urql';
import { formatObtention } from '../../../tools/functions/formatObtentionForFormation';
import { formatOptionsRender } from '../../../tools/functions/formatOptionsRender';
import { FormFormationCreateUpdate, optionsDiplome, ValuesFormation } from './FormFormationCreateUpdate';

export interface CreateFormationButtonProps {
   reExeSpecifiqueUserQuery: (opts?: Partial<OperationContext> | undefined) => void;
}

export function CreateFormationButton({ reExeSpecifiqueUserQuery }: CreateFormationButtonProps) {
   const { userId } = useParams();
   const { isOpen, onOpen, onClose } = useDisclosure();

   const initialValues: ValuesFormation = {
      nomFormation: '',
      nomEtablissement: '',
      typeDiplome: '01',
      obtention: '00',
      anneeObtention: '',
      domaineActivite: '',
      description: '',
   };

   const [_, exeCreateFormationMutation] = useMutation(createFormationMutation);
   const submit = async (values: ValuesFormation, actions: FormikHelpers<ValuesFormation>): Promise<void> => {
      const { typeDiplome, obtention, anneeObtention, ...rest } = values;
      const variables = {
         createFormationInput: {
            userId: parseInt(userId || '0'),
            ...rest,
            anneeObtention: parseInt(anneeObtention),
            typeDiplome: formatOptionsRender(optionsDiplome, parseInt(typeDiplome)),
            obtention: formatObtention(parseInt(obtention)),
         },
      };
      const { data, error } = await exeCreateFormationMutation(variables);
      reExeSpecifiqueUserQuery({ requestPolicy: 'network-only' });
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
