import type { ComponentStyleConfig } from '@chakra-ui/theme';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

export const List: ComponentStyleConfig = {
   baseStyle: (props: StyleFunctionProps) => ({
      icon: {
         marginEnd: '0.5rem',
         display: 'inline',
         verticalAlign: 'text-bottom',
      },
   }),

   sizes: {},

   variants: {
      exemple: (props: StyleFunctionProps) => {
         return {};
      },
   },

   defaultProps: {},
};
