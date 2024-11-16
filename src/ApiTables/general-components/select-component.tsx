import { memo } from 'react';
import { objectToArrayKey } from '../table-utils/utils';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/custom/button';


const SelectComponent = ({ filter, field, setValue }) => (
    <>

        <div className="flex justify-between">
            <SelectLabel>{filter?.label}</SelectLabel>
            <Button
                disabled={!field?.value}
                variant="secondary"
                size="sm"
                onClick={(e) => {
                    e.stopPropagation();
                    setValue(`${filter?.filter_name}.fieldValue`, "");
                }}
            >
                Clear
            </Button>
        </div>
        {objectToArrayKey(filter?.props?.select_options)
            ?.sort((a, b) => (a.value === '' ? -1 : b.value === '' ? 1 : 0))
            ?.map(opt => (
                <SelectItem value={opt?.value} key={opt?.value}>
                    {opt?.label}
                </SelectItem>
            ))}
    </>

);

export default memo(SelectComponent);