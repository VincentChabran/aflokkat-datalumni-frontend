import { ComponentStyleConfig } from '@chakra-ui/react';

export const Heading: ComponentStyleConfig = {
   baseStyle: {
      fontFamily: 'heading',
      fontWeight: 'bold',
      letterSpacing: 'tighter', // base = bold
   },

   sizes: {
      '4xl': {
         fontSize: ['6xl', null, '7xl'], //["4xl", "5xl", null, "6xl"]
         lineHeight: 1,
      },
      '3xl': {
         fontSize: ['5xl', null, '6xl'], //["3xl", "4xl", null, "5xl"]
         lineHeight: 1,
      },
      '2xl': {
         fontSize: ['4xl', null, '5xl'], // ["2xl", "3xl", null, "4xl"]
         lineHeight: [1.2, null, 1],
      },
      xl: {
         fontSize: ['2xl', '3xl', null, '4xl'], // ["1xl", "4xl"]
         lineHeight: [1.33, null, 1.2],
      },
      lg: {
         fontSize: ['lg', 'xl', '2xl', null, '3xl'],
         lineHeight: [1.33, null, 1.2],
      },
      md: {
         fontSize: ['sm', 'md', 'lg', 'xl'],
         lineHeight: 1.2,
      },
      sm: { fontSize: 'md', lineHeight: 1.2 },
      xs: { fontSize: 'sm', lineHeight: 1.2 },
   },

   variants: {
      custom: (props) => ({
         fontWeight: 'bold',
         fontFamily: 'body',
      }),
   },

   defaultProps: {
      size: 'xl',
   },
};
