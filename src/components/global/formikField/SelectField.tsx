import { FormControl, FormLabel, FormErrorMessage, Select, Text } from '@chakra-ui/react';
import { Field, FieldHookConfig, useField } from 'formik';

export type InputFieldProps = FieldHookConfig<string> & {
   label: string;
   options: {
      value: string | number;
      label: string;
   }[];
   isDisabled?: boolean;
   isRequired?: boolean;
   borderRightRadius?: string;
   borderLeftRadius?: string;
   variant?: string;
   size?: string | {};
};

const SelectField = ({
   label,
   options,
   isDisabled,
   isRequired,
   borderRightRadius,
   borderLeftRadius,
   variant,
   size,
   ...props
}: InputFieldProps) => {
   const [field, meta] = useField(props);

   const hasError = Boolean(meta.touched && meta.error);

   return (
      <FormControl isInvalid={hasError} maxW="600px">
         <FormLabel htmlFor={field.name} mb="1" pl={0} fontWeight="bold" fontSize="sm">
            {label.charAt(0).toUpperCase() + label.slice(1)}
            {isRequired && (
               <Text as="span" pl="2" color="red.300" display="inline">
                  *
               </Text>
            )}
         </FormLabel>

         <Field
            as={Select}
            id={field.name}
            isDisabled={isDisabled}
            size={size}
            borderRightRadius={borderRightRadius}
            borderLeftRadius={borderLeftRadius}
            variant={variant}
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
