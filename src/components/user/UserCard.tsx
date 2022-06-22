import { Avatar, Badge, Flex, Heading, Tag, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { bgColor } from '../../themes/constants/bgColor';
import { User } from './DisplayUserGrid';

export interface UserCardProps {
   user: User;
}

export function UserCard({ user }: UserCardProps) {
   const { id, nom, prenom, profilPictureName, roles, mentor, formations, experiencePro } = user;
   // Trie annee -> 2022,2021,2020
   if (formations[0]) formations.sort((a, b) => a.anneeObtention - b.anneeObtention);

   const navigate = useNavigate();

   const bgCard = bgColor();
   const bdColor = roles.includes('admin')
      ? 'orange'
      : roles.includes('equipeadministrative')
      ? 'purple.400'
      : roles.includes('recruteur')
      ? 'cyan'
      : roles.includes('enseignant')
      ? 'teal'
      : 'green.600';

   return (
      <VStack
         border="2px solid"
         py={7}
         px={3}
         spacing={4}
         borderRadius="md"
         bg={bgCard}
         borderColor={bdColor}
         pos="relative"
         onClick={() => navigate(`/profil/${id}`)}
         _hover={{ cursor: 'pointer' }}
      >
         {mentor && (
            <Badge variant="outline" pos="absolute" top="5" right="5" colorScheme="orange" borderRadius="md">
               Mentor
            </Badge>
         )}

         <Avatar size="xl" src="./src/assets/img/bg0.jpg" />

         <Heading size="md" textAlign="center">
            {`${prenom} ${nom}`}
         </Heading>

         <Flex justify="center" wrap="wrap" gap={2}>
            {roles.map((el) => (
               <Tag key={el} size="sm">
                  {el}
               </Tag>
            ))}
         </Flex>

         {formations[0] && <Text fontSize="xs">{`${formations[0].nomFormation} (${formations[0].anneeObtention})`}</Text>}

         {experiencePro[0] && (
            <VStack spacing={0}>
               <Text fontWeight="bold">{`${experiencePro[0].fonction}`}</Text>
               <Text>{`${experiencePro[0].entreprise}`}</Text>
            </VStack>
         )}
      </VStack>
   );
}
