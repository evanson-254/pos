import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, Trash } from "lucide-react"

import { Button } from "../ui/button"
import { DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenu } from "../ui/dropdown-menu"
import { Input } from "../ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table"
import { cn } from "~/lib/utils"




interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  actions?: any,
  action?: { type: string, excute: any }
}

export function DataTable<TData, TValue>({
  columns,
  data,
  actions,
  action,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState<string>("")

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter
    },
  })

  return (
    <div className="w-full space-y-4">
      {/* Top Toolbar: Search Input + Column Visibility Dropdown */}
      <div className="flex items-center justify-between gap-4 px-2 sticky top-0 z-10">
        <Input
          placeholder="Filter payments..."
          value={table.getState()?.globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        {table.getFilteredSelectedRowModel().rows.length > 0 && actions ?
          <div
            className={cn((table.getFilteredSelectedRowModel().rows.length > 0 && actions) ? "flex fixed bottom-5 left-1/2 -translate-x-1/2" : "hidden")}
          >
            <div className="flex bg-white rounded-md border border-gray-200 divide-x divide-gray-200 shadow-sm px-2 py-1 space-x-2">
              {Object.keys(actions).map((key) => {
                return <Button variant="default" size="sm" key={key} onClick={() => actions[key]?.act(table.getFilteredSelectedRowModel().rows.map((row)=>row.original))}>
                  {actions[key].icon}
                  {key}
                </Button>
              })}
            </div>

            {/* <Button variant="default" size="sm" 
            onClick={()=>actions.delete(table.getFilteredSelectedRowModel().rows.map((row) => row.getValue("id")).join(","))}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button> */}


          </div>
          :
          <div
            className={cn(table.getFilteredSelectedRowModel().rows.length > 0 && actions ? "hidden" : "flex")}

          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="ml-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }
      </div>

      {/* Main Data Table View */}
      <div className="bg-card border-y">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>

            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer Layout: Selection Stats + Pagination Buttons */}
      <div className="flex items-center justify-between px-2 pb-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
