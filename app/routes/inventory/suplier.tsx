import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table";

import { Button } from "~/components/ui/button";
import { Plus, Eye, Pencil, Trash } from "lucide-react";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { useEffect, useState } from "react";
import { ReusableForm } from "~/components/FetcherForm";
import { FieldSet, FieldGroup, Field, FieldLabel, FieldError } from "~/components/ui/field";
import AppModal from "~/components/appmodal";
import { DeleteForm } from "~/components/DeleteForm";
import { Input } from "~/components/ui/input";
import { apiRequest } from "~/services/apiRequest";
import type { Route } from "./+types/suplier";
import { toast } from "sonner";
import { useRoles } from "~/middleware/permission";
interface SupplierProps {
    id: number,
    name: string,
    phone: string,
    email: string,
    products: number,
}
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

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
    const { data } = await apiRequest("GET", "/suppliers");
    return { suppliers: data?.suppliers };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const action = formData.get("action");
    const id = formData.get("id");

    const { data, errors, message, status } = action=="delete"? await apiRequest("DELETE", "/suppliers/delete/"+id):await apiRequest("POST", id?"/suppliers/update/"+id: "/suppliers/new", formData);
    if (status === 200) {
        toast.success(message);
    }
    return { status }
}


export default function SuppliersPage({ loaderData, actionData }: Route.ComponentProps) {
    const [activeItem, setActiveItem] = useState<{action:"new"|"update"|"delete", supplier: SupplierProps|null}|null>(null);
    const { suppliers } = loaderData || {};
    

    useEffect(() => {
        if (actionData?.status == 200) {
            setActiveItem(null);
        }

    }, [actionData]);
    const { is_myRole } = useRoles();
    return (
        <div className="space-y-6 px-4 my-4">
            <title>Suppliers - POS</title>
            {/* header */}
            <Card>
                <CardHeader >
                    <CardTitle className="text-2xl font-bold">Suppliers</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Manage inventory suppliers
                    </CardDescription>
                    {is_myRole("manage_suppliers") &&
                    <CardAction>
                        <Button onClick={()=>setActiveItem({action:"new", supplier:null})} className="w-full md:w-auto">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Supplier
                        </Button>
                    </CardAction>
                    }
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
                                    {is_myRole("manage_suppliers") &&
                                    <TableHead>Actions</TableHead>
                                    }
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {suppliers?.map((supplier:SupplierProps) => (
                                    <TableRow key={supplier.id}>
                                        <TableCell>{supplier.name}</TableCell>

                                        <TableCell>{supplier.phone}</TableCell>

                                        <TableCell>{supplier.email}</TableCell>

                                        <TableCell>{supplier.products}</TableCell>
                                        {is_myRole("manage_suppliers") &&
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline">
                                                    <Eye className="h-4 w-4" />
                                                </Button>

                                                <Button size="sm" onClick={()=>setActiveItem({action:"update", supplier})}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm" onClick={()=>setActiveItem({action:"delete", supplier})}>
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                        }
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
            {is_myRole("manage_suppliers") &&
            <AppModal title={activeItem?.action=="new"?"Add Supplier":(activeItem?.supplier?.name||"")} description="Fill in the form below to update branches" open={!!activeItem} onClose={() => setActiveItem(null)}>
                {activeItem?.action=="new" &&      <SupplierForm state={() => setActiveItem(null)} />}
                {activeItem?.action=="update" &&   <SupplierForm state={() => setActiveItem(null)} data={activeItem?.supplier} />}
                {activeItem?.action=="delete" &&   <DeleteForm state={() => setActiveItem(null)} id={activeItem?.supplier?.id} itemName={"supplier"} path={"/supplier"}/>}
            </AppModal>
            }
        </div>
    );
}

type SupplierFormProps = {
    id: number,
    name: string,
    phone: string,
    email: string,
    address: number,
}
const SupplierForm = ({ data, state }: { data?: SupplierProps | null , state?:any}) => {
    return (
       <ReusableForm<SupplierFormProps> actionUrl={"/supplier"} defaults={data} resetOnSuccess={state}>
           {({ register, formState: { errors }, watch, control }, { state }) => (
            <FieldSet>
                <FieldGroup>
                    <Field>
                        <FieldLabel>Name:</FieldLabel>
                        <Input placeholder="Enter name" aria-invalid={errors.name && "true"} {...register("name", { required: "Name is required!" })} />
                        {errors.name && <FieldError>{errors.name.message}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel>Phone:</FieldLabel>
                        <Input placeholder="Enter phone" aria-invalid={errors.phone && "true"} {...register("phone", { required: "Phone is required!" })} />
                        {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel>Email:</FieldLabel>
                        <Input placeholder="Enter email" aria-invalid={errors.email && "true"} {...register("email", { required: "Email is required!" })} />
                        {errors.email && <FieldError>{errors.email.message}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel>Address:</FieldLabel>
                        <Input placeholder="Enter address" aria-invalid={errors.address && "true"} {...register("address", { required: "Address is required!" })} />
                        {errors.address && <FieldError>{errors.address.message}</FieldError>}
                    </Field>
                    <input type="hidden" {...register("id")} />

                   <Field>
                    <Button disabled={state != "idle"}>{state != "idle" ? "Processing..." : "Update Supplier"}</Button>
                   </Field>
                </FieldGroup>
            </FieldSet>
           )}
       </ReusableForm>
    )
}