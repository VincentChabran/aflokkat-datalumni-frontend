import { Button, HStack, VStack } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import * as yup from 'yup';
import InputField from '../global/formikField/InputField';
import SelectField from '../global/formikField/SelectField';
import TextAreaField from '../global/formikField/TextAreaField';

export const optionsTypeContrat = [
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

export const optionsExperienceSouhaitee = [
   { value: '01', label: '0-2 ans' },
   { value: '02', label: '2-4 ans' },
   { value: '03', label: '4 ans +' },
   { value: '04', label: 'Débutant accepté' },
];

const schema = yup.object().shape({
   nomDuPoste: yup.string().required('Champ requis'),
   nomEntreprise: yup.string().required('Champ requis'),
   ville: yup.string().required('Champ requis'),
   domaineActivite: yup.string().required('Champ requis'),
   typeContrat: yup
      .number()
      .min(1, 'La valeur minimum est de 1')
      .max(12, 'La valeur maximum est de 12')
      .required('Champs requis')
      .typeError('La valeur dois étre entre 01 et 12'),
   experienceSouhaitee: yup
      .number()
      .min(1, 'La valeur minimum est de 1')
      .max(4, 'La valeur maximum est de 4')
      .required('Champs requis')
      .typeError('La valeur dois étre entre 01 et 04'),
   remuneration: yup.string().required('Champ requis'),
   emailContact: yup.string().email('Format non valide pour un email...').required('Email requis...'),
   dateDebut: yup
      .date()
      .typeError('Format non valide pour une date')
      .min('2000-01-25', 'Date trop petite')
      .required('Champ requis'),
   dateLimiteCandidature: yup
      .date()
      .typeError('Format non valide pour une date')
      .min('2000-01-25', 'Date trop petite')
      .required('Champ requis'),
   descriptionEntreprise: yup.string().required('Champ requis'),
   descriptionPoste: yup.string().required('Champ requis'),
   descriptionProfilCandidat: yup.string().required('Champ requis'),
});

export interface FormOffreEmploiCreateUpdateProps {
   initialValues: ValuesOffreEmploi;
   submit: (values: ValuesOffreEmploi, actions: FormikHelpers<ValuesOffreEmploi>) => Promise<void>;
   setDisplay?: Dispatch<SetStateAction<string>>;
   onClose?: () => void;
}

export function FormOffreEmploiCreateUpdate({
   initialValues,
   submit,
   setDisplay,
   onClose,
}: FormOffreEmploiCreateUpdateProps) {
   return (
      <Formik initialValues={initialValues} onSubmit={submit} validationSchema={schema}>
         {({ isSubmitting }) => (
            <Form>
               <VStack justify="center" w="100%">
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

                  <InputField
                     name="remuneration"
                     label="Rémunération (brut annuel)"
                     placeholder="Rémunération (brut annuel)"
                  />
                  <InputField name="emailContact" label="Email contact" placeholder="Email contact" type="email" isRequired />
                  <InputField name="dateDebut" label="Date début" placeholder="Date début" type="date" isRequired />
                  <InputField
                     name="dateLimiteCandidature"
                     label="Date limite de candidature"
                     placeholder="Date limite de candidature"
                     type="date"
                     isRequired
                  />

                  <TextAreaField
                     label="Description entreprise"
                     name="descriptionEntreprise"
                     placeholder="Description entreprise"
                     isRequired
                  />
                  <TextAreaField
                     label="Description poste"
                     name="descriptionPoste"
                     placeholder="Description poste"
                     isRequired
                  />
                  <TextAreaField
                     label="Description profil candidat"
                     name="descriptionProfilCandidat"
                     placeholder="Description profil candidat"
                     isRequired
                  />

                  <HStack pt="5" justify="center" w="100%">
                     <Button type="submit" colorScheme="green" size={{ base: 'sm', sm: 'md' }} isLoading={isSubmitting}>
                        Valider
                     </Button>

                     <Button
                        colorScheme="red"
                        mr={3}
                        onClick={() => {
                           if (setDisplay) setDisplay('infos');
                           else if (onClose) onClose();
                        }}
                        size={{ base: 'sm', sm: 'md' }}
                     >
                        Annuler
                     </Button>
                  </HStack>
               </VStack>
            </Form>
         )}
      </Formik>
   );
}

export interface ValuesOffreEmploi {
   nomDuPoste: string;
   nomEntreprise: string;
   ville: string;
   domaineActivite: string;
   typeContrat: string;
   experienceSouhaitee: string;
   remuneration: string;
   emailContact: string;
   dateDebut: string;
   dateLimiteCandidature: string;
   descriptionEntreprise: string;
   descriptionPoste: string;
   descriptionProfilCandidat: string;
}
