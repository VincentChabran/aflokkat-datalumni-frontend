import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'urql';
import { NotFound } from '../components/global/Error/NotFound';
import { ServeurError } from '../components/global/Error/ServeurError';
import { UserDetails } from '../components/Profil/UserDetails/UserDetails';
import { UserExperiencePro } from '../components/Profil/UserExperiencePro/UserExperiencePro';
import { UserFormations } from '../components/Profil/UserFormation/UserFormations';
import { SkeletonProfil } from '../components/Skeleton/SkeletonProfil';
import { bgColor } from '../themes/constants/bgColor';

export interface UserSpecifique {
   id: number;
   nom: string;
   prenom: string;
   email: string;
   profilPictureName: string | null;
   roles: string[];
   mentor: boolean;
   rechercheEmploi: boolean;
   telephone: string | null;
   dateDeNaissance: string | null;
   experiencePro:
      | {
           id: number;
           fonction: string;
           entreprise: string;
           dateDebut: string;
           dateFin: string;
           description: string | null;
        }[]
      | null;
   formations:
      | {
           id: number;
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

export interface ProfilProps {}

export function Profil(props: ProfilProps) {
   const { userId } = useParams();

   const [{ data, fetching, error }, reExeSpecifiqueUserQuery] = useQuery({
      query: specifiqueUserQuery,
      variables: { userId: parseInt(userId || '0') },
   });

   const [user, setUser] = useState<UserSpecifique | undefined>(undefined);

   useEffect(() => {
      if (!fetching) {
         // Pour trier dans l'ordre id = 1 -> id > 1
         data?.user?.formations?.sort((a: any, b: any) => a.id - b.id);
         data?.user?.experiencePro?.sort((a: any, b: any) => a.id - b.id);
         setUser(data?.user);
      }
      // console.log(error?.message);
   }, [fetching]);

   useEffect(() => {
      if (user?.id != parseInt(userId || '0')) reExeSpecifiqueUserQuery({ requestPolicy: 'network-only' });
   }, [userId]);

   const bgBox = bgColor();

   return (
      <>
         {fetching ? (
            <SkeletonProfil />
         ) : !user ? (
            <>
               {error?.message.includes(`[GraphQL] Could not find any entity of type "User" matching:`) ? (
                  <NotFound texte="Cet utilisateur n'existe pas" />
               ) : (
                  <ServeurError />
               )}
            </>
         ) : (
            <Box p={{ base: 3, sm: 6 }} px={{ base: 0, lg: 12 }}>
               <Box p={{ base: 3, sm: 6 }} px={{ base: 1, lg: 10 }} bgColor={bgBox} borderRadius="lg">
                  <UserDetails user={user} setUser={setUser} />

                  <UserExperiencePro user={user} reExeSpecifiqueUserQuery={reExeSpecifiqueUserQuery} />

                  <UserFormations user={user} reExeSpecifiqueUserQuery={reExeSpecifiqueUserQuery} />
               </Box>
            </Box>
         )}
      </>
   );
}

const specifiqueUserQuery = `
query Query($userId: Int!) {
   user(id: $userId) {
     id
     profilPictureName
     nom
     prenom
     mentor
     roles
     email
     rechercheEmploi
     telephone
     dateDeNaissance
     experiencePro {
       id
       fonction
       entreprise
       dateDebut
       dateFin
       description
     }
     formations {
       id
       nomFormation
       typeDiplome
       nomEtablissement
       obtention
       anneeObtention
       domaineActivite
       description
     }
   }
 }
`;
