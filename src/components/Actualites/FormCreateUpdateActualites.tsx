import { Button, FormLabel, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { Editor } from '@tinymce/tinymce-react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../global/formikField/InputField';
import TextAreaField from '../global/formikField/TextAreaField';
import SelectField from '../global/formikField/SelectField';
import InputFileField from '../global/formikField/InputFileField';

const SUPPORTED_FORMATS = ['application/pdf', 'image/jpg', 'image/jpeg', 'image/png'];

export const optionsCategorie = [
   { value: '01', label: "Vie de l'établissement" },
   { value: '02', label: 'Insertion professionnelle' },
   { value: '03', label: 'Newsletters' },
   { value: '04', label: 'Evènements' },
   { value: '05', label: "Portraits d'anciens" },
];

export interface IFormCreateUpdateActualitesProps {
   initialValues: ValuesActualies;
   submit: (values: ValuesActualies, actions: FormikHelpers<ValuesActualies>) => Promise<void>;
   setContentState: Dispatch<SetStateAction<string>>;
   isForUpdate?: boolean;
}

export function FormCreateUpdateActualites({
   initialValues,
   submit,
   setContentState,
   isForUpdate,
}: IFormCreateUpdateActualitesProps) {
   const schema = yup.object().shape({
      title: yup.string().required('Champ requis'),
      categorie: yup
         .number()
         .min(1, 'La valeur minimum est de 1')
         .max(optionsCategorie.length, `La valeur maximum est de ${optionsCategorie.length}`)
         .required('Champs requis')
         .typeError(`La valeur doit étre entre 01 et ${optionsCategorie.length}`),
      content: yup.string().required('Champ requis'),
      file: isForUpdate
         ? yup
              .mixed()
              .test('fileSize', 'File too large', (value) => (value ? value.size <= 7000000 : true))
              .test('fileFormat', 'Unsupported Format', (value) => (value ? SUPPORTED_FORMATS.includes(value.type) : true))
         : yup
              .mixed()
              .test('fileSize', 'File too large', (value) => (value ? value.size <= 7000000 : true))
              .test('fileFormat', 'Unsupported Format', (value) => (value ? SUPPORTED_FORMATS.includes(value.type) : true))
              .required('Cv requis'),
   });

   const navigate = useNavigate();

   // const editorRef = useRef<TinyMCEEditor>();

   return (
      <Formik initialValues={initialValues} onSubmit={submit} validationSchema={schema}>
         {({ isSubmitting, values, setFieldValue }) => (
            <Form>
               <VStack align="stretch" w="100%" spacing={10}>
                  <SimpleGrid columns={[1, 1, 1, 2, 2]} gap={{ base: '2', md: '6' }}>
                     <InputField name="title" label="Titre" placeholder="Titre" isRequired />

                     <SelectField name="categorie" label="Catègorie" options={optionsCategorie} isRequired />
                  </SimpleGrid>

                  <InputFileField
                     name="file"
                     label="Image"
                     value="file"
                     setFieldValue={setFieldValue}
                     isRequired={isForUpdate ? false : true}
                  />

                  <FormLabel m="0" pl={0} fontWeight="bold" fontSize="sm">
                     Contenu
                  </FormLabel>
                  <TextAreaField label="content" name="content" placeholder="content" isRequired hidden />
                  <Editor
                     initialValue={initialValues.content}
                     // onInit={(event, editor) => (editorRef.current = editor)}
                     onEditorChange={(value, editor) => {
                        setFieldValue('content', value);
                        setContentState(value);
                     }}
                     init={{
                        height: 350,
                        menubar: 'edit insert format',
                        menu: {
                           edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
                           insert: {
                              title: 'Insert',
                              items: 'image link inserttable | charmap hr',
                           },
                           format: {
                              title: 'Format',
                              items: 'styles fontfamily fontsize lineheight | underline strikethrough superscript subscript codeformat',
                           },
                        },
                        plugins: [
                           'advlist',
                           'autolink',
                           'lists',
                           'link',
                           'image',
                           'charmap',
                           'preview',
                           'anchor',
                           'searchreplace',
                           'visualblocks',
                           'code',
                           'fullscreen',
                           'insertdatetime',
                           'media',
                           'table',
                           'code',
                           'help',
                           'wordcount',
                        ],
                        toolbar:
                           'blocks |' +
                           'bold italic forecolor backcolor | alignleft aligncenter ' +
                           'alignright alignjustify | bullist numlist outdent indent | ' +
                           'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                     }}
                  />

                  <HStack pt="5" justify="center" w="100%">
                     <Button type="submit" colorScheme="green" size={{ base: 'sm', sm: 'md' }} isLoading={isSubmitting}>
                        Valider
                     </Button>

                     <Button colorScheme="red" mr={3} onClick={() => navigate('/actualites')} size={{ base: 'sm', sm: 'md' }}>
                        Annuler
                     </Button>
                  </HStack>
               </VStack>
            </Form>
         )}
      </Formik>
   );
}

export interface ValuesActualies {
   title: string;
   categorie: string;
   content: string;
   file: null;
}
