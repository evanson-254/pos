import { useLoaderData } from "react-router";
import { refundColumn } from "./datatable/column";
import { DataTable } from "./datatable/table";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card";
import type { clientLoader } from "~/routes/pos/refunds";
import { Download } from "lucide-react";
import { handleDownload } from "~/lib/csvutils";

export type Refunds = {
    id: string,
    invoice: string,
    customer: string,
    amount: number,
    reason: string,
    status: string,
    date: string,
}

const refunds = [
  {
    id: "REF-1001",
    invoice: "INV-2001",
    customer: "John Doe",
    amount: 120,
    reason: "Wrong item",
    status: "Approved",
    date: "17 May 2026",
  },
  {
    id: "REF-1002",
    invoice: "INV-2002",
    customer: "Alice Smith",
    amount: 80,
    reason: "Damaged product",
    status: "Pending",
    date: "16 May 2026",
  },
  {
    id: "REF-1003",
    invoice: "INV-2003",
    customer: "Walk-in Customer",
    amount: 45,
    reason: "Customer cancelled",
    status: "Rejected",
    date: "15 May 2026",
  },
];


export default function RefundTable({actions}:{actions:any}) {
    const { refunds } = useLoaderData<typeof clientLoader>();
    const action = {
        export: {
            name: "Export",
            icon: <Download className="mr-2 h-4 w-4" />,
            act: (data: any[]) => handleDownload(data?.map(({ sale, ...rest }: any) => rest) || [], "refund_history")
        }
    }
    return(
        <Card className="">
            <CardHeader>
                <CardTitle>Refund History</CardTitle>
                <CardDescription>View and manage refund history</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={refundColumn({actions})} data={refunds} actions={action}/>
            </CardContent>
        </Card>
    )
}