"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { UIStock } from "@/types/ui";

type Props = {
  data: UIStock[];
};

export default function PortfolioTable({ data }: Props) {
  const columns: ColumnDef<UIStock>[] = [
    {
      header: "Stock",
      accessorKey: "name",
      cell: info => info.getValue(),
    },
    {
      header: "Qty",
      accessorKey: "qty",
      cell: info => info.getValue(),
    },
    {
      header: "Purchase Price",
      accessorKey: "purchasePrice",
      cell: info => `₹${info.getValue()}`,
    },
    {
      header: "Investment",
      accessorKey: "investment",
      cell: info => `₹${info.getValue()}`,
    },
    {
      header: "Portfolio %",
      accessorKey: "portfolioPercent",
      cell: info => `${Number(info.getValue()).toFixed(2)}%`,
    },
    {
      header: "CMP",
      accessorKey: "cmp",
      cell: info => info.getValue() ?? "-",
    },
    {
      header: "Present Value",
      accessorKey: "presentValue",
      cell: info =>
        info.getValue() ? `₹${info.getValue()}` : "-",
    },
    {
      header: ({ column }) => {
        const sort = column.getIsSorted();

        return (
          <button
            onClick={() =>
              column.toggleSorting(sort === "asc")
            }
            className="flex items-center gap-1 select-none"
          >
            Gain / Loss
            <span className="text-xs">
              {sort === "asc"
                ? "▲"
                : sort === "desc"
                ? "▼"
                : "↕"}
            </span>
          </button>
        );
      },
      accessorKey: "gainLoss",
      enableSorting: true,
      cell: info => {
        const val = info.getValue() as number | undefined;
        if (val == null) return "-";
        return (
          <span
            className={val >= 0 ? "text-green-600" : "text-red-600"}
          >
            ₹{val.toFixed(2)}
          </span>
        );
      },
    }

  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className="w-full border border-gray-200">
      <thead className="bg-gray-100">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b"
              >
                {flexRender(
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
          <tr key={row.id} className="hover:bg-gray-50">
            {row.getVisibleCells().map(cell => (
              <td
                key={cell.id}
                className="px-4 py-2 text-sm border-b"
              >
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
