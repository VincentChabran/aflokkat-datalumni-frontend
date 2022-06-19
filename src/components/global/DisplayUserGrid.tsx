import { Avatar, Box, Heading, SimpleGrid, Tag, Text, VStack } from '@chakra-ui/react';
import { useUserStore } from '../../store/useUserStore';

export interface DisplayUserGridProps {}

export function DisplayUserGrid(props: DisplayUserGridProps) {
   const { email, nom, prenom } = useUserStore();
   return (
      <SimpleGrid columns={[1, 1, 2, 3, 4]} spacing={2}>
         <VStack border="1px solid">
            <Avatar />
            <Heading size="md">
               {prenom} {nom}
            </Heading>
            <Tag>Roles</Tag>
            <Text>Experience pro || formation</Text>
         </VStack>

         <VStack border="1px solid">
            <Avatar />
            <Heading>
               {prenom} {nom}
            </Heading>
            <Tag>Roles</Tag>
            <Text>Experience pro || formation</Text>
         </VStack>

         <VStack border="1px solid">
            <Avatar />
            <Heading>
               {prenom} {nom}
            </Heading>
            <Tag>Roles</Tag>
            <Text>Experience pro || formation</Text>
         </VStack>
      </SimpleGrid>
   );
}
