import { Box, SimpleGrid } from '@chakra-ui/react';
import { useQuery } from 'urql';
import { SkeletonOffreEmploi } from '../Skeleton/SkeletonOffreEmploi';
import { OffreCard } from './OffreCard';

export interface OffreGrid {
   id: number;
   nomDuPoste: string;
   nomEntreprise: string;
   dateCreation: Date;
   ville: string;
   typeContrat: string;
   domaineActivite: string;
   descriptionEntreprise: string;
   descriptionPoste: string;
   descriptionProfilCandidat: string;
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

export interface DisplayOffreGridProps {
   search?: string;
   accueil?: boolean;
}

export function DisplayOffreGrid({ search = '', accueil = false }: DisplayOffreGridProps) {
   const [{ data, fetching, error }] = useQuery({ query: offreEmploisQuery });

   return (
      <>
         {fetching ? (
            <SkeletonOffreEmploi />
         ) : // Si la length du tab renvoyer par le filtre plus petite que 0 on affichie la aucun res sinon on affiche la grille
         data?.offreEmploiAll?.filter((el: OffreGrid) => el.domaineActivite.toLocaleLowerCase().includes(search)).length <=
           0 ? (
            <Box>TODO Aucun résultat</Box>
         ) : (
            <SimpleGrid columns={[1, 1, 2, 2, 3]} spacing={4} mx={{ base: 4, lg: 5, xl: 10 }}>
               {data?.offreEmploiAll
                  .filter((el: OffreGrid) => el.domaineActivite.toLocaleLowerCase().includes(search))
                  .sort((a: any, b: any) => {
                     return !accueil
                        ? new Date(a.dateLimiteCandidature).getTime() - new Date(b.dateLimiteCandidature).getTime()
                        : new Date(a.dateCreation).getTime() - new Date(b.dateCreation).getTime();
                  })
                  .slice(!accueil ? null : 3)
                  .map((offre: OffreGrid) => (
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
     descriptionEntreprise
     descriptionPoste
     descriptionProfilCandidat
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
