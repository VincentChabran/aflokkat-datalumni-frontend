import { ComponentWithAs, Flex, FlexProps, Icon, IconProps, Link, VStack } from '@chakra-ui/react';
import { CSSProperties, ReactElement } from 'react';
import { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';

interface NavItemProps extends FlexProps {
   href: string;
   children: ReactElement | string | number;
   icon?: IconType | ComponentWithAs<'svg', IconProps> | null;
   borderRadius?: string;
}
const NavItem = ({ href, children, icon, borderRadius }: NavItemProps) => {
   return (
      <VStack w="100%" lineHeight="3em" spacing={0} m="0" style={marginReset}>
         <Link as={NavLink} to={href} w="100%" py="1px" px="15px" borderRadius={borderRadius}>
            <Flex as="span" justify="center" align="center">
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
