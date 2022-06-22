import {
   Avatar,
   Button,
   Flex,
   Popover,
   PopoverArrow,
   PopoverBody,
   PopoverContent,
   PopoverHeader,
   PopoverTrigger,
   Text,
} from '@chakra-ui/react';
import { FaUserEdit } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { ColorModeSwitcher } from '../global/ColorModoSwitcher';
import NavItem from './NavItem';
import { useUserStore } from '../../store/useUserStore';
import { deleteLocalStorageToken } from '../../utils/jwtToken';

export function UserItem() {
   const { prenom, nom, profilPictureName, setUser } = useUserStore();

   const deconnection = () => {
      deleteLocalStorageToken();
      setUser({ id: 0, email: '', nom: '', prenom: '', profilPictureName: '', role: '', mentor: false });
   };

   return (
      <Popover placement="bottom-start">
         <PopoverTrigger>
            <Button variant="custom" h="50px" minW="100px" mr="3px" overflow="hidden">
               {/* <Flex w="100%" justify={{ base: 'space-around', lg: 'space-evenly' }} align="center"> */}
               <Avatar size="sm" src={profilPictureName} mr="2px" />

               <Text fontFamily="heading" display={{ base: 'none', xs: 'contents', lg: 'none', xl: 'contents' }}>
                  {prenom} {nom}
               </Text>

               <Text fontFamily="heading" display={{ base: 'contents', xs: 'none', lg: 'contents', xl: 'none' }}>
                  {prenom}
                  {/* {prenom.charAt(0)} {nom.charAt(0)} */}
               </Text>
               {/* </Flex> */}
            </Button>
         </PopoverTrigger>

         <PopoverContent w={['180px', '250px']}>
            <PopoverArrow />
            <PopoverHeader>
               <ColorModeSwitcher w="100%" />
            </PopoverHeader>
            <PopoverBody>
               <Flex flexDir="column" align="center">
                  <NavItem href="/profil" icon={FaUserEdit} h="40px">
                     Profil
                  </NavItem>

                  <NavItem href="/login" icon={BiLogOut} h="40px" onClick={deconnection}>
                     Déconnexion
                  </NavItem>
               </Flex>
            </PopoverBody>
         </PopoverContent>
      </Popover>
   );
}
