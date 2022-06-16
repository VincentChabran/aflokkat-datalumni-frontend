import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import theme from './themes';

ReactDOM.createRoot(document.getElementById('root')!).render(
   <ChakraProvider theme={theme}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </ChakraProvider>,
);
