import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import type { Route } from "./+types/register";
import { ReusableForm } from "~/components/ui/FetcherForm";
import { Controller } from "react-hook-form";
interface RegisterInputs {
    fullName: string,
    accountType: AccountType,
    email: string,
    password: string,
    confirmPassword: string,
}
enum AccountType {
    Admin = "admin",
    Manager = "manager",
    Cashier = "cashier",
    Customer = "customer",
}


export async function clientAction({ request }: Route.ClientActionArgs) {
    let formData = await request.formData();
    return { errors: { confirmPassword: "password mismatch" } };
}

export default function Register() {
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
                                    <Input aria-invalid={errors.fullName ? "true" : "false"} type="text" {...register("fullName", { required: "Full name is required!" })} />
                                    {errors.fullName && <FieldError>{errors.fullName.message}</FieldError>}
                                </Field>
                                <Field>
                                    <FieldLabel>account type</FieldLabel>
                                    <Controller
                                        name="accountType"
                                        control={control}
                                        rules={{ required: "Account type is required!" }}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} >
                                                <SelectTrigger aria-invalid={errors.accountType ? "true" : "false"}>
                                                    <SelectValue placeholder="Select an option" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                    <SelectItem value="manager">Manager</SelectItem>
                                                    <SelectItem value="cashier">Cashier</SelectItem>
                                                    <SelectItem value="customer">Customer</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />

                                    {errors.accountType && <FieldError>{errors.accountType.message}</FieldError>}
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
                                    <Input aria-invalid={errors.confirmPassword ? "true" : "false"} type="password" {...register("confirmPassword", {
                                        required: "Confirm password is required!",
                                        validate: (value) => value === watch("password") || "Passwords do not match"
                                    })} />
                                    {errors.confirmPassword && <FieldError>{errors.confirmPassword.message}</FieldError>}
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
            </div>
        </>
    )
}
