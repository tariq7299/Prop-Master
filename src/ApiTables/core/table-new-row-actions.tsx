import * as React from 'react';
import { useTableNewRowActions } from '../table-providers/new-row-actions-provider';
import { Button } from '@/components/custom/button';
import { CirclePlus } from 'lucide-react';

// Write the type of this array here
// type = NewRowActionsArray

export default function TableNewRowActions() {

    // Add this wehn
    const { newRowActionsArray } = useTableNewRowActions();

    return (
        <>
            {newRowActionsArray.length > 0 &&
                (
                    <>
                        {newRowActionsArray.map((newRowAction: any, index: any) => (
                            <Button key={index} size="sm" className=" gap-1 text-background bg-foreground"><CirclePlus className="h-4 w-4" /><span className="sr-only md:not-sr-only ">{newRowAction?.label}</span></Button>
                        ))}
                    </>
                )
            }
        </>
    )

}