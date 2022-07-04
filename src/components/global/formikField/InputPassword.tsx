import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
   Input,
   FormControl,
   FormLabel,
   FormErrorMessage,
   InputGroup,
   InputLeftElement,
   InputRightElement,
   Text,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { useState } from 'react';
import { InputFieldProps } from './InputField';

const InputPassword = ({ label, placeholder, isRequired, icon, variant, borderRadius, ...props }: InputFieldProps) => {
   const [field, meta] = useField(props);

   const hasError = Boolean(meta.touched && meta.error);

   const [show, setShow] = useState(false);
   const handleClick = () => setShow(!show);

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

         <InputGroup mb={5}>
            {icon && <InputLeftElement pointerEvents="none" children={icon} />}

            <Input
               id={field.name}
               type={show ? 'text' : 'password'}
               placeholder={placeholder}
               variant={variant}
               borderRadius={borderRadius}
               {...field}
            />

            <InputRightElement>
               {show ? (
                  <ViewOffIcon onClick={handleClick} _hover={{ cursor: 'pointer' }} />
               ) : (
                  <ViewIcon onClick={handleClick} _hover={{ cursor: 'pointer' }} />
               )}
            </InputRightElement>
         </InputGroup>

         <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
   );
};

export default InputPassword;
