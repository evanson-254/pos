import { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { Label } from "~/components/ui/label";

import {
  CogIcon,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import { Link, useLoaderData } from "react-router";
import type { Route } from "./+types/users";
import { apiRequest } from "~/services/apiRequest";
import AppModal from "~/components/appmodal";

import { Controller } from "react-hook-form";
import { ReusableForm } from "~/components/FetcherForm";
import { FieldSet, FieldGroup, Field, FieldLabel, FieldError } from "~/components/ui/field";
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "~/components/ui/select";
import { toast } from "sonner";
import { DeleteForm } from "~/components/DeleteForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Checkbox } from "~/components/ui/checkbox";
import { useUser } from "~/middleware/user";
import { useRoles } from "~/middleware/permission";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Mary Wanjiku",
    email: "mary@example.com",
    role: "Cashier",
    status: "Active",
  },
  {
    id: 3,
    name: "Brian Otieno",
    email: "brian@example.com",
    role: "Manager",
    status: "Inactive",
  },
];

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const { data } = await apiRequest("GET", "/users");
  return { users: data?.users, stats: data?.stats, roles: data?.roles, branches: data?.branches, permissions: data?.permissions };
}
export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "permissions") {
    const { data, errors, message, status } = await apiRequest("POST", "/roles/permissions", formData);
    if (status === 200) {
      toast.success(message);
    }
    return { data, errors, status }
  }
  if (action === "delete") {
    const { data, errors, message, status } = await apiRequest("DELETE", "/users/delete/" + formData.get("id"));
    if (status === 200) {
      toast.success(message);
    }
    return { data, errors, status }
  }
  if (action === "update") {
    const { data, errors, message, status } = await apiRequest("POST", "/users/update/" + formData.get("id"), formData);
    if (status === 200) {
      toast.success(message);
    }
    return { data, errors, status }
  }
  if (action === "new_role") {
    const { data, errors, message, status } = await apiRequest("POST", "/roles/new_role", formData);
    if (status === 200) {
      toast.success(message);
    }
    return { data, errors, status }
  }
  if (action === "update_role") {
    const { data, errors, message, status } = await apiRequest("POST", "/roles/update_role/" + formData.get("id"), formData);
    if (status === 200) {
      toast.success(message);
    }
    return { data, errors, status }
  }
  if (action === "delete_role") {
    const { data, errors, message, status } = await apiRequest("DELETE", "/roles/delete/" + formData.get("id"));
    if (status === 200) {
      toast.success(message);
    }
    return { data, errors, status }
  }
  return { data: null, errors: null, status: 404 }
}

export default function UsersPage({ loaderData, actionData }: Route.ComponentProps) {
  const [search, setSearch] = useState("");
  const { users, stats, roles, permissions } = loaderData || { users: [], stats: {} };
  const { status, data, errors } = actionData || {};
  const [activeItem, setActiveItem] = useState<{ action: "update" | "delete" | "new_role" | "update_role" | "delete_role", user: { id: number, name: string, email: string, role_id: number, branch_id: number, email_verified_at: string }, role?: any } | null>(null);
  const filteredUsers = users?.filter((user: any) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    if (status == 200) {
      setActiveItem(null);
    }
  }, [status]);
  const { is_myRole } = useRoles();
  return (
    <div className="space-y-6 p-6">
      <title>Users and roles - Pos</title>
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-2">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <h2 className="text-3xl font-bold">{stats?.total_users}</h2>
            </div>

            <UserCog className="h-10 w-10 text-primary" />
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Admins</p>
              <h2 className="text-3xl font-bold">{stats?.admins}</h2>
            </div>

            <ShieldCheck className="h-10 w-10 text-primary" />
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Active Users</p>
            <h2 className="text-3xl font-bold">{stats?.active_users}</h2>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          {/* User Table */}
          <Card className="">
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Users & Roles</CardTitle>
                <CardDescription>
                  Manage POS users and permissions
                </CardDescription>
              </div>

              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                  <Input
                    placeholder="Search users..."
                    className="pl-9 w-[250px]"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                {is_myRole("manage_users") &&
                  <Button asChild>
                    <Link to={"/register"}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add User
                    </Link>
                  </Button>
                }
                {/* <Dialog>
              <DialogTrigger asChild>

              </DialogTrigger>

              <DialogContent className="">
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input placeholder="Enter full name" />
                  </div>

                  <div>
                    <Label>Email</Label>
                    <Input placeholder="Enter email" />
                  </div>

                  <div>
                    <Label>Password</Label>
                    <Input type="password" />
                  </div>

                  <div>
                    <Label>Role</Label>
                    <Input placeholder="Admin / Cashier / Manager" />
                  </div>

                  <Button className="w-full">Create User</Button>
                </div>
              </DialogContent>
            </Dialog> */}
              </div>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Email</TableHead>
                    {is_myRole("manage_users") &&
                      <TableHead className="text-right">Action</TableHead>
                    }
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredUsers?.map((user: any) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.name}
                      </TableCell>

                      <TableCell>
                        <Badge variant="secondary">{user.role?.name}</Badge>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            user.status === "Active"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {user.branch?.name}
                        </Badge>
                      </TableCell>

                      <TableCell>{user.email}</TableCell>
                      {is_myRole("manage_users") &&
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setActiveItem({ action: "update", user })}>Edit</DropdownMenuItem>
                              {/* <DropdownMenuItem>
                          Reset Password
                        </DropdownMenuItem> */}
                              <DropdownMenuItem onClick={() => setActiveItem({ action: "delete", user })} className="text-red-500">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      }
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Roles</CardTitle>
              <CardDescription>Manage user roles here.</CardDescription>
              {is_myRole("manage_roles") &&
                <CardAction>
                  <Button onClick={() => setActiveItem({ action: "new_role", user: {} as any, role: null })}>
                    Add Role
                  </Button>
                </CardAction>
              }
            </CardHeader>
            <CardContent className="space-y-4 flex flex-wrap gap-6">

              {roles?.map((role: any, index: number) => {
                const defaultPermId = role.permissions.map((perm: any) => perm?.pivot?.permission_id);

                return (
                  <Card key={role.id} className="min-w-50 p-2">
                    <CardHeader>
                      <h6 className="text-primary text-lg">{index + 1}. {role.name}</h6>
                      {is_myRole("manage_roles") &&
                        <CardAction>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size={"icon-sm"}><CogIcon /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setActiveItem({ action: "update_role", user: {} as any, role })}>Edit</DropdownMenuItem>
                              {role.id > 4 &&
                                <DropdownMenuItem onClick={() => setActiveItem({ action: "delete_role", user: {} as any, role })}>Delete</DropdownMenuItem>
                              }
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardAction>
                      }
                    </CardHeader>
                    <CardContent>
                      <ReusableForm<userPermissionForm> key={role.id} actionUrl={"/users"} defaults={{ role_id: role.id, permission_id: defaultPermId, action: "permissions" }}>
                        {({ register, formState: { errors, isDirty }, watch, control }, { state }) =>
                        (
                          <div className="space-y-4">
                            {permissions?.map((permission: any) => {
                              // const isChecked = role.permissions.find((perm: any) => perm.name === permission.name);

                              return (
                                <Field key={permission.id + role.name}>
                                  <div className="flex gap-2 mt-2">
                                    <Controller
                                      name="permission_id"
                                      defaultValue={permission.id}

                                      control={control}
                                      rules={{ validate: (value) => value && value.length > 0 || "Permission is required!" }}
                                      render={({ field }) => {
                                        //const isChecked = field.value?.includes(permission.id);

                                        return (
                                          <Checkbox
                                            aria-invalid={errors.permission_id ? "true" : "false"}
                                            defaultChecked={field.value?.includes(permission.id)}
                                            onCheckedChange={(checked) => {
                                              if (checked) {
                                                field.onChange([...field.value, permission.id])
                                              } else {
                                                field.onChange(field.value.filter((id) => id !== permission.id))
                                              }
                                            }}

                                            id={permission.id + role.name}
                                          // onCheckedChange={(e) => setRole(role.id, e.target.checked)}
                                          />
                                        )
                                      }
                                      } />

                                    <FieldLabel htmlFor={permission.id + role.name}>{permission.name}</FieldLabel>
                                  </div>
                                </Field>
                              )
                            }
                            )}
                            <input type="hidden" {...register("role_id")} />
                            {/* {JSON.stringify(watch("permission_id"))} */}
                            <input type="hidden" {...register("action")} />
                            {errors.permission_id && <FieldError>{errors.permission_id.message}</FieldError>}

                            <Button disabled={state != "idle" || !isDirty}>{state != "idle" ? "Processing..." : "Update Role"}</Button>
                          </div>
                        )
                        }
                      </ReusableForm>
                    </CardContent>

                  </Card>
                )
              }
              )}
              {/* {JSON.stringify(permissions)} */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AppModal title={() => {
        if (activeItem?.action == "update") return "Update user";
        if (activeItem?.action == "delete") return "Delete user";
        if (activeItem?.action == "new_role") return "Add role";
        if (activeItem?.action == "update_role") return "Update role";
        if (activeItem?.action == "delete_role") return "Delete role";
        return "";
      }} open={activeItem?.action ? true : false} onClose={() => setActiveItem(null)}>
        {activeItem?.action == "update" && <UpdateUserForm data={activeItem?.user} state={() => setActiveItem(null)} />}
        {activeItem?.action == "delete" && <DeleteForm id={activeItem?.user?.id} itemName={"user"} path={"/users"} state={() => setActiveItem(null)} />}
        {(activeItem?.action == "new_role" || activeItem?.action == "update_role") && <RoleForm data={activeItem?.role} state={() => setActiveItem(null)} />}
        {(activeItem?.action == "delete_role") && <DeleteForm id={activeItem?.role?.id} itemName={"role"} path={"/users"} action={"delete_role"} state={() => setActiveItem(null)} />}
      </AppModal>
    </div>
  );
}
type userPermissionForm = {
  role_id: number,
  permission_id: number[],
  action: "permissions",
}


const UpdateUserForm = ({ data, state }: any) => {
  const { branches, roles } = useLoaderData<typeof clientLoader>();

  return (
    <ReusableForm<UpdateUserFormInputs> actionUrl={"/users"} defaults={data} resetOnSuccess={state}>
      {({ register, formState: { errors }, watch, control }, { state }) => (
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <Input placeholder="Enter full name" aria-invalid={errors.name && "true"} {...register("name", { required: "Full name is required!" })} />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input placeholder="Enter email" aria-invalid={errors.email && "true"} {...register("email", { required: "Email is required!" })} />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>
            <Field>
              <FieldLabel>Role</FieldLabel>
              <Controller
                name="role_id"
                control={control}
                rules={{ required: "Role type is required!" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={data?.role_id?.toString()}>
                    <SelectTrigger aria-invalid={errors.role_id ? "true" : "false"}>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles?.map((role: any) => (
                        <SelectItem key={role.id} value={role.id.toString()}>{role.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.role_id && <FieldError>{errors.role_id.message}</FieldError>}
            </Field>
            <Field>
              <FieldLabel>Branch</FieldLabel>
              <Controller
                name="branch_id"
                control={control}
                rules={{ required: "Branch is required!" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={data?.branch_id?.toString()}>
                    <SelectTrigger aria-invalid={errors.branch_id ? "true" : "false"}>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches?.map((branch: any) => (
                        <SelectItem key={branch.id} value={branch.id.toString()}>{branch.name}</SelectItem>

                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.branch_id && <FieldError>{errors.branch_id.message}</FieldError>}
            </Field>
            <Field>
              <input type="hidden" {...register("id")} />
              <input type="hidden" defaultValue={"update"} {...register("action")} />
              <Button disabled={state != "idle"}>{state != "idle" ? "Processing..." : "Update User"}</Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      )}
    </ReusableForm>
  )
}

type UpdateUserFormInputs = {
  id: number,
  action: "update",
  name: string,
  email: string,
  role_id: number,
  branch_id: number,
}

type RoleForm = {
  id: number,
  action: "update_role" | "new_role",
  name: string,
}
const RoleForm = ({ data, state }: any) => {

  return (
    <ReusableForm<RoleForm> actionUrl={"/users"} defaults={data} resetOnSuccess={state}>
      {({ register, formState: { errors }, watch, control }, { state }) => (
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>Role Name</FieldLabel>
              <Input placeholder="Enter role name" aria-invalid={errors.name && "true"} {...register("name", { required: "Role name is required!" })} />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>
            <Field>
              <input type="hidden" defaultValue={data?.id} {...register("id")} />
              <input type="hidden" defaultValue={data?.id ? "update_role" : "new_role"} {...register("action")} />
              <Button disabled={state != "idle"}>{state != "idle" ? "Processing..." : (data?.id ? "Update role" : "Add role")}</Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      )}
    </ReusableForm>
  )
}
