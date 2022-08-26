import { Badge, Flex, Heading, Image, Tag, Text, VStack } from '@chakra-ui/react';
import { pathDomaineName, pathProfilImg } from '../../../utils/pathBackEnd';
import { UserSpecifique } from '../../../views/Profil';
import { UsersGrid } from '../../Annuaire/DisplayUserGrid';

export interface UserCardDetailProps {
   user: UsersGrid | UserSpecifique;
}

export function UserCardDetail({ user }: UserCardDetailProps) {
   const { id, nom, prenom, profilPictureName, roles, mentor, formations, experiencePro } = user;

   return (
      <Flex flexDir={{ base: 'column', md: 'row' }}>
         <Image
            objectFit="cover"
            w="200px"
            h="200px"
            src={profilPictureName ? `${pathDomaineName}/${pathProfilImg}/${profilPictureName}` : ''}
         />

         <VStack ml="2" align="start" spacing={4}>
            {/* Nom Prenom Mentor */}
            <Flex align="center" gap="4">
               <Heading as={'h3'} size="md" textAlign="center" py="2">
                  {`${prenom} ${nom}`}
               </Heading>

               {mentor && (
                  <Badge variant="outline" colorScheme="orange" borderRadius="md">
                     Mentor
                  </Badge>
               )}
            </Flex>

            {/* Roles */}
            <Flex wrap="wrap" gap={2}>
               {roles.map((el) => (
                  <Tag key={el} size={{ base: 'xs', sm: 'xs' }}>
                     {el}
                  </Tag>
               ))}
            </Flex>

            {/* Formations exp pro */}
            {formations && formations.length >= 1 && (
               <Text fontSize="xs">{`${formations[0].nomFormation} (${formations[0].anneeObtention})`}</Text>
            )}

            {experiencePro && experiencePro.length >= 1 && (
               <VStack spacing={0} align="start">
                  <Text fontWeight="bold" fontSize="md">{`${experiencePro[0].fonction}`}</Text>
                  <Text fontSize="md">{`${experiencePro[0].entreprise}`}</Text>
               </VStack>
            )}
         </VStack>
      </Flex>
   );
}
