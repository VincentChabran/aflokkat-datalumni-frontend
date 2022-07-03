import { theme as base } from '@chakra-ui/react';
import { mode, StyleFunctionProps, transparentize } from '@chakra-ui/theme-tools';

export const Button = {
   baseStyle: (props: StyleFunctionProps) => ({
      // fontFamily: "body",
      fontWeight: 'bold',
      lineHeight: '1.2',
      borderRadius: 'md',
      transitionProperty: 'common',
      transitionDuration: 'normal',
      _focus: {
         boxShadow: 'none',
      },
      _hover: {
         _disabled: {
            bg: 'initial',
         },
      },
      _active: {
         boxShadow: mode('dark', 'light')(props),
      },
      _disabled: {
         opacity: 0.4,
         cursor: 'not-allowed',
         boxShadow: 'none',
      },
   }),

   sizes: {
      xl: {
         h: '56px',
         fontSize: 'lg',
         px: '32px',
      },
      lg: {
         h: 12,
         minW: 12,
         fontSize: 'lg',
         px: 6,
      },
      md: {
         h: 10,
         minW: 10,
         fontSize: ['xs', 'sm', 'md'],
         px: 4,
      },
      sm: {
         h: 8,
         minW: 8,
         fontSize: 'sm',
         px: 2,
      },
      xs: {
         h: 6,
         minW: 6,
         fontSize: 'xs',
         px: 1,
      },
   },

   variants: {
      solid: (props: StyleFunctionProps) => {
         const { colorScheme: c } = props;

         if (c === 'gray') {
            const bg = mode(`gray.300`, `whiteAlpha.200`)(props);
            return {
               bg,
               _hover: {
                  bg: mode(`gray.400`, `whiteAlpha.300`)(props),
                  _disabled: {
                     bg,
                  },
               },
               _active: { bg: mode(`gray.300`, `whiteAlpha.400`)(props) },
            };
         }

         return {
            bg: mode(`${c}.500`, `${c}.600`)(props), // base = mode(`${c}.500`, `${c}.200`)
            color: mode(`white`, `gray.800`)(props),
            _hover: {
               bg: mode(`${c}.600`, `${c}.500`)(props), // base =  mode(`${c}.600`, `${c}.300`)
               _disabled: {
                  bg: `${c}.500`, // base = mode(`${c}.500`, `${c}.200`)
               },
            },
            _active: { bg: mode(`${c}.700`, `${c}.400`)(props) },
         };
      },

      ghost: (props: StyleFunctionProps) => {
         const { colorScheme: c, theme } = props;

         if (c === 'gray') {
            return {
               color: mode(`inherit`, `whiteAlpha.900`)(props),
               _hover: {
                  bg: mode(`gray.100`, `blackAlpha.400`)(props),
               },
               _active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) },
            };
         }

         return {
            color: mode(`${c}.600`, `${c}.200`)(props),
            bg: 'transparent',
            _hover: {
               bg: mode(`${c}.50`, `${c}.20`)(props),
            },
            _active: {
               bg: mode(`${c}.100`, `${c}.20`)(props),
            },
         };
      },

      outline: (props: StyleFunctionProps) => {
         const { colorScheme: c } = props;

         if (c === 'gray') {
            return {
               color: mode(`inherit`, `whiteAlpha.900`)(props),
               borderColor: mode(`gray.500`, `whiteAlpha.300`)(props),
               _hover: {
                  bg: mode(`gray.100`, `whiteAlpha.200`)(props),
               },
               _active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) },
            };
         }

         // if (c === 'blackAlpha' || 'whiteAlpha') {
         //    return {
         //       border: '1px solid',
         //       borderColor: mode(`${c}.900`, `${c}.800`)(props),
         //       color: mode(`${c}.900`, `${c}.800`)(props),
         //       bg: mode(`transparent`, `${c}.100`)(props),
         //       _hover: {
         //          bg: mode(`gray.100`, `${c}.200`)(props),
         //       },
         //       _active: {
         //          bg: mode(`gray.200`, `${c}.300`)(props),
         //       },
         //    };
         // }

         return {
            color: mode(`${c}.600`, `${c}.200`)(props),
            bg: 'transparent',
            _hover: {
               bg: mode(`${c}.50`, `${c}.20`)(props),
            },
            _active: {
               bg: mode(`${c}.100`, `${c}.20`)(props),
            },
         };
      },

      custom: (props: StyleFunctionProps) => {
         return {
            // ...base.components.Button.variants.outline(props),
            bg: 'transparent',
            fontWeight: 'normal',
            fontSize: 'sm',

            _hover: {
               color: mode('blue', 'purple.300')(props),
            },

            _active: {
               boxShadow: 'none',
               color: mode('blue.300', 'purple.500')(props),
            },
         };
      },
   },

   defaultProps: {
      // size: ["sm", "sm", "md", "md", "xl", "xl"],
      // colorScheme: "red",
   },
};
