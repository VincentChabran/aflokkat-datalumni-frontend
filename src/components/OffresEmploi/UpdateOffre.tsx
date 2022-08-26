import { Box, Divider, Heading, Text, useToast, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { FormikHelpers } from 'formik';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { useMutation } from 'urql';
import { useOffresEmploiDisplayStore } from '../../store/useOffresEmploiDisplayStore';
import { bgColor } from '../../themes/constants/bgColor';
import { dateToInputValue } from '../../tools/functions/formatDateForInputValue';
import { formatOptionsRender } from '../../tools/functions/formatOptionsRender';
import { toastSuccessError } from '../../tools/functions/toastSuccessError';
import { getLocalStorageToken } from '../../utils/jwtToken';
import { pathDomaineName } from '../../utils/pathBackEnd';
import { optionsSecteurActiviter } from '../../utils/tabOptionsSecteurActiviter';
import { OffreGrid } from './DisplayOffreGrid';
import {
   FormOffreEmploiCreateUpdate,
   optionsExperienceSouhaitee,
   optionsTypeContrat,
   ValuesOffreEmploi,
} from './FormOffreEmploiCreateUpdate';

export interface UpdateOffreProps {
   offre: OffreGrid;
   setOffre: Dispatch<SetStateAction<OffreGrid | undefined>>;
   setDisplay: Dispatch<SetStateAction<string>>;
}

export function UpdateOffre({ offre, setOffre, setDisplay }: UpdateOffreProps) {
   const toast = useToast();

   const { updateOffre, setDisplayOffres } = useOffresEmploiDisplayStore();

   const {
      id,
      nomDuPoste,
      nomEntreprise,
      ville,
      domaineActivite,
      typeContrat,
      experienceSouhaitee,
      remuneration,
      emailContact,
      dateDebut,
      dateLimiteCandidature,
      pathLogo,
      descriptionEntreprise,
      descriptionPoste,
      descriptionProfilCandidat,
   } = offre;

   const initialValues: ValuesOffreEmploi = {
      nomDuPoste,
      nomEntreprise,
      ville,
      domaineActivite: domaineActivite.slice(0, 2),
      typeContrat: typeContrat.slice(0, 2),
      experienceSouhaitee: experienceSouhaitee.slice(0, 2),
      remuneration,
      emailContact,
      dateDebut: dateToInputValue(dateDebut.toString()),
      dateLimiteCandidature: dateToInputValue(dateLimiteCandidature.toString()),
      descriptionEntreprise,
      descriptionPoste,
      descriptionProfilCandidat,
      file: null,
   };

   const [descriptionEntrepriseState, setDescriptionEntrepriseState] = useState(descriptionEntreprise);
   useEffect(() => () => setDescriptionEntrepriseState(''), []);

   const [descriptionPosteState, setdescriptionPosteState] = useState(descriptionPoste);
   useEffect(() => () => setdescriptionPosteState(''), []);

   const [descriptionProfilCandidatState, setDescriptionProfilCandidatState] = useState(descriptionProfilCandidat);
   useEffect(() => () => setDescriptionProfilCandidatState(''), []);

   const uploadOffreLogo = async (file: any): Promise<string | undefined> => {
      if (file) {
         const formData = new FormData();
         const operations = {
            query: 'mutation Mutation($offre: UpdateOffreEmploiInput!, $file: Upload!) {\r\n  uploadOffreLogo(offre: $offre, file: $file)\r\n}',
            variables: { file: null, offre: { id } },
         };
         const map = { 0: ['variables.file'] };
         formData.append('operations', JSON.stringify(operations));
         formData.append('map', JSON.stringify(map));
         formData.append('0', file);

         try {
            const response = await axios({
               method: 'post',
               url: `${pathDomaineName}/graphql`,
               data: formData,
               headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${getLocalStorageToken()}`,
               },
            });
            return response.data.data.uploadOffreLogo;
         } catch (error) {
            console.log(error);
         }
      }
   };

   const [_, exeUpdateOffreEmploiMutation] = useMutation(updateOffreEmploiMutation);
   const sumbit = async (values: ValuesOffreEmploi, { setSubmitting }: FormikHelpers<ValuesOffreEmploi>): Promise<void> => {
      const {
         file,
         typeContrat,
         experienceSouhaitee,
         nomDuPoste,
         nomEntreprise,
         ville,
         domaineActivite,
         emailContact,
         ...rest
      } = values;

      const variables = {
         updateOffreEmploiInput: {
            id,
            nomDuPoste: nomDuPoste.charAt(0).toUpperCase() + nomDuPoste.slice(1),
            nomEntreprise: nomEntreprise.charAt(0).toUpperCase() + nomEntreprise.slice(1),
            ville: ville.charAt(0).toUpperCase() + ville.slice(1),
            emailContact: emailContact.toLocaleLowerCase(),
            ...rest,
            domaineActivite: formatOptionsRender(optionsSecteurActiviter, parseInt(domaineActivite)),
            typeContrat: formatOptionsRender(optionsTypeContrat, parseInt(typeContrat)),
            experienceSouhaitee: formatOptionsRender(optionsExperienceSouhaitee, parseInt(experienceSouhaitee)),
         },
      };

      setSubmitting(true);
      const res = await uploadOffreLogo(file);
      const { data, error } = await exeUpdateOffreEmploiMutation(variables);
      setSubmitting(false);

      toastSuccessError(toast, 'Offre modifié', 'Erreur modification', data, error);

      setOffre(data.updateOffreEmploi);
      updateOffre(data.updateOffreEmploi);
      setDisplayOffres();

      setDisplay('detail');
   };

   const bgBox = bgColor();

   return (
      <Box p={{ base: 3, sm: 6 }} bgColor={bgBox} borderRadius="lg">
         <Heading as="h2" borderBottom="1px solid orange" mb="10" p="0">
            Modifier une offre
         </Heading>

         <FormOffreEmploiCreateUpdate
            initialValues={initialValues}
            submit={sumbit}
            setDisplay={setDisplay}
            setDescriptionEntrepriseState={setDescriptionEntrepriseState}
            setDescriptionPosteState={setdescriptionPosteState}
            setDescriptionProfilCandidat={setDescriptionProfilCandidatState}
            isForUpdate
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
   );
}

const updateOffreEmploiMutation = `
mutation Mutation($updateOffreEmploiInput: UpdateOffreEmploiInput!) {
   updateOffreEmploi(updateOffreEmploiInput: $updateOffreEmploiInput) {
      id
      nomDuPoste
      nomEntreprise
      ville
      typeContrat
      dateCreation
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
      userCreateurId
      userCreateur {
       nom
       prenom
     }
   }
 }
`;
