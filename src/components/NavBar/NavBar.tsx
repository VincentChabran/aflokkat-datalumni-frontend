import { QuestionIcon } from '@chakra-ui/icons';
import {
   Avatar,
   Box,
   Button,
   Flex,
   HStack,
   Popover,
   PopoverArrow,
   PopoverBody,
   PopoverCloseButton,
   PopoverContent,
   PopoverHeader,
   PopoverTrigger,
} from '@chakra-ui/react';
import { FaAddressBook, FaHandshake, FaHome } from 'react-icons/fa';
import { GoMortarBoard } from 'react-icons/go';
import { BiCalendar } from 'react-icons/bi';
import NavItem from '../global/NavItem';
import { NavBurger } from './NavBurger';

export interface NavBarProps {}

export const navPaths = [
   { href: '/accueil', icon: FaHome, name: 'Accueil' },
   { href: '/annuaire', icon: FaAddressBook, name: 'Annuaire' },
   { href: '/mentorat', icon: GoMortarBoard, name: 'Mentorat' },
   { href: '/offreemplois', icon: FaHandshake, name: 'Emplois/Stages' },
   { href: '/apropos', icon: QuestionIcon, name: 'À propos' },
   { href: '/actualites', icon: BiCalendar, name: 'Actualités' },
];
export function NavBar(props: NavBarProps) {
   return (
      <>
         <Box h="50px"></Box>
         <Flex as="nav" justify={{ base: 'space-around', lg: 'space-between' }} align="center">
            <HStack w={{ lg: '100%', navBar: '90%', xl: '80%' }} display={{ base: 'none', lg: 'flex' }}>
               {navPaths.map((el) => (
                  <NavItem key={el.name} href={el.href} icon={el.icon}>
                     {el.name}
                  </NavItem>
               ))}
            </HStack>

            <NavBurger />

            <Popover>
               <PopoverTrigger>
                  <Flex h="100%">
                     <Button h="50px" variant="ghost" fontWeight="normal" fontFamily="heading">
                        <Avatar size="sm" />
                        User Name FirstName
                     </Button>
                  </Flex>
               </PopoverTrigger>
               <PopoverContent>
                  <PopoverArrow />
                  {/* <PopoverCloseButton /> */}
                  {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
                  <PopoverBody>Profil Déco toggle mode</PopoverBody>
               </PopoverContent>
            </Popover>
         </Flex>
      </>
   );
}
