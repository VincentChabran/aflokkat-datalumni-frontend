import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'urql';

import App from './App';
import theme from './themes';
import { urqlConfig } from './utils/urqlConfig';

ReactDOM.createRoot(document.getElementById('root')!).render(
   <ChakraProvider theme={theme}>
      <Provider value={urqlConfig}>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </Provider>
   </ChakraProvider>,
);
