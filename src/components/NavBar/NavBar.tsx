import { QuestionIcon } from '@chakra-ui/icons';
import { Flex, HStack, Image, useColorModeValue } from '@chakra-ui/react';
import { FaAddressBook, FaHandshake, FaHome } from 'react-icons/fa';
import { GoMortarBoard } from 'react-icons/go';
import { BiCalendar } from 'react-icons/bi';
import NavItem from './NavItem';
import { NavBurger } from './NavBurger';
import { UserItem } from './UserItem';

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
   const bg = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
   return (
      <>
         <Flex maxH="150px" justify="center" overflow="hidden">
            <Image src="./src/assets/img/header.jpg" alt="Banner" objectFit="cover" />
         </Flex>

         <Flex as="nav" justify={{ base: 'space-evenly', lg: 'space-between' }} align="center" py="20px" bg={bg}>
            <HStack w={{ lg: '100%', navBar: '90%', xl: '80%' }} display={{ base: 'none', lg: 'flex' }}>
               {navPaths.map((el) => (
                  <NavItem key={el.name} href={el.href} icon={el.icon}>
                     {el.name}
                  </NavItem>
               ))}
            </HStack>

            <NavBurger />

            <UserItem />
         </Flex>
      </>
   );
}
