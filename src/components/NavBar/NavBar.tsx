import { QuestionIcon } from '@chakra-ui/icons';
import { Flex, HStack, Image } from '@chakra-ui/react';
import { FaAddressBook, FaHandshake, FaHome } from 'react-icons/fa';
import { GoMortarBoard } from 'react-icons/go';
import { BiCalendar } from 'react-icons/bi';
import NavItem from './NavItem';
import { NavBurger } from './NavBurger';
import { UserItem } from './UserItem';
import { bgColor } from '../../themes/constants/bgColor';
import { pathDomaineName } from '../../utils/pathBackEnd';

export const navPaths = [
   { href: '/accueil', icon: FaHome, name: 'Accueil' },
   { href: '/annuaire', icon: FaAddressBook, name: 'Annuaire' },
   { href: '/offresemploi', icon: FaHandshake, name: 'Emplois/Stages' },
   { href: '/actualites', icon: BiCalendar, name: 'Actualités' },
   { href: '/apropos', icon: QuestionIcon, name: 'À propos' },
];

export function NavBar() {
   const bg = bgColor();

   return (
      <>
         <Flex maxH="150px" justify="center" overflow="hidden">
            <Image src={`${pathDomaineName}/header.jpg`} alt="Banner" objectFit="cover" />
         </Flex>

         <Flex
            as="nav"
            justify={{ base: 'space-evenly', lg: 'center' }}
            align="center"
            py="18px"
            bg={bg}
            borderBottom="1px solid"
         >
            <HStack w={{ lg: '100%', xl: '80%' }} display={{ base: 'none', lg: 'flex' }}>
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
