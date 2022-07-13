import { WarningTwoIcon } from '@chakra-ui/icons';
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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export interface ModalConfirmationCustomProps {
   isOpen: boolean;
   onClose: () => void;
   handleValidate: () => Promise<void>;
}

export function ModalConfirmationCustom({ isOpen, onClose, handleValidate }: ModalConfirmationCustomProps) {
   const [confirm, setConfirm] = useState('');
   const [isLoad, setIsLoad] = useState(false);

   useEffect(() => {
      setConfirm('');
   }, [isOpen]);

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader textAlign="center" textDecor="underline">
               <WarningTwoIcon color="orange" mb="1.5" />
               Attention
            </ModalHeader>
            <ModalCloseButton top="4" />

            <ModalBody textAlign="center">
               Cette action est définitive. <br />
               S'il vous plait veuillez ecrire{' '}
               <Text as="span" fontWeight="semibold" fontSize="lg" letterSpacing="inherit">
                  confirmer
               </Text>
               <Input mt="3" size="sm" borderRadius="lg" onChange={(e) => setConfirm(e.target.value)} />
            </ModalBody>

            <ModalFooter justifyContent="center" gap="2">
               <Button
                  isDisabled={confirm === 'confirmer' ? false : true}
                  colorScheme="green"
                  isLoading={isLoad}
                  onClick={() => {
                     setIsLoad(true);
                     handleValidate();
                     setIsLoad(false);
                     onClose();
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
   );
}
