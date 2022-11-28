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
      // ScrollBar GoogleChrome
      '&::-webkit-scrollbar': {
         width: '2px',
      },
      '&::-webkit-scrollbar-track': {
         width: '2px',
         backgroundColor: '#4A5568',
         borderRadius: '24px',
      },
      '&::-webkit-scrollbar-thumb': {
         backgroundColor: '#1A202C',
         borderRadius: '24px',
      },
      // End ScrollBar
      ...editor,
      // "*::placeholder": {
      //    color: mode("gray.400", "whiteAlpha.400")(props),
      // },
      // "*, *::before, &::after": {
      //    borderColor: mode("gray.200", "whiteAlpha.300")(props),
      //    wordWrap: "break-word",
      // },
   }),
};

const editor = {
   h1: {
      fontSize: '32px',
      fontWeight: 'bold',
      py: '6',
   },
   h2: {
      fontSize: '24px',
      fontWeight: 'bold',
      py: '6',
   },
   h3: {
      fontSize: '19px',
      fontWeight: 'bold',
      py: '6',
   },
   h4: {
      fontSize: '16px',
      fontWeight: 'bold',
   },
   h5: {
      fontSize: '13',
      fontWeight: 'bold',
   },
   h6: {
      fontSize: '10',
      fontWeight: 'bold',
   },
   blockquote: {
      fontStyle: 'normal',
      marginLeft: '10px',
      fontFamily: 'Segoe Print, Times New Roman, Verdana',
      paddingLeft: '20px',
      minHeight: '30px',
   },
   ul: {
      paddingLeft: '8',
   },
   ol: {
      paddingLeft: '8',
   },
};
