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
import { z } from "zod";
import useSendRequest from "@/hooks/api/use-send-request";
import { ReqOptions } from "@/helper/api/types";
import { ApiResFuncArgs } from "@/helper/api/types";


const sheetSchema = z.object({
    file: z
        .string()
})

export default function UploadSheetStep({ handleCloseModal, stepper }: any) {

    // Write types (generic)
    const { resData: uploadedSheet, isLoading: isUploadingSheet, sendRequest: uploadSheet } = useSendRequest();


    const form = useForm({
        defaultValues: {
            file: ""
        }
    });

    // Write types
    const onSubmit = (data) => {

        // Write comments
        const formData = new FormData();
        formData.append('file', data.file);

        const fullPageLoader = { isLoading: true, loadingMsg: "Uploading file...", loadingIconName: "loader--2" }

        const reqOptions: ReqOptions = { url: "admin/project/import", header: { 'Content-Type': 'multipart/form-data' }, data: formData }

        const apiResFuncArgs: ApiResFuncArgs = {
            showToast: true,
            customMsg: "Uploaded Successfully! Redirecting to Upload History...",
            successCallback: (res: any) => {
                stepper.next()
                setTimeout(() => {
                    window.location.assign("/projects-upload-history")
                }, 3000)
            }
        }

        uploadSheet({ reqOptions, fullPageLoader, apiResFuncArgs })

    }

    console.log(form.getValues("file"))

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
                                    <Input className="text-xs" {...field} value={field.value.fileName} onChange={(e) => field.onChange(Array.from(e.target.files)[0])} type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
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
                <div className="fixed bottom-0 right-0 p-2 pt-3 bg-background w-full flex  justify-end sm:space-x-2 gap-2">
                    <Button type="submit" loading={isUploadingSheet} disabled={!form.getValues("file")} onClick={() => { }} >
                        Upload file
                    </Button>
                    <Button type="button" onClick={handleCloseModal} variant="outline">Cancel</Button>
                </div>
            </form>
        </Form>
    )
}