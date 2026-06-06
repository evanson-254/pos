import { ArrowDownAZ, ArrowDownUp, ArrowUpAZ, ArrowUpDown, CheckCircle2, Download, Eye, MoreHorizontal, MoreVertical, PenBoxIcon, Trash, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox"
import { type Column, type ColumnDef, type Table } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import type { sales } from "../salesHistorytable";
import { Badge } from "../ui/badge";
import { cn } from "~/lib/utils";
import type { Refunds } from "../refundTable";
import type { Product } from "../ProductTable";
import { Link } from "react-router";




// Define your data structure
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  cashier: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "cashier",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cashier
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("cashier")}</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KES",
      }).format(amount)

      return <div className="text- font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

function SortButton<T>({ column, colname }: { column: Column<T>, colname: string }) {
  return (
    <span className={cn("cursor-pointer flex gap-1 hover:bg-brand hover:bg-clip-text hover:text-transparent transition p-2", column.getIsSorted() && "text-primary")} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
      {colname} {column.getIsSorted() && (
        column.getIsSorted() === "asc" ? <ArrowUpAZ className="ml-2 h-4 w-4 text-primary" /> : <ArrowDownAZ className="ml-2 h-4 w-4 text-primary" />)}
    </span>
  )
}
export const salesColumn = ({ displayReceipt }: { displayReceipt: any }): ColumnDef<sales>[] => [
  {
    id: "select",

    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "invoice_code",
    header: ({ column }) => <SortButton colname="Invoice" column={column} />,
    cell: ({ row }) => <span className="font-medium">{row.getValue("invoice_code")}</span>
  },
  {
    accessorKey: "cashier",
    header: ({ column }) => <SortButton colname="Cashier" column={column} />,
  },
  {
    accessorKey: "date",
    header: ({ column }) => <SortButton colname="Date" column={column} />,
  },
  {
    accessorKey: "payment",
    header: ({ column }) => <SortButton colname="Payment" column={column} />,
  },
  {
    accessorKey: "items",
    header: ({ column }) => <SortButton colname="Items" column={column} />,
  },
  {
    accessorKey: "total",
    header: ({ column }) => <SortButton colname="Total" column={column} />,
    cell: ({ row }) => <span className="font-semibold">{row.getValue("total")}</span>
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortButton colname="Status" column={column} />,
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return (
        <Badge
          variant="outline"
          className={`
                        ${status === "Completed"
              ? "border-green-500 text-green-600"
              : ""
            }

                        ${status === "Pending"
              ? "border-yellow-500 text-yellow-600"
              : ""
            }

                        ${status === "Refunded"
              ? "border-red-500 text-red-600"
              : ""
            }
                      `}
        >
          {status}
        </Badge>
      )
    },
    enableHiding: false,

  },
  {
    accessorKey: "sale",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => displayReceipt(row.getValue("sale"))}>
                <Eye className="mr-2 h-4 w-4" />
                View Receipt
                <div className="overflow-auto">
                  {/* {JSON.stringify(row.original)} */}
                </div>


              </DropdownMenuItem>

              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    enableHiding: false,
    enableSorting: false,
  },

];

export const refundColumn = ({ actions }: { actions: any }): ColumnDef<Refunds>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <SortButton colname="Refund Id" column={column} />,
    cell: ({ row }) => <span className="font-medium">{row.getValue("id")}</span>
  },
  {
    accessorKey: "invoice",
    header: ({ column }) => <SortButton colname="Invoice" column={column} />,
  },
  {
    accessorKey: "customer",
    header: ({ column }) => <SortButton colname="Initiator" column={column} />,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <SortButton colname="Amount" column={column} />,
    cell: ({ row }) => <span className="font-semibold">{row.getValue("amount")}</span>
  },
  {
    accessorKey: "reason",
    header: ({ column }) => <SortButton colname="Reason" column={column} />,
  },
  {
    accessorKey: "date",
    header: ({ column }) => <SortButton colname="Date" column={column} />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortButton colname="Status" column={column} />,
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return (
        <Badge
          variant="outline"
          className={`
                          ${status === "approved"
              ? "border-green-500 text-green-600"
              : ""
            }

                          ${status === "pending"
              ? "border-yellow-500 text-yellow-600"
              : ""
            }

                          ${status === "rejected"
              ? "border-red-500 text-red-600"
              : ""
            }
                        `}
        >
          {status}
        </Badge>
      )
    }
  },
  {
    id: "action",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      return (
        <div className="text-right">
          <div className="flex justify-end gap-2">
            {/* {typeof actions} */}
            <Button
              size="icon"
              variant="outline"
              asChild
              className="rounded-xl"
            >
              <Link to={"/sales-history?invoice=" + row.getValue("invoice")}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>

            {status === "pending" && (
              <>
                <Button
                  size="icon"
                  className=""
                  title="Approve"
                  onClick={() => actions().approve(row.original)}
                >
                  <CheckCircle2 className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="destructive"
                  className=""
                  title="Reject"
                  onClick={() => actions().reject(row.original)}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

      )
    }
  }

];

export const productsColumn = ({ delAct }: { delAct?: any }): ColumnDef<Product>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: ({ column }) => <SortButton colname="Image" column={column} />,
    cell: ({ row }) => (
      <div className="h-10 w-10">
        <img src={row.getValue("image") ?? "/logo.png"} alt="logo" className="h-full w-auto object-cover" />
      </div>
    )
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortButton colname="Name" column={column} />,
  },
  {
    accessorKey: "price",
    header: ({ column }) => <SortButton colname="branch price" column={column} />,
    cell: ({ row }) => row.getValue("price") ?? row.getValue("selling_price")

  },
  {
    accessorKey: "selling_price",
    header: ({ column }) => <SortButton colname="gen price" column={column} />,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <SortButton colname="Stock" column={column} />,
  },
  {
    accessorKey: "branch",
    header: ({ column }) => <SortButton colname="Branch" column={column} />,
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => <SortButton colname="Date" column={column} />,
  },


  {
    accessorKey: "category",
    header: ({ column }) => <SortButton colname="Category" column={column} />,
  },
  // {
  //   accessorKey: "brand_id",
  //   header: ({ column }) => <SortButton colname="Brand" column={column} />,
  // },
  {
    accessorKey: "sku",
    header: ({ column }) => <SortButton colname="SKU" column={column} />,
  },

  {
    accessorKey: "barcode",
    header: ({ column }) => <SortButton colname="Barcode" column={column} />,
  },
  // {
  //   accessorKey: "supplier_id",
  //   header: ({ column }) => <SortButton colname="suplier" column={column} />,
  // },
  {
    accessorKey: "status",
    header: ({ column }) => <SortButton colname="Status" column={column} />,
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      const variant = status == "in_stock" ? "success" : (status == "low_stock" ? "danger" : "warning")
      return (
        <Badge
          variant={"outline"}
          className={

            cn(

              variant == "success" && "border-green-500 text-green-600",
              variant == "danger" && "border-red-500 text-red-600",
              variant == "warning" && "border-yellow-500 text-yellow-600",
            )
          }
        >
          {status}
        </Badge>
      )
    }
  },
  {

    accessorKey: "id",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="rounded-xl"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={"/product/update/" + row.getValue("id")}>
                  <PenBoxIcon className="mr-2 h-4 w-4" />
                  Update
                </Link>

              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => delAct(row.getValue("id"))} >

                <Trash className="mr-2 h-4 w-4" />
                Delete


              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    enableHiding: false,
    enableSorting: false,
  }

]


