
import * as React from "react"
import TableCoreProvider from "./table-providers/table-core-provider"
import TableColumnsProvider from "./table-providers/table-columns-provider.tsx"
import BulkActionsProvider from "./table-providers/bulk-actions-provider.tsx"
import RowActionsProvider from "./table-providers/row-actions-provider.tsx"
import ApiTablesController from "./api-tables-controller.tsx"

export default function ReactApiTable({ table, children, params }: any) {
    return (
        <>
            <TableCoreProvider>
                <TableColumnsProvider>
                    <BulkActionsProvider>
                        <RowActionsProvider>
                            <ApiTablesController table={table} params={params} />
                            {children}
                        </RowActionsProvider>
                    </BulkActionsProvider>
                </TableColumnsProvider>
            </TableCoreProvider>
        </>
    )
}

