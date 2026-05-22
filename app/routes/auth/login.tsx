import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, redirect, useFetcher } from "react-router";
import { Button } from "~/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import type { Route } from "./+types/login";
import { ReusableForm } from "~/components/FetcherForm";
import { apiRequest } from "~/services/apiRequest";
import { toast } from "sonner";

interface LoginInputs {
    email: string,
    password: string,
    remember: boolean,
}

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const {data, message, status, errors} = await apiRequest("POST", "/login", formData);
    if(status==200){
        toast.success(message);
        return redirect("/");
    }
    return {data, errors}
}

export default function Login() {
    return (
        <>
            <title>Login - POS</title>
            <div className="flex flex-col items-center justify-center gap-2  h-screen">

                <ReusableForm<LoginInputs> actionUrl={"/login"}  >
                    {({ register, formState: { errors }, }, { state }) => (
                        <FieldSet className=" md:min-w-[400px] p-3 md:p-0">
                            <FieldLegend className="bg-brand bg-clip-text text-transparent">Login section </FieldLegend>
                            <FieldDescription>Enter your credentials to login.</FieldDescription>

                            <FieldGroup className="gap-5">
                                <Field>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input aria-invalid={errors.email ? "true" : "false"} type="email" {...register("email", { required: "Email is required!" })} />
                                    {errors.email && <FieldError>{errors.email.message}</FieldError>}
                                </Field>
                                <Field>
                                    <FieldLabel>Password</FieldLabel>
                                    <Input aria-invalid={errors.password ? "true" : "false"} type="password" {...register("password", { required: "Password is required!" })} />
                                    {errors.password && <FieldError>{errors.password.message}</FieldError>}
                                </Field>
                                <Field className="flex flex-row  items-center  text-start">
                                    <input {...register("remember")} type="checkbox" className="max-w-5 flex-shrink-1" />
                                    <FieldLabel>Remember me</FieldLabel>
                                </Field>
                                <Field>
                                    <FieldLabel>
                                        <Link to="/forgot-password" className="underline"> Forgot password?</Link>
                                    </FieldLabel>
                                </Field>
                                <Field>
                                    <Button type="submit" disabled={state != "idle"}>{state != "idle" ? "Processing..." : "Login"}</Button>
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    )}
                </ReusableForm>
                <p>
                    Dont have an account?
                    <Link to="/register" className="underline">Register</Link>
                </p>
            </div>
        </>
    )
}




