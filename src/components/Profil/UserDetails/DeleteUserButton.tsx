import { DeleteIcon } from '@chakra-ui/icons';
import { Button, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'urql';
import { useUserStore } from '../../../store/useUserStore';
import { deleteLocalStorageToken } from '../../../utils/jwtToken';
import { ModalConfirmationCustom } from '../../global/ModalConfirmationCustom';

export interface IDeleteUserButtonProps {
   userId: number;
}

export function DeleteUserButton({ userId }: IDeleteUserButtonProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const navigate = useNavigate();

   const { idUserStore } = useUserStore();

   const [_, exeDeleteUserMutation] = useMutation(deleteUserMutation);

   const handleValidate = async (): Promise<void> => {
      const { data, error } = await exeDeleteUserMutation({ user: { id: userId } });

      if (error) console.log(error);

      // Si le user actuel === le user delete , on le déconnecte
      if (idUserStore === userId) {
         deleteLocalStorageToken();
         window.location.reload();
      }
      // Sinon c'est un admin
      else navigate('/annuaire');
   };

   return (
      <>
         <Button
            variant="outline"
            colorScheme="red"
            leftIcon={<DeleteIcon />}
            onClick={onOpen}
            size={{ base: 'xs', xs: 'sm', lg: 'md' }}
         >
            Supprimer
         </Button>

         <ModalConfirmationCustom isOpen={isOpen} onClose={onClose} handleValidate={handleValidate} />
      </>
   );
}

const deleteUserMutation = `
mutation Mutation($user: UpdateUserInput!) {
   removeUser(user: $user) {
     id
   }
 }
`;
