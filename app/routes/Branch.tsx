import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

import {
  Building2,
  MapPin,
  Phone,
  Users,
  Warehouse,
  ArrowRight,
  Check,
} from "lucide-react";
import { useEffect, useState } from "react";
import AppModal from "~/components/appmodal";
import { ReusableForm } from "~/components/FetcherForm";
import { Field,  FieldError, FieldGroup, FieldLabel, FieldSet } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Controller } from "react-hook-form";
import { Switch } from "~/components/ui/switch";
import { apiRequest } from "~/services/apiRequest";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import type { Route } from "./+types/branch";
import { useActionData, useLoaderData, useNavigate, useParams } from "react-router";
import {  DeleteForm } from "~/components/DeleteForm";



type BranchProps = {
  id: number,
  name: string,
  location: string,
  phone: string,
  manager: string,
  staff: number,
  stock: number,
  status: string,
}
// const branches = [
//   {
//     id: 1,
//     name: "Main Branch",
//     location: "Nairobi CBD",
//     phone: "+254 712 345 678",
//     manager: "John Mwangi",
//     staff: 12,
//     stock: 1540,
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "Westlands Branch",
//     location: "Westlands",
//     phone: "+254 701 111 222",
//     manager: "Mercy Wanjiku",
//     staff: 8,
//     stock: 920,
//     status: "Active",
//   },
//   {
//     id: 3,
//     name: "Mombasa Branch",
//     location: "Nyali",
//     phone: "+254 733 567 890",
//     manager: "Ali Hassan",
//     staff: 6,
//     stock: 670,
//     status: "Low Stock",
//   },
//   {
//     id: 4,
//     name: "Kisumu Branch",
//     location: "Milimani",
//     phone: "+254 745 888 999",
//     manager: "Brian Otieno",
//     staff: 5,
//     stock: 450,
//     status: "Inactive",
//   },
// ];

export async function clientAction({ request, params }: Route.ClientActionArgs) {

  const formData = await request.formData();
  const action = formData.get("action");

  const { data, errors, message, status } = action=="delete"? await apiRequest("DELETE", "/branch/delete/"+ formData.get("id")):await apiRequest("POST", params.id ? "/branch/update/" + params.id : "/branch/new", formData);
  if (status === 200) {
    toast.success(message);
  }
  return { data, errors, status }
}
export async function clientLoader({ request }: Route.ClientLoaderArgs) {

  const { data } = await apiRequest("GET", "/branch");

  return { branches: data?.branches, stats: data?.stats };
}

export default function BranchesPage({ }: Route.ComponentProps) {
  const [activeItem, setActiveItem] = useState<true | null | BranchProps>(null);
  //const { branches, stats } = loaderData || {};
  const { branches, stats } = useLoaderData<typeof clientLoader>();
  const actionData = useActionData<typeof clientAction>();
  const [action, setAction] = useState<"delete" | "store">("store");
  const param = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    if (actionData?.status == 200) {
      setActiveItem(null);
    }
  }, [actionData]);

  return (
    <div className="space-y-6 p-4">
      <title>Branch Management - POS </title>
      {/* Header */}
      <Card>
        <CardHeader >

          <CardTitle className="text-3xl font-bold tracking-tight">
            Branch Management
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage all POS branches and monitor performance.
          </CardDescription>

          <CardAction>
            <Button className="w-full md:w-auto" onClick={() => {setAction("store"); setActiveItem(true); param?.id && navigate("/branch") }}>
              <Building2 className="mr-2 h-4 w-4" />
              Add New Branch
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-2 shadow-sm">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm text-muted-foreground">Total Branches</p>
                  <h2 className="text-3xl font-bold">{stats?.total}</h2>
                </div>

                <Building2 className="h-10 w-10 text-primary" />
              </CardContent>
            </Card>

            <Card className="p-2 shadow-sm">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm text-muted-foreground">Active Branches</p>
                  <h2 className="text-3xl font-bold">{stats?.active}</h2>
                </div>

                <Warehouse className="h-10 w-10 text-primary" />
              </CardContent>
            </Card>

            <Card className="p-2 shadow-sm">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm text-muted-foreground">Total Staff</p>
                  <h2 className="text-3xl font-bold">31</h2>
                </div>

                <Users className="h-10 w-10 text-primary" />
              </CardContent>
            </Card>

            <Card className="p-2 shadow-sm">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm text-muted-foreground">Total Inventory</p>
                  <h2 className="text-3xl font-bold">3,580</h2>
                </div>

                <Warehouse className="h-10 w-10 text-primary" />
              </CardContent>
            </Card>
          </div>

          {/* Branch Cards */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {branches?.map((branch: any) => (
              <Card
                key={branch.id}
                className=" border shadow-sm transition-all hover:shadow-lg"
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">
                        {branch.name}
                      </CardTitle>

                      <CardDescription className="mt-1 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {branch.address}
                      </CardDescription>
                    </div>

                    <Badge
                      variant={
                        branch.status === "Active"
                          ? "default"
                          : branch.status === "Low Stock"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {branch.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-5">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Manager</span>
                      <span className="font-medium">{branch.manager}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Phone</span>

                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span className="font-medium">{branch.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Staff</span>
                      <span className="font-medium">{branch.staff}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Inventory Items
                      </span>
                      <span className="font-medium">{branch.stock}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1">
                      View Branch
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {setActiveItem(branch);setAction("store")}}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {setActiveItem(branch);setAction("delete")}} >Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <AppModal title={activeItem == true ? "Add New Branch" : (activeItem?.name || "")} description="Fill in the form below to update branches" open={!!activeItem} onClose={() => setActiveItem(null)}>
        {action == "delete" ?
          <DeleteForm id={activeItem&&activeItem!=true && activeItem?.id} itemName={"branch"} path={"/branch"}/> :
          <BranchForm data={activeItem} />
        }
      </AppModal>

    </div>
  );
}

interface BranchFormInputs {
  name: string,
  phone: string,
  email: string,
  address: string,
  is_active: boolean,
}

const BranchForm = ({ data }: any) => {
  return (
    <ReusableForm<BranchFormInputs> actionUrl={data?.id ? ("/branch/" + data.id) : "/branch"} defaults={data}>
      {({ register, formState: { errors }, watch, control }, { state }) => (
        <FieldSet >
          <FieldGroup>
            <Field>
              <FieldLabel>Branch Name:</FieldLabel>
              <Input placeholder="Enter branch name" aria-invalid={errors.name && "true"} {...register("name", { required: "Branch name is required" })} />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>
            <Field>
              <FieldLabel>Branch Phone:</FieldLabel>
              <Input placeholder="Enter branch phone" aria-invalid={errors.phone && "true"} {...register("phone", { required: "Branch phone is required" })} />
              {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
            </Field>
            <Field>
              <FieldLabel>Branch Email:</FieldLabel>
              <Input placeholder="Enter branch email" aria-invalid={errors.email && "true"} {...register("email", { required: "Branch email is required" })} />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>
            <Field>
              <FieldLabel>Branch Adress/location:</FieldLabel>
              <Input placeholder="Enter branch address" aria-invalid={errors.address && "true"} {...register("address", { required: "Branch address is required" })} />
              {errors.address && <FieldError>{errors.address.message}</FieldError>}
            </Field>

            <Field className="">
              <FieldLabel className="flex-1">Branch Status:</FieldLabel>
              <div className="flex flex-row gap-4">
                {/* <Checkbox defaultChecked {...register("is_active")} /> */}
                <Controller
                  name="is_active"
                  control={control}

                 // rules={{ required: "Branch status is required!" }}
                  render={({ field }) =>
                    <Switch aria-invalid={errors.is_active && "true"} defaultChecked={field.value} onCheckedChange={(e) => { field.onChange(e.valueOf()) }} />
                  }
                />
                <FieldLabel>{watch("is_active") == true ? "Open" : "Closed"}</FieldLabel>
              </div>
              {errors.is_active && <FieldError>{errors.is_active.message}</FieldError>}
            </Field>
            <Field>
              <Button disabled={state != "idle"}>{state != "idle" ? "Processing" : (data?.id ? "Update Branch" : "Save Branch")}</Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      )}
    </ReusableForm>
  )
}


