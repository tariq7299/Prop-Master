"use client"

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
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useFormContext } from "react-hook-form"

// const values = [
//     {
//         value: "next.js",
//         label: "Next.js",
//     },
//     {
//         value: "sveltekit",
//         label: "SvelteKit",
//     },
//     {
//         value: "nuxt.js",
//         label: "Nuxt.js",
//     },
//     {
//         value: "remix",
//         label: "Remix",
//     },
//     {
//         value: "astro",
//         label: "Astro",
//     },
// ]



export function Combobox({ values, field, className }) {
    const [open, setOpen] = React.useState(false)
    // const [value, setValue] = React.useState("")
    const form = useFormContext()

    console.log("field", field)


    return (
        <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger className={className} asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className=" justify-between"
                >
                    {field.value
                        ? values.find((value) => value.value === field.value)?.label
                        : "Select value..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
                <Command filter={(value, search) => {
                    const valueLabel = values.find((v) => v?.value === value)?.label
                    if (valueLabel && valueLabel.toLowerCase().trim().includes(search?.toLowerCase().trim())) {
                        return 1
                    }
                    return 0
                }}
                >
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {values.map((value) => (
                                <CommandItem
                                    key={value.value}
                                    value={value.value}
                                    onSelect={(currentValue) => {
                                        console.log("currentValue", currentValue)
                                        field.onChange(currentValue)
                                        setOpen(false)
                                        // setValue(currentValue === value ? "" : currentValue)
                                        // setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            field.value === value.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {value.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
