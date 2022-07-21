import { Select } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

export interface SearchWithSelectProps {
   selectByX: string | number;
   setSelectByX: (selectByX: string) => void;
   title: string;
   optionsSelect: {
      value: string;
      label: string;
   }[];
}

/**
 *
 * @interface selectByX = La valeur du filtre (depuis le store)
 * @interface setSelectByX = le set de la valeur
 * @interface title = le titre afficher en premier dans le select
 * @interface optionsSelect = les options du select
 *
 */
export function SearchWithSelect({ selectByX, setSelectByX, title, optionsSelect }: SearchWithSelectProps) {
   return (
      <Select
         w="180px"
         size={{ base: 'xs', md: 'sm', lg: 'md' }}
         value={selectByX}
         onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectByX(e.target.value)}
         _hover={{ cursor: 'pointer' }}
      >
         <option value="">{title}...</option>

         {optionsSelect.map(({ value, label }) => (
            <option key={value} value={value}>
               {label}
            </option>
         ))}
      </Select>
   );
}
