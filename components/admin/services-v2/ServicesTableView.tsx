"use client"

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from "@tanstack/react-table"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, ArrowUp, ArrowDown, Edit2, Trash2, Star, Search } from "lucide-react"
import Link from "next/link"
import type { Service } from "@/lib/swr/hooks/services"

const col = createColumnHelper<Service>()

interface ServicesTableViewProps {
  services: Service[]
  onDelete: (id: string) => void
}

export function ServicesTableView({ services, onDelete }: ServicesTableViewProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const columns = [
    col.accessor("name", {
      header: ({ column }) => (
        <SortHeader label="Name" column={column} />
      ),
      cell: (info) => (
        <div>
          <p className="font-medium text-sm">{info.getValue()}</p>
          {info.row.original.description && (
            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{info.row.original.description}</p>
          )}
        </div>
      ),
    }),
    col.accessor("category", {
      header: "Category",
      cell: (info) =>
        info.getValue() ? (
          <Badge variant="outline" className="text-[10px] border-slate-300 text-muted-foreground">
            {info.getValue()}
          </Badge>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        ),
    }),
    col.accessor("price", {
      header: ({ column }) => <SortHeader label="Price" column={column} />,
      cell: (info) => (
        <span className="font-semibold text-emerald-600 text-sm">
          ${info.getValue().toLocaleString()}
        </span>
      ),
    }),
    col.accessor("rating", {
      header: ({ column }) => <SortHeader label="Rating" column={column} />,
      cell: (info) => {
        const r = info.getValue()
        const count = info.row.original.ratingsCount
        if (!r || r === 0) return <span className="text-xs text-muted-foreground">—</span>
        return (
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {r.toFixed(1)}
            {count ? <span className="text-xs text-muted-foreground">({count})</span> : null}
          </div>
        )
      },
    }),
    col.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/services/${row.original.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs h-7 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
            >
              <Edit2 className="w-3 h-3" /> Edit
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onDelete(row.original.id)}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      ),
    }),
  ]

  const table = useReactTable({
    data: services,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const rows = table.getRowModel().rows

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Filter services…"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="bg-slate-50 border-b border-slate-200">
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-muted-foreground text-sm">
                  No services found.
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                    i % 2 !== 0 ? "bg-slate-50/50" : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground">
        {table.getFilteredRowModel().rows.length} of {services.length} services
      </p>
    </div>
  )
}

function SortHeader({ label, column }: { label: string; column: any }) {
  const sorted = column.getIsSorted()
  return (
    <button
      className="flex items-center gap-1 font-semibold hover:text-foreground transition-colors"
      onClick={() => column.toggleSorting()}
    >
      {label}
      {sorted === "asc" ? (
        <ArrowUp className="w-3 h-3" />
      ) : sorted === "desc" ? (
        <ArrowDown className="w-3 h-3" />
      ) : (
        <ArrowUpDown className="w-3 h-3 opacity-40" />
      )}
    </button>
  )
}
