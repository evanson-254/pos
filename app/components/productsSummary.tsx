import { Card, CardContent } from "./ui/card"

export default function ProductSummary(){
    const summary =[
        {name: "Total product",  value: "1,245"},
        { name:  "Low stock", value: 18},
        { name: "Out of stock", value: 10},
        { name: "categories", value: 10},
        { name: "inventory value", value: "KES 1, 254, 000"},
    ]
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {summary.map((item)=>(
                <Card className="p-4">
                    <CardContent className="space-y-2">
                        <h5 className="text-muted-foreground">{item.name}</h5>
                        <p className="font-semibold text-2xl">{item.value}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}