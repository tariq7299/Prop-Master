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
    CommandLoading
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

    // console.log("field", field)
    // console.log("values", values)


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
                    // console.log("value.id", value)
                    const valueLabel = values.find((v) => v?.id === value)?.name
                    if (valueLabel && valueLabel.toLowerCase().trim().includes(search?.toLowerCase().trim())) {
                        return 1
                    }
                    return 0
                }}
                >
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                        {values.length <= 0
                            ? (
                                <CommandLoading>Hang on…</CommandLoading>)
                            : (
                                <>
                                    <CommandEmpty>No framework found.</CommandEmpty>
                                    <CommandGroup>

                                        {values.map((value: { id: number, name: string }) => (
                                            <CommandItem
                                                key={value.id}
                                                value={value.id}
                                                onSelect={() => {
                                                    field.onChange(value.id)
                                                    setOpen(false)
                                                    // setValue(currentValue === value ? "" : currentValue)
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
