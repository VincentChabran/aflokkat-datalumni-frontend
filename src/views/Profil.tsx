import { Box, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'urql';
import { UserDetails } from '../components/Profil/UserDetails';
import { bgColor } from '../themes/constants/bgColor';

export interface ProfilProps {}

export function Profil(props: ProfilProps) {
   const { userId } = useParams();

   const [{ data, fetching, error }, reExeSpecifiqueUserQuery] = useQuery({
      query: specifiqueUserQuery,
      variables: { userId: parseInt(userId || '0') },
   });

   useEffect(() => {}, [fetching]);

   return (
      <>
         {fetching ? (
            <Spinner />
         ) : (
            <Box p={10}>
               <Box p={14} bgColor={bgColor()} borderRadius="lg">
                  <UserDetails user={data.user} />
               </Box>
            </Box>
         )}
      </>
   );
}

const specifiqueUserQuery = `
query Query($userId: Int!) {
   user(id: $userId) {
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
