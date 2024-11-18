import * as React from "react";
import { Button } from "@/components/custom/button";
import { FileDown } from 'lucide-react';
import { axiosPrivate } from "@/helper/api/axiosInstances";
import axios from "axios";
import { handleApiError } from "@/helper/api/handleApiError";
import { handleApiSuccess } from "@/helper/api/handleApiSuccess";
import { Link } from "react-router-dom";


export default function DownloadTemplateStep({ handleCloseModal, stepper }: any) {

    const [templateLink, setTemplateLink] = React.useState("");
    const [isLoadingDownloadLink, setIsLoadingDownloadLink] = React.useState(false);

    const downloadTemplate = async () => {
        setIsLoadingDownloadLink(true)
        try {
            const response = await axiosPrivate("admin/download-template")
            handleApiSuccess(response?.data, false, "", async () => setTemplateLink(response?.data?.data?.file))

        } catch (error) {
            if (axios.isAxiosError(error) || error instanceof Error) {
                handleApiError(error)
                console.error(error)
            }
        } finally {
            setIsLoadingDownloadLink(false)
        }
    }

    React.useEffect(() => {
        downloadTemplate()
    }, [])



    return (
        <div className="flex flex-col justify-center items-center py-24 gap-2">

            <p className="text-sm md:text-base text-muted-foreground">
                Downlad the template and start filling then after that press "Next" to upload the sheet
            </p>
            <Link to={templateLink}>
                <Button disabled={!templateLink} loading={isLoadingDownloadLink} size="lg" className="gap-2 text-lg" variant="outline">

                    {isLoadingDownloadLink ?
                        (
                            <>
                                Getting your file ready...
                            </>
                        ) : (
                            <>
                                <span className="tracking-wider">Download Template</span><FileDown className="h-6 w-6 text-success" />
                            </>
                        )}

                </Button>
            </Link>

            {/* Modal Footer */}
            <div className="fixed bottom-0 right-0 p-2 pt-3 bg-background w-full flex  justify-end gap-2 ">

                <Button type="submit" onClick={() => stepper.next()} >Next</Button>
                <Button type="button" onClick={handleCloseModal} variant="outline">Cancel</Button>
            </div>

        </div>
    )
}