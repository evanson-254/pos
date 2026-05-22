// InventoryReports.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Package, AlertTriangle, Boxes, Warehouse } from "lucide-react";

const inventoryStats = [
  {
    title: "Total Products",
    value: "1,240",
    icon: Boxes,
  },
  {
    title: "Low Stock",
    value: "18",
    icon: AlertTriangle,
  },
  {
    title: "Out of Stock",
    value: "6",
    icon: Package,
  },
  {
    title: "Warehouses",
    value: "3",
    icon: Warehouse,
  },
];

const stockItems = [
  {
    name: "USB Cable",
    stock: 20,
    progress: 20,
  },
  {
    name: "Laptop Stand",
    stock: 45,
    progress: 45,
  },
  {
    name: "Monitor 24 Inch",
    stock: 10,
    progress: 10,
  },
];

export default function InventoryReports() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {inventoryStats.map((item) => (
          <Card key={item.title} className="rounded-2xl shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {item.title}
                </p>
                <h2 className="text-3xl font-bold mt-1">{item.value}</h2>
              </div>

              <div className="bg-muted rounded-xl p-3">
                <item.icon className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Low Stock Products</CardTitle>
          <CardDescription>
            Products nearing reorder level
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {stockItems.map((item) => (
            <div key={item.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span>{item.stock} remaining</span>
              </div>

              <Progress value={item.progress} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}