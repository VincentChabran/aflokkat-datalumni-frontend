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
            fontSize: 'sm',
            px: 4,
            h: 10,
            borderRadius: 'md',
            paddingInlineEnd: '2rem',
         },
      },

      sm: {
         field: {
            fontSize: 'sm',
            px: 3,
            h: 8,
            borderRadius: 'sm',
            paddingInlineEnd: '2rem',
         },
      },

      xs: {
         field: {
            fontSize: 'xs',
            px: 2,
            h: 6,
            borderRadius: 'sm',
            paddingInlineEnd: '2rem',
         },
         icon: { insetEnd: '0.25rem' },
      },
   },

   variants: {
      exemple: (props: StyleFunctionProps) => {
         return {};
      },
   },

   defaultProps: {},
};
