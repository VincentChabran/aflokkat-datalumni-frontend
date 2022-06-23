import { HamburgerIcon } from '@chakra-ui/icons';
import {
   Drawer,
   DrawerBody,
   DrawerCloseButton,
   DrawerContent,
   DrawerHeader,
   DrawerOverlay,
   IconButton,
   useDisclosure,
} from '@chakra-ui/react';
import NavItem from './NavItem';
import { navPaths } from './NavBar';

export function NavBurger() {
   const { isOpen: drawerOpen, onToggle: drawerToggle, onClose } = useDisclosure();

   window.addEventListener('resize', () => {
      if (window.innerWidth >= 992) onClose();
   });

   return (
      <div>
         <IconButton
            display={{ lg: 'none' }}
            aria-label="Open Menu"
            variant="outline"
            icon={<HamburgerIcon />}
            onClick={drawerToggle}
         />

         <Drawer onClose={drawerToggle} isOpen={drawerOpen} placement="left" size="2xs">
            <DrawerOverlay />
            <DrawerContent overflowY="hidden">
               <DrawerHeader textAlign="center">
                  Menu
                  <DrawerCloseButton />
               </DrawerHeader>

               <DrawerBody overflowY="hidden" p="0" onClick={drawerToggle}>
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
