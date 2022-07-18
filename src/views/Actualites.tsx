import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { DisplayActualitesGrid } from '../components/Actualites/DisplayActualitesGrid';
import { useUserStore } from '../store/useUserStore';

export interface IActualitesProps {}

export function Actualites(props: IActualitesProps) {
   const navigate = useNavigate();

   const { rolesUserStore } = useUserStore();

   return (
      <Box py="10" px={{ base: '4', md: '8', lg: '14' }}>
         <VStack mb="10">
            {(rolesUserStore.includes('Admin') || rolesUserStore.includes('Equipe_administrative')) && (
               <Button
                  size={{ base: 'xs', sm: 'sm' }}
                  variant="outline"
                  colorScheme="green"
                  onClick={() => navigate('/actualites/create')}
                  leftIcon={<AddIcon />}
               >
                  Ajouter un article
               </Button>
            )}
         </VStack>

         <DisplayActualitesGrid />
      </Box>
   );
}
