import { AddIcon } from '@chakra-ui/icons';
import { Button, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActualitesSearchBar } from '../components/Actualites/ActualitesSearchBar';
import { DisplayActualitesGrid } from '../components/Actualites/DisplayActualitesGrid';
import { useUserStore } from '../store/useUserStore';

export interface IActualitesProps {}

export function Actualites(props: IActualitesProps) {
   const navigate = useNavigate();

   const { rolesUserStore } = useUserStore();

   const [selectByCategorie, setSelectByCategorie] = useState('');

   return (
      <VStack py="10" px={{ base: '4', md: '8', lg: '14' }} spacing={10}>
         <VStack>
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

         <ActualitesSearchBar selectByCategorie={selectByCategorie} setSelectByCategorie={setSelectByCategorie} />

         <DisplayActualitesGrid selectByCategorie={selectByCategorie} />
      </VStack>
   );
}
