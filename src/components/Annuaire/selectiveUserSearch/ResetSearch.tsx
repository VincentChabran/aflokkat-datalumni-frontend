import { IconButton, Tooltip } from '@chakra-ui/react';
import { GrPowerReset } from 'react-icons/gr';
import { useSelectUserDisplayStore } from '../../../store/useSelectUserDisplayStore';
export interface ResetSearchProps {}

export function ResetSearch(props: ResetSearchProps) {
   const { resetFilter } = useSelectUserDisplayStore();
   return (
      <div>
         <Tooltip hasArrow label="Reset filtres sélectionnés">
            <IconButton aria-label="reset filtres" icon={<GrPowerReset />} onClick={() => resetFilter()} size="xs" />
         </Tooltip>
      </div>
   );
}
