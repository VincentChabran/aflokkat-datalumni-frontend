import { Box, Button, Flex } from '@chakra-ui/react';
import { UserCard } from '../Annuaire/UserCard';

export interface UserDetails {
   id: number;
   nom: string;
   prenom: string;
   email: string;
   profilPictureName: string | null;
   roles: string[];
   mentor: boolean;
   rechercheEmploi: boolean;
   telephone: string | null;
   dateDeNaissance: Date | null;
   experiencePro:
      | {
           fonction: string;
           entreprise: string;
           dateDebut: Date;
           dateFin: string;
           description: string | null;
        }[]
      | null;
   formations:
      | {
           nomFormation: string;
           typeDiplome: string;
           nomEtablissement: string;
           obtention: string;
           anneeObtention: number;
           domaineActivite: string;
           description: string | null;
        }[]
      | null;
}

export interface UserDetailsProps {
   user: UserDetails;
}

export function UserDetails({ user }: UserDetailsProps) {
   const { prenom, nom, mentor, roles, formations, experiencePro } = user;
   console.log(user);

   return (
      <Box gap={10}>
         <Flex wrap="wrap">
            <UserCard
               user={user}
               nomPrenomSize="xl"
               rolesSize={{ base: 'sm', md: 'md' }}
               formationsSize="md"
               experienceProSize="lg"
               borderCard={false}
            />

            <Flex m="auto" justify="center" align="center">
               <Button variant="outline" colorScheme="red">
                  Modifier
               </Button>
            </Flex>
         </Flex>
      </Box>
   );
}

{
   /* <Box>
            <HStack>
               <Heading size="xl">{`${prenom} ${nom}`}</Heading>

               {mentor && <Badge variant="outline">Mentor</Badge>}
            </HStack>

            <Flex gap={3} wrap="wrap">
               {roles.map((el) => (
                  <Tag key={el}>{el}</Tag>
               ))}
            </Flex>
         </Box>

         <Avatar size="2xl" />

         {formations && formations.length >= 1 && (
            <Text fontSize="sm">{`${formations[0].nomFormation} (${formations[0].anneeObtention})`}</Text>
         )}

         {experiencePro && experiencePro.length >= 1 && (
            <VStack spacing={0}>
               <Text fontWeight="bold">{`${experiencePro[0].fonction}`}</Text>
               <Text>{`${experiencePro[0].entreprise}`}</Text>
            </VStack>
         )} */
}
