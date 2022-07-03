import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import { OperationContext, useMutation } from 'urql';
import { ModalConfirmationCustom } from '../../global/ModalConfirmationCustom';

export interface DeleteFormationButtonProps {
   formationId: number;
   reExeSpecifiqueUserQuery: (opts?: Partial<OperationContext> | undefined) => void;
}

export function DeleteFormationButton({ formationId, reExeSpecifiqueUserQuery }: DeleteFormationButtonProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const [_, exeDeleteFormationMutation] = useMutation(deleteFormationMutation);

   const handleValidate = async () => {
      const { data, error } = await exeDeleteFormationMutation({ removeFormationId: formationId });
      reExeSpecifiqueUserQuery({ requestPolicy: 'network-only' });
   };

   return (
      <>
         <IconButton
            icon={<DeleteIcon />}
            size={{ base: 'xs', sm: 'sm' }}
            variant="outline"
            colorScheme="red"
            aria-label="delete experience pro boutton"
            onClick={onOpen}
         />

         <ModalConfirmationCustom isOpen={isOpen} onClose={onClose} handleValidate={handleValidate} />
      </>
   );
}

const deleteFormationMutation = `
mutation Mutation($removeFormationId: Int!) {
   removeFormation(id: $removeFormationId) {
     id
   }
 }
`;
