import { useLoaderData } from "react-router";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { clientLoader } from "~/routes/home";

const lowStockItems = [
    {
        id: 1,
        name: "Sugar 2kg",
        stock: 3,
    },
    {
        id: 2,
        name: "Cooking Oil",
        stock: 2,
    },
    {
        id: 3,
        name: "Bread",
        stock: 5,
    },
];

export default function LowStockAlert() {
    const { lowStockItems } = useLoaderData<typeof clientLoader>();
    return (
        <div className="">
            <Card className="">
                <CardHeader>
                    <CardTitle>Low Stock Alerts</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {lowStockItems?.map((item:any) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between border-b pb-3"
                        >
                            <div>
                                <h3 className="font-medium">{item.name}</h3>

                                <p className="text-sm text-muted-foreground">
                                    Remaining Stock: {item.stock}
                                </p>
                            </div>

                            <Badge variant="destructive">
                                Low
                            </Badge>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>

    );
}