// FinancialReports.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { ArrowDown, ArrowUp, Wallet, CreditCard } from "lucide-react";

const financeCards = [
  {
    title: "Revenue",
    value: "$24,500",
    icon: ArrowUp,
  },
  {
    title: "Expenses",
    value: "$9,200",
    icon: ArrowDown,
  },
  {
    title: "Cash Flow",
    value: "$7,800",
    icon: Wallet,
  },
  {
    title: "Pending Payments",
    value: "$2,100",
    icon: CreditCard,
  },
];

const transactions = [
  {
    title: "Office Supplies",
    amount: "-$240",
    date: "12 May 2026",
  },
  {
    title: "Product Sales",
    amount: "+$1,200",
    date: "13 May 2026",
  },
  {
    title: "Supplier Payment",
    amount: "-$620",
    date: "14 May 2026",
  },
];

export default function FinancialReports() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {financeCards.map((item) => (
          <Card key={item.title} className="rounded-2xl shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-1">{item.value}</h2>
              </div>

              <div className="p-3 rounded-xl bg-muted">
                <item.icon className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Latest financial activities
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {transactions.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between border rounded-xl p-4"
            >
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.date}
                </p>
              </div>

              <div className="font-semibold">{item.amount}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}