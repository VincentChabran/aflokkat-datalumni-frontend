import { HamburgerIcon } from '@chakra-ui/icons';
import {
   Drawer,
   DrawerBody,
   DrawerCloseButton,
   DrawerContent,
   DrawerHeader,
   DrawerOverlay,
   Flex,
   IconButton,
   useDisclosure,
} from '@chakra-ui/react';
import NavItem from '../global/NavItem';
import { navPaths } from './NavBar';

export interface NavBurgerProps {}

export function NavBurger(props: NavBurgerProps) {
   const { isOpen: drawerOpen, onToggle: drawerToggle } = useDisclosure();

   return (
      <div>
         <IconButton
            display={{ lg: 'none' }}
            aria-label="Open Menu"
            variant="outline"
            icon={<HamburgerIcon />}
            onClick={drawerToggle}
         />

         <Drawer onClose={drawerToggle} isOpen={drawerOpen} placement="left">
            <DrawerOverlay />
            <DrawerContent overflowY="hidden">
               {/* <DrawerCloseButton /> */}

               <DrawerHeader textAlign="center">Menu</DrawerHeader>
               <DrawerBody overflowY="hidden" p="0">
                  {navPaths.map((el) => (
                     <NavItem href={el.href} icon={el.icon} key={el.name}>
                        {el.name}
                     </NavItem>
                  ))}
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </div>
   );
}
