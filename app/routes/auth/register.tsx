import { Link, redirect } from "react-router";
import { Button } from "~/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import type { Route } from "./+types/register";
import { ReusableForm } from "~/components/FetcherForm";
import { Controller } from "react-hook-form";
import { apiRequest } from "~/services/apiRequest";
import { toast } from "sonner";
interface RegisterInputs {
    name: string,
    // account: number,
    branch_id: number,
    role_id: number,
    email: string,
    password: string,
    password_confirmation: string,
}
enum accountProp {
    Admin = "admin",
    Manager = "manager",
    Cashier = "cashier",
    Customer = "customer",
}


export async function clientAction({ request }: Route.ClientActionArgs) {
    let formData = await request.formData();
    const { data, errors, message, status } = await apiRequest("POST", "/register", formData);
    if (status == 200) {
        toast.success(message);
        return redirect("/login");
    }
    return { data, errors, message }
}

export async function clientLoader({ }) {
    const { data } = await apiRequest("GET", "/register");
    return { branches: data?.branches, roles: data?.roles }
}

export default function Register({ loaderData }: Route.ComponentProps) {
    const { branches, roles } = loaderData;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!"@#$%^&*()_\-+={[}\]|\\:;"'<,>.?\/ ]).{8,}$/
    return (
        <>
            <title>Register - POS</title>
            <div className="flex flex-col items-center justify-center gap-2  h-full">

                <ReusableForm<RegisterInputs> actionUrl={"/register"}  >
                    {({ register, control, watch, formState: { errors } }, { state }) => (
                        <FieldSet className=" md:min-w-[400px] p-3 md:p-0">
                            <FieldLegend>Registration section</FieldLegend>
                            <FieldDescription>Fill in the form to register.</FieldDescription>

                            <FieldGroup className="gap-5">
                                <Field>
                                    <FieldLabel>Full name</FieldLabel>
                                    <Input aria-invalid={errors.name ? "true" : "false"} type="text" {...register("name", { required: "Full name is required!" })} />
                                    {errors.name && <FieldError>{errors.name.message}</FieldError>}
                                </Field>
                                <Field>
                                    <FieldLabel>Branch</FieldLabel>
                                    <Controller
                                        name="branch_id"
                                        control={control}
                                        rules={{ required: "Branch is required!" }}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} >
                                                <SelectTrigger aria-invalid={errors.branch_id ? "true" : "false"}>
                                                    <SelectValue placeholder="Select an option" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        branches?.map((branch:any) => (
                                                            <SelectItem key={branch.id} value={branch.id.toString()}>{branch.name}</SelectItem>

                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />

                                    {errors.branch_id && <FieldError>{errors.branch_id.message}</FieldError>}
                                </Field>
                                <Field>
                                    <FieldLabel>Assign role</FieldLabel>
                                    <Controller
                                        name="role_id"
                                        control={control}
                                        rules={{ required: "Role type is required!" }}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} >
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
                                    <FieldLabel>Email</FieldLabel>
                                    <Input aria-invalid={errors.email ? "true" : "false"} type="email" {...register("email", { required: "Email is required!" })} />
                                    {errors.email && <FieldError>{errors.email.message}</FieldError>}
                                </Field>
                                <Field>
                                    <FieldLabel>Password</FieldLabel>
                                    <Input aria-invalid={errors.password ? "true" : "false"} type="password" {...register("password", {
                                        required: "Password is required!",
                                        pattern: {
                                            value: passwordRegex,
                                            message: "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character"
                                        }
                                    })} />
                                    {errors.password && <FieldError>{errors.password.message}</FieldError>}
                                </Field>
                                <Field>
                                    <FieldLabel>Confirm password</FieldLabel>
                                    <Input aria-invalid={errors.password_confirmation ? "true" : "false"} type="password" {...register("password_confirmation", {
                                        required: "Confirm password is required!",
                                        validate: (value) => value === watch("password") || "Passwords do not match"
                                    })} />
                                    {errors.password_confirmation && <FieldError>{errors.password_confirmation.message}</FieldError>}
                                </Field>
                                <Field>
                                    <Button type="submit" disabled={state != "idle"}>{state != "idle" ? "Processing..." : "Register"}</Button>
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    )}
                </ReusableForm>
                <p className="">
                    Already have an account? <Link to="/login" className="underline">Login</Link>
                </p>
            </div >
        </>
    )
}
