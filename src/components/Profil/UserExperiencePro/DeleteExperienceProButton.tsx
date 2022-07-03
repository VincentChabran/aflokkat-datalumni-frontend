import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import { OperationContext, useMutation } from 'urql';
import { ModalConfirmationCustom } from '../../global/ModalConfirmationCustom';

export interface DeleteExperienceProButtonProps {
   experienceProId: number;
   reExeSpecifiqueUserQuery: (opts?: Partial<OperationContext> | undefined) => void;
}

export function DeleteExperienceProButton({ experienceProId, reExeSpecifiqueUserQuery }: DeleteExperienceProButtonProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const [_, exeDeleteExperienceProMutation] = useMutation(deleteExperienceProMutation);

   const handleValidate = async (): Promise<void> => {
      const { data, error } = await exeDeleteExperienceProMutation({ removeExperienceProId: experienceProId });
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

const deleteExperienceProMutation = `
mutation RemoveExperiencePro($removeExperienceProId: Int!) {
   removeExperiencePro(id: $removeExperienceProId) {
     id
   }
 }
`;
