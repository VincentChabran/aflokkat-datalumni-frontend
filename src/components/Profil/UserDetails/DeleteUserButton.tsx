import { DeleteIcon, WarningTwoIcon } from '@chakra-ui/icons';
import {
   Button,
   Input,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Text,
   useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'urql';
import { useUserStore } from '../../../store/useUserStore';
import { deleteLocalStorageToken } from '../../../utils/jwtToken';

export interface IDeleteUserButtonProps {
   userId: number;
}

export function DeleteUserButton({ userId }: IDeleteUserButtonProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const navigate = useNavigate();

   const { id: idUserStore } = useUserStore();

   const [confirm, setConfirm] = useState('');

   useEffect(() => {
      setConfirm('');
   }, [isOpen]);

   const [_, exeDeleteUserMutation] = useMutation(deleteUserMutation);

   const handleValidate = async () => {
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

         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader textAlign="center" textDecor="underline">
                  <WarningTwoIcon color="orange" mb="1.5" />
                  Attention
               </ModalHeader>
               <ModalCloseButton top="4" />

               <ModalBody textAlign="center">
                  Cette action supprimera le compte définitivement <br />
                  S'il vous plait veuillez ecrire{' '}
                  <Text as="span" fontWeight="semibold" fontSize="lg" letterSpacing="inherit">
                     confirmer
                  </Text>
                  <Input mt="3" size="sm" borderRadius="lg" onChange={(e) => setConfirm(e.target.value)} />
               </ModalBody>

               <ModalFooter justifyContent="center" gap="2">
                  {/* TODO la logique du boutton delete */}
                  <Button
                     isDisabled={confirm === 'confirmer' ? false : true}
                     colorScheme="green"
                     onClick={() => {
                        onClose();
                        handleValidate();
                     }}
                  >
                     Valider
                  </Button>

                  <Button colorScheme="red" mr={3} onClick={onClose}>
                     Fermer
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
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
