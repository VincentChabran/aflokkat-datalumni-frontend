import { DeleteIcon } from '@chakra-ui/icons';
import { Button, useDisclosure, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'urql';
import { useActualitesDisplayStore } from '../../../store/useActualitesDisplayStore';
import { toastSuccessError } from '../../../tools/functions/toastSuccessError';
import { ModalConfirmationCustom } from '../../global/ModalConfirmationCustom';

export interface DeleteActuButtonProps {
   blogId: number;
}

export function DeleteActuButton({ blogId }: DeleteActuButtonProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const navigate = useNavigate();
   const toast = useToast();

   const { deleteActualite, setDisplayActualites } = useActualitesDisplayStore();

   const [_, exeDeleteBlogMutation] = useMutation(deleteBlogMutation);
   const handleValidate = async (): Promise<void> => {
      const { data, error } = await exeDeleteBlogMutation({ blog: { id: blogId } });

      toastSuccessError(toast, 'Article supprimé', 'Suppression fail', data, error);
      if (data && !error) {
         deleteActualite(blogId);
         setDisplayActualites();
      }
      if (error && !data) console.log(error);

      navigate('/actualites');
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

const deleteBlogMutation = `
mutation Mutation($blog: UpdateBlogInput!) {
   removeBlog(blog: $blog)
 }
`;
