import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

export interface OffreSearchBarProps {
   search: string;
   setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export function OffreSearchBar({ search, setSearch }: OffreSearchBarProps) {
   return (
      <VStack align="center">
         <FormControl maxW="600px">
            <FormLabel htmlFor="search" textAlign="center" fontWeight="normal">
               Mots-clés secteur d'activité
            </FormLabel>
            <Input
               id="search"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               placeholder="Mots-clés secteur d'activité"
            />
         </FormControl>
      </VStack>
   );
}
