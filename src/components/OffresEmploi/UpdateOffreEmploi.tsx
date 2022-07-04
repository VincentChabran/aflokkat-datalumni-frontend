import { ModalBody, ModalCloseButton, ModalHeader } from '@chakra-ui/react';
import { FormikHelpers } from 'formik';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useMutation } from 'urql';
import { dateToInputValue } from '../../tools/functions/formatDateForInputValue';
import { formatOptionsRender } from '../../tools/functions/formatOptionsRender';
import { OffreGrid } from './DisplayOffreGrid';
import {
   FormOffreEmploiCreateUpdate,
   optionsExperienceSouhaitee,
   optionsTypeContrat,
   ValuesOffreEmploi,
} from './FormOffreEmploiCreateUpdate';

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
      pathLienCandidature,
      pathLogo,
      userCreateurId,
      userCreateur,
      description,
   } = offre;

   const initialValues: ValuesOffreEmploi = {
      nomDuPoste,
      nomEntreprise,
      ville,
      domaineActivite,
      typeContrat: typeContrat.slice(0, 2),
      experienceSouhaitee: experienceSouhaitee.slice(0, 2),
      remuneration,
      emailContact,
      dateDebut: dateToInputValue(dateDebut.toString()),
      dateLimiteCandidature: dateToInputValue(dateLimiteCandidature.toString()),
      description,
   };

   useEffect(() => () => setDisplay('infos'), []);

   const [_, exeUpdateOffreEmploiMutation] = useMutation(updateOffreEmploiMutation);
   const sumbit = async (values: ValuesOffreEmploi, actions: FormikHelpers<ValuesOffreEmploi>): Promise<void> => {
      const { typeContrat, experienceSouhaitee, ...rest } = values;
      const variables = {
         updateOffreEmploiInput: {
            id,
            ...rest,
            typeContrat: formatOptionsRender(optionsTypeContrat, parseInt(typeContrat)),
            experienceSouhaitee: formatOptionsRender(optionsExperienceSouhaitee, parseInt(experienceSouhaitee)),
         },
      };
      actions.setSubmitting(true);
      const { data, error } = await exeUpdateOffreEmploiMutation(variables);
      actions.setSubmitting(false);
      setDisplay('infos');
   };

   return (
      <>
         <ModalHeader>Modifer l'annonce</ModalHeader>
         <ModalCloseButton />

         <ModalBody>
            <FormOffreEmploiCreateUpdate initialValues={initialValues} submit={sumbit} setDisplay={setDisplay} />
         </ModalBody>
      </>
   );
}

const updateOffreEmploiMutation = `
mutation Mutation($updateOffreEmploiInput: UpdateOffreEmploiInput!) {
   updateOffreEmploi(updateOffreEmploiInput: $updateOffreEmploiInput) {
     id
   }
 }
`;
