// CashierReports.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Users, Clock, ReceiptText, DollarSign } from "lucide-react";

const cashierStats = [
  {
    title: "Active Cashiers",
    value: "8",
    icon: Users,
  },
  {
    title: "Total Transactions",
    value: "540",
    icon: ReceiptText,
  },
  {
    title: "Working Hours",
    value: "72h",
    icon: Clock,
  },
  {
    title: "Cash Collected",
    value: "$18,200",
    icon: DollarSign,
  },
];

const cashiers = [
  {
    name: "John Doe",
    sales: "$4,200",
    shift: "Morning",
  },
  {
    name: "Sarah Kim",
    sales: "$3,850",
    shift: "Afternoon",
  },
  {
    name: "Mike Ross",
    sales: "$5,120",
    shift: "Night",
  },
];

export default function CashierReports() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cashierStats.map((item) => (
          <Card key={item.title} className="rounded-2xl shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-1">{item.value}</h2>
              </div>

              <div className="bg-muted p-3 rounded-xl">
                <item.icon className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Cashier Performance</CardTitle>
          <CardDescription>
            Performance overview for staff
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {cashiers.map((cashier) => (
            <div
              key={cashier.name}
              className="flex items-center justify-between border rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {cashier.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="font-medium">{cashier.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {cashier.shift} Shift
                  </p>
                </div>
              </div>

              <div className="font-semibold">{cashier.sales}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}