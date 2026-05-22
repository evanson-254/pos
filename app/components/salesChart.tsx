import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";



const salesData = [
  { day: "Mon", sales: 400 },
  { day: "Tue", sales: 700 },
  { day: "Wed", sales: 500 },
  { day: "Thu", sales: 900 },
  { day: "Fri", sales: 1200 },
  { day: "Sat", sales: 800 },
  { day: "Sun", sales: 1500 },
];

export default function SalesChart() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Weekly Sales</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="#ef4444"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}