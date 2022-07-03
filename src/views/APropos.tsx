import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { bgColor } from '../themes/constants/bgColor';

export interface AProposProps {}

export function APropos(props: AProposProps) {
   return (
      <Box py="10" px={{ base: '4', md: '8', lg: '14' }}>
         <Flex
            flexDir="column"
            py={{ base: '6', md: '8', lg: '14' }}
            px={{ base: '4', md: '10', lg: '20' }}
            borderRadius="md"
            bg={bgColor()}
            gap="10"
         >
            <Heading>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, numquam.</Heading>

            <Text>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quis voluptas dolorem beatae facilis nesciunt!
               Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, tempore. Lorem ipsum dolor sit amet
               consectetur adipisicing elit. Aspernatur quod error ex? Tempore, aspernatur. Similique necessitatibus ab vitae
               quis obcaecati dignissimos minus earum repellendus aliquam voluptatem tempora iste, quisquam provident.
            </Text>

            <Text>
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus voluptate consectetur laborum itaque
               quae? Itaque facere maiores illum? Voluptatum sed temporibus eligendi dolor explicabo illo consequatur rerum
               voluptas! Perferendis iusto quis illo ad facere similique amet fugit magni alias incidunt!
            </Text>

            <Text>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eum veritatis incidunt quos ipsa tempora
               natus deserunt velit illum, maxime optio perferendis vero modi esse inventore est repellendus aliquid pariatur
               hic. In, animi tenetur atque doloribus sapiente eveniet labore exercitationem eius laudantium asperiores
               repellendus quas ipsa, nobis, dolores ducimus quod.
            </Text>

            <Text>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum voluptatibus labore fugit, eligendi earum optio
               dolor non, accusantium incidunt vel quaerat eveniet unde error expedita rerum ducimus provident mollitia autem!
            </Text>
         </Flex>
      </Box>
   );
}
