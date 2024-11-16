import { Button } from "@/components/custom/button"
import { CornerDownRight } from 'lucide-react';
import * as React from "react";
import { useFormContext } from 'react-hook-form';

const ApplyFiltersButton = () => {

    const { getValues } = useFormContext();


    const isAnyFieldFilled = React.useMemo(() => Object.values(getValues()).some(
        field => {
            // console.log("field", field)
            if (typeof field?.fieldValue === 'string') {
                return field?.fieldValue.trim() !== ""
            } else if (Array.isArray(field?.fieldValue)) {
                return field?.fieldValue?.length > 0
            }
            else if (typeof field?.to?.fieldValue === 'string') {
                return field?.to.fieldValue.trim() !== ""
            }
            else if (typeof field?.from?.fieldValue === 'string') {
                return field?.from.fieldValue.trim() !== ""
            }
        }
    ), [getValues()])

    return (
        <Button size="sm" disabled={false} >
            <CornerDownRight className="mr-2 h-4 w-4" /> Apply
        </Button>
    )
}

export default ApplyFiltersButton