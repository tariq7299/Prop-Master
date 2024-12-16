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
import { Building } from 'lucide-react';
import { axiosPrivate } from '@/helper/api/axiosInstances'
import { handleApiSuccess } from '@/helper/api/handleApiSuccess'
import { handleApiError } from '@/helper/api/handleApiError'
import axios from 'axios'


export default function Properties() {

    // I have added the object of newRowActions manually here instead of backend 
    // Then i add it to tableStructure coming from backend --> setTableStructure({ ...tableStructure, ...response?.data?.data })
    const [tableStructure, setTableStructure] = useState({
        "newRowActions": {
            "add_new_property": {
                "action_key": "add_new_property",
                // The real purpose of this key is to not apply the styling of redirect/toggle button and 
                "action_type": "custom_control",
                "label": "Add New Property`",
                "action": {
                    // This should change from API
                    "web": "/admin/properties",
                },
                "button": {
                    "label": "Add New Property",
                    "icon": "Building",
                    "btnClasses": []
                },
                "method": "post",
                "payload_keys": [],
                "need_confirmation": false,
                "action_response": "instant",
                "onSuccess": "OpenModalForm",
                "callBack": ""
            },
            // "addNewPropertiesByExcel": {
            //     "action_key": "addNewPropertiesByExcel",
            //     // The real purpose of this key is to not apply the styling of redirect/toggle button and 
            //     "action_type": "custom_control",
            //     "label": "Add New Properties By Excel",
            //     "action": {
            //         // This should change from API
            //         // "web": "/admin/projects",
            //     },
            //     "button": {
            //         "label": "Add New Properties By Excel",
            //         "icon": "Building",
            //         "btnClasses": []
            //     },
            //     "method": "post",
            //     "payload_keys": [],
            //     "need_confirmation": false,
            //     "action_response": "instant",
            //     "onSuccess": "OpenModalForm",
            //     "callBack": ""
            // }
        }
    })

    useEffect(() => {
        const getTable = async () => {

            try {
                const response = await axiosPrivate("/client/properties")


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
        document.title = 'Prop Master - All Properties';
        return () => {
            document.title = 'Prop Master';
        }
    }, []);

    // console.log("propRe")


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
                                <BreadcrumbPage>Properties</BreadcrumbPage>
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

                {/* <ProfilingWrapper id="properties-page"> */}

                <div className='mb-6'>
                    <h2 className='text-2xl font-bold tracking-tight'>
                        Registered Properties <Building className='h-7 w-7 inline ms-2 text-secondary' />
                    </h2>
                    <p className='text-muted-foreground font-light'>
                        You can add new property or edit any existing one!
                    </p>
                </div>

                <div>
                    <ReactApiTable table={tableStructure}></ReactApiTable>
                </div>

                {/* </ProfilingWrapper> */}


            </Layout.Body>
        </Layout>
    )
};