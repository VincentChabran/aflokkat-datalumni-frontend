import { FormLabel, VStack } from '@chakra-ui/react';
import { Editor } from '@tinymce/tinymce-react';
import { Dispatch, SetStateAction } from 'react';
import TextAreaField from './formikField/TextAreaField';

export interface CustomEditorProps {
   label: string;
   name: string;
   initialValue: string;
   setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
   setFieldState: Dispatch<SetStateAction<string>>;
}

export function CustomEditor({ label, name, initialValue, setFieldValue, setFieldState }: CustomEditorProps) {
   return (
      <VStack w={{ base: '300px', sm: '400px', md: '600px', lg: '800px' }}>
         <FormLabel m="0" pl={0} fontWeight="bold" fontSize="sm">
            {label}
         </FormLabel>

         <TextAreaField label={label} name={name} placeholder={label} isRequired hidden />

         <Editor
            initialValue={initialValue}
            onEditorChange={(value, editor) => {
               setFieldValue(name, value);
               setFieldState(value);
            }}
            init={{
               height: 350,
               width: '100%',
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
      </VStack>
   );
}
