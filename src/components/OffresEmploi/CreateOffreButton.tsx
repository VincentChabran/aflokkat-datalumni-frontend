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
   VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { FormikHelpers } from 'formik';
import { useOffresEmploiDisplayStore } from '../../store/useOffresEmploiDisplayStore';
import { useUserStore } from '../../store/useUserStore';
import { formatOptionsRender } from '../../tools/functions/formatOptionsRender';
import { getLocalStorageToken } from '../../utils/jwtToken';
import { pathDomaineName } from '../../utils/pathBackEnd';
import { optionsSecteurActiviter } from '../../utils/tabOptionsSecteurActiviter';
import {
   FormOffreEmploiCreateUpdate,
   optionsExperienceSouhaitee,
   optionsTypeContrat,
   ValuesOffreEmploi,
} from './FormOffreEmploiCreateUpdate';

export interface CreateOffreButtonProps {}

export function CreateOffreButton(props: CreateOffreButtonProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const toast = useToast();

   const { idUserStore } = useUserStore();
   const { addOffre, setDisplayOffres } = useOffresEmploiDisplayStore();

   const initialValues: ValuesOffreEmploi = {
      nomDuPoste: '',
      nomEntreprise: '',
      ville: '',
      domaineActivite: '01',
      typeContrat: '01',
      experienceSouhaitee: '04',
      remuneration: 'Non renseigné',
      emailContact: '',
      dateDebut: '',
      dateLimiteCandidature: '',
      descriptionEntreprise: '',
      descriptionPoste: '',
      descriptionProfilCandidat: '',
      file: null,
   };

   const submit = async (values: ValuesOffreEmploi, { setSubmitting }: FormikHelpers<ValuesOffreEmploi>): Promise<void> => {
      const { typeContrat, experienceSouhaitee, domaineActivite, file, ...rest } = values;
      setSubmitting(true);

      if (values.file) {
         const formData = new FormData();
         const operations = {
            query: 'mutation Mutation($createOffreEmploiInput: CreateOffreEmploiInput!, $file: Upload!) {\r\n  createOffreEmploi(createOffreEmploiInput: $createOffreEmploiInput, file: $file) {\r\n    id\r\n     nomDuPoste\r\n     nomEntreprise\r\n     ville\r\n     typeContrat\r\n     dateCreation\r\n     domaineActivite\r\n     descriptionEntreprise\r\n     descriptionPoste\r\n     descriptionProfilCandidat\r\n     active\r\n     experienceSouhaitee\r\n     remuneration\r\n     emailContact\r\n     pathLienCandidature\r\n     dateDebut\r\n     dateLimiteCandidature\r\n     pathLogo\r\n     pathPieceJointe\r\n     userCreateurId\r\n     userCreateur {\r\n      nom\r\n      prenom\r\n    }\r\n  }\r\n}',
            variables: {
               createOffreEmploiInput: {
                  ...rest,
                  typeContrat: formatOptionsRender(optionsTypeContrat, parseInt(typeContrat)),
                  experienceSouhaitee: formatOptionsRender(optionsExperienceSouhaitee, parseInt(experienceSouhaitee)),
                  domaineActivite: formatOptionsRender(optionsSecteurActiviter, parseInt(domaineActivite)),
                  userCreateurId: idUserStore,
               },
               file: null,
            },
         };
         const map = { 0: ['variables.file'] };

         formData.append('operations', JSON.stringify(operations));
         formData.append('map', JSON.stringify(map));
         formData.append('0', values.file);

         try {
            const res = await axios({
               method: 'post',
               url: `${pathDomaineName}/graphql`,
               data: formData,
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${getLocalStorageToken()}`,
               },
            });
            toast({
               title: 'Actualité crée',
               status: 'success',
               duration: 3000,
               position: 'top',
               isClosable: true,
            });

            addOffre(res.data.data.createOffreEmploi);
            setDisplayOffres();
         } catch (error) {
            console.log(error);
            toast({
               title: 'Erreur création',
               status: 'error',
               duration: 3000,
               position: 'top',
               isClosable: true,
            });
         }
      }
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
            Créer une offre
         </Button>

         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Créer une offre</ModalHeader>
               <ModalCloseButton top="4" />
               <ModalBody>
                  <FormOffreEmploiCreateUpdate initialValues={initialValues} submit={submit} onClose={onClose} />
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
     descriptionEntreprise
     descriptionPoste
     descriptionProfilCandidat
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
