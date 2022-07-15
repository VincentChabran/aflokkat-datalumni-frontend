export const formatOptionsRender = (options: any, valueInputSelect: number) => {
   const currentOption = options[valueInputSelect - 1];
   return `${currentOption.value}-${currentOption.label}`;
};
