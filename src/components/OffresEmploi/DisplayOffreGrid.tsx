import { Box, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'urql';
import { OffreCard } from './OffreCard';

export interface OffreGrid {
   id: number;
   nomDuPoste: string;
   nomEntreprise: string;
   dateCreation: Date;
   ville: string;
   typeContrat: string;
   domaineActivite: string;
   description: string;
   active: boolean;
   experienceSouhaitee: string;
   remuneration: string;
   emailContact: string;
   pathLienCandidature: string;
   dateDebut: Date;
   dateLimiteCandidature: Date;
   pathLogo: string;
   pathPieceJointe: string;
   userCreateurId: number;
   userCreateur: {
      nom: string;
      prenom: string;
   };
}
export interface DisplayOffreGridProps {}

export function DisplayOffreGrid(props: DisplayOffreGridProps) {
   // const { setUsers, displayUsers, setDisplayUsers } = useSelectUserDisplayStore();

   const navigate = useNavigate();

   const [{ data, fetching, error }] = useQuery({ query: offreEmploisQuery });

   return (
      <>
         {fetching ? (
            <Spinner />
         ) : (
            <SimpleGrid columns={[1, 1, 2, 2, 3]} spacing={4} mx={{ base: 4, lg: 5, xl: 10 }}>
               {data.offreEmploiAll.map((offre: OffreGrid) => (
                  <Box key={offre.id}>
                     <OffreCard offre={offre} />
                  </Box>
               ))}
            </SimpleGrid>
         )}
      </>
   );
}

const offreEmploisQuery = `
query Query {
   offreEmploiAll {
     id
     nomDuPoste
     nomEntreprise
     ville
     typeContrat
     dateCreation
     domaineActivite
     description
     active
     experienceSouhaitee
     remuneration
     emailContact
     pathLienCandidature
     dateDebut
     dateLimiteCandidature
     pathLogo
     pathPieceJointe
     userCreateurId
     userCreateur {
      nom
      prenom
    }
   }
 }
`;
