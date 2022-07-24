import axios from 'axios';
import { pathDomaineName } from './pathBackEnd';

const AUTH_TOKEN = 'auth-token';

export const getLocalStorageToken = () => localStorage.getItem(AUTH_TOKEN);
export const setLocalStorageToken = (token: string) => localStorage.setItem(AUTH_TOKEN, token);
export const deleteLocalStorageToken = () => localStorage.removeItem(AUTH_TOKEN);

// export async function refreshToken() {
//    const formData = new FormData();
//    const operations = {
//       query: 'mutation RefreshJwt {\r\n  refreshJwt {\r\n    accessToken\r\n    user {\r\n      id\r\n      email\r\n      nom\r\n      prenom\r\n      roles\r\n      mentor\r\n      profilPictureName\r\n    }\r\n  }\r\n}',
//    };
//    const map = { 0: ['variables.token'] };
//    formData.append('operations', JSON.stringify(operations));
//    formData.append('map', JSON.stringify(map));
//    formData.append('0', '');

//    try {
//       const response = await axios({
//          method: 'post',
//          url: `${pathDomaineName}/graphql`,
//          data: formData,
//          headers: {
//             'content-type': 'application/json',
//             Authorization: `Bearer ${getLocalStorageToken()}`,
//          },
//       });
//       return response.data.data.refreshJwt;
//    } catch (error) {
//       console.log(error);
//    }
// }
