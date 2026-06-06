import { useState } from "react";
import { Link } from "react-router";
import AppModal from "~/components/appmodal";
import { productsColumn } from "~/components/datatable/column";
import { DataTable } from "~/components/datatable/table";
import { MultiBranchProductForm } from "~/components/product/ProdForm";
import ProductSummary from "~/components/productsSummary";
import ProductTable from "~/components/ProductTable";
import { Button } from "~/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { apiRequest } from "~/services/apiRequest";
import type { Route } from "./+types/product";
import { DeleteForm } from "~/components/DeleteForm";
import { toast } from "sonner";


type ProductProps = {
    name: string,
    sku: string,
}

export async function clientLoader({ }) {
    const { data, status } = await apiRequest("GET", "/products");
    return { products: data?.products, stats: data?.stats }
}

export async function clientAction({request}:Route.ClientActionArgs){
    const formData = await request.formData();
    const { status, message,  errors} = await apiRequest("DELETE", "/product/delete/"+formData.get("id"), formData);
    if(status==200){
        toast.success(message);
    }
    return { errors, status }
}


export default function Products({ loaderData }: Route.ComponentProps) {
    const { products, stats } = loaderData || { products: [] }
    const [open, setOpen] = useState(false);
    const [selectedIds, setselectedIds] = useState<string | null>(null);
    const getActive = () => {
        if (!selectedIds) return null;
       const str= selectedIds?.toString()
        return str?.split(",").map((id) => {
            const prod = products?.find((product: any) => product.id == id);
            return prod?.name
        });
    }
    return (
        <>
            <title>Products - POS</title>
            <section className="space-y-4 px-4 my-4">
                {/* {JSON.stringify(products)}  */}
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
                                        <Button variant={"outline"} asChild >
                                            <Link to={"/product/update/new"}>Add Product</Link>
                                        </Button>
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
                        <ProductSummary summary={stats} />
                        <ProductTable products={products || []} deleteAct={(id: any) => { setOpen(true); setselectedIds(id) }} />
                    </CardContent>
                </Card>
                <AppModal 
                title={"Delete Prodcts"} 
                description={getActive()?.join(", ")}
                open={open} onClose={setOpen} >
                    <DeleteForm id={selectedIds} itemName={"Products"} path={"/products"} action={"delete"} state={() => setOpen(false)} />
                </AppModal>
            </section>
        </>
    )
}