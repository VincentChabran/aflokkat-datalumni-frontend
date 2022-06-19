import type { ComponentStyleConfig } from '@chakra-ui/theme';
import { mode, StyleFunctionProps, PartsStyleObject } from '@chakra-ui/theme-tools';
import { drawerAnatomy as parts } from '@chakra-ui/anatomy';

export const Drawer: ComponentStyleConfig = {
   baseStyle: (props: StyleFunctionProps) => ({
      overlay: {
         bg: 'blackAlpha.600',
         zIndex: 'overlay',
      },
      dialogContainer: {
         display: 'flex',
         justifyContent: 'center',
         zIndex: 'modal',
      },
      dialog: {
         zIndex: 'modal',
         maxH: '100vh',
         bg: mode('white', 'gray.700')(props),
         color: 'inherit',
         boxShadow: mode('lg', 'dark-lg')(props),
      },
      header: {
         px: 6,
         py: 4,
         fontSize: 'xl',
         fontWeight: 'semibold',
      },
      closeButton: {
         position: 'absolute',
         top: 4,
         insetEnd: 3,
      },
      body: {
         px: 6,
         py: 2,
         flex: 1,
         overflow: 'auto',
      },
      footer: {
         px: 6,
         py: 4,
      },
   }),

   sizes: {
      '2xs': getSize('2xs'),
      xs: getSize('xs'),
      sm: getSize('md'),
      md: getSize('lg'),
      lg: getSize('2xl'),
      xl: getSize('4xl'),
      full: getSize('full'),
   },

   variants: {
      exemple: (props: StyleFunctionProps) => {
         return {};
      },
   },

   defaultProps: {},
};

function getSize(value: string): PartsStyleObject<typeof parts> {
   if (value === 'full') {
      return {
         dialog: { maxW: '100vw', h: '100vh' },
      };
   }
   return {
      dialog: { maxW: value },
   };
}
