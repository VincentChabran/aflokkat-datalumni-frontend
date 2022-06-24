import { Box, Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'urql';
import { UserDetails } from '../components/Profil/UserDetails';
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

export interface ProfilProps {}

export function Profil(props: ProfilProps) {
   const { userId } = useParams();

   const [{ data, fetching, error }, reExeSpecifiqueUserQuery] = useQuery({
      query: specifiqueUserQuery,
      variables: { userId: parseInt(userId || '0') },
   });

   const bgBox = bgColor();

   return (
      <>
         {fetching ? (
            <Spinner />
         ) : (
            <Box p={10}>
               <Box p={14} bgColor={bgBox} borderRadius="lg">
                  <UserDetails dataUser={data.user} />
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
       fonction
       entreprise
       dateDebut
       dateFin
       description
     }
     formations {
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
