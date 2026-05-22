import { productsColumn } from "~/components/datatable/column";
import { DataTable } from "~/components/datatable/table";
import ProductSummary from "~/components/productsSummary";
import ProductTable from "~/components/ProductTable";
import { Button } from "~/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";



export default function Products() {
    return (
        <>
            <title>Products - POS</title>
            <section className="space-y-4 px-4 my-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Products</CardTitle>
                        <CardDescription>Manage inventory, stock levels, pricing, and product categories.</CardDescription>
                        <CardAction>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button>Product actions</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <Button variant={"outline"}>Add product</Button>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Button variant={"outline"}>Import Csv</Button>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Button variant={"outline"}>Export Products</Button>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Button variant={"outline"}>Print Barcode</Button>
                                    </DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardAction>

                    </CardHeader>
                    <CardContent className="space-y-6">
                        <ProductSummary/>
                        <ProductTable/>
                    </CardContent>
                </Card>
            </section>
        </>
    )
}