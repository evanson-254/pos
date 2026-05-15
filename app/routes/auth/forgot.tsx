import  { Link } from "react-router";
import  { Button } from "~/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import type { Route } from "./+types/forgot";
import { ReusableForm } from "~/components/ui/FetcherForm";

export async function clientAction({ request }: Route.ClientActionArgs) {
    let formData = await request.formData();
    let email = formData.get("email");
    return { errors: { email: "Email not found" } };
}

interface ForgotInputs {
    email: string,
}

export default function Forgot() {
    return (
        <>
            <title>Forgot - POS</title>
            <div className="flex flex-col items-center justify-center gap-2  h-screen">
                <ReusableForm<ForgotInputs> actionUrl={"/forgot-password"}  >
                    {({ register, formState: { errors } }, { state }) => (
                        <FieldSet className=" md:min-w-[400px] p-3 md:p-0">
                            <FieldLegend>Forgot password section</FieldLegend>
                            <FieldDescription>Enter your email to reset your password.</FieldDescription>
                            <FieldGroup className="gap-5">
                                <Field>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input aria-invalid={errors.email ? "true" : "false"} type="email" {...register("email", { required: "Email is required!" })} />
                                    {errors.email && <FieldError>{errors.email.message}</FieldError>}
                                </Field>
                                <Field>
                                    <Button type="submit" disabled={state != "idle"}>{state != "idle" ? "Processing..." : "Send reset link"}</Button>
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
