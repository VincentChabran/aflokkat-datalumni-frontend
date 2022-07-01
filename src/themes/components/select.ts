import type { ComponentStyleConfig } from '@chakra-ui/theme';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

export const Select: ComponentStyleConfig = {
   baseStyle: (props) => ({
      field: {
         bg: mode('white', 'gray.700')(props),
         appearance: 'none',
         paddingBottom: '1px',
         lineHeight: 'normal',
      },
      icon: {
         width: '1.5rem',
         height: '100%',
         insetEnd: '0.5rem',
         position: 'relative',
         color: 'currentColor',
         fontSize: '1.25rem',
         _disabled: {
            opacity: 0.5,
         },
      },
   }),

   sizes: {
      lg: {
         field: {
            fontSize: 'lg',
            px: 4,
            h: 12,
            borderRadius: 'md',
            paddingInlineEnd: '2rem',
         },
      },

      md: {
         field: {
            fontSize: { base: 'xs', sm: 'sm' },
            px: { base: 2, sm: 4 },
            h: { base: 8, sm: 10 },
            borderRadius: 'md',
            paddingInlineEnd: '2rem',
         },
      },

      sm: {
         field: {
            fontSize: 'sm',
            px: 3,
            h: 8,
            borderRadius: 'md',
            paddingInlineEnd: '2rem',
         },
      },

      xs: {
         field: {
            fontSize: 'xs',
            px: 2,
            h: 6,
            borderRadius: 'md',
            paddingInlineEnd: '2rem',
         },
         icon: { insetEnd: '0.25rem' },
      },
   },

   variants: {
      outline: (props: StyleFunctionProps) => {
         return {
            field: {
               border: '1px solid',
               borderColor: mode('gray.400', 'whiteAlpha.400')(props),

               bg: 'inherit',
               _hover: {
                  borderColor: mode('gray.300', 'whiteAlpha.400')(props),
               },
               // _readOnly: {
               //    boxShadow: 'none !important',
               //    userSelect: 'all',
               // },
               // _disabled: {
               //    opacity: 0.4,
               //    cursor: 'not-allowed',
               // },
               // _invalid: {
               //    borderColor: getColor(theme, ec),
               //    boxShadow: `0 0 0 1px ${getColor(theme, ec)}`,
               // },
               // _focusVisible: {
               //    zIndex: 1,
               //    borderColor: getColor(theme, fc),
               //    boxShadow: `0 0 0 1px ${getColor(theme, fc)}`,
               // },
            },
            addon: {
               border: '1px solid',
               borderColor: mode('inherit', 'whiteAlpha.50')(props),
               bg: mode('gray.100', 'whiteAlpha.300')(props),
            },
         };
      },
   },

   defaultProps: {},
};
