// PurchasesPage.tsx

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table";

import { Button } from "~/components/ui/button";

import {
    Plus,
    Eye,
    Printer,
    Truck,
} from "lucide-react";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

const purchases = [
    {
        id: 1,
        invoice: "PUR-001",
        supplier: "Tech Supply Ltd",
        total: "KES 58,160",
        status: "Paid",
        date: "12 May 2026",
    },

    {
        id: 2,
        invoice: "PUR-002",
        supplier: "Digital Hub",
        total: "KES 78,620",
        status: "Partial",
        date: "15 May 2026",
    },
];

export default function PurchasesPage() {
    return (
        <div className="space-y-6 px-4 my-4">
            <title>Purchases - POS</title>
            <Card>

                {/* header */}
                <CardHeader >

                    <CardTitle className="text-2xl font-bold">
                        Purchases
                    </CardTitle>

                    <CardDescription className="text-muted-foreground">
                        Track inventory purchases
                    </CardDescription>

                    <CardAction>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            New Purchase
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* stats */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="border p-5">
                            <p className="text-sm text-muted-foreground">
                                Total Purchases
                            </p>

                            <h2 className="text-2xl font-bold">
                                KES 136,780
                            </h2>
                        </div>

                        <div className="border p-5">
                            <p className="text-sm text-muted-foreground">
                                Pending Payments
                            </p>

                            <h2 className="text-2xl font-bold">
                                KES 20,000
                            </h2>
                        </div>

                        <div className="border p-5">
                            <p className="text-sm text-muted-foreground">
                                Suppliers
                            </p>

                            <h2 className="text-2xl font-bold">
                                12
                            </h2>
                        </div>
                    </div>

                    {/* table */}
                    <div className="border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Invoice</TableHead>
                                    <TableHead>Supplier</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {purchases.map((purchase) => (
                                    <TableRow key={purchase.id}>
                                        <TableCell>
                                            {purchase.invoice}
                                        </TableCell>

                                        <TableCell>
                                            {purchase.supplier}
                                        </TableCell>

                                        <TableCell>
                                            {purchase.date}
                                        </TableCell>

                                        <TableCell>
                                            {purchase.total}
                                        </TableCell>

                                        <TableCell>
                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                                                {purchase.status}
                                            </span>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline">
                                                    <Eye className="h-4 w-4" />
                                                </Button>

                                                <Button size="sm" variant="outline">
                                                    <Printer className="h-4 w-4" />
                                                </Button>

                                                <Button size="sm">
                                                    <Truck className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>

            </Card>
        </div>
    );
}