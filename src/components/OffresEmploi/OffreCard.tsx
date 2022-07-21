import { Box, Flex, Grid, Heading, Image, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { bgColor } from '../../themes/constants/bgColor';
import { formatDateDdMmYyyy } from '../../tools/functions/formatDateDdMmYyyy';
import { pathDomaineName, pathOffreLogo } from '../../utils/pathBackEnd';
import { OffreGrid } from './DisplayOffreGrid';
import { OffreDetail } from './OffreDetail/OffreDetail';

export interface OffreCardProps {
   offre: OffreGrid;
}

export function OffreCard({ offre }: OffreCardProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const { nomDuPoste, dateCreation, nomEntreprise, ville, typeContrat, dateDebut, dateLimiteCandidature, pathLogo } = offre;

   return (
      <>
         <VStack
            h="100%"
            py={7}
            px={{ base: 1, sm: 3 }}
            gap={2}
            border={'2px solid'}
            borderColor="blue.200"
            borderRadius="sm"
            bg={bgColor()}
            align="start"
            onClick={onOpen}
            _hover={{ cursor: 'pointer' }}
         >
            <Grid templateColumns={'2fr 1fr'} w="100%">
               <Heading size="md" p="2">
                  {nomDuPoste}
               </Heading>
               <Text fontSize="sm" textAlign="center" my="auto">{`Crée le ${formatDateDdMmYyyy(dateCreation)}`}</Text>
            </Grid>

            <Box>
               <Text fontSize="sm">{`${nomEntreprise} - ${ville}`}</Text>
               <Text fontSize="sm">{typeContrat.slice(3)}</Text>
            </Box>

            <Flex justify="space-between" align="center" w="100%">
               <VStack align="start" spacing={1}>
                  <Box>
                     <Text fontSize="xs">{`Date de début :`}</Text>
                     <Text fontSize="sm" fontWeight="medium">{`${formatDateDdMmYyyy(dateDebut) ?? ''}`}</Text>
                  </Box>

                  <Box>
                     <Text fontSize="xs">{`Date limite de candidature :`}</Text>
                     <Text fontSize="sm" fontWeight="medium">
                        {formatDateDdMmYyyy(dateLimiteCandidature) ?? ''}
                     </Text>
                  </Box>
               </VStack>

               <Image
                  borderRadius="none"
                  src={`${pathDomaineName}/${pathOffreLogo}/${pathLogo ?? 'default.jpg'}`}
                  maxW="100px"
               />
            </Flex>
         </VStack>

         <OffreDetail isOpen={isOpen} onClose={onClose} offre={offre} />
      </>
   );
}
