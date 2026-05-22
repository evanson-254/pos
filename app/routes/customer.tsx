// SuppliersPage.tsx

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table";

import { Button } from "~/components/ui/button";
import { Plus, Eye, Pencil } from "lucide-react";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { useState } from "react";
import { ReusableForm } from "~/components/FetcherForm";
import { Field, FieldGroup, FieldLabel, FieldSet } from "~/components/ui/field";


const suppliers = [
    {
        id: 1,
        name: "Tech Supply Ltd",
        phone: "+254712345678",
        email: "info@techsupply.com",
        products: 24,
    },
    {
        id: 2,
        name: "Digital Hub",
        phone: "+254798765432",
        email: "sales@digitalhub.com",
        products: 15,
    },
];



export default function SuppliersPage() {

    return (
        <div className="space-y-6 px-4 my-4">
            <title>Customers - POS</title>
            {/* header */}
            <Card>
                <CardHeader >
                    <CardTitle className="text-2xl font-bold">Customers</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Manage inventory Customers
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* table */}
                    <div className="border ">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Supplier</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Products</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {suppliers.map((supplier) => (
                                    <TableRow key={supplier.id}>
                                        <TableCell>{supplier.name}</TableCell>

                                        <TableCell>{supplier.phone}</TableCell>

                                        <TableCell>{supplier.email}</TableCell>

                                        <TableCell>{supplier.products}</TableCell>

                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline">
                                                    <Eye className="h-4 w-4" />
                                                </Button>

                                                <Button size="sm">
                                                    <Pencil className="h-4 w-4" />
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


