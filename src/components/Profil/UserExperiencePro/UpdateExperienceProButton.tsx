import {
   Button,
   Flex,
   FormControl,
   FormLabel,
   HStack,
   IconButton,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
   useDisclosure,
   VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { BsFillPencilFill } from 'react-icons/bs';
import CheckboxField from '../../global/formikField/CheckboxField';
import InputField from '../../global/formikField/InputField';
import SelectField from '../../global/formikField/SelectField';
import { formatDateFinExperiencePro } from '../../../tools/functions/formatDataFinExperiencePro';
import { OperationContext, useMutation } from 'urql';
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

const optionsAnnee = [{ value: '1970', label: '1970' }];
for (let i = 1971; i <= 2026; i++) optionsAnnee.unshift({ value: `${i}`, label: `${i}` });

const schema = yup.object().shape({
   fonction: yup.string().required('Champ requis'),
   entreprise: yup.string().required('Champ requis'),
   aujourdhui: yup.boolean().required('Champ requis'),
   dateDebutMois: yup
      .number()
      .min(1, 'Le minimum est de 1')
      .max(12, 'Le maximum est de 12')
      .required('Champs requis')
      .typeError('La valeur dois étre entre 01 et 12'),
   dateDebutAnnee: yup
      .number()
      .min(1970, 'Le minimum est de 1970')
      .max(2026, 'Le maximum est de 2026')
      .required('Champ requis')
      .typeError('La valeur dois étre entre 1970 et 2026'),
   dateFinMois: yup
      .number()
      .min(1, 'Le minimum est de 1')
      .max(12, 'Le maximum est de 12')
      .required('Champ requis')
      .typeError('La valeur dois étre entre 01 et 12'),
   dateFinAnnee: yup
      .number()
      .min(1970, 'Le minimum est de 1970')
      .max(2026, 'Le maximum est de 2026')
      .required('Champ requis')
      .typeError('La valeur dois étre entre 1970 et 2026'),
   description: yup.string(),
});

export interface UpdateExperienceProButtonProps {
   experiencePro: {
      id: number;
      fonction: string;
      entreprise: string;
      dateDebut: string;
      dateFin: string;
      description: string | null;
   };
   reExeSpecifiqueUserQuery: (opts?: Partial<OperationContext> | undefined) => void;
}

//
export function UpdateExperienceProButton({ experiencePro, reExeSpecifiqueUserQuery }: UpdateExperienceProButtonProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const { fonction, entreprise, dateDebut, dateFin, description } = experiencePro;

   const initialValues = {
      fonction,
      entreprise,
      aujourdhui: dateFin.includes("Aujourd'hui") ? true : false,
      dateDebutMois: dateDebut.slice(0, 2),
      dateDebutAnnee: dateDebut.slice(3),
      dateFinMois: dateFin.includes("Aujourd'hui") ? '01' : dateFin.slice(0, 2),
      dateFinAnnee: dateFin.includes("Aujourd'hui") ? '2026' : dateFin.slice(3),
      description,
   };

   const [_, exeUpdateExperienceProMutation] = useMutation(updateExperienceProMutation);

   const submit = async (values: any, actions: any) => {
      const { aujourdhui, dateDebutMois, dateDebutAnnee, dateFinMois, dateFinAnnee, ...rest } = values;

      const variables = {
         updateExperienceProInput: {
            id: experiencePro.id,
            ...rest,
            dateDebut: dateDebutMois + '/' + dateDebutAnnee,
            dateFin: formatDateFinExperiencePro(dateFinMois, dateFinAnnee, aujourdhui),
         },
      };

      const { data, error } = await exeUpdateExperienceProMutation(variables);

      reExeSpecifiqueUserQuery({ requestPolicy: 'network-only' });
   };

   return (
      <>
         <IconButton
            size="sm"
            variant="outline"
            colorScheme="purple"
            icon={<BsFillPencilFill />}
            aria-label="boutton modifier pour expérience pro"
            onClick={onOpen}
         />

         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Modifier l'Experience Pro</ModalHeader>
               <ModalCloseButton top="4" />
               <ModalBody>
                  <Formik initialValues={initialValues} onSubmit={submit} validationSchema={schema}>
                     {({ values }) => (
                        <Form>
                           <VStack align="start">
                              <InputField name="fonction" label="fonction" isRequired />
                              <InputField name="entreprise" label="entreprise" isRequired />

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
                                 <Button type="submit" colorScheme="green" size={{ base: 'sm', xs: 'md' }}>
                                    Envoyer
                                 </Button>
                                 <Button colorScheme="red" mr={3} onClick={onClose} size={{ base: 'sm', xs: 'md' }}>
                                    Annuler
                                 </Button>
                              </HStack>
                           </VStack>
                        </Form>
                     )}
                  </Formik>
               </ModalBody>
            </ModalContent>
         </Modal>
      </>
   );
}

const updateExperienceProMutation = `
mutation UpdateExperiencePro($updateExperienceProInput: UpdateExperienceProInput!) {
   updateExperiencePro(updateExperienceProInput: $updateExperienceProInput) {
     id
     fonction
     entreprise
     dateDebut
     dateFin
     description    
   }
 }
`;
