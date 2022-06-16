import type { ComponentStyleConfig } from '@chakra-ui/theme';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

export const Link: ComponentStyleConfig = {
   baseStyle: (props: StyleFunctionProps) => {
      return {
         transitionProperty: 'common',
         transitionDuration: 'fast',
         transitionTimingFunction: 'ease-out',

         fontFamily: 'heading', // base = body

         cursor: 'pointer',
         textDecoration: 'none',
         outline: 'none',
         color: 'inherit',
         borderRadius: 'lg',

         _hover: {
            textDecoration: 'none', // base = underline
            bg: mode('gray.100', 'gray.300')(props), // base = existe pas
            color: 'blue.500',
         },

         _activeLink: {
            bg: mode('gray.200', 'gray.700')(props),
            _hover: {
               bg: mode('gray.100', 'gray.400')(props),
            },
            color: 'blue',
         },
         // Au clic
         _active: {
            // bg: 'gray.500',
         },

         _focus: {
            boxShadow: 'none',
         },

         _focusVisible: {
            boxShadow: 'outline',
         },
      };
   },

   sizes: {},

   variants: {},

   defaultProps: {},
};
