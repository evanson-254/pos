import { useEffect, useRef, useState } from "react";
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
import { BarcodePrintSheet } from "~/components/PriceTags";
import { useReactToPrint } from "react-to-print";
import { exportToCSV, handleDownload } from "~/lib/csvutils";
import { Download, Printer, Trash } from "lucide-react";
import { cn } from "~/lib/utils";


type ProductProps = {
    name: string,
    sku: string,
}

export async function clientLoader({ }) {
    const { data, status } = await apiRequest("GET", "/products");
    return { products: data?.products, stats: data?.stats }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const { status, message, errors } = await apiRequest("DELETE", "/product/delete/" + formData.get("id"), formData);
    if (status == 200) {
        toast.success(message);
    }
    return { errors, status }
}


export default function Products({ loaderData }: Route.ComponentProps) {
    const { products, stats } = loaderData || { products: [] }
    const [open, setOpen] = useState(false);
    //const [selectedIds, setselectedIds] = useState<string | null>(null);
    const [item, setItem] = useState<"delete" | "print" | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<any[] | null>(products);

    const getActive = () => {
        return getActiveProducts()?.map((prod) => {
            return prod?.name
        });
    }

    const getActiveProducts = () => {
        return selectedProducts;
        // if (!selectedIds) return null;
        // const str = selectedIds?.toString()
        // return str?.split(",").map((id) => {
        //     return products?.find((product: any) => product.id == id);

        // });
    }
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        contentRef: componentRef, // Points to the ref bound to our printable template layout
        documentTitle: "Product_Barcodes_Sheet",
    });
    

    const tableActions = {
        delete: {
            name: "Delete",
            icon: <Trash className="mr-2 h-4 w-4" />,
            act: (id: any) => { setOpen(true); setSelectedProducts(id); setItem("delete");}
        },
        print: {
            name: "Print Barcode",
            icon: <Printer className="mr-2 h-4 w-4" />,
            act: (id: any) => { setOpen(true); setSelectedProducts(id); setItem("print") }
        },
        export: {
            name: "Export",
            icon: <Download className="mr-2 h-4 w-4" />,
            act: (id: any) => { setSelectedProducts(id); handleDownload(selectedProducts||[]);  }
        }
    };

    // useEffect(() => {
    //     const selectedProducts = getActiveProducts();
    //     if (selectedProducts?.length) {
    //         setSelectedProducts(selectedProducts)
    //     } else {
    //         setSelectedProducts(products)
    //     }
    // }, [selectedProducts])

    return (
        <>
            <title>Products - POS</title>
            <section className="space-y-4 px-4 my-4">
                {/* {JSON.stringify(products)}  */}
                <Card>
                    <CardHeader>
                        <CardTitle>Products</CardTitle>
                        <CardDescription>Manage inventory, stock levels, pricing, and product categories.</CardDescription>
                        {/* {JSON.stringify(selectedProducts)} */}
                        <CardAction>
                            <Button asChild>
                                <Link to={"/product/update/new"}>Add Product</Link>
                            </Button>

                        </CardAction>

                    </CardHeader>
                    <CardContent className="space-y-6">
                        <ProductSummary summary={stats} />
                        <ProductTable products={products || []} actions={tableActions} />
                    </CardContent>
                </Card>
                <AppModal
                    title={item == "print" ? "Print Barcode" : "Delete Prodcts"}
                    description={item == "print" ? "Print Barcode" : ""}
                    open={open} onClose={setOpen}
                    width={cn(item == "print" && "!min-w-[90vw]")}
                >
                    {item == "delete" && <>
                        <span>
                          
                            {getActive()?.map((item, index) => (
                                <span key={index}>
                                    {index > 0 && <br />}
                                  {index + 1}.  {item}
                                </span>
                            ))}
                        </span>

                        <DeleteForm id={selectedProducts} itemName={"Products"} path={"/products"} action={"delete"} state={() => setOpen(false)} />
                    </>}
                    {item == "print" && <div className=" relative">
                        <Button onClick={handlePrint} className="sticky top-0 right-0">Print Barcode</Button>
                        <BarcodePrintSheet products={selectedProducts || []} ref={componentRef} />
                    </div>}
                </AppModal>
            </section>
        </>
    )
}