import { DeleteIcon, EmailIcon } from '@chakra-ui/icons';
import {
   Box,
   Button,
   Heading,
   HStack,
   Image,
   ListItem,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   SimpleGrid,
   Text,
   UnorderedList,
   useColorModeValue,
   VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../../store/useUserStore';
import { formatDateDdMmYyyy } from '../../../../tools/functions/formatDateDdMmYyyy';
import { OffreGrid } from '../DisplayOffreGrid';
import { DeleteOffreEmploi } from './DeleteOffreEmploi';
import { PostulerOffreEmploi } from './PostulerOffreEmploi';
import { UpdateOffreEmploi } from './UpdateOffreEmploi';

export interface OffreDetailProps {
   isOpen: boolean;
   onClose: () => void;
   offre: OffreGrid;
}

export function OffreDetail({ isOpen, onClose, offre }: OffreDetailProps) {
   const {
      nomDuPoste,
      nomEntreprise,
      ville,
      pathLogo,
      dateCreation,
      dateDebut,
      dateLimiteCandidature,
      experienceSouhaitee,
      domaineActivite,
      typeContrat,
      emailContact,
      remuneration,
      pathLienCandidature,
      userCreateurId,
      userCreateur,
      descriptionEntreprise,
      descriptionPoste,
      descriptionProfilCandidat,
   } = offre;

   const description = [
      { title: 'Détail entreprise', value: descriptionEntreprise },
      { title: 'Détail poste', value: descriptionPoste },
      { title: 'Profil du candidat', value: descriptionProfilCandidat },
   ];

   const displayLeftSide = [
      { value: domaineActivite.slice(3), label: 'Secteur:' },
      { value: typeContrat.slice(3), label: 'Type de contrat:' },
      { value: experienceSouhaitee.slice(3), label: 'Expérience souhaitée:' },
      { value: remuneration, label: 'Rémunération(brut annuel):' },
      { value: emailContact, label: 'Contact:' },
   ];

   const [display, setDisplay] = useState('infos');

   const { idUserStore, rolesUserStore } = useUserStore();

   const navigate = useNavigate();

   const bgImpair = useColorModeValue('gray.100', 'blackAlpha.300');
   const bgPair = useColorModeValue('gray.300', 'blackAlpha.400');

   return (
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
         <ModalOverlay />
         <ModalContent>
            {display === 'infos' && (
               <>
                  <ModalHeader textAlign="center" fontWeight="normal" pos="relative">
                     <Image
                        borderRadius="none"
                        src="./src/assets/img/konoha.jpg"
                        maxW="100px"
                        maxH="100px"
                        m="auto"
                        pos={{ base: 'relative', sm: 'absolute' }}
                     />

                     <VStack>
                        <Heading p="0" pt="2">
                           {nomDuPoste}
                        </Heading>
                        <Text fontSize="lg">{`${nomEntreprise} - ${ville}`}</Text>
                     </VStack>
                  </ModalHeader>
                  <ModalCloseButton top="4" />

                  <ModalBody fontSize={{ base: 'xs', sm: 'sm', md: 'md' }} color="orange.400" p={{ base: '2', sm: '2' }}>
                     <SimpleGrid
                        columns={{ base: 1, sm: 2 }}
                        maxW="680px"
                        m="auto"
                        py="8"
                        pl={{ base: '2', sm: '3' }}
                        bg={bgImpair}
                        borderTopRadius="md"
                     >
                        <VStack align="start">
                           <UnorderedList pl="0">
                              {displayLeftSide.map((el) => (
                                 <ListItem key={el.label}>
                                    {el.label + ' '}
                                    <Text as="span" sx={cssSpan()}>
                                       {el.value + '.'}
                                    </Text>
                                 </ListItem>
                              ))}
                           </UnorderedList>
                        </VStack>

                        <VStack align="start">
                           <UnorderedList pl="1">
                              <ListItem>
                                 Date de début{' '}
                                 <Text as="span" sx={cssSpan()}>
                                    {formatDateDdMmYyyy(dateDebut) + '.'}
                                 </Text>
                              </ListItem>
                              <ListItem>
                                 Fin des candidatures{' '}
                                 <Text as="span" sx={cssSpan()}>
                                    {formatDateDdMmYyyy(dateLimiteCandidature) + '.'}
                                 </Text>
                              </ListItem>

                              <ListItem>
                                 Lien de candidature{' '}
                                 <Text as="span" sx={cssSpan()}>
                                    {pathLienCandidature + '.'}
                                 </Text>
                              </ListItem>

                              <ListItem>
                                 Auteur{' '}
                                 <Text
                                    as="span"
                                    sx={cssSpan()}
                                    onClick={() => navigate(`/profil/${userCreateurId}`)}
                                    _hover={{ cursor: 'pointer' }}
                                 >
                                    {`${userCreateur.prenom} ${userCreateur.nom}`}
                                 </Text>
                              </ListItem>
                              <ListItem>
                                 Publier le{' '}
                                 <Text as="span" sx={cssSpan()}>
                                    {formatDateDdMmYyyy(dateCreation) + '.'}
                                 </Text>
                              </ListItem>
                           </UnorderedList>
                        </VStack>
                     </SimpleGrid>

                     <VStack maxW="680px" m="auto" spacing={0}>
                        {description.map((el, i) => (
                           <Box key={el.title} bg={i % 2 == 0 ? bgPair : bgImpair} py="14" px="4" w="100%">
                              <Heading size="md" color={useColorModeValue('orange.500', 'orange.300')} p="0">
                                 {el.title}
                              </Heading>
                              <Text
                                 pt="6"
                                 m="auto"
                                 maxW="650px"
                                 fontSize="sm"
                                 color={useColorModeValue('orange.400', 'orange.300')}
                              >
                                 {el.value}
                              </Text>
                           </Box>
                        ))}

                        {/* <Box bg={bgImpair} py="14" px="4" w="100%">
                           <Heading size="md" color="orange.300">
                              Description du poste
                           </Heading>
                           <pre>
                              <Text
                                 pt="6"
                                 m="auto"
                                 maxW="650"
                                 fontSize="sm"
                                 color={useColorModeValue('orange.500', 'orange.200')}
                              >
                              </Text>
                           </pre>
                        </Box> */}
                     </VStack>
                  </ModalBody>

                  <ModalFooter justifyContent={'center'}>
                     <HStack>
                        <Button
                           size={{ base: 'xs', sm: 'sm' }}
                           colorScheme="green"
                           leftIcon={<EmailIcon />}
                           onClick={() => setDisplay('postuler')}
                        >
                           Postuler
                        </Button>

                        {(userCreateurId === idUserStore || rolesUserStore.includes('Admin')) && (
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
                                 onClick={() => setDisplay('delete')}
                                 size={{ base: 'xs', sm: 'sm' }}
                              >
                                 Suprimer
                              </Button>
                           </>
                        )}
                     </HStack>
                  </ModalFooter>
               </>
            )}

            {display === 'postuler' && (
               <PostulerOffreEmploi
                  setDisplay={setDisplay}
                  onClose={onClose}
                  nomDuPoste={nomDuPoste}
                  emailContact={emailContact}
               />
            )}

            {display === 'update' && <UpdateOffreEmploi offre={offre} setDisplay={setDisplay} />}

            {display === 'delete' && (
               <DeleteOffreEmploi isOpen={isOpen} setDisplay={setDisplay} offreId={offre.id} onClose={onClose} />
            )}
         </ModalContent>
      </Modal>
   );
}

const cssSpan = () => ({
   fontWeight: 'semibold',
   color: useColorModeValue('orange.500', 'orange.300'),
});
