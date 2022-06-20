import { mode } from '@chakra-ui/theme-tools';
import { Dict } from '@chakra-ui/utils';

export const styles = {
   global: (props: Dict<any>) => ({
      body: {
         fontFamily: 'body',
         color: mode('gray.800', 'whiteAlpha.900')(props),
         bg: mode('gray.100', 'gray.900')(props),
         lineHeight: 'base',
      },
      '&::-webkit-scrollbar': {
         width: '4px',
      },
      '&::-webkit-scrollbar-track': {
         width: '6px',
         backgroundColor: '#4A5568',
         borderRadius: '24px',
      },
      '&::-webkit-scrollbar-thumb': {
         backgroundColor: '#1A202C',
         borderRadius: '24px',
      },
      // "*::placeholder": {
      //    color: mode("gray.400", "whiteAlpha.400")(props),
      // },
      // "*, *::before, &::after": {
      //    borderColor: mode("gray.200", "whiteAlpha.300")(props),
      //    wordWrap: "break-word",
      // },
   }),
};
