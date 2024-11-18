import { Layout } from '@/components/custom/layout'
import React, { useEffect, useState } from 'react'
import ReactApiTable from '../../ApiTables/react-api-table'
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
import { Building2 } from 'lucide-react';
import { axiosPrivate } from '@/helper/api/axiosInstances'
import { handleApiSuccess } from '@/helper/api/handleApiSuccess'
import { handleApiError } from '@/helper/api/handleApiError'
import axios from 'axios'


export default function Projects() {

    // I have added the object of newRowActions manually here instead of backend 
    // Then i add it to tableStructure coming from backend --> setTableStructure({ ...tableStructure, ...response?.data?.data })
    const [tableStructure, setTableStructure] = useState({
        "newRowActions": {
            "addNewProject": {
                "action_key": "addNewProject",
                // The real purpose of this key is to not apply the styling of redirect/toggle button and 
                "action_type": "custom_control",
                "label": "Add New Project",
                "action": {
                    // This should change from API
                    // "web": "/admin/projects",
                },
                "button": {
                    "label": "Add New Project",
                    "icon": "Building2",
                    "btnClasses": []
                },
                "method": "post",
                "payload_keys": [],
                "need_confirmation": false,
                "action_response": "instant",
                "onSuccess": "OpenModalForm",
                "callBack": ""
            },
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
                    "icon": "Building2",
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

    console.log("tableStructure", tableStructure)

    useEffect(() => {
        const getTable = async () => {

            try {
                const response = await axiosPrivate("/client/projects")


                handleApiSuccess(response?.data, false, "", () => {
                    setTableStructure({ ...tableStructure, ...response?.data?.data })
                    // console.log("{ ...tableStructure, ...response?.data?.data }", { ...tableStructure, ...response?.data?.data })
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
        getTable()
    }, [])

    useEffect(() => {
        document.title = 'Prop Master - All Projects';
        return () => {
            document.title = 'Prop Master';
        }
    }, []);


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
                                <BreadcrumbPage>Projects</BreadcrumbPage>
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
                        Registered Projects <Building2 className='h-7 w-7 inline ms-2 text-secondary' />
                    </h2>
                    <p className='text-muted-foreground font-light'>
                        You can add new project or edit any existing one!
                    </p>
                </div>

                <div>
                    <ReactApiTable table={tableStructure}></ReactApiTable>
                </div>


            </Layout.Body>
        </Layout>
    )
};