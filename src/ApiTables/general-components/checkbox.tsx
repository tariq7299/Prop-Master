import React from 'react'

export const Checkbox = React.forwardRef(({ onClick, ...rest }: any, ref) => (
    <div className='form-check p-0'>
        <input
            htmlFor='booty-check'
            type='checkbox'
            className='form-check-input'
            ref={ref}
            onClick={onClick}
            {...rest}
        />
    </div>
));
