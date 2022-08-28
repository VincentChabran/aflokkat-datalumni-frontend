import { WarningTwoIcon } from '@chakra-ui/icons';
import { Button, Input, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'urql';
import { useOffresEmploiDisplayStore } from '../../../store/useOffresEmploiDisplayStore';

export interface DeleteOffreEmploiProps {
   isOpen: boolean;
   offreId: number;
   onClose: () => void;
}

export function DeleteOffreEmploi({ isOpen, offreId, onClose }: DeleteOffreEmploiProps) {
   const navigate = useNavigate();

   const [confirm, setConfirm] = useState('');
   const [isLoad, setIsLoad] = useState(false);

   const { deleteOffre, setDisplayOffres } = useOffresEmploiDisplayStore();

   useEffect(() => {
      setConfirm('');
   }, [isOpen]);

   const [_, exeDeleteOffreEmploiMutation] = useMutation(deleteOffreEmploiMutation);
   const handleValidate = async (): Promise<void> => {
      setIsLoad(true);
      const { data, error } = await exeDeleteOffreEmploiMutation({ offre: { id: offreId } });

      if (data && !error) {
         deleteOffre(offreId);
         setDisplayOffres();
      }
      setIsLoad(false);
      onClose();
      navigate('/offresemploi');
   };

   return (
      <>
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
            <Input mt="3" size="sm" borderRadius="lg" onChange={(e) => setConfirm(e.target.value)} maxW="500px" />
         </ModalBody>
         <ModalFooter justifyContent="center" gap="2">
            <Button
               isDisabled={confirm === 'confirmer' ? false : true}
               colorScheme="green"
               size={{ base: 'xs', sm: 'sm' }}
               onClick={() => handleValidate()}
               isLoading={isLoad}
            >
               Valider
            </Button>

            <Button colorScheme="red" mr={3} size={{ base: 'xs', sm: 'sm' }} onClick={() => onClose()}>
               Annuler
            </Button>
         </ModalFooter>
      </>
   );
}

const deleteOffreEmploiMutation = `
mutation Mutation($offre: UpdateOffreEmploiInput!) {
   removeOffreEmploi(offre: $offre)
 }
`;
