
import React, { useEffect, useState } from 'react'
import { IoIosClose } from "react-icons/io";
// import { toast } from 'react-toastify'
// import useAuth from '../../hooks/useAuth';
import { useTableBulkActions } from '../table-providers/bulk-actions-provider';
import { useTableCore } from '../table-providers/table-core-provider';
import { useTableColumns } from '../table-providers/table-columns-provider';
import { toast } from '@/components/ui/use-toast'

export function SendToMails() {
    // const { appAuth } = useAuth()
    const [modalEmails, setModalEmails] = useState<any>([])
    const [modalSingleEmail, setModalSingleEmail] = useState('')
    const { bulkActionsPostHandler, selectedBulkAction, bulkActionPostLoading } = useTableBulkActions()
    const { selectedIds } = useTableColumns()
    const { appliedFilters } = useTableCore()

    // useEffect(() => {
    //     if (appAuth?.user?.id === 499) {
    //         setModalEmails([appAuth?.user?.email])
    //     } else {
    //         setModalEmails([])
    //     }
    // }, [appAuth])

    const addEmail = (event: any) => {
        if (event.target.value !== "" && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(event.target.value.trim().replace(',', ''))) {
            setModalEmails([...modalEmails, event.target.value.replace(',', '')]);
            event.target.value = "";
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(event.target.value)) {
            toast({
                description: "Invalid Email format!",
                variant: "destructive"
            });
            // toast.error('صيغة البريد الالكتروني غير صحيحة')
        }
    };

    const addSingleEmail = event => {
        if (event.target.value !== "") {
            setModalSingleEmail(event.target.value);
        } else {
            setModalSingleEmail('')
        }
    }

    const removeEmails = indexToRemove => {
        setModalEmails([...modalEmails.filter((_, index) => index !== indexToRemove)]);
    };



    return (
        <div className="popup-body">
            <h2 className='h5 mb-5'>إرسال التقرير إلى</h2>
            <div className="position-relative">
                <label className="form-label">ُادخل البريد الإلكتروني ثم اضغط "," </label>
                <div className="tags-input mb-3">
                    <ul id="tags">
                        {modalEmails.map((tag, index) => (
                            <li key={index} className="tag">
                                <span className='tag-title'>{tag}</span>
                                <span className='tag-close-icon'
                                    onClick={() => removeEmails(index)}
                                >
                                    <IoIosClose />
                                </span>
                            </li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        onChange={(event) => {
                            if (!event.target.value.includes(',') && !event.target.value.includes(' ')) {
                                addSingleEmail(event)
                            }

                        }}
                        onKeyUp={(event: any) => {
                            if (event.target.value.includes(',') || event.target.value.includes(' ')) {
                                (event.which === 188 || event.which === 32) ? addEmail(event) : null
                            }
                        }}
                        placeholder=" ادخل البريد الإلكتروني  "
                    />
                </div>
            </div>

            <button
                className="btn btn-primary px-4"
                disabled={(modalSingleEmail === '' && modalEmails?.length === 0) || bulkActionPostLoading}
                type="button"
                onClick={() => {
                    bulkActionsPostHandler(
                        selectedBulkAction?.method,
                        selectedBulkAction?.action.web,
                        {
                            filters: appliedFilters,
                            selected_ids: selectedIds,
                            emails: modalEmails?.length > 0 ? modalEmails : modalEmails?.length === 0 && modalSingleEmail !== '' ? [modalSingleEmail] : []
                        },
                        { msg: 'جاري إرسال التقرير', icon: 'mailing' },
                        selectedBulkAction
                    )
                }}
            >
                {bulkActionPostLoading ? 'جاري الإرسال' : 'إرسال'}
            </button>
        </div>
    )
}
