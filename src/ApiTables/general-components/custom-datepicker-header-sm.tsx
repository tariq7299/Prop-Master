import * as React from "react"
import { getMonth, getYear } from 'date-fns';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';
import range from 'lodash/range';


function CustomDatepickerHeaderSm({ months, date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled, maxYear }: any) {

    const years = range(maxYear || 2022, getYear(new Date()) + 1, 1);

    return (
        <>
            <div className='d-block text-center px-2 w-100'>
                <div className='fw-bold h6 mb-0 round p-2 bg-light' style={{ borderRadius: '0.3rem' }}>
                    {months[getMonth(date)]} <i className="fa-solid fa-circle text-gray-500 mx-1" style={{ fontSize: '0.4rem', transform: 'translateY(-3px)' }}></i> {getYear(date)}
                </div>
            </div>
            <div
                style={{
                    margin: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    style={{ opacity: prevMonthButtonDisabled ? 0.2 : 1 }}
                    type='button'
                    className='me-auto btn btn-light btn-sm shadow-0 px-2'
                >
                    {<TbChevronRight />}

                </button>
                <select
                    title="select"
                    className='form-select form-select-sm mx-1 pe-4 ps-3 dir-ltr'
                    style={{
                        backgroundPosition: 'right 0.5rem center',
                        backgroundSize: '12px 9px',
                    }}
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(value)}
                >
                    {years.map((option: any) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                <select
                    title="select"
                    className='form-select text-xs form-select-sm mx-1 pe-4 ps-3 dir-ltr'
                    style={{
                        backgroundPosition: 'right 0.5rem center',
                        backgroundSize: '12px 9px',
                    }}
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                >
                    {months.map((option: any) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    style={{ opacity: nextMonthButtonDisabled ? 0.2 : 1 }}
                    type='button'
                    className='ms-auto btn btn-light btn-sm shadow-0 px-2'
                >
                    {<TbChevronLeft />}
                </button>
            </div>

        </>
    )
}

export default CustomDatepickerHeaderSm
