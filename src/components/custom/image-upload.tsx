
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "./button"
import { Input } from "../ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

type ImageUplaod = {
    // Change this and add to filed the correct types
    // form: any
    field: any
    title: string,
    description: string,
    imagePlaceHolderText: string,
    titleIcon?: React.ReactNode,
    imagePlaceHolderIcon?: React.ReactNode
}

export default function ImageUpload({ field, title, description, imagePlaceHolderText, titleIcon, imagePlaceHolderIcon }: ImageUplaod) {
    return (

        <div className="grid gap-4 max-w-lg">

            <div className="grid gap-1">

                <div className="flex  items-center space-x-2">
                    <h2 className="text-md font-medium">{title}</h2> {titleIcon && titleIcon}
                </div>

                {/* <p className="text-sm text-gray-500 dark:text-gray-400"> */}

                <p className="text-sm text-muted-foreground">
                    {description}
                </p>

            </div>

            <Card>
                <CardContent className="grid gap-4 p-4">
                    <div>
                        <div>
                            <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-700 transition-colors group-[.drag-over]:border-primary group-[.drag-over]:bg-primary/10">
                                <UploadIcon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{imagePlaceHolderText}</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex justify-end">
                        <FormField
                            control={form.control}
                            name='delivery_time'
                            render={({ field }) => (
                                <FormItem className='space-y-1'>
                                    <div className="flex items-center space-x-2">
                                        <FormLabel htmlFor="file-input" className="button button-sm"> Select Files <UploadIcon className="mr-2 h-4 w-4" /> </FormLabel>
                                        <Input {...field} id="file-input" type="file" multiple className="hidden" />
                                    </div>
                                    <FormControl>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div> */}
                    <div className="flex justify-end">
                        <label htmlFor="file-input" className="button button-sm">
                            <UploadIcon className="mr-2 h-4 w-4" />
                            Select Files
                            <Input {...field} id="file-input" type="file" multiple className="hidden" />
                        </label>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-flow-row auto-rows-max gap-5 justify-items-stretch grid-cols-3 justify-start px-14">
                {/* <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-y-3 gap-x-3 justify-items-center"> */}

                <div className="flex justify-center items-center aspect-square w-full bg-muted rounded-lg">
                    {imagePlaceHolderIcon}
                </div>
                <div className="flex justify-center items-center aspect-square  w-full bg-muted rounded-lg">
                    {imagePlaceHolderIcon}
                </div>
                <div className="flex justify-center items-center aspect-square w-full bg-muted rounded-lg">
                    {imagePlaceHolderIcon}
                </div>
                <div className="flex justify-center items-center aspect-square w-full bg-muted rounded-lg">
                    {imagePlaceHolderIcon}
                </div>
                <div className="flex justify-center items-center aspect-square w-full bg-muted rounded-lg">
                    {imagePlaceHolderIcon}
                </div>
                <div className="flex justify-center items-center aspect-square w-full bg-muted rounded-lg">
                    {imagePlaceHolderIcon}
                </div>

            </div>

        </div>

    )
}

function UploadIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
    )
}