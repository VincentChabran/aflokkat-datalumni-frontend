import { Checkbox } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelectUserDisplayStore } from '../../../store/useSelectUserDisplayStore';

export function CheckboxJobSearch() {
   const { setDisplayUsers, selectByJobSearch, setSelectByJobSearch } = useSelectUserDisplayStore();

   useEffect(() => {
      setDisplayUsers();
   }, [selectByJobSearch]);

   useEffect(() => {
      return () => setSelectByJobSearch(false);
   }, []);

   return (
      <div>
         <Checkbox
            colorScheme="green"
            onChange={(e) => setSelectByJobSearch(e.target.checked)}
            defaultChecked={false}
            isChecked={selectByJobSearch}
         >
            Recherche d'emploi
         </Checkbox>
      </div>
   );
}
// (e) => console.log(e.target.checked)
