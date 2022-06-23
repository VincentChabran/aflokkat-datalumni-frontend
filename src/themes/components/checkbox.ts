import type { ComponentStyleConfig } from '@chakra-ui/theme';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

export const Checkbox: ComponentStyleConfig = {
   baseStyle: (props: StyleFunctionProps) => {
      const { colorScheme: c } = props;

      return {
         control: {
            w: '100%',
            transitionProperty: 'box-shadow',
            transitionDuration: 'normal',
            border: '2px solid',
            borderRadius: 'sm',
            borderColor: mode('gray.300', 'inherit')(props), // base inherit
            color: 'white',

            _checked: {
               bg: mode(`${c}.500`, `${c}.200`)(props),
               borderColor: mode(`${c}.500`, `${c}.200`)(props),
               color: mode('white', 'gray.900')(props),

               _hover: {
                  bg: mode(`${c}.600`, `${c}.300`)(props),
                  borderColor: mode(`${c}.600`, `${c}.300`)(props),
               },

               _disabled: {
                  borderColor: mode('gray.200', 'transparent')(props),
                  bg: mode('gray.200', 'whiteAlpha.300')(props),
                  color: mode('gray.500', 'whiteAlpha.500')(props),
               },
            },

            _indeterminate: {
               bg: mode(`${c}.500`, `${c}.200`)(props),
               borderColor: mode(`${c}.500`, `${c}.200`)(props),
               color: mode('white', 'gray.900')(props),
            },

            _disabled: {
               bg: mode('gray.100', 'whiteAlpha.100')(props),
               borderColor: mode('gray.100', 'transparent')(props),
            },

            _focusVisible: {
               boxShadow: 'outline',
            },

            _invalid: {
               borderColor: mode('red.500', 'red.300')(props),
            },
         },
         label: {
            userSelect: 'none',
            _disabled: {
               opacity: 0.4,
            },
         },
      };
   },

   sizes: {
      lg: {
         control: { w: 5, h: 5 },
         label: { fontSize: 'lg' },
         icon: { fontSize: '0.625rem' },
      },
      md: {
         control: { w: 4, h: 4 },
         label: { fontSize: 'md' },
         icon: { fontSize: '0.625rem' },
      },
      sm: {
         control: { h: 3, w: 3 },
         label: { fontSize: 'sm' },
         icon: { fontSize: '0.45rem' },
      },
   },

   variants: {
      exemple: (props: StyleFunctionProps) => {
         return {};
      },
   },

   defaultProps: {},
};
