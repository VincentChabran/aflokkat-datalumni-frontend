import { ComponentWithAs, Flex, Icon, IconProps, Link, VStack } from '@chakra-ui/react';
import { CSSProperties, MouseEventHandler, ReactElement } from 'react';
import { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';

interface NavItemProps {
   href: string;
   children: ReactElement | string | number;
   icon?: IconType | ComponentWithAs<'svg', IconProps> | null;
   borderRadius?: string;
   h?: string;
   onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
}
const NavItem = ({ href, children, icon, borderRadius, h, onClick }: NavItemProps) => {
   return (
      <VStack w="100%" lineHeight="3em" style={marginReset}>
         <Link as={NavLink} to={href} h={h} py="0px" borderRadius={borderRadius} onClick={onClick}>
            <Flex as="span" h="100%" justify="center" align="center">
               {icon && <Icon mr="2" fontSize="md" as={icon} />}
               {children}
            </Flex>
         </Link>
      </VStack>
   );
};

export default NavItem;

const marginReset: CSSProperties | undefined = {
   WebkitMarginStart: '0rem',
   marginInlineStart: '0rem',
};
