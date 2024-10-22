import * as React from "react";
import { ChartBarDecreasing } from 'lucide-react';
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
import uploadTableStructure from "../data-2/upload-table-structure";
import { useParams } from 'react-router-dom';


function SheetAnalysis() {

    React.useEffect(() => {
        document.title = 'Prop Master - Sheet Analysis';
        return () => {
            document.title = 'Prop Master';
        }
    }, []);

    const { sheetId } = useParams();

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
                            <BreadcrumbLink href="/projects-upload-history">
                                Upload History
                            </BreadcrumbLink>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Sheet Analysis: File #{sheetId}</BreadcrumbPage>
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
                        Sheet Analysis: File <span className="text-secondary font-bold text-3xl">#{sheetId}</span>
                    </h2>
                    <p className='text-muted-foreground font-light'>
                        Here you can see data import summary of your sheet
                    </p>
                </div>

                <div>
                    <ReactApiTable table={uploadTableStructure.table_test}></ReactApiTable>
                </div>


            </Layout.Body>

        </Layout>
    )
}

export default SheetAnalysis;