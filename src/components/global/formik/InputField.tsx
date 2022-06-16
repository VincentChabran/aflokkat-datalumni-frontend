import { Input, FormControl, FormLabel, FormErrorMessage, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { FieldHookConfig, useField } from 'formik';

export type InputFieldProps = FieldHookConfig<string> & {
   label: string;
   placeholder?: string;
   icon?: ReactJSXElement;
   variant?: string;
   focusBorderColor?: string;
   borderRadius?: string;
};

const InputField = ({ label, placeholder, icon, variant, borderRadius, ...props }: InputFieldProps) => {
   const [field, meta] = useField(props);

   const hasError = Boolean(meta.touched && meta.error);

   return (
      <FormControl isInvalid={hasError}>
         <FormLabel htmlFor={field.name} pl={2} fontWeight="bold" fontSize="xs" textTransform="uppercase">
            {label}
         </FormLabel>

         <InputGroup>
            {icon && <InputLeftElement pointerEvents="none" children={icon} />}

            <Input id={field.name} placeholder={placeholder} {...field} variant={variant} borderRadius={borderRadius} />
         </InputGroup>

         <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
   );
};

export default InputField;
