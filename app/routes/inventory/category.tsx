import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import AppModal from "~/components/appmodal";
import { useState } from "react";
import { ReusableForm } from "~/components/FetcherForm";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "~/components/ui/field";
import { DeleteForm } from "~/components/DeleteForm";
import type { Route } from "./+types/category";
import { apiRequest } from "~/services/apiRequest";
import { toast } from "sonner";
import { useRoles } from "~/middleware/permission";

const categories = [
    {
        id: 1,
        name: "Computer Accessories",
        products: 24,
        status: "Active",
    },
    {
        id: 2,
        name: "Chargers",
        products: 12,
        status: "Active",
    },
    {
        id: 3,
        name: "Audio Devices",
        products: 8,
        status: "Inactive",
    },
];
interface CategoryProps {
    id: number,
    name: string,
    description: string,
    status: string,
    products: number,
}

export async function clientLoader({ }: Route.ClientLoaderArgs) {
    const { data } = await apiRequest("GET", "/categories");
    return { categories: data?.categories };
}
export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const action = formData.get("action");
    const id = formData.get("id");

    const { data, errors, message, status } = action == "delete" ? await apiRequest("DELETE", "/categories/delete/" + id) : await apiRequest("POST", id ? "/categories/update/" + id : "/categories/new", formData);
    if (status === 200) {
        toast.success(message);
    }
    return { status, data, errors }
}


export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<{ action: "new" | "update" | "delete", category: CategoryProps | null } | null>(null);
    const { categories } = loaderData || {};
    const { is_myRole } = useRoles();
    const [search, setSearch] = useState("");

    const filteredCategories = categories?.filter((category: CategoryProps) =>
        category.name.toLowerCase().includes(search.toLowerCase())
    );



    return (
        <>
            <title>Categories - POS</title>
            <div className="space-y-6 px-4 my-4">
                {/* header */}
                <Card className="">

                    <CardHeader className="">
                        <CardTitle className="text-2xl font-bold">Categories</CardTitle>
                        <CardDescription className="">
                            Manage product categories
                        </CardDescription>
                        {is_myRole("manage_inventory") &&
                            <CardAction>
                                <Button onClick={() => { setOpen(true); setActiveItem({ action: "new", category: null }) }}>

                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Category
                                </Button>
                            </CardAction>
                        }

                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* search */}
                        <div className="flex items-center gap-4">
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                                <Input placeholder="Search category..." onChange={(e) => setSearch(e.target.value)} className="pl-9" />
                            </div>
                        </div>

                        {/* category cards */}
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                            {filteredCategories?.map((category: CategoryProps) => (
                                <Card key={category.id} className="p-0">
                                    <CardContent className="p-5 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h2 className="font-semibold truncate" title={category.name}>{category.name}</h2>

                                            <span
                                                className={`text-xs px-2 py-1 rounded-full ${category.products > 0
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {category.products > 0 ? "Active" : "Inactive"}
                                            </span>
                                        </div>

                                        <p className="text-sm text-muted-foreground">
                                            {category.products} Products
                                        </p>
                                        {is_myRole("manage_inventory") &&
                                            <div className="flex items-center gap-2">
                                                <Button size="sm" variant="outline" onClick={() => { setOpen(true); setActiveItem({ action: "update", category: category as any }) }}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>

                                                <Button size="sm" variant="destructive" onClick={() => { setOpen(true); setActiveItem({ action: "delete", category: category as any }) }}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        }
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>

                </Card>
                { }
                <AppModal title={() => { return activeItem?.action == "new" ? "Add Category" : (activeItem?.category?.name || "") }} description="Manage category" open={open} onClose={setOpen}>
                    {activeItem?.action == "new" && <CategoryForm state={() => setOpen(false)} />}
                    {activeItem?.action == "update" && <CategoryForm state={() => setOpen(false)} data={activeItem?.category} />}
                    {activeItem?.action == "delete" && <DeleteForm state={() => setOpen(false)} id={activeItem?.category?.id} itemName={"category"} path={"/category"} />}
                    {/* <CategoryForm state={() => setOpen(false)} data={activeItem?.category} /> */}
                </AppModal>
            </div>
        </>
    );
}

type CategoryFormProps = {
    id: number,
    name: string,
    description: string,
    action: "new" | "update",
    // status: string,
}

const CategoryForm = ({ data, state }: { data?: CategoryProps | null, state?: any }) => {
    return (
        <ReusableForm<CategoryFormProps> actionUrl="/category" defaults={data} resetOnSuccess={state} >
            {({ register, formState: { errors }, watch, control }, { state }) => (
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Name:</FieldLabel>
                            <Input placeholder="Enter name" aria-invalid={errors.name && "true"} {...register("name", { required: "Name is required!" })} />
                            {errors.name && <FieldError>{errors.name.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel>Description: - optional</FieldLabel>
                            <Input placeholder="Enter description" aria-invalid={errors.description && "true"} {...register("description")} />
                            {errors.description && <FieldError>{errors.description.message}</FieldError>}
                        </Field>
                        <input type="hidden" {...register("id")} />
                        <input type="hidden" defaultValue={data?.id ? "update" : "new"} {...register("action")} />
                        <Field>
                            <Button disabled={state != "idle"}>{state != "idle" ? "Processing..." : data?.id ? "Update Category" : "Add Category"}</Button>
                        </Field>
                    </FieldGroup>
                </FieldSet>
            )}
        </ReusableForm>
    )
}