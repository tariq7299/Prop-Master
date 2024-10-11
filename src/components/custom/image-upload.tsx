
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
import { X } from 'lucide-react';


type ImageUplaod = {
    // Change this and add to filed the correct types
    // form: any
    maxImagesSlots: number
    handleDroppingImages: any,
    handleImagesChange: any,
    handleSetImageAsCover: any,
    handleRemovingImage: any,
    watch: any,
    getValues: any,
    // images: any
    field: any,
    title: string,
    description: string,
    imagePlaceHolderText: string,
    titleIcon?: React.ReactNode,
    imagePlaceHolderIcon?: React.ReactNode
}

export default function ImageUpload({ maxImagesSlots, field, watch, getValues, handleDroppingImages, handleImagesChange, handleSetImageAsCover, handleRemovingImage, title, description, imagePlaceHolderText, titleIcon, imagePlaceHolderIcon }: ImageUplaod) {
    // console.log("images", images)
    return (
        <div className="grid gap-4 max-w-lg" >

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
                    <div onDrop={(e) => { e.preventDefault(); handleDroppingImages(e.dataTransfer.files, field.onChange) }} onDragOver={(event) => event.preventDefault()}>
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
                            <Input {...field} value={field.value.fileName} onChange={(e) => {
                                console.log(e)
                                console.log(e.target.files)
                                // field.onChange(Array.from(e.target.files))
                                handleImagesChange(e.target.files, field.onChange)
                            }} id="file-input" type="file" multiple className="hidden" accept="image/png, image/jpg, image/jpeg" />

                        </label>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-flow-row auto-rows-max gap-5 justify-items-stretch grid-cols-[repeat(3,_minmax(70px,_100px))] justify-center p-4">
                {/* <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-y-3 gap-x-3 justify-items-center"> */}

                {/* Write some comments here  */}
                {Array.from({ length: maxImagesSlots }, (_, i) => {

                    if (getValues("images").find((_, index) => index === i)) {
                        return (
                            <div key={i} className="flex justify-center items-center aspect-square w-full bg-muted rounded-lg relative group overflow-hidden">

                                <img src={URL.createObjectURL(getValues("images")[i])} alt="" className="" />

                                <Button type="button" size="sm" variant="outline" className="absolute top-2 right-2 w-max h-max p-1 block md:hidden group-hover:block"
                                    onClick={() => handleRemovingImage(getValues("images")[i]?.name || "")}
                                >
                                    <X className="h-3 w-3 md:h-4 md:w-4 text-destructive" />
                                </Button>

                                {
                                    getValues("images")[i]?.cover ? (
                                        <>
                                            <div className="bg-primary w-full absolute bottom-4 left-[-25px]  text-background font-bold text-2xs md:text-xs text-center rotate-45 tracking-widest " ><p>COVER</p></div>
                                        </>) : (
                                        <Button size="sm" type="button" variant="default" className="block md:hidden group-hover:block absolute bottom-2 w-max h-max px-2 text-2xs py-1 " onClick={() => handleSetImageAsCover(getValues("images")[i]?.name || "")}>Set as cover</Button>)
                                }
                            </div>
                        )
                    } else {

                        return (
                            // <div className="">
                            <Button key={i} type="button" className="h-full  flex justify-center items-center aspect-square w-full bg-muted hover:bg-muted/50 rounded-lg" variant="ghost" onClick={() => { document.getElementById("file-input")?.click() }}>
                                {imagePlaceHolderIcon}
                            </Button>
                            // </div>

                        )
                    }
                })}

            </div>

        </div >

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