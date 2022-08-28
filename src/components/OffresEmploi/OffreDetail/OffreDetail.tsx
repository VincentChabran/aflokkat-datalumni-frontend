import { DeleteIcon, EmailIcon } from '@chakra-ui/icons';
import {
   Box,
   Button,
   Heading,
   HStack,
   Image,
   ListItem,
   Modal,
   ModalContent,
   ModalOverlay,
   SimpleGrid,
   Text,
   UnorderedList,
   useColorModeValue,
   useDisclosure,
   VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'urql';
import { useUserStore } from '../../../store/useUserStore';
import { bgColor } from '../../../themes/constants/bgColor';
import { formatDateDdMmYyyy } from '../../../tools/functions/formatDateDdMmYyyy';
import { OffreGrid } from '../DisplayOffreGrid';
import parse from 'html-react-parser';
import { BsFillPencilFill } from 'react-icons/bs';
import { UpdateOffre } from '../UpdateOffre';
import { pathDomaineName, pathOffreLogo } from '../../../utils/pathBackEnd';
import { DeleteOffreEmploi } from './DeleteOffreEmploi';
import { PostulerOffreEmploi } from './PostulerOffreEmploi';
import { SkeletonOffreDetail } from '../../Skeleton/OffreEmploi/SkeletonOffreDetail';
import { NotFound } from '../../global/Error/NotFound';

export interface OffreDetailProps {}

export function OffreDetail(props: OffreDetailProps) {
   const { offreId } = useParams();
   const navigate = useNavigate();
   const { isOpen, onOpen, onClose } = useDisclosure();

   const { idUserStore, rolesUserStore } = useUserStore();

   const [display, setDisplay] = useState('detail');
   const [modalDisplay, setModalDisplay] = useState('');

   const [offre, setOffre] = useState<OffreGrid>();

   const [{ data, fetching, error }] = useQuery({
      query: offreEmploiQuery,
      variables: { offreEmploiId: parseInt(offreId ?? '') },
   });

   useEffect(() => {
      if (!fetching && data) setOffre(data.offreEmploi);
   }, [fetching]);

   // Color
   const bgBox = bgColor();
   const bgImpair = useColorModeValue('gray.100', 'blackAlpha.300');
   const bgPair = useColorModeValue('gray.300', 'blackAlpha.400');

   const spanColor = useColorModeValue('orange.500', 'orange.300');
   const descriptionColor = useColorModeValue('orange.400', 'orange.300');

   const sizeGridText = ['xs', 'xs', 'xs', 'sm'];

   return (
      <>
         {fetching ? (
            <SkeletonOffreDetail />
         ) : !offre ? (
            <NotFound texte="L'offre que vous cherchez n'existe pas." />
         ) : (
            <Box bgColor={bgBox} borderRadius="lg" mx={{ base: 0, sm: 2, md: 10 }} my={8} p={{ base: 0, sm: 0, md: 8 }}>
               {display === 'detail' && (
                  <>
                     {/* Header de l'offre */}
                     <Box mb={2}>
                        <Image
                           borderRadius="none"
                           src={
                              offre?.pathLogo
                                 ? `${pathDomaineName}/${pathOffreLogo}/${offre?.pathLogo}`
                                 : `${pathDomaineName}/${pathOffreLogo}/default.jpg`
                           }
                           maxW="100px"
                           maxH="100px"
                           m="auto"
                           pos={{ base: 'relative', sm: 'absolute' }}
                        />

                        <VStack>
                           <Heading p="0" pt="2">
                              {offre?.nomDuPoste}
                           </Heading>
                           <Text fontSize={['md', 'md', 'md', 'lg']}>{`${offre.nomEntreprise} - ${offre?.ville}`}</Text>
                        </VStack>
                     </Box>

                     {/*  */}
                     {/* Liste des Infos, parti haute */}
                     <SimpleGrid
                        columns={{ base: 1, sm: 2 }}
                        maxW="850px"
                        m="auto"
                        py="8"
                        pl={{ base: 1, sm: 0, md: 2 }}
                        bg={bgImpair}
                        borderTopRadius="md"
                        overflow="hidden"
                     >
                        {/* Gauche */}
                        <VStack align="center">
                           <UnorderedList pl="0">
                              {[
                                 { value: offre?.domaineActivite.slice(3), label: 'Secteur:' },
                                 { value: offre?.typeContrat.slice(3), label: 'Type de contrat:' },
                                 { value: offre?.experienceSouhaitee.slice(3), label: 'Expérience souhaitée:' },
                                 { value: offre?.remuneration, label: 'Rémunération(brut annuel):' },
                                 { value: offre?.emailContact, label: 'Contact:' },
                              ].map((el) => (
                                 <ListItem key={el.label} fontSize={sizeGridText}>
                                    {el.label + ' '}
                                    <Text as="span" fontWeight="semibold" color={spanColor} fontSize={sizeGridText}>
                                       {el.value + '.'}
                                    </Text>
                                 </ListItem>
                              ))}
                           </UnorderedList>
                        </VStack>
                        {/*  */}

                        {/* Droite */}
                        <VStack align="center">
                           <UnorderedList pl="0">
                              {[
                                 { value: formatDateDdMmYyyy(offre?.dateDebut), label: ' Date de début:' },
                                 {
                                    value: formatDateDdMmYyyy(offre?.dateLimiteCandidature),
                                    label: ' Fin des candidatures',
                                 },
                                 { value: offre?.pathLienCandidature, label: 'Lien de candidature:' },
                                 { value: formatDateDdMmYyyy(offre?.dateCreation), label: ' Publier le' },
                              ].map((el) => (
                                 <ListItem key={el.label} fontSize={sizeGridText}>
                                    {el.label + ' '}
                                    <Text as="span" fontWeight="semibold" color={spanColor} fontSize={sizeGridText}>
                                       {el.value + '.'}
                                    </Text>
                                 </ListItem>
                              ))}

                              <ListItem fontSize={sizeGridText}>
                                 Auteur{' '}
                                 <Text
                                    as="span"
                                    fontWeight="semibold"
                                    fontSize={sizeGridText}
                                    color={spanColor}
                                    onClick={() => navigate(`/profil/${offre?.userCreateurId}`)}
                                    _hover={{ cursor: 'pointer' }}
                                 >
                                    {`${offre?.userCreateur.prenom} ${offre?.userCreateur.nom}`}
                                 </Text>
                              </ListItem>
                           </UnorderedList>
                        </VStack>
                        {/*  */}
                     </SimpleGrid>

                     {/* Description (entreprise, poste, candidat) */}
                     {[
                        { title: 'Détail entreprise', value: parse(offre?.descriptionEntreprise) },
                        { title: 'Détail poste', value: parse(offre?.descriptionPoste) },
                        { title: 'Profil du candidat', value: parse(offre?.descriptionProfilCandidat) },
                     ].map((el, i) => (
                        <Box
                           key={el.title}
                           bg={i % 2 == 0 ? bgPair : bgImpair}
                           py="14"
                           px={{ base: '2', md: 4 }}
                           w="100%"
                           maxW="850px"
                           m="auto"
                        >
                           <Heading size="md" color={descriptionColor} p="0">
                              {el.title}
                           </Heading>
                           <Box pt="6" m="auto" maxW="750px" fontSize="sm">
                              {el.value}
                           </Box>
                        </Box>
                     ))}

                     {/* Button */}
                     <HStack justify="center" mt={6}>
                        <Button
                           size={{ base: 'xs', sm: 'sm' }}
                           colorScheme="green"
                           leftIcon={<EmailIcon />}
                           onClick={() => {
                              onOpen();
                              setModalDisplay('postuler');
                           }}
                        >
                           Postuler
                        </Button>

                        {(offre?.userCreateurId === idUserStore || rolesUserStore.includes('Admin')) && (
                           <>
                              <Button
                                 leftIcon={<BsFillPencilFill />}
                                 colorScheme="purple"
                                 onClick={() => setDisplay('update')}
                                 size={{ base: 'xs', sm: 'sm' }}
                              >
                                 Modifier
                              </Button>

                              <Button
                                 colorScheme="red"
                                 leftIcon={<DeleteIcon />}
                                 onClick={() => {
                                    onOpen();
                                    setModalDisplay('delete');
                                 }}
                                 size={{ base: 'xs', sm: 'sm' }}
                              >
                                 Suprimer
                              </Button>
                           </>
                        )}
                     </HStack>
                  </>
               )}

               {display === 'update' && <UpdateOffre offre={offre} setOffre={setOffre} setDisplay={setDisplay} />}

               {/*  */}
               {/* Modal en fonction de l'état (postuler ou delete)*/}
               <Modal isOpen={isOpen} onClose={onClose} size="3xl">
                  <ModalOverlay />
                  <ModalContent>
                     {modalDisplay === 'postuler' && (
                        <PostulerOffreEmploi
                           onClose={onClose}
                           nomDuPoste={offre?.nomDuPoste}
                           emailContact={offre?.emailContact}
                        />
                     )}

                     {modalDisplay === 'delete' && <DeleteOffreEmploi isOpen={isOpen} offreId={offre.id} onClose={onClose} />}
                  </ModalContent>
               </Modal>
            </Box>
         )}
      </>
   );
}

const offreEmploiQuery = `
query Query($offreEmploiId: Int!) {
   offreEmploi(id: $offreEmploiId) {
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

const cssSpan = () => ({
   fontWeight: 'semibold',
   color: useColorModeValue('orange.500', 'orange.300'),
});
