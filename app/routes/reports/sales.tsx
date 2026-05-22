// SalesReports.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { TrendingUp, ShoppingCart, DollarSign, Receipt } from "lucide-react";

const salesSummary = [
  {
    title: "Total Sales",
    value: "$12,450",
    icon: DollarSign,
    growth: "+12%",
  },
  {
    title: "Orders",
    value: "320",
    icon: ShoppingCart,
    growth: "+8%",
  },
  {
    title: "Invoices",
    value: "287",
    icon: Receipt,
    growth: "+4%",
  },
  {
    title: "Profit",
    value: "$4,120",
    icon: TrendingUp,
    growth: "+15%",
  },
];

const topProducts = [
  { name: "Wireless Mouse", sales: 120, amount: "$2,400" },
  { name: "Keyboard RGB", sales: 98, amount: "$1,960" },
  { name: "Gaming Headset", sales: 75, amount: "$1,500" },
];

export default function SalesReports() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {salesSummary.map((item) => (
          <Card key={item.title} className="rounded-2xl shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {item.title}
                </p>
                <h2 className="text-3xl font-bold mt-1">{item.value}</h2>
                <Badge className="mt-3">{item.growth}</Badge>
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
          <CardTitle>Top Selling Products</CardTitle>
          <CardDescription>
            Best performing products this month
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product) => (
              <div
                key={product.name}
                className="flex items-center justify-between border rounded-xl p-4"
              >
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.sales} units sold
                  </p>
                </div>

                <div className="font-semibold">{product.amount}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}