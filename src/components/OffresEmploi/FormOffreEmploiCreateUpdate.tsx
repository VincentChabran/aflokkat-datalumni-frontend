import { Button, HStack, VStack } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import * as yup from 'yup';
import InputField from '../global/formikField/InputField';
import SelectField from '../global/formikField/SelectField';
import TextAreaField from '../global/formikField/TextAreaField';

const optionsTypeContrat = [
   { value: '01', label: 'Stage' },
   { value: '02', label: 'Alternance' },
   { value: '03', label: 'Freelance' },
   { value: '04', label: 'Interim' },
   { value: '05', label: 'CDD' },
   { value: '06', label: 'CDI' },
   { value: '07', label: 'VIA / VIE' },
   { value: '08', label: 'Fonctionnaire' },
   { value: '09', label: 'Benevole' },
   { value: '10', label: 'Service Civique' },
   { value: '11', label: 'Dirigeant' },
   { value: '12', label: 'Non Renseigné' },
];

const optionsExperienceSouhaitee = [
   { value: '01', label: '0-2 ans' },
   { value: '02', label: '2-4 ans' },
   { value: '03', label: '4 ans +' },
   { value: '04', label: 'Débutant accepté' },
];

const schema = yup.object().shape({});

export interface FormOffreEmploiCreateUpdateProps {
   initialValues: any;
   submit: (values: any, actions: FormikHelpers<any>) => Promise<void>;
   setDisplay: Dispatch<SetStateAction<string>>;
}

export function FormOffreEmploiCreateUpdate({ initialValues, submit, setDisplay }: FormOffreEmploiCreateUpdateProps) {
   return (
      <Formik initialValues={initialValues} onSubmit={submit} validationSchema={schema}>
         {(formikProps) => (
            <Form>
               <VStack align="start">
                  <InputField name="nomDuPoste" label="Nom du poste" placeholder="Nom du poste" isRequired />
                  <InputField name="nomEntreprise" label="Nom de l'entreprise" placeholder="Nom de l'entreprise" isRequired />
                  <InputField name="ville" label="nom de la ville" placeholder="Nom de la ville" isRequired />
                  <InputField name="domaineActivite" label="Secteur d'activité" placeholder="Secteur d'activité" isRequired />

                  <SelectField name="typeContrat" label="Type de contrat" options={optionsTypeContrat} isRequired />
                  <SelectField
                     name="experienceSouhaitee"
                     label="Expérience souhaitee"
                     options={optionsExperienceSouhaitee}
                     isRequired
                  />

                  <InputField name="remuneration" label="Rémunération" placeholder="Rémunération" />
                  <InputField name="emailContact" label="Email contact" placeholder="Email contact" type="email" isRequired />
                  <InputField name="dateDebut" label="Date début" placeholder="Date début" type="date" isRequired />
                  <InputField
                     name="dateLimiteCandidature"
                     label="Date limite de candidature"
                     placeholder="Date limite de candidature"
                     type="date"
                     isRequired
                  />

                  {/* <SelectField name="obtention" label="obtention" options={optionsObtention} isRequired />
                  <SelectField name="anneeObtention" label="année d'obtention" options={optionsAnneeObtention} isRequired /> */}

                  <TextAreaField label="description" name="description" placeholder="Description" />

                  <HStack pt="5">
                     <Button type="submit" colorScheme="green" size={{ base: 'sm', xs: 'md' }}>
                        Envoyer
                     </Button>
                     <Button colorScheme="red" mr={3} onClick={() => setDisplay('infos')} size={{ base: 'sm', xs: 'md' }}>
                        Annuler
                     </Button>
                  </HStack>
               </VStack>
            </Form>
         )}
      </Formik>
   );
}
