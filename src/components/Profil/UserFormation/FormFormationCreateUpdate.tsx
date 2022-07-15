import { Button, HStack, VStack } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { optionsSecteurActiviter } from '../../../utils/tabOptionsSecteurActiviter';
import InputField from '../../global/formikField/InputField';
import SelectField from '../../global/formikField/SelectField';
import TextAreaField from '../../global/formikField/TextAreaField';

// type de Diplome
export const optionsDiplome = [
   { value: '01', label: 'CAP' },
   { value: '02', label: 'Brevet Technique des Métiers(BTM)' },
   { value: '03', label: 'Brevet professionnel' },
   { value: '04', label: 'BEP / BEPC' },
   { value: '05', label: 'Baccalauréat' },
   { value: '06', label: 'Classe préparatoire (CPGE)' },
   { value: '07', label: 'PACES' },
   { value: '08', label: 'BTS / BTSA' },
   { value: '09', label: 'DUT' },
   { value: '10', label: 'Bachelor / Licence / License Professionnelle' },
   { value: '11', label: 'Master 1' },
   { value: '12', label: 'Master 2' },
   { value: '13', label: "Diplôme d'ingénieur" },
   { value: '14', label: 'Doctorat' },
];

// Obtention ou non
export const optionsObtentionOuNon = [
   { value: '01', label: "J'ai obtenu mon diplôme" },
   { value: '02', label: "Je n'ai pas obtenu le diplôme" },
   { value: '03', label: "Je suis en cours d'obtention" },
];

// Option pour l'année obtention formation
const anneeMin = 1960;
const anneeMax = 2026;
export const optionsAnneeObtention = [{ value: `${anneeMin}`, label: `${anneeMax}` }];
for (let i = anneeMin + 1; i <= anneeMax; i++) optionsAnneeObtention.unshift({ value: `${i}`, label: `${i}` });

const schema = yup.object().shape({
   nomFormation: yup.string().required('Champ requis'),
   nomEtablissement: yup.string().required('Champ requis'),
   typeDiplome: yup
      .number()
      .min(1, 'La valeur minimum est de 1')
      .max(optionsDiplome.length, `La valeur maximum est de ${optionsDiplome.length}`)
      .required('Champs requis')
      .typeError(`La valeur dois étre entre 01 et ${optionsDiplome.length}`),
   obtention: yup.number().min(1).max(3).required('Champ requis').typeError('La valeur dois étre entre 01 et 03'),
   anneeObtention: yup
      .number()
      .min(anneeMin, `La valeur min est ${anneeMin}`)
      .max(anneeMax, `La valeur min est ${anneeMax}`)
      .required('Champ requis')
      .typeError(`La valeur dois étre entre ${anneeMin} et ${anneeMax}`),
   domaineActivite: yup
      .number()
      .min(1, 'La valeur minimum est de 1')
      .max(optionsSecteurActiviter.length, `La valeur maximum est de ${optionsSecteurActiviter.length}`)
      .required('Champs requis')
      .typeError(`La valeur dois étre entre 01 et ${optionsSecteurActiviter.length}`),
   description: yup.string(),
});

export interface FormFormationCreateUpdateProps {
   initialValues: ValuesFormation;
   submit: (values: ValuesFormation, actions: FormikHelpers<ValuesFormation>) => Promise<void>;
   onClose: () => void;
}

export function FormFormationCreateUpdate({ initialValues, submit, onClose }: FormFormationCreateUpdateProps) {
   return (
      <Formik initialValues={initialValues} onSubmit={submit} validationSchema={schema}>
         {({ isSubmitting }) => (
            <Form>
               <VStack align="start">
                  <InputField name="nomFormation" label="nom de la formation" placeholder="Nom de la formation" isRequired />
                  <InputField
                     name="nomEtablissement"
                     label="nom de l'établissement"
                     placeholder="Nom de l'établissement"
                     isRequired
                  />

                  <SelectField name="typeDiplome" label="type de diplôme" options={optionsDiplome} isRequired />
                  <SelectField name="obtention" label="obtention" options={optionsObtentionOuNon} isRequired />
                  <SelectField name="anneeObtention" label="année d'obtention" options={optionsAnneeObtention} isRequired />

                  <SelectField
                     name="domaineActivite"
                     label="domaine d'activité"
                     options={optionsSecteurActiviter}
                     isRequired
                  />

                  <TextAreaField label="description" name="description" placeholder="Description" />

                  <HStack pt="5">
                     <Button type="submit" colorScheme="green" size={{ base: 'sm', xs: 'md' }} isLoading={isSubmitting}>
                        Valider
                     </Button>
                     <Button colorScheme="red" mr={3} onClick={onClose} size={{ base: 'sm', xs: 'md' }}>
                        Annuler
                     </Button>
                  </HStack>
               </VStack>
            </Form>
         )}
      </Formik>
   );
}

export interface ValuesFormation {
   nomFormation: string;
   nomEtablissement: string;
   typeDiplome: string;
   obtention: string;
   anneeObtention: string;
   domaineActivite: string;
   description: string;
}
