import { Flex, VStack } from '@chakra-ui/react';
import { CheckboxIsMentor } from './selectiveUserSearch/CheckboxIsMentor';
import { CheckboxJobSearch } from './selectiveUserSearch/CheckboxJobSearch';
import { ResetSearch } from './selectiveUserSearch/ResetSearch';
import { SearchByDiplome } from './selectiveUserSearch/SearchByDiplome';
import { SearchByPromotion } from './selectiveUserSearch/SearchByPromotion';
import { SearchByRoles } from './selectiveUserSearch/SearchByRoles';

export interface UserSearchBarProps {}

export function UserSearchBar(props: UserSearchBarProps) {
   return (
      <VStack w="100%" p="10" spacing={5}>
         <Flex w="100%" wrap="wrap" gap={4} justify="center">
            <SearchByRoles />

            <SearchByDiplome />

            <SearchByPromotion />
         </Flex>

         <Flex w="100%" wrap="wrap" gap={4} justify="center">
            <CheckboxJobSearch />

            <CheckboxIsMentor />

            <ResetSearch />
         </Flex>
      </VStack>
   );
}
