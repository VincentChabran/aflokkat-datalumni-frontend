export const formatOptionsRender = (options: any, value: number) => {
   const currentOption = options[value - 1];
   return `${currentOption.value}-${currentOption.label}`;
};
