import { FormControl, FormLabel, FormErrorMessage, Select } from '@chakra-ui/react';
import { Field, FieldHookConfig, useField } from 'formik';

export type InputFieldProps = FieldHookConfig<string> & {
   label: string;
   options: {
      value: string | number;
      label: string;
   }[];
   isDisabled?: boolean;
   borderRightRadius?: string;
   borderLeftRadius?: string;
   variant?: string;
   size?: string | {};
};

const SelectField = ({
   label,
   options,
   isDisabled,
   borderRightRadius,
   borderLeftRadius,
   variant,
   size,
   ...props
}: InputFieldProps) => {
   const [field, meta] = useField(props);

   const hasError = Boolean(meta.touched && meta.error);

   return (
      <FormControl isInvalid={hasError}>
         <FormLabel htmlFor={field.name} m="0" pl={0} fontWeight="bold" fontSize="sm">
            {label.charAt(0).toUpperCase() + label.slice(1)}
         </FormLabel>

         <Field
            as={Select}
            id={field.name}
            isDisabled={isDisabled}
            borderRightRadius={borderRightRadius}
            borderLeftRadius={borderLeftRadius}
            variant={variant}
            size={size}
            _hover={{ cursor: 'pointer' }}
            {...field}
         >
            {options.map(({ value, label }) => (
               <option key={value} value={value}>
                  {label}
               </option>
            ))}
         </Field>

         <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
   );
};

export default SelectField;
