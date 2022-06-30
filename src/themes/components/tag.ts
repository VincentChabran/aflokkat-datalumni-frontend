import type { ComponentStyleConfig } from '@chakra-ui/theme';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

export const Tag: ComponentStyleConfig = {
   baseStyle: (props: StyleFunctionProps) => ({
      container: {
         fontWeight: 'medium',
         lineHeight: 1.2,
         outline: 0,
         borderRadius: 'md',
         _focusVisible: {
            boxShadow: 'outline',
         },
      },
      label: {
         lineHeight: 1.2,
         overflow: 'visible',
      },
      // closeButton: baseStyleCloseButton,
   }),

   sizes: {
      lg: {
         container: {
            minH: 8,
            minW: 8,
            fontSize: 'md',
            px: 3,
         },
      },
      md: {
         container: {
            minH: '1.5rem',
            minW: '1.5rem',
            fontSize: 'sm',
            px: 2,
         },
      },
      sm: {
         container: {
            minH: '1.25rem',
            minW: '1.25rem',
            fontSize: 'xs',
            px: 2,
         },
         closeButton: {
            marginEnd: '-2px',
            marginStart: '0.35rem',
         },
      },
      xs: {
         container: {
            minH: '1rem',
            minW: '1rem',
            fontSize: 'xs',
            px: 2,
         },
         closeButton: {
            marginEnd: '-2px',
            marginStart: '0.35rem',
         },
      },
   },

   variants: {
      exemple: (props: StyleFunctionProps) => {
         return {};
      },
   },

   defaultProps: {},
};
