import { FC } from "react";
import { useColorMode, useColorModeValue, IconButton, IconButtonProps } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: FC<ColorModeSwitcherProps> = (props) => {
   const { colorMode, toggleColorMode } = useColorMode();

   const text = useColorModeValue("dark", "light");
   const SwitchIcon = useColorModeValue(FaMoon, FaSun);

   return (
      <IconButton
         size="md"
         fontSize="xl"
         variant="ghost"
         color="current"
         onClick={toggleColorMode}
         icon={<SwitchIcon />}
         aria-label={`Switch to ${text} mode`}
         {...props}
      />
   );
};
