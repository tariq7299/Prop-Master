import { HandCoins, DollarSign, TicketCheck, CalendarClock, CalendarDays } from 'lucide-react';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

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

export default function InstallmentDetailsList({ cell }: InstallmentDetailsListProps) {

    if (Object.keys(cell).length === 0) {
        return (
            <h1>There are no details</h1>
        );
    }

    return (
        <TooltipProvider>

            <h2 className="text-md font-bold">Installment Details</h2>
            {Object.entries(cell)?.map((installmentDetails) => {
                // Check if the current entry's key is "amount"
                return installmentDetails[0] === "amount"
                    ? (
                        <Tooltip key={installmentDetails[0]}>

                            <TooltipTrigger asChild>
                                <div key={installmentDetails[0]} className='flex gap-2'>
                                    <HandCoins size={23} className=" text-primary" />
                                    <p className="italic font-semibold ">{installmentDetails[1]}</p>
                                </div>
                            </TooltipTrigger>

                            <TooltipContent className="bg-warning text-warning-900 font-bold border-2">
                                <p className="text-wrap">Amount</p>
                            </TooltipContent>



                        </Tooltip>
                    )
                    : installmentDetails[0] === "currency"
                        ? (
                            <Tooltip key={installmentDetails[0]}>
                                <TooltipTrigger asChild>
                                    <div key={installmentDetails[0]} className='flex gap-2'>
                                        <DollarSign size={23} className="text-primary" />
                                        <p className="italic font-semibold ">{installmentDetails[1]}</p>
                                    </div>
                                </TooltipTrigger>

                                <TooltipContent className="bg-warning text-warning-900 font-bold border-2">
                                    <p className="text-wrap">Currency</p>
                                </TooltipContent>
                            </Tooltip>

                        )
                        : installmentDetails[0] === "down_payment"
                            ? (
                                <Tooltip key={installmentDetails[0]}>

                                    <TooltipTrigger asChild>
                                        <div key={installmentDetails[0]} className='flex gap-2'>
                                            <TicketCheck size={23} className="text-primary" />
                                            <p className="italic font-semibold ">{installmentDetails[1]}</p>
                                        </div>
                                    </TooltipTrigger>

                                    <TooltipContent className="bg-warning text-warning-900 font-bold border-2">
                                        <p className="text-wrap">Down Payment</p>
                                    </TooltipContent>
                                </Tooltip>

                            )
                            : installmentDetails[0] === "duration"
                                ? (
                                    <Tooltip key={installmentDetails[0]}>
                                        <TooltipTrigger asChild>
                                            <div key={installmentDetails[0]} className='flex gap-2'>
                                                <CalendarClock size={23} className="text-primary" />
                                                <p className="italic font-semibold ">{installmentDetails[1]}</p>
                                            </div>
                                        </TooltipTrigger>

                                        <TooltipContent className="bg-warning text-warning-900 font-bold border-2">
                                            <p className="text-wrap">Duration</p>
                                        </TooltipContent>
                                    </Tooltip>

                                )
                                : installmentDetails[0] === "freq"
                                    ? (
                                        <Tooltip key={installmentDetails[0]}>
                                            <TooltipTrigger asChild className=''>
                                                <div className='flex gap-2'>
                                                    <CalendarDays size={23} className="text-primary" />
                                                    <p className="italic font-semibold ">{installmentDetails[1]}</p>
                                                </div>
                                            </TooltipTrigger>

                                            <TooltipContent className="bg-warning text-warning-900 font-bold border-2">
                                                <p className="text-wrap">Frequency</p>
                                            </TooltipContent>
                                        </Tooltip>

                                    )
                                    :
                                    (null)
            })}
        </TooltipProvider>
    )
}