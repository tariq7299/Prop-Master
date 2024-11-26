import * as React from "react"
import { useMemo } from "react"
import { useTableRowActions } from "../table-providers/row-actions-provider.tsx"
import { useTableColumns } from "../table-providers/table-columns-provider.tsx"
import { copyToClipboard } from "../table-utils/utils.tsx"
// import ReactPlayer from 'react-player'
// import Viewer from 'react-viewer';
// import parse from 'html-react-parser';
// import { v4 as uuidv4 } from 'uuid';
// import { Link } from "@inertiajs/react";
import { useTableBulkActions } from "../table-providers/bulk-actions-provider.tsx"
import { useTableCore } from "../table-providers/table-core-provider.tsx"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { RowActionPostHandlerArgs } from "../types/table-actions.ts"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/custom/table"
import { ClickedRowActionResponse } from "../types/table-actions.ts"
import { Nullable } from "@/helper/utils/type-utils.ts"
interface RowDataPayload {
    label: string
    value: string
}

export interface RowDataProps extends React.HTMLAttributes<HTMLDivElement> {
    rowActionResponse: Nullable<ClickedRowActionResponse<RowDataPayload[]>>
    isLoadingModalData: boolean
}

// ... Show More Info About the row
export function ViewRowData({ data }: any) {

    const modalData = useMemo(() => {
        return data?.data
    }, [data])

    return (
        <div className="row align-items-stretch g-3">
            {modalData && Object.keys(modalData)?.map((key, index) => (
                <div key={index} className="col-xxl-4 col-xl-6">
                    <div className="bg-light h-100 p-3 rounded">
                        <h6 className="mb-0">{modalData[key]?.label}</h6>
                        {modalData[key]?.type === 'copy_value' ? (
                            modalData[key]?.value && modalData[key]?.value !== '#!' && modalData[key]?.value !== '!#' ? (
                                <button className="btn btn-opac-info btn-sm mt-3" onClick={() => copyToClipboard(modalData[key]?.value)}>نسخ الرابط</button>
                            ) : (
                                <p className="mb-0 text-muted text-wrap">لا يوجد رابط مشاركة</p>
                            )
                        ) : Array.isArray(modalData[key]?.value) ? (
                            modalData[key]?.value?.map((item: any, i: any) => {
                                return (
                                    <p className="text-muted text-wrap mb-0" key={i}>{item}</p>
                                )
                            })
                        ) : (
                            <p className="text-muted text-wrap mb-0">{modalData[key]?.value || '----'}</p>
                        )}

                    </div>
                </div>
            ))}
        </div>
    )
}

// ... Row Action Confirmation Modal
export function ConfirmationModal({ status, handleCloseModal, className = "", confirmationFor }: any) {

    const { clickedRowAction, rowActionPostLoading, rowActionsPostHandler } = useTableRowActions()
    const { appliedFilters } = useTableCore()
    const { bulkActionsPostHandler, selectedBulkAction, bulkActionPostLoading } = useTableBulkActions()
    const { selectedIds } = useTableColumns()

    function fireRowAction() {
        if (confirmationFor === 'rowAction') {

            const RowActionPostHandlerArgs: Partial<RowActionPostHandlerArgs> = { method: clickedRowAction?.method, url: clickedRowAction?.isBulk ? clickedRowAction?.bulk_actions_url?.web : clickedRowAction?.action?.web, payload: { selected_ids: selectedIds }, action: clickedRowAction }
            rowActionsPostHandler && rowActionsPostHandler(RowActionPostHandlerArgs)
        }
        // rowActionsPostHandler(clickedRowAction?.method, clickedRowAction?.isBulk ? clickedRowAction?.bulk_actions_url?.web : clickedRowAction?.action?.web, { selected_ids: selectedIds }, clickedRowAction)
        else if (confirmationFor === 'bulkAction') {
            bulkActionsPostHandler(
                selectedBulkAction?.method,
                selectedBulkAction?.action.web,
                { filters: appliedFilters, selected_ids: selectedIds },
                null,
                selectedBulkAction
            )
        }
    }

    return (
        <AlertDialog open={status} onOpenChange={handleCloseModal}>
            <AlertDialogContent className={className} onCloseAutoFocus={(event) => {
                event.preventDefault();
                // I had to manually reset the pointerEvents for the document after closing and i don't know why !!
                document.body.style.pointerEvents = 'auto';
            }}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCloseModal}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={fireRowAction} disabled={rowActionPostLoading || bulkActionPostLoading}> {(rowActionPostLoading || bulkActionPostLoading) ? 'Loading...' : 'Confirm'}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )

}

// Write types
export const RowData = ({ rowActionResponse, isLoadingModalData }: RowDataProps) => {

    // Iam checking if 'action is null' because I want the laoding to only appear when user opens up the modal and not when closing or submitting !!! so i a have to check for both (rowActionPostLoading and action === null)
    if (isLoadingModalData && !rowActionResponse) {
        return (
            <div className="min-h-16 flex flex-col justify-center items-center pb-9">
                <h1 className="mb-4 text-xl font-bold">Loading data...</h1>
                <div className="loader--3" />
            </div>
        )
    }

    return (
        <>
            {rowActionResponse
                ? (<div className={`pb-9 md:pb-4 transition-all duration-300 ease-in-out transform ${rowActionResponse?.data?.length > 0 ? "opacity-100" : "opacity-0"} `}>
                    {rowActionResponse?.data?.length > 0 && (
                        <Table containerClassName="pb-2" className=" ">
                            <TableCaption>A row of uploaded sheet</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    {rowActionResponse.data.map((header) => {
                                        return (
                                            <TableHead key={header.label} className="">{header.label}</TableHead>
                                        )
                                    })}
                                </TableRow >
                            </TableHeader >
                            <TableBody>
                                <TableRow>
                                    {rowActionResponse.data.map((row, index) => (
                                        <>
                                            <TableCell key={`${row.label}-rowValue`} className="">{row.value}</TableCell>
                                        </>
                                    ))}
                                </TableRow>
                            </TableBody>
                        </Table >
                    )}
                </div >)
                :
                (<h1> No Data Founde !</h1>)
            }

        </>


    )
};

// // ... Row Action Confirmation Modalrow
// export function ConfirmationModal({ closeModal, confirmationFor }: any) {
//     const { clickedRowAction, rowActionPostLoading, rowActionsPostHandler } = useTableRowActions()
//     const { appliedFilters } = useTableCore()
//     const { bulkActionsPostHandler, selectedBulkAction, bulkActionPostLoading } = useTableBulkActions()
//     const { selectedIds } = useTableColumns()

//     function fireRowAction() {
//         if (confirmationFor === 'rowAction')
//             rowActionsPostHandler(clickedRowAction?.method, clickedRowAction?.isBulk ? clickedRowAction?.bulk_actions_url?.web : clickedRowAction?.action?.web, { selected_ids: selectedIds }, clickedRowAction)
//         if (confirmationFor === 'bulkAction') {
//             bulkActionsPostHandler(
//                 selectedBulkAction?.method,
//                 selectedBulkAction?.action.web,
//                 { filters: appliedFilters, selected_ids: selectedIds },
//                 null,
//                 selectedBulkAction
//             )
//         }
//     }

//     return (
//         <div className="text-center">
//             <p className="h6 mb-4">هل أنت متأكد من القيام بهذا الإجراء</p>
//             <div className="row g-2">
//                 <div className="col-6">
//                     <button disabled={rowActionPostLoading || bulkActionPostLoading} className={`btn py-2 btn-opac-primary w-100`}
//                         onClick={fireRowAction}>
//                         {(rowActionPostLoading || bulkActionPostLoading) ? 'جاري التأكيد....' : 'تأكيد'}
//                     </button>
//                 </div>
//                 <div className="col-6">
//                     <button className="btn py-2 btn-opac-dark w-100"
//                         onClick={closeModal}
//                     >إغلاق</button>
//                 </div>
//             </div>
//         </div>
//     )

// }

// // ... Announcement Viewing Modal
// export function AnnouncementModal({ announce_for="" }) {
//     const { clickedRowActionResponse } = useTableRowActions()
//     const viewerImgs = [{ src: clickedRowActionResponse?.media_url, id: uuidv4() }]
//     const [isMediaOpen, setIsMediaOpen] = useState(false)
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const data = clickedRowActionResponse?.data

//     return (
//         <>
//             <div className='announcement-item'>
//                 <div>
//                     <div className={`row g-4 align-items-center ${announce_for === 'alert' ? 'text-center' : ''}`}>
//                         <div className={`${announce_for !== 'alert' ? `col-lg-6 ${data?.render_type?.value === 'inline' ? 'd-none' : ''} order-2 order-lg-1 text-center text-lg-end` : 'col-12 order-2'}`}>
//                             {announce_for === 'feature' && (
//                                 <div className="text-center text-lg-end mb-2">
//                                     <div className="announcement-badge">
//                                         ميزة جديدة
//                                     </div>
//                                 </div>
//                             )}
//                             <p className="mb-1 text-muted text-wrap fs-6">{data?.small_title?.value}</p>
//                             <h1 className="h2 lh-1 mb-3 text-wrap">{data?.big_title?.value}</h1>
//                             {data?.description_paragraph?.value && data?.description_paragraph?.value !== '' && (

//                                 <div className="quill-custom-desc dir-rtl text-wrap fs-6">
//                                     {data?.description_paragraph?.value && parse(data?.description_paragraph?.value)}
//                                 </div>
//                             )}

//                             {data?.redirect_url?.value && (
//                                 <>
//                                     {data?.redirect_page?.value === 'external' && (
//                                         <a href={data?.redirect_url?.value} target="_blank" className="btn btn-primary mt-3">معرفة المزيد</a>
//                                     )}
//                                     {data?.redirect_page?.value !== 'external' && (
//                                         <Link href={data?.redirect_url?.value} className="btn btn-primary mt-3">معرفة المزيد</Link>
//                                     )}
//                                 </>
//                             )}
//                         </div>
//                         <div className={`${announce_for !== 'alert' ? `${data?.render_type?.value === 'inline' ? 'col-12' : 'col-lg-6'} order-1 order-lg-2` : 'col-12 order-1'}`}>
//                             {data?.media_type?.value === 'image' && (
//                                 <img src={data?.media_url?.value} alt={data?.big_title?.value} className="cursor-pointer shadow-0 img-fluid d-block mx-auto" style={{
//                                     maxHeight: announce_for === 'alert' ? 'auto' : '20rem',
//                                     maxWidth: announce_for === 'alert' ? '6rem' : 'auto'
//                                 }}
//                                     onClick={() => {
//                                         setIsMediaOpen(true);
//                                         setCurrentIndex(currentIndex);
//                                     }}
//                                 />
//                             )}
//                             {(data?.media_type?.value === 'video' || data?.media_type?.value === 'youtube') && (
//                                 <div className="rounded-3 overflow-hidden">
//                                     <ReactPlayer url={data?.media_url?.value} width='100%' controls={true} />
//                                 </div>
//                             )}

//                             {data?.render_type?.value === 'inline' && (
//                                 <div className="text-center mt-4">
//                                     {data?.small_title?.value && (<p className="mb-1 text-muted text-wrap fs-6">{data?.small_title?.value}</p>)}
//                                     {data?.big_title?.value && (<h1 className="h2 lh-1 mb-3 text-wrap">{data?.big_title?.value}</h1>)}
//                                     {data?.description_paragraph?.value && (<p className="text-muted text-wrap fs-6">{data?.description_paragraph?.value}</p>)}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//             </div>

//             <Viewer
//                 visible={isMediaOpen}
//                 activeIndex={currentIndex}
//                 noNavbar={true}
//                 noFooter={true}
//                 drag={false}
//                 attribute={false}
//                 onClose={() => {
//                     setIsMediaOpen(false);
//                 }}
//                 images={viewerImgs}
//             />
//         </>
//     )
// }
