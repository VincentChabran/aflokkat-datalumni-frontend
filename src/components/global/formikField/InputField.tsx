import {
   Input,
   FormControl,
   FormLabel,
   FormErrorMessage,
   InputGroup,
   InputLeftElement,
   Text,
   VStack,
} from '@chakra-ui/react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { FieldHookConfig, useField } from 'formik';
import parse from 'html-react-parser';

export type InputFieldProps = FieldHookConfig<string> & {
   label: string;
   placeholder?: string;
   type?: string;
   isRequired?: boolean;
   icon?: ReactJSXElement;
   variant?: string;
   borderRadius?: string;
};

const InputField = ({
   label,
   placeholder,
   type = 'text',
   isRequired,
   icon,
   variant,
   borderRadius,
   ...props
}: InputFieldProps) => {
   const [field, meta] = useField(props);

   const hasError = Boolean(meta.touched && meta.error);

   return (
      <FormControl isInvalid={hasError} maxW="600px">
         {/* <FormControl isInvalid={hasError} isRequired={isRequired}> */}
         <FormLabel htmlFor={field.name} mb="1" fontWeight="bold" fontSize="sm">
            {label.charAt(0).toUpperCase() + label.slice(1)}
            {isRequired && (
               <Text as="span" pl="2" color="red.300" display="inline">
                  *
               </Text>
            )}
         </FormLabel>

         <InputGroup>
            {icon && <InputLeftElement pointerEvents="none" children={icon} />}

            <Input
               type={type}
               id={field.name}
               placeholder={placeholder}
               variant={variant}
               borderRadius={borderRadius}
               {...field}
            />
         </InputGroup>

         <FormErrorMessage mb="2">{meta.error ? parse(meta.error) : ''}</FormErrorMessage>
      </FormControl>
   );
};

export default InputField;
