import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useFetcher } from "react-router";
import { Button } from "~/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import type { Route } from "./+types/login";
import { ReusableForm } from "~/components/ui/FetcherForm";

interface LoginInputs {
    email: string,
    password: string,
    remember: boolean,
}

export async function clientAction({ request }: Route.ClientActionArgs) {
    let formData = await request.formData();
    let email = formData.get("email");
    let password = formData.get("password");
    let remember = formData.get("remember");

    console.log(email, password, remember);
    return { email, password, remember }
}

export default function Login() {
    return (
        <>
            <title>Login - POS</title>
            <div className="flex flex-col items-center justify-center gap-2  h-screen">

                <ReusableForm<LoginInputs> actionUrl={"/login"}  >
                    {({ register, formState: { errors }, }, { state }) => (
                        <FieldSet className=" md:min-w-[400px] p-3 md:p-0">
                            <FieldLegend>Login section </FieldLegend>
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




