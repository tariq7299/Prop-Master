import * as React from "react"
import { useId } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { CgChevronDown } from 'react-icons/cg'
useTableColumns
import { useTableCore } from "../table-providers/table-core-provider.tsx";
import { useTableColumns } from "../table-providers/table-columns-provider.tsx";

function ColumnsVisibility() {
    const id = useId();
    const { tableName } = useTableCore()
    const { tableColumnsDispatcher, tableColumns, visibleColumns } = useTableColumns()

    function toggleColumnVisibility(value: any, data_src: any, tableName: any) {
        let columns = [...visibleColumns];
        if (value === true) {
            columns = [...visibleColumns, data_src];
        } else {
            columns = columns.filter((col) => col !== data_src);
        }
        tableColumnsDispatcher({ type: 'SET_VISIBLE_COLUMNS', payload: columns })
        localStorage.setItem(`${tableName}_tb`, JSON.stringify(columns));
    }


    return (
        <div className='dropdown clickable ms-1'>
            <button
                type='button'
                className='btn btn-link p-0 btn-sm dropdown-toggle text-dark fw-bold shadow-0 pt-2 no-caret w-100'
                data-bs-toggle='dropdown'
                aria-expanded='false'
                data-bs-auto-close='outside'
            >
                <AiOutlineEye className='mx-1' size='1rem' />
                ظهور الأعمدة
                <CgChevronDown size={13} className='me-1' />
            </button>
            <form
                className='dropdown-menu end animate slideIn mt-lg-5'
                style={{ minWidth: '13rem', maxWidth: '15rem', top: '3rem' }}
            >
                {tableColumns?.map((col: any, index: any) => {
                    return (
                        <div className='form-check' key={index}>
                            <input
                                className='form-check-input'
                                type='checkbox'
                                id={`${col.data_src}ColVisibility${id}`}
                                checked={visibleColumns?.indexOf(col?.data_src) !== -1 ? true : false}
                                onChange={(e) => {
                                    toggleColumnVisibility(e.target.checked, col?.data_src, tableName)
                                }}
                            />
                            <label
                                className='form-check-label text-end'
                                style={{ fontSize: '.85rem' }}
                                htmlFor={`${col.data_src}ColVisibility${id}`}
                            >
                                {col.name}
                            </label>
                        </div>
                    );
                })}
            </form>
        </div>
    );
}

export default ColumnsVisibility;
