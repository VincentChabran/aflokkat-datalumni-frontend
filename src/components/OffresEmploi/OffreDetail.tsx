import { CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import {
   Box,
   Button,
   Heading,
   HStack,
   Image,
   List,
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
import { formatDateDdMmYyyy } from '../../tools/functions/formatDateDdMmYyyy';
import { OffreGrid } from './DisplayOffreGrid';
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
      description,
   } = offre;

   const displayLeftSide = [
      { value: domaineActivite, label: 'Secteur:' },
      { value: typeContrat.slice(3), label: 'Type de contrat:' },
      { value: experienceSouhaitee.slice(3), label: 'Expérience souhaitée:' },
      { value: remuneration, label: 'Rémunération:' },
      { value: emailContact, label: 'Contact:' },
   ];

   const [display, setDisplay] = useState('infos');

   const navigate = useNavigate();

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
                        <Heading pt="2">{nomDuPoste}</Heading>
                        <Text fontSize="lg">{`${nomEntreprise} - ${ville}`}</Text>
                     </VStack>
                  </ModalHeader>
                  <ModalCloseButton top="4" />

                  <ModalBody fontSize={{ base: 'xs', sm: 'sm', md: 'md' }} color="orange.400" p={{ base: '2', sm: '4' }}>
                     <SimpleGrid
                        columns={{ base: 1, sm: 2 }}
                        maxW="650px"
                        m="auto"
                        py="4"
                        pl={{ base: '2', sm: '3' }}
                        bg={useColorModeValue('gray.100', 'blackAlpha.300')}
                        borderRadius="sm"
                     >
                        <VStack align="start">
                           <UnorderedList>
                              {displayLeftSide.map((el) => (
                                 <ListItem key={el.label}>
                                    {el.label + ' '}
                                    <Text as="span" sx={cssSpan()}>
                                       {/* {el.value === 'Débutant accepté' && <br />} */}
                                       {el.value + '.'}
                                    </Text>
                                 </ListItem>
                              ))}
                           </UnorderedList>
                        </VStack>

                        <VStack align="start">
                           <UnorderedList>
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

                     <Text pt="6" m="auto" textAlign="center" maxW="400" color="initial">
                        {description}
                     </Text>
                  </ModalBody>

                  <ModalFooter>
                     <HStack>
                        <Button onClick={onClose} variant="outline" leftIcon={<CloseIcon fontSize="xs" />}>
                           Close
                        </Button>

                        <Button leftIcon={<BsFillPencilFill />} colorScheme="purple" onClick={() => setDisplay('update')}>
                           Modifier
                        </Button>

                        <Button colorScheme="red" leftIcon={<DeleteIcon />}>
                           Suprimer
                        </Button>
                     </HStack>
                  </ModalFooter>
               </>
            )}

            {display === 'update' && <UpdateOffreEmploi offre={offre} setDisplay={setDisplay} />}
         </ModalContent>
      </Modal>
   );
}

const cssSpan = () => ({
   fontWeight: 'semibold',
   color: useColorModeValue('orange.500', 'orange.300'),
});
