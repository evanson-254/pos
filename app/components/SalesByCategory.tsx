import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useLoaderData } from "react-router";
import type { clientLoader } from "~/routes/home";

const data = [
  { name: "Beverages", value: 400 },
  { name: "Bakery", value: 300 },
  { name: "Electronics", value: 200 },
  { name: "Stationery", value: 100 },
];

const COLORS = [
  "#ef4444",
  "#f97316",
  "#3b82f6",
  "#10b981",
];

export default function SalesByCategory() {
  const { saleByCategory:data } = useLoaderData<typeof clientLoader>();
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Sales by Category</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                outerRadius={100}
                label
              >
                {data?.map((_: any, index: number) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}