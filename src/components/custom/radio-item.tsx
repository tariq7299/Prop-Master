import * as React from 'react'
import { CheckIcon } from '@radix-ui/react-icons'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@/lib/utils'


// const RadioGroupItem = React.forwardRef<
//     React.ElementRef<typeof RadioGroupPrimitive.Item>,
//     React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
// >(({ className, ...props }, ref) => {
//     return (
//         <RadioGroupPrimitive.Item
//             ref={ref}
//             className={cn(
//                 'aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
//                 className
//             )}
//             {...props}
//         >
//             <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
//                 <CheckIcon className='h-3.5 w-3.5 fill-primary' />
//             </RadioGroupPrimitive.Indicator>
//         </RadioGroupPrimitive.Item>
//     )
// })
// RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

// export { RadioGroup, RadioGroupItem }

export interface RadioItemProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
}

const RadioItem = React.forwardRef<HTMLInputElement, RadioItemProps>(
    ({ label, id, name, ...props }, ref) => {
        return (
            <div className="flex py-2">
                <label className="relative flex items-center cursor-pointer" htmlFor={id}>
                    <input name={name} type="radio" className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all" id={id} {...props} ref={ref} />
                    <span className="absolute bg-primary w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    </span>
                </label>
                <label className="ml-2  cursor-pointer text-sm" htmlFor={id}>{label}</label>

            </div>
        )
    }
)

export { RadioItem }
