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
   useDisclosure,
} from '@chakra-ui/react';
import { FaUserEdit } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { CgReadme } from 'react-icons/cg';
import { ColorModeSwitcher } from '../global/ColorModoSwitcher';
import NavItem from './NavItem';
import { useUserStore } from '../../store/useUserStore';
import { deleteLocalStorageToken } from '../../utils/jwtToken';
import { pathDomaineName, pathProfilImg } from '../../utils/pathBackEnd';

export function UserItem() {
   const { idUserStore, prenomUserStore, nomUserStore, profilPictureNameUserStore, rolesUserStore, setUserStore } =
      useUserStore();

   const { isOpen, onOpen, onClose } = useDisclosure();

   const deconnection = () => {
      deleteLocalStorageToken();
      setUserStore({ id: 0, email: '', nom: '', prenom: '', profilPictureName: '', role: '', mentor: false });
   };

   return (
      <Popover placement="bottom-start" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
         <PopoverTrigger>
            <Button variant="custom" h="50px" minW="100px" mr="3px" overflow="hidden">
               <Avatar
                  size="sm"
                  src={profilPictureNameUserStore ? `${pathDomaineName}/${pathProfilImg}/${profilPictureNameUserStore}` : ''}
                  mr="2px"
               />

               <Text fontFamily="heading" display={{ base: 'none', xs: 'contents', lg: 'none', xl: 'contents' }}>
                  {prenomUserStore} {nomUserStore}
               </Text>

               <Text fontFamily="heading" display={{ base: 'contents', xs: 'none', lg: 'contents', xl: 'none' }}>
                  {prenomUserStore}
               </Text>
            </Button>
         </PopoverTrigger>

         <PopoverContent w={['180px', '250px']}>
            <PopoverArrow />

            <PopoverHeader onClick={onClose}>
               <ColorModeSwitcher w="100%" />
            </PopoverHeader>

            <PopoverBody onClick={onClose}>
               <Flex flexDir="column" align="center">
                  <NavItem href={`/profil/${idUserStore}`} icon={FaUserEdit} h="40px">
                     Profil
                  </NavItem>

                  {rolesUserStore.includes('Admin') && (
                     <NavItem href={`/gestionNewAccount`} icon={CgReadme}>
                        Admin
                     </NavItem>
                  )}

                  <NavItem href="/login" icon={BiLogOut} h="40px" onClick={deconnection}>
                     Déconnexion
                  </NavItem>
               </Flex>
            </PopoverBody>
         </PopoverContent>
      </Popover>
   );
}
