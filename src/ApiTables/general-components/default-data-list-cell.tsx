
import { BadgeAlert, BadgeInfo } from 'lucide-react';


export type DataValueStyle = "default" | "destructive";

export interface DataListCellValue {
    iconName: null | string,
    label: null | string,
    value: null | string,
    style: DataValueStyle
}

export interface DataList {
    cellLabel: string
    cellValue: DataListCellValue[]
}

interface DefaultDataListProps {
    cell: DataList
}

function DefaultDataList({ cell }: DefaultDataListProps) {

    if (cell.cellValue.length === 0) {
        return (<h1>No Data!</h1>
        )
    }

    return (
        <div className="space-y-2 w-72 md:w-full">
            {cell.cellValue.map((data) => {
                return (
                    <>
                        {data.style === "destructive" ?
                            (
                                <div className="text-destructive dark:text-destructive-400 bg-destructive-500/10 p-3 border-2 rounded-md text-sm font-semibold border-destructive-100 dark:border-destructive-900 flex items-center gap-2">
                                    <BadgeAlert className=" h-5 w-5 flex-shrink-0" />
                                    <p className="text-xs md:text-sm">{data.value}</p>
                                </div>
                            ) :
                            (
                                <div className=" text-muted-foreground bg-muted/70 p-3 border-2 rounded-md  font-semibold border-muted flex items-center gap-2">
                                    <BadgeInfo className=" h-5 w-5 flex-shrink-0" />
                                    <p className="text-xs md:text-sm">{data.value}</p>

                                </div>
                            )
                        }
                    </>
                )
            })}
        </div>
    )
}

export { DefaultDataList }