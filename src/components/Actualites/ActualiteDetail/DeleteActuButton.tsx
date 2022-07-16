import { DeleteIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import * as React from 'react';

export interface DeleteActuButtonProps {}

export function DeleteActuButton(props: DeleteActuButtonProps) {
   return (
      <div>
         <Button variant="outline" colorScheme="red" leftIcon={<DeleteIcon />} size={{ base: 'xs', xs: 'sm', lg: 'md' }}>
            Supprimer
         </Button>
      </div>
   );
}
