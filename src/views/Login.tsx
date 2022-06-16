import { Box, Button, Flex, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import InputField from '../components/global/formik/InputField';
import InputPassword from '../components/global/formik/InputPassword';

export interface LoginProps {}

export function Login(props: LoginProps) {
   const [display, setDisplay] = useState('connexion');

   return (
      <Flex minH="100vh" justify="center" align="center" bgImg="./src/assets/img/bg2.jpg" bgSize="cover">
         <Box maxW="360px" w="100%" h="500px" borderRadius="md" bg="white" border="3px solid gray">
            <Flex w="100%" h="100%" flexDir="column" justify="space-evenly" align="center">
               <Flex w="100%" justify="center">
                  <Image src="./src/assets/img/aflopng.png" />
               </Flex>

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

               <Text textAlign="center" fontWeight="semibold">
                  Accédez à votre réseau
               </Text>

               <Flex justify="center" w="80%">
                  <Formik initialValues={{ email: '', password: '' }} onSubmit={console.log}>
                     {(formikProps) => (
                        <VStack align="stretch" w="100%">
                           <Form>
                              <VStack align="stretch" w="100%">
                                 <InputField label="email" name="email" placeholder="Email" borderRadius="full" />

                                 <InputPassword
                                    label="password"
                                    name="password"
                                    placeholder="Password"
                                    borderRadius="full"
                                 />

                                 <Button borderRadius="full" colorScheme="purple">
                                    Connexion
                                 </Button>
                              </VStack>
                           </Form>
                        </VStack>
                     )}
                  </Formik>
               </Flex>
            </Flex>
         </Box>
      </Flex>
   );
}
