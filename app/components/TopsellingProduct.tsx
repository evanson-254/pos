import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Progress } from "./ui/progress";

const topProducts = [
  {
    id: 1,
    name: "Cooking Oil",
    sold: 120,
    percentage: 90,
  },
  {
    id: 2,
    name: "Bread",
    sold: 90,
    percentage: 70,
  },
  {
    id: 3,
    name: "Sugar",
    sold: 70,
    percentage: 55,
  },
];

export default function TopSellingProducts() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {topProducts.map((product) => (
          <div key={product.id}>
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h3 className="font-medium">
                  {product.name}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {product.sold} sold
                </p>
              </div>

              <span className="text-sm font-semibold">
                {product.percentage}%
              </span>
            </div>

            <Progress value={product.percentage} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}