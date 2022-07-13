import { Input, FormControl, FormLabel, FormErrorMessage, InputGroup, Text } from '@chakra-ui/react';
import { FieldHookConfig, useField } from 'formik';

export type InputFieldProps = FieldHookConfig<string> & {
   label: string;
   value: string;
   setFieldValue: any;
   placeholder?: string;
   isRequired?: boolean;
};

const InputFileField = ({ label, value, placeholder, setFieldValue, isRequired, ...props }: InputFieldProps) => {
   const [field, meta] = useField(props);

   const hasError = Boolean(meta.touched && meta.error);

   return (
      <FormControl isInvalid={hasError} maxW="600px">
         <FormLabel htmlFor={field.name} mb="1" fontWeight="bold" fontSize="sm">
            {label.charAt(0).toUpperCase() + label.slice(1)}
            {isRequired && (
               <Text as="span" pl="2" color="red.300" display="inline">
                  *
               </Text>
            )}
         </FormLabel>

         <InputGroup>
            <Input
               type="file"
               id={field.name}
               placeholder={placeholder}
               border="none"
               p="0"
               pt="2"
               onChange={(event) => {
                  if (event.currentTarget.files) setFieldValue(value, event.currentTarget.files[0]);
               }}
            />
         </InputGroup>

         <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
   );
};

export default InputFileField;

// <input
//    id="file"
//    name="file"
//    type="file"
//    onChange={(event) => {
//       if (event.currentTarget.files) setFieldValue('file', event.currentTarget.files[0]);
//    }}
// />;
