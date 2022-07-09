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
   VStack,
} from '@chakra-ui/react';
import { FormikHelpers } from 'formik';
import { useMutation } from 'urql';
import { useUserStore } from '../../store/useUserStore';
import { formatOptionsRender } from '../../tools/functions/formatOptionsRender';
import {
   FormOffreEmploiCreateUpdate,
   optionsExperienceSouhaitee,
   optionsTypeContrat,
   ValuesOffreEmploi,
} from './FormOffreEmploiCreateUpdate';

export interface CreateOffreButtonProps {}

export function CreateOffreButton(props: CreateOffreButtonProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const { idUserStore } = useUserStore();

   const initialValues: ValuesOffreEmploi = {
      nomDuPoste: '',
      nomEntreprise: '',
      ville: '',
      domaineActivite: '',
      typeContrat: '01',
      experienceSouhaitee: '04',
      remuneration: 'Non renseigné',
      emailContact: '',
      dateDebut: '',
      dateLimiteCandidature: '',
      description: '',
   };

   const [_, exeCreateOffreEmploiMutation] = useMutation(createOffreEmploiMutation);

   const sumbit = async (values: ValuesOffreEmploi, { setSubmitting }: FormikHelpers<ValuesOffreEmploi>): Promise<void> => {
      const { typeContrat, experienceSouhaitee, ...rest } = values;
      const variables = {
         createOffreEmploiInput: {
            ...rest,
            typeContrat: formatOptionsRender(optionsTypeContrat, parseInt(typeContrat)),
            experienceSouhaitee: formatOptionsRender(optionsExperienceSouhaitee, parseInt(experienceSouhaitee)),
            userCreateurId: idUserStore,
         },
      };
      setSubmitting(true);
      const { data, error } = await exeCreateOffreEmploiMutation(variables);
      setSubmitting(false);
      onClose();
   };

   return (
      <VStack>
         <Button
            size={{ base: 'xs', sm: 'sm' }}
            variant="outline"
            colorScheme="green"
            onClick={onOpen}
            leftIcon={<AddIcon />}
         >
            Crer une offre
         </Button>

         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Crer un offre</ModalHeader>
               <ModalCloseButton top="4" />
               <ModalBody>
                  <FormOffreEmploiCreateUpdate initialValues={initialValues} submit={sumbit} onClose={onClose} />
               </ModalBody>
            </ModalContent>
         </Modal>
      </VStack>
   );
}

const createOffreEmploiMutation = `
mutation Mutation($createOffreEmploiInput: CreateOffreEmploiInput!) {
   createOffreEmploi(createOffreEmploiInput: $createOffreEmploiInput) {
     id
     nomDuPoste
     nomEntreprise
     ville
     typeContrat
     domaineActivite
     description
     active
     experienceSouhaitee
     remuneration
     emailContact
     pathLienCandidature
     dateDebut
     dateLimiteCandidature
     pathLogo
     pathPieceJointe
   }
 }
`;
