import { Box, Button, Flex, Image, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { Connexion } from '../components/Login/Connexion';
import { Inscription } from '../components/Login/Inscription';
import { MessageSucces } from '../components/Login/MessageSucces';

export function Login() {
   const [display, setDisplay] = useState('connexion');

   const bg = useColorModeValue('white', 'gray.800');

   return (
      <Flex minH="100vh" justify="center" align="center" bgImg="./src/assets/img/bg2.jpg" bgSize="cover">
         <Box maxW="360px" w="100%" borderRadius="md" bg={bg} border="2px solid ">
            <Flex w="100%" h="100%" flexDir="column" justify="space-evenly" align="center">
               <Flex w="100%" justify="center">
                  <Image src="./src/assets/img/aflo2.png" />
               </Flex>

               {(display === 'connexion' || display === 'inscription') && (
                  <Flex justify="center" w="80%">
                     <Button
                        w="100%"
                        borderRightRadius="none"
                        variant={display === 'connexion' ? 'solid' : 'outline'}
                        colorScheme={display === 'connexion' ? 'purple' : 'gray'}
                        onClick={() => setDisplay('connexion')}
                     >
                        Connexion
                     </Button>
                     <Button
                        w="100%"
                        borderLeftRadius="none"
                        variant={display === 'inscription' ? 'solid' : 'outline'}
                        colorScheme={display === 'inscription' ? 'purple' : 'gray'}
                        onClick={() => setDisplay('inscription')}
                     >
                        Inscription
                     </Button>
                  </Flex>
               )}

               {display === 'connexion' && <Connexion />}

               {display === 'inscription' && <Inscription setDisplay={setDisplay} />}

               {display === 'messageSucces' && <MessageSucces setDisplay={setDisplay} />}
            </Flex>
         </Box>
      </Flex>
   );
}
