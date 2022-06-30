import { FormControl, FormLabel, FormErrorMessage, Checkbox } from '@chakra-ui/react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Field, FieldHookConfig, useField } from 'formik';

export type InputFieldProps = FieldHookConfig<string> & {
   label: string;
   icon?: ReactJSXElement;
   variant?: string;
   size?: string | {};
};

const CheckboxField = ({ label, icon, variant, size, ...props }: InputFieldProps) => {
   const [field, meta] = useField(props);

   const hasError = Boolean(meta.touched && meta.error);

   return (
      <FormControl isInvalid={hasError}>
         <FormLabel htmlFor={field.name} m="0" pl={0} fontWeight="bold" fontSize="xs">
            {label}
         </FormLabel>

         <Field
            as={Checkbox}
            id={field.name}
            defaultValue={field.value}
            isChecked={meta.value}
            {...field}
            variant={variant}
            size={size}
         >
            {label.charAt(0).toLocaleUpperCase() + label.slice(1)}
         </Field>

         <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
   );
};

export default CheckboxField;
