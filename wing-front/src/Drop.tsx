import React from "react";
import {useQuery} from "react-query";
import {Parcel, ServiceClient} from "./generated/api/WingClients";
import axios from "axios";
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";

export function Drop() {

    let serviceClient = new ServiceClient(undefined, axios.create({
            baseURL: process.env.REACT_APP_BASE_URL,
            transformResponse: data => data // this line here
        })
    );
    const {data, isLoading} = useQuery('drop', () => serviceClient.index().then((res) => res))

    const columnHelper = createColumnHelper<Parcel>()

    const columns = [
        columnHelper.accessor('tracking_id', {
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor(row => row.order_id, {
            id: 'lastName',
            cell: info => <i>{info.getValue()}</i>,
            header: () => <span>Order id</span>,
            footer: info => info.column.id,
        }),
        columnHelper.accessor("palette_number", {
            header: () => 'Palette Number',
            cell: info => info.renderValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor("weight", {
            header: () => 'Weight',
            cell: info => info.renderValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor("items", {
            header: () => 'Items',
            //add a custom cell renderer
            cell: info => <div><i>{info.row.original.items.map(i => i.item_id)}</i></div>,
            footer: info => info.column.id,
        })
    ]

    const table = useReactTable({
        data: data?.parcels || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (

        <div>
            {isLoading && <div>Loading...</div>}
            {data && <div>
                <div>{data.revenue}</div>

                <table>
                    <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    {table.getFooterGroups().map(footerGroup => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.footer,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </tfoot>
                </table>

            </div>}

        </div>
    );
}
