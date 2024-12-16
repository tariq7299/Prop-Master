import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'
import { CirclePercent, Trash2, CirclePlus } from 'lucide-react';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Label } from '@/components/ui/label'
import { currencies, frequencies, durations } from '../data/property'
import { RadioItem } from '@/components/custom/radio-item'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'

export default function InstallmentPlanForm({ index, remove }) {


    const { control, setValue, getValues, watch } = useFormContext()

    const isDefaultIndex = getValues("is_default")

    const handleDeletingInstallmentPlan = (installmentIndex: number) => {
        if (isDefaultIndex === installmentIndex) {
            setValue("is_default", 0)
            setValue(`installment_details.0.is_default`, true)
            remove(installmentIndex)
        } else if (isDefaultIndex > installmentIndex) {
            const newIsDefaultInstallmentIndex = isDefaultIndex - 1
            setValue("is_default", newIsDefaultInstallmentIndex)
            remove(installmentIndex)
        } else {
            remove(installmentIndex)

        }
    }

    const [isChecked, setIsChecked] = useState(index === isDefaultIndex)

    useEffect(() => {
        setIsChecked(index === isDefaultIndex)
    }, [watch("is_default")])

    return (
        <div className=" pb-14" >

            <>

                <div className="flex space-x-2 items-center pb-3">
                    <h1 className="text-md font-bold col-span-2 text-start ">Installment Plan <span className="text-primary">#{index}</span></h1>

                    {index != 0 && (
                        <Button type="button" size="icon" variant="destructive" className="  flex items-center" onClick={() => handleDeletingInstallmentPlan(index)}>
                            <Trash2 className="w-5 h-5 " />
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-2  gap-x-3 gap-y-5 justify-items-stretch">

                    <div className="space-y-2 col-span-2 xl:col-span-1 ">
                        <Label className="">Down Payment (from-to)</Label>
                        <div className="flex gap-2 max-w-sm">

                            <FormField
                                control={control}
                                name={`installment_details.${index}.down_payment_from`}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input step="0.01"
                                                onWheel={(e) => e.currentTarget.blur()} min={0} type="number" {...field} placeholder="45000..." />
                                        </FormControl>
                                        <FormDescription>
                                            Choose the starting down payment amount
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name={`installment_details.${index}.down_payment_to`}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input step="0.01"
                                                onWheel={(e) => e.currentTarget.blur()} min={0} type="number" {...field} placeholder="90000..." />
                                        </FormControl>
                                        <FormDescription>
                                            Choose the starting down payment amount
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="space-y-2 col-span-2 xl:col-span-1 ">
                        <Label className="">Installment Amount (from-to)</Label>
                        <div className="flex gap-2 max-w-sm">
                            <FormField
                                control={control}
                                name={`installment_details.${index}.amount_from`}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input step="0.01"
                                                onWheel={(e) => e.currentTarget.blur()} min={0} type="number" {...field} placeholder="10000..." />
                                        </FormControl>
                                        <FormDescription>
                                            Type the start amount of installment
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name={`installment_details.${index}.amount_to`}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input step="0.01"
                                                onWheel={(e) => e.currentTarget.blur()} min={0} type="number" {...field} placeholder="20000..." />
                                        </FormControl>
                                        <FormDescription>
                                            Type the end amount of installment
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                    </div>

                    <FormField
                        control={control}
                        name={`installment_details.${index}.currency`}
                        render={({ field }) => (
                            <FormItem className="col-span-1  w-full ">
                                <FormLabel>Currency</FormLabel>
                                <FormControl>
                                    <Select value={field?.value} onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full col-span-1 max-w-sm">
                                            <SelectValue placeholder="Choose currency">
                                                {currencies?.find(currency => String(field.value) === currency.id)?.name || "Choose currency"}
                                            </SelectValue>

                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <div className='flex justify-between'>
                                                    <SelectLabel>Currency</SelectLabel>
                                                    {/* <Button
                                                        disabled={!field?.value}
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setValue(`installment_details.${index}.currency`, "")
                                                        }}
                                                    >
                                                        Clear
                                                    </Button> */}
                                                </div>
                                                {currencies?.map(opt => (
                                                    <SelectItem value={opt?.id} key={opt?.id}>{opt?.name}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>
                                    Type the end amount of installment
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name={`installment_details.${index}.freq`}
                        render={({ field }) => (
                            <FormItem className="col-span-1 w-full">
                                <FormLabel>Frequency</FormLabel>
                                <FormControl>
                                    <Select value={String(field?.value)} onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full col-span-1 max-w-sm">
                                            <SelectValue placeholder="Choose frequency">
                                                {frequencies?.find(freq => String(field.value) === freq.id)?.name || "Choose frequency"}
                                            </SelectValue>

                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <div className='flex justify-between'>
                                                    <SelectLabel>Frequency</SelectLabel>
                                                    {/* <Button
                                                        disabled={!field?.value}
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setValue(`installment_details.${index}.freq`, "")
                                                        }}
                                                    >
                                                        Clear
                                                    </Button> */}
                                                </div>
                                                {frequencies
                                                    ?.map(opt => (
                                                        <SelectItem value={opt?.id} key={opt?.id}>{opt?.name}</SelectItem>
                                                    ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>
                                    Type the end amount of installment
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name={`installment_details.${index}.duration`}
                        render={({ field }) => (
                            <FormItem className="col-span-1 w-full">
                                <FormLabel>Duration</FormLabel>
                                <FormControl>
                                    <Select value={String(field?.value)} onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full col-span-1 max-w-sm">
                                            <SelectValue placeholder="Choose a duration">
                                                {durations?.find(duration => String(field.value) === duration.id)?.name || "Choose duration"}
                                            </SelectValue>

                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <div className='flex justify-between'>
                                                    <SelectLabel>Duration</SelectLabel>
                                                    {/* <Button
                                                        disabled={!field?.value}
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setValue(`installment_details.${index}.duration`, "")
                                                        }}
                                                    >
                                                        Clear
                                                    </Button> */}
                                                </div>
                                                {durations?.map(opt => (
                                                    <SelectItem value={opt?.id} key={opt?.id}>{opt?.name}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>
                                    Choose the duration of the installment
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name={`installment_details.${index}.is_default`}
                        render={({ field }) => (
                            <FormItem className="col-span-1 w-full">
                                <FormLabel htmlFor={`is_default${index}`}>Default Installment</FormLabel>
                                <FormControl>
                                    <RadioItem {...field} onChange={() => setValue("is_default", index)}
                                        checked={isChecked} name="radioInput" value={index} label="Default Installment" id={`is_default${index}`} />
                                </FormControl>
                                <FormDescription>
                                    Type the end price of the property
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                </div>
            </>


        </div>
    )
}