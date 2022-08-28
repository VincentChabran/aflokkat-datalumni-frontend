import { AddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { Button, VStack } from '@chakra-ui/react';
import { DisplayOffreGrid } from '../components/OffresEmploi/DisplayOffreGrid';
import { OffreSearchBar } from '../components/OffresEmploi/OffreSearchBar/OffreSearchBar';
import { useUserStore } from '../store/useUserStore';

export interface OffresEmploiProps {}

export function OffresEmploi(props: OffresEmploiProps) {
   const navigate = useNavigate();

   const { rolesUserStore } = useUserStore();

   return (
      <VStack align="normal" py="6" px={{ base: '1', sm: '2', md: '4' }} spacing={10}>
         {(rolesUserStore.includes('Admin') ||
            rolesUserStore.includes('Recruteur') ||
            rolesUserStore.includes('Equipe_administrative')) && (
            <VStack>
               <Button
                  size={{ base: 'xs', sm: 'sm' }}
                  variant="outline"
                  colorScheme="green"
                  onClick={() => navigate('/offresemploi/create')}
                  leftIcon={<AddIcon />}
               >
                  Ajouter une offre
               </Button>
            </VStack>
         )}

         <OffreSearchBar />

         <DisplayOffreGrid />
      </VStack>
   );
}
