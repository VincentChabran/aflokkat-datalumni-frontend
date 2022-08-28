import { Box, Divider, Heading, Text, useToast, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';
import { bgColor } from '../../themes/constants/bgColor';
import parse from 'html-react-parser';
import {
   FormOffreEmploiCreateUpdate,
   optionsExperienceSouhaitee,
   optionsTypeContrat,
   ValuesOffreEmploi,
} from './FormOffreEmploiCreateUpdate';
import { formatOptionsRender } from '../../tools/functions/formatOptionsRender';
import { optionsSecteurActiviter } from '../../utils/tabOptionsSecteurActiviter';
import axios from 'axios';
import { pathDomaineName } from '../../utils/pathBackEnd';
import { getLocalStorageToken } from '../../utils/jwtToken';
import { useOffresEmploiDisplayStore } from '../../store/useOffresEmploiDisplayStore';
import { FormikHelpers } from 'formik';

export interface CreateOffreProps {}

export function CreateOffre(props: CreateOffreProps) {
   const navigate = useNavigate();
   const toast = useToast();

   const { idUserStore, rolesUserStore } = useUserStore();
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

   // Pour l'editeur de text la previous
   const [descriptionEntrepriseState, setDescriptionEntrepriseState] = useState('');
   useEffect(() => () => setDescriptionEntrepriseState(''), []);

   const [descriptionPosteState, setdescriptionPosteState] = useState('');
   useEffect(() => () => setdescriptionPosteState(''), []);

   const [descriptionProfilCandidatState, setDescriptionProfilCandidatState] = useState('');
   useEffect(() => () => setDescriptionProfilCandidatState(''), []);

   // Roles permis sur la page
   useEffect(() => {
      if (
         !rolesUserStore.includes('Admin') &&
         !rolesUserStore.includes('Equipe_administrative') &&
         !rolesUserStore.includes('Recruteur')
      ) {
         navigate('/offresemploi');
      }
   }, []);

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
      navigate('/offresemploi');
   };

   const bgBox = bgColor();

   return (
      <Box p={{ base: 3, sm: 9 }} px={{ base: 3, lg: 16 }}>
         <Box p={{ base: 3, sm: 8 }} bgColor={bgBox} borderRadius="lg">
            <Heading as="h2" borderBottom="1px solid orange" mb="10" p="0">
               Créer une offre
            </Heading>

            <FormOffreEmploiCreateUpdate
               initialValues={initialValues}
               submit={submit}
               setDescriptionEntrepriseState={setDescriptionEntrepriseState}
               setDescriptionPosteState={setdescriptionPosteState}
               setDescriptionProfilCandidat={setDescriptionProfilCandidatState}
            />

            <VStack align="start" spacing={4}>
               <Heading as="h4" size="md">
                  Previous
               </Heading>

               <Divider />

               <Box maxW="750px" m="auto" py="8" pl={{ base: '2', sm: '3' }} fontSize="sm">
                  <Text fontStyle="italic" mb={1}>
                     Description Entreprise :
                  </Text>
                  {parse(descriptionEntrepriseState)}
               </Box>

               <Divider />

               <Box maxW="750px" m="auto" py="8" pl={{ base: '2', sm: '3' }} fontSize="sm">
                  <Text fontStyle="italic" mb={1}>
                     Description Poste :
                  </Text>
                  {parse(descriptionPosteState)}
               </Box>

               <Divider />

               <Box maxW="750px" m="auto" py="8" pl={{ base: '2', sm: '3' }} fontSize="sm">
                  <Text fontStyle="italic" mb={1}>
                     Description Profil Candidat :
                  </Text>
                  {parse(descriptionProfilCandidatState)}
               </Box>
            </VStack>
         </Box>
      </Box>
   );
}
