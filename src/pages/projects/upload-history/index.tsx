import * as React from "react";
import { FileClock } from 'lucide-react';
import { Layout } from '@/components/custom/layout'
import ReactApiTable from "@/ApiTables/react-api-table";
import { UserNav } from '@/components/user-nav'
import ThemeSwitch from '@/components/theme-switch'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { axiosPrivate } from '@/helper/api/axiosInstances'
import { handleApiSuccess } from '@/helper/api/handleApiSuccess'
import { handleApiError } from '@/helper/api/handleApiError'
import axios from 'axios'


function UploadHistory() {

    React.useEffect(() => {
        document.title = 'Prop Master - Upload History';
        return () => {
            document.title = 'Prop Master';
        }
    }, []);


    const [tableStructure, setTableStructure] = React.useState({
        "newRowActions": {
            "addNewProjectByExcel": {
                "action_key": "addNewProjectsByExcel",
                // The real purpose of this key is to not apply the styling of redirect/toggle button and 
                "action_type": "custom_control",
                "label": "Add New Projects By Excel",
                "action": {
                    // This should change from API
                    // "web": "/admin/projects",
                },
                "button": {
                    "label": "Add New Projects By Excel",
                    "btnClasses": []
                },
                "method": "post",
                "payload_keys": [],
                "need_confirmation": false,
                "action_response": "instant",
                "onSuccess": "OpenModalForm",
                "callBack": ""
            }
        }
    })

    const getUploadHistoryTableStructrue = async () => {

        try {
            const response = await axiosPrivate("admin/import-sheet-hd")

            handleApiSuccess(response?.data, false, "", () => {
                setTableStructure({ ...tableStructure, ...response?.data?.data })
            })

        } catch (error: unknown) {
            if (axios.isAxiosError(error) || (error instanceof Error)) {
                handleApiError(error);
                return error
            } else {
                console.error(error)
            }
        }
    }

    React.useEffect(() => {
        getUploadHistoryTableStructrue()
    }, [])


    return (
        <Layout>

            {/* ===== Top Heading ===== */}
            <Layout.Header>
                <div className='flex justify-between w-full'>

                    <Breadcrumb className="flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">
                                    Dashboard
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Upload History</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className='ml-auto flex items-center space-x-4'>
                        <ThemeSwitch />
                        <UserNav />
                    </div>
                </div>
            </Layout.Header>

            {/* ===== Main ===== */}
            <Layout.Body>
                <div className='mb-6'>
                    <h2 className='text-2xl font-bold tracking-tight'>
                        Projects Upload History <FileClock className='text-secondary h-7 w-7 inline ms-2' />
                    </h2>
                    <p className='text-muted-foreground font-light'>
                        Here are all projects sheets you have uploaded
                    </p>
                </div>

                <div>
                    <ReactApiTable table={tableStructure}></ReactApiTable>
                </div>


            </Layout.Body>

        </Layout>
    )

}

export default UploadHistory