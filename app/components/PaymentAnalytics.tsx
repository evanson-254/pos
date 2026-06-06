import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
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

const paymentData = [
  {
    method: "Cash",
    amount: 120000,
  },
  {
    method: "M-Pesa",
    amount: 240000,
  },
  {
    method: "Card",
    amount: 80000,
  },
];

export default function PaymentAnalytics() {
  const { paymentAnalytics:paymentData } = useLoaderData<typeof clientLoader>();
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>
          Payment Method Analytics
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart data={paymentData}>
              <XAxis dataKey="method" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="amount"
                fill="#f97316"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}