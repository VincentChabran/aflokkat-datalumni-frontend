import type { ComponentStyleConfig } from '@chakra-ui/theme';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

export const Link: ComponentStyleConfig = {
   baseStyle: (props: StyleFunctionProps) => {
      return {
         transitionProperty: 'common',
         transitionDuration: 'fast',
         transitionTimingFunction: 'ease-out',

         fontFamily: 'heading', // base = body
         w: '100%',
         px: '15px',

         cursor: 'pointer',
         textDecoration: 'none',
         outline: 'none',
         color: 'inherit',
         borderRadius: 'lg',

         _hover: {
            textDecoration: 'none', // base = underline
            bg: mode('gray.100', 'blackAlpha.400')(props), // base = existe pas
            color: mode('blue.500', 'purple.300')(props),
         },

         _activeLink: {
            bg: mode('gray.200', 'blackAlpha.500')(props),
            color: mode('blue', 'purple.400')(props),
            _hover: {
               bg: mode('gray.100', 'blackAlpha.400')(props),
            },
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
