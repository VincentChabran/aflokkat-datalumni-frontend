import { ModalBody, ModalCloseButton, ModalHeader, useToast } from '@chakra-ui/react';
import { FormikHelpers } from 'formik';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useMutation } from 'urql';
import { dateToInputValue } from '../../../tools/functions/formatDateForInputValue';
import { formatOptionsRender } from '../../../tools/functions/formatOptionsRender';
import { OffreGrid } from '../DisplayOffreGrid';
import {
   FormOffreEmploiCreateUpdate,
   optionsExperienceSouhaitee,
   optionsTypeContrat,
   ValuesOffreEmploi,
} from '../FormOffreEmploiCreateUpdate';
import { toastSuccessError } from '../../../tools/functions/toastSuccessError';
import { optionsSecteurActiviter } from '../../../utils/tabOptionsSecteurActiviter';
import { useOffresEmploiDisplayStore } from '../../../store/useOffresEmploiDisplayStore';
import axios from 'axios';
import { pathDomaineName } from '../../../utils/pathBackEnd';
import { getLocalStorageToken } from '../../../utils/jwtToken';

export interface UpdateOffreEmploiProps {
   offre: OffreGrid;
   setDisplay: Dispatch<SetStateAction<string>>;
}

export function UpdateOffreEmploi({ offre, setDisplay }: UpdateOffreEmploiProps) {
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

   const toast = useToast();

   const { updateOffre, setDisplayOffres } = useOffresEmploiDisplayStore();

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

   useEffect(() => () => setDisplay('infos'), []);

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

      updateOffre(data.updateOffreEmploi);
      setDisplayOffres();

      setDisplay('infos');
   };

   return (
      <>
         <ModalHeader>Modifer l'annonce</ModalHeader>
         <ModalCloseButton />

         <ModalBody>
            <FormOffreEmploiCreateUpdate initialValues={initialValues} submit={sumbit} setDisplay={setDisplay} isForUpdate />
         </ModalBody>
      </>
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
