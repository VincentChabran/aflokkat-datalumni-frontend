import { AddIcon } from '@chakra-ui/icons';
import { Button, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ActualitesSearchBar } from '../components/Actualites/ActualitesSearchBar';
import { DisplayActualitesGrid } from '../components/Actualites/DisplayActualitesGrid';
import { useUserStore } from '../store/useUserStore';

export interface IActualitesProps {}

export function Actualites(props: IActualitesProps) {
   const navigate = useNavigate();

   const { rolesUserStore } = useUserStore();

   return (
      <VStack py="6" px={{ base: '4', md: '8', lg: '14' }} spacing={10}>
         {(rolesUserStore.includes('Admin') || rolesUserStore.includes('Equipe_administrative')) && (
            <VStack>
               <Button
                  size={{ base: 'xs', sm: 'sm' }}
                  variant="outline"
                  colorScheme="green"
                  onClick={() => navigate('/actualites/create')}
                  leftIcon={<AddIcon />}
               >
                  Ajouter un article
               </Button>
            </VStack>
         )}

         <ActualitesSearchBar />

         <DisplayActualitesGrid />
      </VStack>
   );
}
