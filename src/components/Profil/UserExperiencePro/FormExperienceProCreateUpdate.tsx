import { Button, Flex, FormControl, FormLabel, HStack, VStack } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import CheckboxField from '../../global/formikField/CheckboxField';
import InputField from '../../global/formikField/InputField';
import SelectField from '../../global/formikField/SelectField';
import TextAreaField from '../../global/formikField/TextAreaField';

const optionsMois = [
   { value: '01', label: 'Janvier' },
   { value: '02', label: 'Fevrier' },
   { value: '03', label: 'Mars' },
   { value: '04', label: 'Avril' },
   { value: '05', label: 'Mai' },
   { value: '06', label: 'Juin' },
   { value: '07', label: 'Juillet' },
   { value: '08', label: 'Aout' },
   { value: '09', label: 'Septembre' },
   { value: '10', label: 'Octobre' },
   { value: '11', label: 'Novembre' },
   { value: '12', label: 'Descembre' },
];

const optionAnneeMin = 1970;
const optionAnneeMax = 2026;
const optionsAnnee = [{ value: `${optionAnneeMin}`, label: `${optionAnneeMin}` }];
for (let i = optionAnneeMin + 1; i <= optionAnneeMax; i++) optionsAnnee.unshift({ value: `${i}`, label: `${i}` });

const schema = yup.object().shape({
   fonction: yup
      .string()
      .matches(/^([ \u00c0-\u01ffa-zA-Z'-])+$/, 'La fonction ne peut pas contenir de caractères spéciaux')
      .required('Champ requis'),
   entreprise: yup.string().required('Champ requis'),
   aujourdhui: yup.boolean().required('Champ requis'),
   dateDebutMois: yup
      .number()
      .min(1, 'La valeur minimum est de 1')
      .max(12, 'La valeur maximum est de 12')
      .required('Champs requis')
      .typeError('La valeur dois étre entre 01 et 12'),
   dateDebutAnnee: yup
      .number()
      .min(optionAnneeMin, `Le minimum est de ${optionAnneeMin}`)
      .max(optionAnneeMax, `Le maximum est de ${optionAnneeMax}`)
      .required('Champ requis')
      .typeError(`La valeur dois étre entre ${optionAnneeMin} et ${optionAnneeMax}`),
   dateFinMois: yup
      .number()
      .min(1, 'Le minimum est de 1')
      .max(12, 'Le maximum est de 12')
      .required('Champ requis')
      .typeError('La valeur dois étre entre 01 et 12'),
   dateFinAnnee: yup
      .number()
      .min(optionAnneeMin, `Le minimum est de ${optionAnneeMin}`)
      .max(optionAnneeMax, `Le maximum est de ${optionAnneeMax}`)
      .required('Champ requis')
      .typeError(`La valeur dois étre entre ${optionAnneeMin} et ${optionAnneeMax}`),
   description: yup.string(),
});

export interface FormExperienceProCreateUpdateProps {
   initialValues: ValuesExpPro;
   submit: (values: ValuesExpPro, actions: FormikHelpers<ValuesExpPro>) => Promise<void>;
   onClose: () => void;
}

export function FormExperienceProCreateUpdate({ initialValues, submit, onClose }: FormExperienceProCreateUpdateProps) {
   return (
      <Formik initialValues={initialValues} onSubmit={submit} validationSchema={schema}>
         {({ values, isSubmitting }) => (
            <Form>
               <VStack align="start">
                  <InputField name="fonction" label="fonction" placeholder="Fonction" isRequired />
                  <InputField name="entreprise" label="entreprise" placeholder="Entreprise" isRequired />

                  <VStack pt="3">
                     <CheckboxField
                        name="aujourdhui"
                        label="J'occupe actuellement cette fonction"
                        size={{ base: 'sm', xs: 'md' }}
                     />
                  </VStack>

                  <FormControl isRequired>
                     <FormLabel fontWeight="bold" fontSize="sm">
                        Date Début
                     </FormLabel>
                  </FormControl>
                  <Flex w="80%">
                     <SelectField label="" name="dateDebutMois" options={optionsMois} borderRightRadius="none" />
                     <SelectField label="" name="dateDebutAnnee" options={optionsAnnee} borderLeftRadius="none" />
                  </Flex>

                  <FormControl isRequired>
                     <FormLabel fontWeight="bold" fontSize="sm">
                        Date Fin
                     </FormLabel>
                  </FormControl>
                  <Flex w="80%">
                     <SelectField
                        label=""
                        name="dateFinMois"
                        options={optionsMois}
                        borderRightRadius="none"
                        isDisabled={values.aujourdhui}
                     />
                     <SelectField
                        label=""
                        name="dateFinAnnee"
                        options={optionsAnnee}
                        borderLeftRadius="none"
                        isDisabled={values.aujourdhui}
                     />
                  </Flex>

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

export interface ValuesExpPro {
   fonction: string;
   entreprise: string;
   aujourdhui: boolean;
   dateDebutMois: string;
   dateDebutAnnee: string;
   dateFinMois: string;
   dateFinAnnee: string;
   description: string | null;
}
