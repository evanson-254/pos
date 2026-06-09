import { Download, Receipt } from "lucide-react";
import { salesColumn } from "./datatable/column";
import { DataTable } from "./datatable/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "./ui/card";
import { Button } from "./ui/button";
import { useLoaderData } from "react-router";
import type { clientLoader } from "~/routes/pos/saleshistory";
import { handleDownload } from "~/lib/csvutils";
export type sales = {
  id: string;
  customer: string;
  date: string;
  payment: string;
  items: number;
  total: number;
  status: string;
  sales: any;
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

export default function SalesHistoryDatatable({ displayReceipt }: { displayReceipt: any }) {
  const { sales, stats } = useLoaderData<typeof clientLoader>();
  const action={
    export:{
      name:"Export",
      icon:<Download className="mr-2 h-4 w-4" />,
      act:(data:any[])=>handleDownload(data?.map(({ sale, ...rest }: any) => rest) || [], "sale_history")
    }
  }
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
          <Button className=""
            onClick={() => handleDownload(sales?.map(({ sale, ...rest }: any) => rest) || [], "sale_history")}
          >
            <Receipt className="mr-2 h-4 w-4" />
            Export
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <DataTable columns={salesColumn({ displayReceipt })} data={sales} actions={action} />
      </CardContent>
    </Card>
  )

}