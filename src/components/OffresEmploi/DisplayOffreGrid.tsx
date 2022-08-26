import { Box, SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useQuery } from 'urql';
import { useOffresEmploiDisplayStore } from '../../store/useOffresEmploiDisplayStore';
import { NotFound } from '../global/Error/NotFound';
import { ServeurError } from '../global/Error/ServeurError';
import { SkeletonOffreEmploi } from '../Skeleton/OffreEmploi/SkeletonOffreEmploi';
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
   accueil?: boolean;
}

export function DisplayOffreGrid({ accueil = false }: DisplayOffreGridProps) {
   const [{ data, fetching, error }] = useQuery({ query: offreEmploisQuery });

   const { offres, setOffres, displayOffres, setDisplayOffres } = useOffresEmploiDisplayStore();

   useEffect(() => {
      // le !offres c'est pour pas mètre réinitialiser la liste après les creates or delete
      if (!fetching && !error && data && !offres) {
         setOffres(data?.offreEmploiAll);
         setDisplayOffres();
      }
   }, [fetching]);

   return (
      <>
         {fetching ? (
            <SkeletonOffreEmploi />
         ) : // Si la length du tab renvoyer par le filtre plus petite que 0 on affichie la aucun res sinon on affiche la grille
         !fetching && (displayOffres ? displayOffres.length <= 0 : !displayOffres) ? (
            <>
               {data ? (
                  <NotFound texte="Aucune offre ne correspond à cette recherche, veuillez réessayer" />
               ) : (
                  <ServeurError />
               )}
            </>
         ) : (
            <SimpleGrid columns={[1, 1, 2, 2, 3]} spacing={4} mx={{ base: 4, lg: 5, xl: 10 }}>
               {displayOffres
                  ?.sort((a: any, b: any) => {
                     return !accueil
                        ? new Date(a.dateLimiteCandidature).getTime() - new Date(b.dateLimiteCandidature).getTime()
                        : new Date(a.dateCreation).getTime() - new Date(b.dateCreation).getTime();
                  })
                  .slice(!accueil ? undefined : -3)
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
