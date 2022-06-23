import { Checkbox } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelectUserDisplayStore } from '../../../store/useSelectUserDisplayStore';

export function CheckboxIsMentor() {
   const { setDisplayUsers, selectByMentor, setSelectByMentor } = useSelectUserDisplayStore();

   useEffect(() => {
      setDisplayUsers();
   }, [selectByMentor]);

   useEffect(() => {
      return () => setSelectByMentor(false);
   }, []);

   return (
      <div>
         <Checkbox
            colorScheme="green"
            onChange={(e) => setSelectByMentor(e.target.checked)}
            defaultChecked={false}
            isChecked={selectByMentor}
         >
            Mentor
         </Checkbox>
      </div>
   );
}
