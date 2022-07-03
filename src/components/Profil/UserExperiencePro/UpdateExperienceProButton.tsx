import {
   IconButton,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
   useDisclosure,
} from '@chakra-ui/react';
import { BsFillPencilFill } from 'react-icons/bs';
import { formatDateFinExperiencePro } from '../../../tools/functions/formatDateFinExperiencePro';
import { OperationContext, useMutation } from 'urql';
import { FormExperienceProCreateUpdate, ValuesExpPro } from './FormExperienceProCreateUpdate';
import { FormikHelpers } from 'formik';

export interface UpdateExperienceProButtonProps {
   experiencePro: {
      id: number;
      fonction: string;
      entreprise: string;
      dateDebut: string;
      dateFin: string;
      description: string | null;
   };
   reExeSpecifiqueUserQuery: (opts?: Partial<OperationContext> | undefined) => void;
}

export function UpdateExperienceProButton({ experiencePro, reExeSpecifiqueUserQuery }: UpdateExperienceProButtonProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const { fonction, entreprise, dateDebut, dateFin, description } = experiencePro;

   const initialValues: ValuesExpPro = {
      fonction,
      entreprise,
      aujourdhui: dateFin.includes("Aujourd'hui") ? true : false,
      dateDebutMois: dateDebut.slice(0, 2),
      dateDebutAnnee: dateDebut.slice(3),
      dateFinMois: dateFin.includes("Aujourd'hui") ? '01' : dateFin.slice(0, 2),
      dateFinAnnee: dateFin.includes("Aujourd'hui") ? '2026' : dateFin.slice(3),
      description,
   };

   const [_, exeUpdateExperienceProMutation] = useMutation(updateExperienceProMutation);
   const submit = async (values: ValuesExpPro, actions: FormikHelpers<ValuesExpPro>) => {
      const { aujourdhui, dateDebutMois, dateDebutAnnee, dateFinMois, dateFinAnnee, ...rest } = values;

      const variables = {
         updateExperienceProInput: {
            id: experiencePro.id,
            ...rest,
            dateDebut: dateDebutMois + '/' + dateDebutAnnee,
            dateFin: formatDateFinExperiencePro(dateFinMois, dateFinAnnee, aujourdhui),
         },
      };
      const { data, error } = await exeUpdateExperienceProMutation(variables);
      reExeSpecifiqueUserQuery({ requestPolicy: 'network-only' });
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
               <ModalHeader>Modifier l'Expérience Pro</ModalHeader>
               <ModalCloseButton top="4" />
               <ModalBody>
                  <FormExperienceProCreateUpdate initialValues={initialValues} submit={submit} onClose={onClose} />
               </ModalBody>
            </ModalContent>
         </Modal>
      </>
   );
}

const updateExperienceProMutation = `
mutation UpdateExperiencePro($updateExperienceProInput: UpdateExperienceProInput!) {
   updateExperiencePro(updateExperienceProInput: $updateExperienceProInput) {
     id
     fonction
     entreprise
     dateDebut
     dateFin
     description    
   }
 }
`;
