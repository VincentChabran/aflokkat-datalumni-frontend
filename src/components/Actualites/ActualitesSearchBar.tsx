import { Flex, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useActualitesDisplayStore } from '../../store/useActualitesDisplayStore';
import { SearchWithSelect } from '../global/SearchWithSelect';
import { optionsCategorie } from './FormCreateUpdateActualites';

export interface IActualitesSearchBarProps {}

export function ActualitesSearchBar(props: IActualitesSearchBarProps) {
   const { setDisplayActualites, selectByCategorie, setSelectByCategorie, sortByMoreRecent, setSortByMoreRecent } =
      useActualitesDisplayStore();

   useEffect(() => {
      setDisplayActualites();
   }, [selectByCategorie, sortByMoreRecent]);

   useEffect(
      () => () => {
         setSelectByCategorie('');
         setSortByMoreRecent('');
         setDisplayActualites();
      },
      [],
   );

   return (
      <VStack align="center" w="100%">
         <Flex gap={2} wrap={'wrap'} justify="center">
            <SearchWithSelect
               selectByX={sortByMoreRecent}
               setSelectByX={setSortByMoreRecent}
               title="Les plus récent"
               optionsSelect={[{ value: 'plus anciens', label: 'Les plus anciens' }]}
            />

            <SearchWithSelect
               selectByX={selectByCategorie}
               setSelectByX={setSelectByCategorie}
               title="Categorie"
               optionsSelect={optionsCategorie}
            />
         </Flex>
      </VStack>
   );
}
