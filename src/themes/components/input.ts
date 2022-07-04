import { getColor, mode, StyleFunctionProps } from '@chakra-ui/theme-tools';
import type { ComponentStyleConfig } from '@chakra-ui/theme';

function getDefaults(props: Record<string, any>) {
   const { focusBorderColor: fc, errorBorderColor: ec } = props;
   return {
      focusBorderColor: fc || mode('blue.500', 'blue.300')(props),
      errorBorderColor: ec || mode('red.500', 'red.300')(props),
   };
}

export const Input: ComponentStyleConfig = {
   baseStyle: (props) => ({
      field: {
         width: '100%',
         minWidth: 0,
         outline: 0,
         position: 'relative',
         appearance: 'none',
         transitionProperty: 'common',
         transitionDuration: 'normal',
      },
   }),

   sizes: {
      lg: {
         field: {
            fontSize: 'lg',
            px: 4,
            h: 12,
            borderRadius: 'md',
         },
      },

      md: {
         field: {
            fontSize: 'md',
            px: 4,
            h: 10,
            borderRadius: 'md',
         },
      },

      sm: {
         field: {
            fontSize: 'sm',
            px: 3,
            h: 8,
            borderRadius: 'sm',
         },
      },

      xs: {
         field: {
            fontSize: 'xs',
            px: 2,
            h: 6,
            borderRadius: 'sm',
         },
      },
   },

   variants: {
      outline: (props: StyleFunctionProps) => {
         return {
            field: {
               borderColor: 'gray',
               border: '1px solid',
               bg: 'inherit',
               _hover: {
                  borderColor: mode('gray.700', 'whiteAlpha.900')(props),
               },
               _disabled: {
                  opacity: 0.4,
                  cursor: 'not-allowed',
               },
               _invalid: {
                  // borderColor: getColor(theme, ec),
                  // boxShadow: `0 0 0 1px ${getColor(theme, ec)}`,
               },

               // Juste pour enlever les couleurs bleu au focus
               _focus: {
                  borderColor: 'gray.400',
                  boxShadow: 'gray3',
               },
            },
         };
      },

      outlineCustom: (props: StyleFunctionProps) => {
         const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);

         return {
            field: {
               border: '1px solid',
               borderColor: 'inherit',
               bg: mode('gray.300', 'blackAlpha.200')(props),
               _placeholder: {
                  color: mode('gray.700', 'whiteAlpha.400')(props),
               },
               _hover: {
                  borderColor: mode('blackAlpha.500', 'whiteAlpha.500')(props),
               },
               _focus: {
                  zIndex: 1,
                  // bg: mode("gray.500", "blackAlpha.200")(props),
                  borderColor: mode('blackAlpha.900', 'whiteAlpha.800')(props),
                  boxShadow: mode('dark', 'light')(props),
               },
               _invalid: {
                  borderColor: ec,
                  // boxShadow: `0 0 0 1px ${getColor(theme, ec)}`,
               },
               _readOnly: {
                  boxShadow: 'none !important',
                  userSelect: 'all',
               },
               _disabled: {
                  opacity: 0.4,
                  cursor: 'not-allowed',
               },
            },
            addon: {
               border: '1px solid',
               borderColor: mode('inherit', 'whiteAlpha.50')(props),
               bg: mode('gray.100', 'whiteAlpha.300')(props),
            },
         };
      },

      outlineCustomFocus: (props: StyleFunctionProps) => {
         const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);

         return {
            field: {
               border: '1px solid',
               borderColor: 'inherit',
               bg: mode('gray.600', 'blackAlpha.300')(props),
               _placeholder: {
                  color: mode('gray.400', 'whiteAlpha.400')(props),
               },
               _hover: {
                  borderColor: mode('blackAlpha.500', 'whiteAlpha.500')(props),
               },
               _focus: {
                  zIndex: 1,
                  bg: mode('gray.500', 'blackAlpha.100')(props),
                  borderColor: mode('blackAlpha.900', 'whiteAlpha.800')(props),
                  boxShadow: mode('dark', 'light')(props),
               },
               _invalid: {
                  borderColor: ec,
               },
               _readOnly: {
                  boxShadow: 'none !important',
                  userSelect: 'all',
               },
               _disabled: {
                  opacity: 0.4,
                  cursor: 'not-allowed',
               },
            },
            addon: {
               border: '1px solid',
               borderColor: mode('inherit', 'whiteAlpha.50')(props),
               bg: mode('gray.100', 'whiteAlpha.300')(props),
            },
         };
      },

      flushedCustom: (props: StyleFunctionProps) => {
         const { theme } = props;
         const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);

         return {
            field: {
               borderBottom: '2px solid',
               borderColor: 'inherit',
               borderRadius: 0,
               borderTopRadius: '5px',
               bg: mode('gray.600', 'blackAlpha.300')(props),
               _placeholder: {
                  color: mode('gray.400', 'whiteAlpha.400')(props),
               },
               _focus: {
                  bg: mode('gray.500', 'blackAlpha.200')(props),
                  borderColor: mode('blackAlpha.900', 'whiteAlpha.800')(props),
                  // boxShadow: mode("dark", "light")(props),
               },
               _invalid: {
                  borderColor: getColor(theme, ec),
                  boxShadow: `0px 1px 0px 0px ${getColor(theme, ec)}`,
               },
               _readOnly: {
                  boxShadow: 'none !important',
                  userSelect: 'all',
               },
            },
            addon: {
               borderBottom: '2px solid',
               borderColor: 'inherit',
               borderRadius: 0,
               px: 0,
               bg: 'transparent',
            },
         };
      },
   },

   defaultProps: {
      size: 'md',
      variant: 'outline',
   },
};
