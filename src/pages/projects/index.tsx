import { Layout } from '@/components/custom/layout'
import React from 'react'
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


export default function Projects() {
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
                    <h2 className='text-xl lg:text-2xl font-bold tracking-tight'>Prop Master Registered Projects <Building2 className='h-6 w-6 inline ms-2' /></h2>
                    <p className='text-muted-foreground font-light'>
                        You can add new project or edit any existing one!
                    </p>
                </div>
                <div >
                    <ReactApiTable table={tables?.table_test}></ReactApiTable>
                </div>


            </Layout.Body>
        </Layout>
    )
};