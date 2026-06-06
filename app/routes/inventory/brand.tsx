// BrandsPage.tsx

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import { apiRequest } from "~/services/apiRequest";
import type { Route } from "./+types/brand";
import { toast } from "sonner";
import { ReusableForm } from "~/components/FetcherForm";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "~/components/ui/field";
import AppModal from "~/components/appmodal";
import { useState } from "react";
import { useRoles } from "~/middleware/permission";
import { DeleteForm } from "~/components/DeleteForm";


const brands = [
    {
        id: 1,
        name: "Logitech",
        products: 18,
    },
    {
        id: 2,
        name: "Razer",
        products: 10,
    },
    {
        id: 3,
        name: "JBL",
        products: 6,
    },
];

type BrandProps = {
    id: number,
    name: string,
    products: number,
}
export async function clientLoader() {
    const { data } = await apiRequest("GET", "/brands");
    return { brands: data?.brands };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const action = formData.get("action");
    const id = formData.get("id");

    const { data, errors, message, status } = action == "delete" ? await apiRequest("DELETE", "/brands/delete/" + id) : await apiRequest("POST", id ? "/brands/update/" + id : "/brands/new", formData);
    if (status === 200) {
        toast.success(message);
    }
    return { status, data, errors }

}

export default function BrandsPage({ loaderData }: Route.ComponentProps) {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<{ action: "new" | "update" | "delete", brand: BrandProps | null } | null>(null);
    const [search, setSearch] = useState("");
    const { brands } = loaderData || {};
    const filteredBrands = brands?.filter((brand: BrandProps) =>
        brand.name.toLowerCase().includes(search.toLowerCase())
    );
    const { is_myRole } = useRoles();
    return (
        <div className="space-y-6 px-4 my-4">
            <title>Brands - POS</title>
            <Card>
                {/* header */}
                <CardHeader >

                    <CardTitle className="text-2xl font-bold">Brands</CardTitle>
                    <CardDescription>
                        Manage product brands
                    </CardDescription>
                    {is_myRole("manage_inventory") &&
                    <CardAction>
                        <Button onClick={() => { setOpen(true); setActiveItem({ action: "new", brand: null }) }}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Brand
                        </Button>
                    </CardAction>
                    }

                </CardHeader>

                {/* brands grid */}
                <CardContent className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search brand..." className="pl-9" onChange={(e)=>setSearch(e.target.value)} />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {filteredBrands?.map((brand: BrandProps) => (
                            <Card key={brand.id} className="p-2">
                                <CardContent className="p-5">
                                    <div className="space-y-4">
                                        <div>
                                            <h2 className="font-semibold truncate" title={brand.name}>{brand.name}</h2>

                                            <p className="text-sm text-muted-foreground">
                                                {brand.products} Products
                                            </p>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" onClick={()=>{ setOpen(true); setActiveItem({action:"update", brand})}}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>

                                            <Button variant="destructive" size="sm" onClick={()=>{ setOpen(true); setActiveItem({action:"delete", brand})}}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>

            </Card>
            <AppModal title={() => {
                if (activeItem?.action == "new") return "Add Brand";
                if (activeItem?.action == "update") return "Update Brand";
                if (activeItem?.action == "delete") return "Delete Brand";
                return "";
             }} description="Modify Brands here" open={open} onClose={setOpen} >
                {activeItem?.action == "new" && <BrandForm state={() => setOpen(false)} />}
                {activeItem?.action == "update" && <BrandForm state={() => setOpen(false)} data={activeItem?.brand} />}
                {activeItem?.action == "delete" && <DeleteForm state={() => setOpen(false)} id={activeItem?.brand?.id} itemName={"brand"} path={"/brands"} />}
             </AppModal>
        </div>
    );
}

interface BrandFormProps {
    id: number,
    name: string,
    action: "new" | "update",
}

const BrandForm = ({ data, state }: { data?: BrandProps | null, state?: any }) => {
    return (
        <ReusableForm<BrandFormProps> actionUrl="/brands" defaults={data} resetOnSuccess={state}>
            {({ register, formState: { errors }, watch, control }, { state }) => (
                <FieldSet className="space-y-4">
                    <FieldGroup>

                    
                    <Field>
                        <FieldLabel>Name:</FieldLabel>
                        <Input placeholder="Enter name" aria-invalid={errors.name && "true"} {...register("name", { required: "Name is required!" })} />
                        {errors.name && <FieldError>{errors.name.message}</FieldError>}
                    </Field>
                    
                    <input type="hidden" {...register("id")} />
                    <input type="hidden" defaultValue={data?.id ? "update" : "new"} {...register("action")} />
                    <Field>
                        <Button disabled={state != "idle"}>{state != "idle" ? "Processing..." : "Update Brand"}</Button>
                    </Field>
                    </FieldGroup>
                </FieldSet>
            )}
        </ReusableForm>
    )
}