import { Avatar, Badge, Flex, Heading, Tag, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { bgColor } from '../../themes/constants/bgColor';
import { UserDetails } from '../Profil/UserDetails';
import { UsersGrid } from './DisplayUserGrid';

export interface UserCardProps {
   user: UsersGrid | UserDetails;
   borderCard?: boolean;
   nomPrenomSize?: string | {};
   rolesSize?: string | {};
   formationsSize?: string | {};
   experienceProSize?: string | {};
}

export function UserCard({
   user,
   borderCard = true,
   nomPrenomSize = 'md',
   rolesSize = 'sm',
   formationsSize = 'xs',
   experienceProSize = 'md',
}: UserCardProps) {
   const { id, nom, prenom, profilPictureName, roles, mentor, formations, experiencePro } = user;
   // Trie annee -> 2022,2021,2020
   if (formations) formations.sort((a, b) => a.anneeObtention - b.anneeObtention);

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
         h="100%"
         py={7}
         px={3}
         spacing={4}
         border={borderCard ? '2px solid' : ''}
         borderRadius="md"
         borderColor={bdColor}
         bg={bgCard}
         pos="relative"
         // onClick={() => navigate(`/profil/${id}`)}
         // _hover={{ cursor: 'pointer' }}
      >
         {mentor && (
            <Badge variant="outline" pos="absolute" top="5" right="5" colorScheme="orange" borderRadius="md">
               Mentor
            </Badge>
         )}

         <Avatar size="xl" src="./src/assets/img/bg0.jpg" />

         <Heading size={nomPrenomSize} textAlign="center">
            {`${prenom} ${nom}`}
         </Heading>

         <Flex justify="center" wrap="wrap" gap={2}>
            {roles.map((el) => (
               <Tag key={el} size={rolesSize}>
                  {el}
               </Tag>
            ))}
         </Flex>

         {formations && formations.length >= 1 && (
            <Text fontSize={formationsSize}>{`${formations[0].nomFormation} (${formations[0].anneeObtention})`}</Text>
         )}

         {experiencePro && experiencePro.length >= 1 && (
            <VStack spacing={0}>
               <Text fontWeight="bold" fontSize={experienceProSize}>{`${experiencePro[0].fonction}`}</Text>
               <Text fontSize={experienceProSize}>{`${experiencePro[0].entreprise}`}</Text>
            </VStack>
         )}
      </VStack>
   );
}
