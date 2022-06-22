import { Select } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelectUserDisplayStore } from '../../../store/useSelectUserDisplayStore';

const promotionOptions = [{ promotion: 1970 }];

for (let i = 1971; i <= 2026; i++) {
   promotionOptions.unshift({ promotion: i });
}

export function SearchByPromotion() {
   const { setDisplayUsers, selectByPromotion, setSelectByPromotion } = useSelectUserDisplayStore();

   useEffect(() => {
      setDisplayUsers();
   }, [selectByPromotion]);

   useEffect(() => {
      return () => setSelectByPromotion(0);
   }, []);

   return (
      <Select
         w="160px"
         onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectByPromotion(parseInt(e.target.value))}
         value={selectByPromotion}
         _hover={{ cursor: 'pointer' }}
      >
         <option value={0}>Promotion..</option>

         {promotionOptions.map(({ promotion }) => (
            <option key={promotion} value={promotion}>
               {promotion}
            </option>
         ))}
      </Select>
   );
}
