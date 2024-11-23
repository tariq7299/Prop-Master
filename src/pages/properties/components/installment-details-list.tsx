import { HandCoins, DollarSign, TicketCheck, CalendarClock, CalendarDays } from 'lucide-react';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from '@/components/ui/badge';
import React from 'react';

/**
 * Represents an installment configuration
 */
interface InstallmentCell {
    /** Initial down payment amount */
    down_payment: number;
    /** Duration in years */
    duration: number;
    /** Frequency of payments per year */
    freq: number;
    /** Total installment amount */
    amount: number;
    /** Currency code */
    currency: string;
    /** Whether this is the default installment plan */
    is_default: boolean;
}

type InstallmentDetailsListProps = {
    cell: InstallmentCell,
}

interface DataRowProp {
    data: string
    toolTipContent: string
    icon: React.ReactNode
}


function DataRow({ data, toolTipContent, icon }: DataRowProp) {

    return (
        <Tooltip >
            <TooltipTrigger asChild>
                <div className='flex gap-2'>
                    <Badge variant={"outline"} className='flex items-center gap-2 font-bold italic'>{icon}<span className=''>{data}</span></Badge>
                    {/* <p className="italic font-semibold ">{data}</p> */}
                </div>
            </TooltipTrigger>

            <TooltipContent className="bg-warning text-warning-900 font-bold border-2">
                <p className="text-wrap">{toolTipContent}</p>
            </TooltipContent>



        </Tooltip>)
}

export default function InstallmentDetailsList({ cell }: InstallmentDetailsListProps) {

    if (Object.keys(cell).length === 0) {
        return (
            <h1>There are no details</h1>
        );
    }

    return (
        <TooltipProvider>
            <div className='grid space-y-2 w-full '>
                <h2 className="text-sm font-bold pb-1">Installment</h2>
                {Object.entries(cell)?.map((installmentDetails) => {

                    // Check if the current entry's key is "amount"
                    return installmentDetails[0] === "amount"
                        ? (
                            <React.Fragment key={installmentDetails[0]}>
                                <DataRow icon={(<HandCoins size={18} className=" text-primary" />)} data={installmentDetails[1]} toolTipContent='Amount'></DataRow>
                            </React.Fragment>
                        )
                        : installmentDetails[0] === "currency"
                            ? (
                                <React.Fragment key={installmentDetails[0]}>
                                    <DataRow icon={(<DollarSign size={18} className="text-primary" />)} data={installmentDetails[1]} toolTipContent='Currency'></DataRow>
                                </React.Fragment>
                            )
                            : installmentDetails[0] === "down_payment"
                                ? (
                                    <React.Fragment key={installmentDetails[0]}>
                                        <DataRow icon={(<TicketCheck size={18} className="text-primary" />)} data={installmentDetails[1]} toolTipContent='Down Payment'></DataRow>
                                    </React.Fragment>
                                )
                                : installmentDetails[0] === "duration"
                                    ? (
                                        <React.Fragment key={installmentDetails[0]}>
                                            <DataRow icon={(<CalendarClock size={18} className="text-primary" />)} data={installmentDetails[1]} toolTipContent='Duration'></DataRow>
                                        </React.Fragment>

                                    )
                                    : installmentDetails[0] === "freq"
                                        ? (
                                            <React.Fragment key={installmentDetails[0]}>
                                                <DataRow icon={(<CalendarDays size={18} className="text-primary" />)} data={installmentDetails[1]} toolTipContent='Frequency'></DataRow>
                                            </React.Fragment>
                                        )
                                        :
                                        (null)
                })}

            </div>
        </TooltipProvider>
    )
}