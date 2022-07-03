import { ModalBody, ModalCloseButton, ModalFooter, ModalHeader } from '@chakra-ui/react';
import { FormikHelpers } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'urql';
import { dateToInputValue } from '../../tools/functions/formatDateForInputValue';
import { OffreGrid } from './DisplayOffreGrid';
import { FormOffreEmploiCreateUpdate } from './FormOffreEmploiCreateUpdate';

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
      pathLogo,
      dateDebut,
      dateLimiteCandidature,
      pathLienCandidature,
      userCreateurId,
      userCreateur,
      description,
   } = offre;
   console.log(id);

   const initialValues = {
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

   const [_, exeUpdateOffreEmploiMutation] = useMutation(updateOffreEmploiMutation);

   const sumbit = async (values: any, actions: FormikHelpers<any>) => {
      const { typeContrat, experienceSouhaitee, ...rest } = values;

      const variables = {
         updateOffreEmploiInput: {
            id,
            ...rest,
         },
      };
   };

   return (
      <>
         <ModalHeader>Modifer l'annonce</ModalHeader>
         <ModalCloseButton />

         <ModalBody>
            <FormOffreEmploiCreateUpdate initialValues={initialValues} submit={sumbit} setDisplay={setDisplay} />
         </ModalBody>

         {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setDisplay('infos')}>
               Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
         </ModalFooter> */}
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
