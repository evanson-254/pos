import { MultiBranchProductForm } from "~/components/product/ProdForm";
import { CardTitle } from "~/components/ui/card";
import { apiRequest } from "~/services/apiRequest";
import type { Route } from "./+types/product_update";
import { toast } from "sonner";

export async function clientLoader({params}:Route.ClientLoaderArgs){
    const {data, status} = await apiRequest("GET", "/product/update/"+params.id);
    return {categories: data?.categories, product: data?.product}
}

export async function clientAction({request, params}:Route.ClientActionArgs){
    const formData = await  request.formData();
    const id = params.id;
    const {data, status, message, errors} = await apiRequest("POST", "/product/"+(id=="new"?"new":"update")+"/"+ params.id,  formData);
    if(status==200){
        toast.success(message);
    }
    return { errors }
    
}

export default function ProductUpdate({loaderData}:Route.ComponentProps) {

    const {product, categories} = loaderData||{};
    const initialData = {
        name: "Logitech MX Master 3S",
        sku: "LOGI-MX3S-BLK",
        barcode: "097855170131",
        basePrice: 99.99,
        initialImageUrl: "https://unsplash.com", // Existing file link
        branches: [
            { branchId: "br-01", branchName: "Downtown Hub", stock: 34, localPrice: null, isAvailable: true },
            { branchId: "br-02", branchName: "Uptown Express", stock: 12, localPrice: 109.99, isAvailable: true },
            { branchId: "br-03", branchName: "Airport Duty Free", stock: 0, localPrice: 124.99, isAvailable: false },
        ]
    };
    return (
        <>
            <title>Product Update - POS</title>
            <section className="space-y-4 px-4 my-4">
                <CardTitle>Product Update</CardTitle>
                {/* {JSON.stringify(product)} */}
                <MultiBranchProductForm defaultValues={product} />
            </section>
        </>
    )
}