const AUTH_TOKEN = 'auth-token';

export const getLocalStorageToken = () => localStorage.getItem(AUTH_TOKEN);
export const setLocalStorageToken = (token: string) => localStorage.setItem(AUTH_TOKEN, token);
export const deleteLocalStorageToken = () => localStorage.removeItem(AUTH_TOKEN);
