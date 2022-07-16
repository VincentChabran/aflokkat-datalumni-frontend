import { Button, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { Form, Formik, FormikHelpers } from 'formik';
import { Dispatch, SetStateAction, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../global/formikField/InputField';
import TextAreaField from '../global/formikField/TextAreaField';
import SelectField from '../global/formikField/SelectField';
import InputFileField from '../global/formikField/InputFileField';

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
}

export function FormCreateUpdateActualites({ initialValues, submit, setContentState }: IFormCreateUpdateActualitesProps) {
   const navigate = useNavigate();

   const editorRef = useRef<TinyMCEEditor>();

   return (
      <Formik initialValues={initialValues} onSubmit={submit}>
         {({ isSubmitting, values, setFieldValue }) => (
            <Form>
               <VStack align="stretch" w="100%" spacing={10}>
                  <SimpleGrid columns={[1, 1, 1, 2, 2]} gap={{ base: '2', md: '6' }}>
                     <InputField name="title" label="Titre" placeholder="Titre" isRequired />

                     <SelectField name="categorie" label="Catègorie" options={optionsCategorie} isRequired />
                  </SimpleGrid>

                  <InputFileField name="file" label="Image" value="file" setFieldValue={setFieldValue} isRequired />

                  <TextAreaField label="content" name="content" placeholder="content" isRequired hidden />
                  <Editor
                     initialValue={initialValues.content}
                     onInit={(event, editor) => (editorRef.current = editor)}
                     onEditorChange={(value, editor) => {
                        // const data = editor.getContent();
                        setFieldValue('content', value);
                        setContentState(value);
                        console.log(value);
                     }}
                     init={{
                        height: 350,
                        menubar: false,
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
                           'undo redo | blocks | ' +
                           'bold italic forecolor | alignleft aligncenter ' +
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
