import { Button } from '@chakra-ui/react';
import { BsFillPencilFill } from 'react-icons/bs';
import { FormCreateUpdateActualites } from '../FormCreateUpdateActualites';

export interface UpdateActuButtonProps {}

export function UpdateActuButton(props: UpdateActuButtonProps) {

   const initialValues ={}
   
   const submit
   return (
      <div>
         <FormCreateUpdateActualites initialValues={initialValues} submit={submit}/>
      </div>
   );
}
