import React from "react";
import {useQuery} from "react-query";
import {Parcel, ServiceClient} from "./generated/api/WingClients";
import axios from "axios";
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useApi} from "./useApi";



export function Drop() {

    const {isLoading, data} = useApi();

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
            //format as number without decimals using the built-in formatter
            cell: info => info.row.original.weight.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }),
            footer: info => info.column.id,
        }),
        columnHelper.accessor("items", {
            header: () => 'Items',
            //add a custom cell renderer
            cell: info => <div className="flex flex-col gap-2">{info.row.original.items.map(i =>
                <div className="flex gap-2">
                    <div>{i.item_id}</div>
                    <div>{i.quantity}</div>
                </div>)}</div>,
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

                <div className="w-fit">
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
                </div>

            </div>}

        </div>
    );
}
