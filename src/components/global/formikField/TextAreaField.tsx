import { FormControl, FormLabel, FormErrorMessage, Textarea, Text } from '@chakra-ui/react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Field, FieldHookConfig, useField } from 'formik';

export type InputFieldProps = FieldHookConfig<string> & {
   label: string;
   placeholder?: string;
   isRequired?: boolean;
   hidden?: boolean;
   icon?: ReactJSXElement;
   variant?: string;
   size?: string | {};
};

const TextAreaField = ({ label, placeholder, isRequired, hidden, icon, variant, size, ...props }: InputFieldProps) => {
   const [field, meta] = useField(props);

   const hasError = Boolean(meta.touched && meta.error);

   return (
      <FormControl isInvalid={hasError} maxW="600px" hidden={hidden}>
         {/* <FormControl isInvalid={hasError} isRequired={isRequired}> */}
         <FormLabel htmlFor={field.name} m="0" pl={0} fontWeight="bold" fontSize="sm">
            {label.charAt(0).toUpperCase() + label.slice(1)}
            {isRequired && (
               <Text as="span" pl="2" color="red.300" display="inline">
                  *
               </Text>
            )}
         </FormLabel>

         {/* <Field as={Textarea} id={field.name} {...field} variant={variant} size={size} placeholder={placeholder} /> */}
         <Textarea id={field.name} {...field} placeholder={placeholder} />

         <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
   );
};

export default TextAreaField;
