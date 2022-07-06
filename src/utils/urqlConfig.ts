import { createClient, defaultExchanges, subscriptionExchange } from 'urql';
import { getLocalStorageToken } from './jwtToken';
import { pathDomaineName } from './pathBackEnd';

// const wsClient = createWSClient({
//    url: "ws://localhost:3000/graphql",
// });

export const urqlConfig = createClient({
   url: `${pathDomaineName}/graphql`,
   fetchOptions: {
      credentials: 'omit',
      headers: {
         Authorization: `Bearer ${getLocalStorageToken()}`,
      },
   },
   // exchanges: [
   //    ...defaultExchanges,
   //    multipartFetchExchange,// Ajout quentin
   //    subscriptionExchange({
   //       forwardSubscription: (operation) => ({
   //          subscribe: (sink: any) => ({
   //             unsubscribe: wsClient.subscribe(operation, sink),
   //          }),
   //       }),
   //    }),
   // ],
});
