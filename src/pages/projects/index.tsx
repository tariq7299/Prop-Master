import { Layout } from '@/components/custom/layout'
import React, { useEffect, useState } from 'react'
import ReactApiTable from '../../ApiTables/react-api-table'
import tables from './data/tables'
import { TopNav } from '@/components/top-nav'
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
import { Button } from '@/components/custom/button'
import { axiosPrivate } from '@/helper/axiosInstances'
import { handleApiSuccess } from '@/helper/api-requests/handleApiSuccess'
import { handleApiError } from '@/helper/api-requests/handleApiError'
import useSendRequest from '@/hooks/api/use-send-request'
import axios from 'axios'


export default function Projects() {

    const [table, setTable] = useState(null)


    useEffect(() => {

        const getTable = async () => {

            try {
                const response = await axiosPrivate("/client/projects")
                handleApiSuccess(response?.data, true, "", () => {
                    setTable(response?.data?.data)
                })
                console.log('responsee', response)

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

                {/* <div className=' border-dotted bg-primary/50'>IS this NIce</div> */}

                <div className='mb-6'>
                    <h2 className='text-2xl font-bold tracking-tight'>Registered Projects <Building2 className='h-6 w-6 inline ms-2' /></h2>
                    <p className='text-muted-foreground font-light'>
                        You can add new project or edit any existing one!
                    </p>
                </div>

                <div>
                    <ReactApiTable table={table}></ReactApiTable>
                </div>


            </Layout.Body>
        </Layout>
    )
};