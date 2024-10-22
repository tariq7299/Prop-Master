import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandLoading
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ComboboxProps } from "@/helper/types"
import { FieldValues, FieldPath } from "react-hook-form"

export function Combobox<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ values, field, className, placeholder = "Search..." }: ComboboxProps<TFieldValues, TName>) {

    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger className={className} asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className=" justify-between"
                >
                    {field.value && values.length > 0
                        ? values.find((value: { id: number, name: string }) => value.id === field.value)?.name
                        : "Select value..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
                <Command filter={(value, search) => {
                    if (search && value.toLowerCase().trim().includes(search?.toLowerCase().trim())) {
                        return 1
                    }
                    return 0
                }}
                >
                    <CommandInput placeholder={placeholder} />
                    <CommandList>
                        {values.length <= 0
                            ? (
                                <CommandLoading>Hang on…</CommandLoading>)
                            : (
                                <>
                                    <CommandEmpty>No value found.</CommandEmpty>
                                    <CommandGroup>

                                        {values.map((value: { id: number, name: string }) => (
                                            <CommandItem
                                                key={value.id}
                                                value={value.name}
                                                onSelect={() => {
                                                    field.onChange(value.id);
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        field.value === value.id ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {value.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </>)}


                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover >
    )
}
