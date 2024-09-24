import { Layout } from '@/components/custom/layout'
import React from 'react'
import ReactApiTable from '../../ApiTables/react-api-table'
import tables from './data/tables'


export default function Projects() {
    return (
        <Layout>
            {/* ===== Top Heading ===== */}
            <Layout.Header>
                <h1>Header</h1>
            </Layout.Header>

            {/* ===== Main ===== */}
            <Layout.Body>
                <ReactApiTable table={tables?.table_test}></ReactApiTable>
            </Layout.Body>
        </Layout>
    )
};