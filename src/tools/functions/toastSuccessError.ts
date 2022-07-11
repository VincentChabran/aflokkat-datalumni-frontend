import { CombinedError } from 'urql';
import { errorMessageToast } from './errorMessageRender';

export const toastSuccessError = (
   toast: any,
   titleSuccess: string,
   titleError: string,
   data: any,
   error: CombinedError | undefined,
) => {
   if (data && !error) {
      return toast({
         title: titleSuccess,
         position: 'top',
         status: 'success',
         duration: 2000,
         isClosable: true,
      });
   }

   if (error && !data) {
      const resError = errorMessageToast(error);

      return toast({
         title: titleError,
         description: resError.map((el) => el + '\n'),
         position: 'top',
         status: 'error',
         duration: 4000,
         isClosable: true,
      });
   }
};
