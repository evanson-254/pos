import { useLoaderData } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import type { clientLoader } from "~/routes/home";

const cashiers = [
  {
    id: 1,
    name: "John",
    sales: 12000,
    transactions: 32,
  },
  {
    id: 2,
    name: "Mary",
    sales: 18000,
    transactions: 40,
  },
  {
    id: 3,
    name: "Kevin",
    sales: 9000,
    transactions: 20,
  },
];

export default function CashierActivity() {
  const { cashierActivity:cashiers } = useLoaderData<typeof clientLoader>();
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Cashier Activity</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {cashiers?.map((cashier:any) => (
          <div
            key={cashier.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div>
              <h3 className="font-medium">
                {cashier.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                {cashier.transactions} transactions
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold">
                KSh {cashier.sales}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}