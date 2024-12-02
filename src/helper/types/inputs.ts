
import { HTMLAttributes, InputHTMLAttributes } from "react"
import { ControllerRenderProps, FieldValues, FieldPath } from "react-hook-form"

export type ComboboxProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
    // 
    inputPlaceholder: string
    searchPlaceholder: string
    values: { id: number, name: string }[];
    // This is the useHookForm form.field
    field: ControllerRenderProps<TFieldValues, TName>;
} & HTMLAttributes<HTMLDivElement> & InputHTMLAttributes<HTMLInputElement>

export type DatePickerProps = {
    value: Date,
    onChange: (arg0: Date | undefined) => void
}

