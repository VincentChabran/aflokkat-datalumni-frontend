import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { styles } from './style';
import { foundations } from './foundations';
import { components } from './components';

const config: ThemeConfig = {
   initialColorMode: 'light',
   useSystemColorMode: false,
};

const overrides = {
   styles,
   ...foundations,
   components: {
      ...components,
   },
};

const theme = extendTheme({ config, ...overrides });

export default theme;
