import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/custom/button";
import { FileUp } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from '@/components/ui/form'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSendRequest from "@/hooks/api/use-send-request";
import { ReqOptions } from "@/helper/types/api";
import { ApiResFuncArgs } from "@/helper/types/api";


type FileType = File & {
    // This was added because this line : value={field?.value?.fileName}, in the input field, that is mandotory for the input field
    fileName?: string
}

const validFileTypes = [
    "csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel"
]

const fileSchema = z.object({
    file: z
        .custom<FileType>((val) => val instanceof File).nullable().refine((val) => {
            if (val) {
                return validFileTypes.includes(val.type)

            } else {
                return false
            }
        }, { message: "Only excel files are allowed !" })
})

export default function UploadSheetStep({ handleCloseModal, stepper }: any) {

    // Write types (generic) 
    const { isLoading: isUploadingSheet, sendRequest: uploadSheet } = useSendRequest();

    const form = useForm<z.infer<typeof fileSchema>>({
        resolver: zodResolver(fileSchema),
        defaultValues: {
            file: null
        }
    });

    const onSubmit = (data: z.infer<typeof fileSchema>) => {

        const formData = new FormData();
        // Because the file object has a "null" as a default value
        // So I have to check that it is not `null`
        if (data.file) {

            formData.append('file', data.file);

            const fullPageLoader = { isLoading: true, loadingMsg: "Uploading file...", loadingIconName: "loader--2" }

            const reqOptions: ReqOptions = { url: "admin/project/import", header: { 'Content-Type': 'multipart/form-data' }, data: formData }

            const apiResFuncArgs: ApiResFuncArgs = {
                showToast: true,
                customMsg: "Uploaded Successfully! Redirecting to Upload History...",
                successCallback: () => {
                    stepper.next()
                    setTimeout(() => {
                        window.location.assign("/projects-upload-history")
                    }, 3000)
                }
            }

            uploadSheet({ reqOptions, fullPageLoader, apiResFuncArgs })
        }

    }

    return (
        <Form {...form}>

            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center items-center py-24 pb-28 gap-2">
                <div className="space-y-2 w-full max-w-sm">

                    <FormField
                        control={form.control}
                        name='file'
                        render={({ field }) => (
                            <FormItem className='space-y-1'>
                                <FormLabel className=" flex items-center gap-1 text-base">Excel Sheet  <FileUp className="h-5 w-5 text-secondary" /></FormLabel>
                                <FormControl>
                                    <Input className="text-xs" {...field} value={field?.value?.fileName} onChange={(e) => {
                                        if (e.target.files instanceof FileList) {
                                            field.onChange(
                                                Array.from(e.target.files)[0]
                                            )
                                        }

                                    }} type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                                </FormControl>
                                <FormDescription>
                                    Upload your file by selecting it
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>


                {/* Modal Footer */}
                <div className="fixed bottom-0 right-0 p-2 pt-3 bg-background w-full flex  justify-end gap-2">
                    <Button type="submit" variant="outline" onClick={() => stepper.prev()} >Back</Button>
                    <Button type="submit" loading={isUploadingSheet} disabled={!form.getValues("file")} onClick={() => { }} >
                        Upload file
                    </Button>
                    <Button type="button" onClick={handleCloseModal} variant="outline">Cancel</Button>
                </div>
            </form>
        </Form>
    )
}