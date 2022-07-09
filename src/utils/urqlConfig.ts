import {
   cacheExchange,
   createClient,
   dedupExchange,
   defaultExchanges,
   errorExchange,
   fetchExchange,
   subscriptionExchange,
} from 'urql';
import { retryExchange } from '@urql/exchange-retry';
import { deleteLocalStorageToken, getLocalStorageToken, refreshToken, setLocalStorageToken } from './jwtToken';
import { pathDomaineName } from './pathBackEnd';

// const wsClient = createWSClient({
//    url: "ws://localhost:3000/graphql",
// });

// const options = {
//    initialDelayMs: 1000,
//    maxDelayMs: 15000,
//    randomDelay: true,
//    maxNumberAttempts: 2,
//    retryCount: 2,
//    retryWith: (error, operation) => {
//       if (error.graphQLErrors) {
//          const context = { ...operation.context };
//          context['fetchOptions'] = {
//             credentials: 'omit',
//             headers: {
//                Authorization: `Bearer ${getLocalStorageToken()}`,
//             },
//          };
//          return { ...operation, context };
//       }
//       return null;
//    },
// };

export const urqlConfig = createClient({
   url: `${pathDomaineName}/graphql`,
   fetchOptions: {
      credentials: 'omit',
      headers: {
         Authorization: `Bearer ${getLocalStorageToken()}`,
      },
   },
   exchanges: [
      dedupExchange,
      cacheExchange,
      // errorExchange({
      //    async onError(error, operation) {
      //       const isAuthError = error.graphQLErrors.some((e) => e.extensions?.code === 'UNAUTHENTICATED');
      //       if (isAuthError) {
      //          const newToken = await refreshToken();
      //          const { accessToken } = newToken;

      //          if (!newToken) {
      //             deleteLocalStorageToken();
      //             window.location.reload();
      //          } else {
      //             setLocalStorageToken(accessToken);
      //             // window.location.reload();
      //          }
      //       }
      //    },
      // }),
      // retryExchange(options),
      fetchExchange,
   ],

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
