import { Receipt } from "lucide-react";
import { salesColumn } from "./datatable/column";
import { DataTable } from "./datatable/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "./ui/card";
import { Button } from "./ui/button";
export type sales = {
  id: string;
  customer: string;
  date: string;
  payment: string;
  items: number;
  total: number;
  status: string;
};

const sales = [
  {
    id: "INV-1001",
    customer: "John Doe",
    date: "17 May 2026",
    payment: "Cash",
    items: 3,
    total: 120,
    status: "Completed",
  },
  {
    id: "INV-1002",
    customer: "Alice Smith",
    date: "17 May 2026",
    payment: "Mpesa",
    items: 5,
    total: 320,
    status: "Completed",
  },
  {
    id: "INV-1003",
    customer: "Michael Brown",
    date: "16 May 2026",
    payment: "Card",
    items: 2,
    total: 85,
    status: "Pending",
  },
  {
    id: "INV-1004",
    customer: "Walk-in Customer",
    date: "16 May 2026",
    payment: "Cash",
    items: 1,
    total: 40,
    status: "Refunded",
  },
];

export default function SalesHistoryDatatable() {
  return (
    <Card className="border-0 shadow-sm ">
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle className="text-2xl font-bold">
            Sales History
          </CardTitle>

          <CardDescription>
            View and manage recent sales transactions
          </CardDescription>
        </div>
        <CardAction>
          <Button className="">
            <Receipt className="mr-2 h-4 w-4" />
            Export
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <DataTable columns={salesColumn} data={sales}/>
      </CardContent>
    </Card>
  )

}