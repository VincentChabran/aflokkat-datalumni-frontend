import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
   Input,
   FormControl,
   FormLabel,
   FormErrorMessage,
   InputGroup,
   InputLeftElement,
   InputRightElement,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { useState } from 'react';
import { InputFieldProps } from './InputField';

const InputPassword = ({ label, placeholder, icon, variant, borderRadius, ...props }: InputFieldProps) => {
   const [field, meta] = useField(props);

   const hasError = Boolean(meta.touched && meta.error);

   const [show, setShow] = useState(false);

   const handleClick = () => setShow(!show);

   return (
      <FormControl isInvalid={hasError}>
         <FormLabel htmlFor={field.name} pl={2} fontWeight="bold" fontSize="xs" textTransform="uppercase">
            {label}
         </FormLabel>

         <InputGroup mb={5}>
            {icon && <InputLeftElement pointerEvents="none" children={icon} />}

            <Input
               id={field.name}
               placeholder={placeholder}
               type={show ? 'text' : 'password'}
               {...field}
               variant={variant}
               borderRadius={borderRadius}
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
