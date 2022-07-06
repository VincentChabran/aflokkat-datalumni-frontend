import { Box, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'urql';
import { UserDetails } from '../components/Profil/UserDetails/UserDetails';
import { UserExperiencePro } from '../components/Profil/UserExperiencePro/UserExperiencePro';
import { UserFormations } from '../components/Profil/UserFormation/UserFormations';
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
   dateDeNaissance: string;
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
         setUser(data?.user);
      }

      console.log(data);
      console.log(error);
   }, [fetching]);

   useEffect(() => {
      if (user?.id != parseInt(userId || '0')) reExeSpecifiqueUserQuery({ requestPolicy: 'network-only' });
   }, [userId]);

   const bgBox = bgColor();

   return (
      <>
         {fetching ? (
            <Spinner />
         ) : (
            user && (
               <Box p={{ base: 3, sm: 9 }} px={{ base: 3, lg: 20 }}>
                  <Box p={{ base: 3, sm: 8 }} px={{ base: 3, lg: 16 }} bgColor={bgBox} borderRadius="lg">
                     <UserDetails user={user} setUser={setUser} />

                     <UserExperiencePro user={user} reExeSpecifiqueUserQuery={reExeSpecifiqueUserQuery} />

                     <UserFormations user={user} reExeSpecifiqueUserQuery={reExeSpecifiqueUserQuery} />
                  </Box>
               </Box>
            )
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
