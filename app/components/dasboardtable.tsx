import { useLoaderData } from "react-router";
import { columns, type Payment } from "./datatable/column"
import { DataTable } from "./datatable/table"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import type { clientLoader } from "~/routes/home";


// const data: Payment[] = [
//   { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
//   { id: "489e1d5a", amount: 125, status: "success", email: "user@example.com" },
//   { id: "bc31d92e", amount: 450, status: "processing", email: "admin@example.com" },
// ]

export default function DashboardTable() {
  const { latestSales:data } = useLoaderData<typeof clientLoader>();
  return (
    <div className="container mx-auto ">
      <Card className="">
        <CardHeader>
          <CardTitle className="p-2 font-semibold mt-2">Lastest transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data||[]} />
        </CardContent>
      </Card>

    </div>
  )
}
