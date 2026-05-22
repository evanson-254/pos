import {
  Card,
  CardContent,
} from "./ui/card";

const stats = [
  {
    title: "Today's Sales",
    value: "KSh 24,000",
  },
  {
    title: "Products",
    value: "1,245",
  },
  {
    title: "Orders",
    value: "342",
  },
  {
    title: "Customers",
    value: "120",
  },
];

export default function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className=""
        >
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              {stat.title}
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {stat.value}
            </h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}