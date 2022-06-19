import { breakpoints } from './breakpoints';
import { colors } from './colors';
import { shadows } from './shadows';
import { typography } from './typography';
import { sizes } from './sizes';

export const foundations = {
   breakpoints,
   colors,
   ...typography,
   shadows,
   sizes,
};
