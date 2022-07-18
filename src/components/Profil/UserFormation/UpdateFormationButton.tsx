import {
   IconButton,
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
import { BsFillPencilFill } from 'react-icons/bs';
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

export interface UpdateFormationButtonProps {
   formation: {
      id: number;
      nomFormation: string;
      nomEtablissement: string;
      typeDiplome: string;
      obtention: string;
      anneeObtention: number;
      domaineActivite: string;
      description: string | null;
   };
   reExeSpecifiqueUserQuery: (opts?: Partial<OperationContext> | undefined) => void;
}

export function UpdateFormationButton({ formation, reExeSpecifiqueUserQuery }: UpdateFormationButtonProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const toast = useToast();

   const { nomFormation, nomEtablissement, typeDiplome, obtention, anneeObtention, domaineActivite, description } = formation;

   const initialValues: ValuesFormation = {
      nomFormation,
      nomEtablissement,
      typeDiplome: typeDiplome.slice(0, 2),
      obtention: obtention.slice(0, 2),
      anneeObtention: anneeObtention.toString(),
      domaineActivite: domaineActivite.slice(0, 2),
      description: description ?? '',
   };

   const [_, exeUpdataFormationMutation] = useMutation(updateFormationMutation);
   const submit = async (values: ValuesFormation, { setSubmitting }: FormikHelpers<ValuesFormation>): Promise<void> => {
      const { typeDiplome, obtention, anneeObtention, nomFormation, nomEtablissement, domaineActivite, ...rest } = values;

      const variables = {
         updateFormationInput: {
            id: formation.id,
            nomFormation: nomFormation.charAt(0).toUpperCase() + nomFormation.slice(1),
            nomEtablissement: nomEtablissement.charAt(0).toUpperCase() + nomEtablissement.slice(1),
            ...rest,
            anneeObtention: parseInt(anneeObtention),
            typeDiplome: formatOptionsRender(optionsDiplome, parseInt(typeDiplome)),
            obtention: formatOptionsRender(optionsObtentionOuNon, parseInt(obtention)),
            domaineActivite: formatOptionsRender(optionsSecteurActiviter, parseInt(domaineActivite)),
         },
      };

      setSubmitting(true);
      const { data, error } = await exeUpdataFormationMutation(variables);
      reExeSpecifiqueUserQuery({ requestPolicy: 'network-only' });
      setSubmitting(false);

      toastSuccessError(toast, 'Formation modifié', 'Erreur modification', data, error);
   };

   return (
      <>
         <IconButton
            size={{ base: 'xs', sm: 'sm' }}
            variant="outline"
            colorScheme="purple"
            icon={<BsFillPencilFill />}
            aria-label="boutton modifier pour expérience pro"
            onClick={onOpen}
         />

         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Modifier la Formation</ModalHeader>
               <ModalCloseButton top="4" />
               <ModalBody>
                  <FormFormationCreateUpdate initialValues={initialValues} submit={submit} onClose={onClose} />
               </ModalBody>
            </ModalContent>
         </Modal>
      </>
   );
}

const updateFormationMutation = `
mutation Mutation($updateFormationInput: UpdateFormationInput!) {
   updateFormation(updateFormationInput: $updateFormationInput) {
     id
   }
 }
`;
