import * as React from "react"
import { forwardRef } from "react"
import CustomDatepickerHeaderSm from "./custom-datepicker-header-sm.tsx"
import DatePicker from "react-datepicker";


const CustomDatePickerInput = forwardRef<any>(({ value, onClick }: any, ref) => (
    <div ref={ref}>
        <input
            placeholder="Date"
            type='text'
            onClick={onClick}
            className='form-control shadow-0 bg-white'
            value={value}
            readOnly
            onChange={() => { }}
        />
    </div>
));




function CustomDatePicker({ max, min, selected, placement, field, onChange, }: any) {

    const days = ['ح', 'ن', 'ث', 'ع', 'خ', 'ج', 'س']
    const months = ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',];

    const locale = {
        localize: { day: (n: any) => days[n], month: (n: any) => months[n] },
        formatLong: { date: () => 'mm/dd/yyyy' }
    }

    return (
        <>
            <DatePicker
                {...field}
                locale={locale}
                maxDate={new Date(max).getTime()}
                selected={selected}
                minDate={new Date(min).getTime()}
                onChange={onChange}
                renderCustomHeader={
                    ({
                        date,
                        changeYear,
                        changeMonth,
                        decreaseMonth,
                        increaseMonth,
                        prevMonthButtonDisabled,
                        nextMonthButtonDisabled,
                    }: any) => (
                        <CustomDatepickerHeaderSm
                            date={date}
                            changeYear={changeYear}
                            changeMonth={changeMonth}
                            decreaseMonth={decreaseMonth}
                            increaseMonth={increaseMonth}
                            prevMonthButtonDisabled={prevMonthButtonDisabled}
                            nextMonthButtonDisabled={nextMonthButtonDisabled}
                            months={months}
                            maxYear={new Date(min).getFullYear()}

                        />
                    )}
                dateFormat='dd/MM/yyyy'
                popperPlacement={placement}
                onKeyDown={(e: any) => {
                    e.preventDefault();
                }}
                customInput={<CustomDatePickerInput />}
            />
        </>
    )
}

export default CustomDatePicker
