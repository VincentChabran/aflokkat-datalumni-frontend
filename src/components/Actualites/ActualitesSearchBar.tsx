import { FormControl, FormLabel, Input, Select, VStack } from '@chakra-ui/react';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { optionsCategorie } from './FormCreateUpdateActualites';

export interface IActualitesSearchBarProps {
   selectByCategorie: string;
   setSelectByCategorie: Dispatch<SetStateAction<string>>;
}

export function ActualitesSearchBar({ selectByCategorie, setSelectByCategorie }: IActualitesSearchBarProps) {
   return (
      <VStack align="center" w="100%">
         {/* <FormControl maxW="600px">
            <FormLabel htmlFor="search" textAlign="center" fontWeight="normal">
               Mots-clés secteur d'activité
            </FormLabel>

            <Input
               id="search"
               // value={search}
               // onChange={(e) => setSearch(e.target.value)}
               placeholder="Mots-clés secteur d'activité"
            />
         </FormControl> */}

         <Select
            w="180px"
            size={{ base: 'xs', md: 'sm', lg: 'md' }}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectByCategorie(e.target.value)}
            value={selectByCategorie}
            _hover={{ cursor: 'pointer' }}
         >
            <option value="">Catégorie...</option>

            {optionsCategorie.map(({ value, label }) => (
               <option key={value} value={value}>
                  {label}
               </option>
            ))}
         </Select>
      </VStack>
   );
}
