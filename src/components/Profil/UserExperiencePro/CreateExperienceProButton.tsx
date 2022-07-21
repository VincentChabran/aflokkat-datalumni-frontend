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
import { formatDateFinExperiencePro } from '../../../tools/functions/formatDateFinExperiencePro';
import { toastSuccessError } from '../../../tools/functions/toastSuccessError';
import { FormExperienceProCreateUpdate, ValuesExpPro } from './FormExperienceProCreateUpdate';

export interface CreateExperienceProButtonProps {
   reExeSpecifiqueUserQuery: (opts?: Partial<OperationContext> | undefined) => void;
}

export function CreateExperienceProButton({ reExeSpecifiqueUserQuery }: CreateExperienceProButtonProps) {
   const { userId } = useParams();
   const { isOpen, onOpen, onClose } = useDisclosure();
   const toast = useToast();

   const initialValues: ValuesExpPro = {
      fonction: '',
      entreprise: '',
      aujourdhui: false,
      dateDebutMois: '01',
      dateDebutAnnee: '2026',
      dateFinMois: '01',
      dateFinAnnee: '2026',
      description: '',
   };

   const [_, exeCreateExperienceProMutation] = useMutation(createExperienceProMutation);
   const submit = async (values: ValuesExpPro, { setSubmitting }: FormikHelpers<ValuesExpPro>): Promise<void> => {
      const { aujourdhui, dateDebutMois, dateDebutAnnee, dateFinMois, dateFinAnnee, ...rest } = values;
      const variables = {
         createExperienceProInput: {
            userId: parseInt(userId || '0'),
            ...rest,
            dateDebut: dateDebutMois + '/' + dateDebutAnnee,
            dateFin: formatDateFinExperiencePro(dateFinMois, dateFinAnnee, aujourdhui),
         },
      };

      setSubmitting(true);
      const { data, error } = await exeCreateExperienceProMutation(variables);
      reExeSpecifiqueUserQuery({ requestPolicy: 'network-only' });
      setSubmitting(false);

      toastSuccessError(toast, 'Expérience crée', 'Erreur création', data, error);
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
            Ajouter une expérience
         </Button>

         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Ajouter une expérience</ModalHeader>
               <ModalCloseButton top="4" />
               <ModalBody>
                  <FormExperienceProCreateUpdate initialValues={initialValues} submit={submit} onClose={onClose} />
               </ModalBody>
            </ModalContent>
         </Modal>
      </>
   );
}

const createExperienceProMutation = `
mutation Mutation($createExperienceProInput: CreateExperienceProInput!) {
   createExperiencePro(createExperienceProInput: $createExperienceProInput) {
     id
     fonction
     entreprise
     dateDebut
     dateFin
   }
 }
`;
