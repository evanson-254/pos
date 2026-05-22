import { Link, redirect} from "react-router"
import type { Route } from "./+types/reset";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "~/components/ui/field";
import { ReusableForm } from "~/components/FetcherForm";
import { apiRequest } from "~/services/apiRequest";
import { toast } from "sonner";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
interface ResetInputs {
    token: string,
    email: string,
    password: string,
    password_confirmation: string,
}
export async function clientAction({ request }: Route.ClientActionArgs) {
    let formData = await request.formData();
    const {data, errors, message, status} = await apiRequest("POST", "/reset-password", formData);
    if(status==200){
        toast.success(message);
        return redirect("/login");
    }
   return {data, errors, message}
}

export default function Reset({ params }: Route.ComponentProps) {
    return (
        <>
            <title>Reset Password - POS</title>
            <div className="flex flex-col items-center justify-center gap-2  h-full">
                <ReusableForm<ResetInputs> actionUrl={"/reset-password/"+params.token+"/"+params.email} >
                    {({register,watch, formState: { errors }}, { state}) => (
                        <FieldSet className=" md:min-w-[400px] p-3 md:p-0">
                            <FieldLegend>Reset Password</FieldLegend>
                            <FieldDescription>Enter the new password for your account.</FieldDescription>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel>Password</FieldLabel>
                                    <Input type="password" className="w-full" 
                                    aria-invalid={errors.password ? "true" : "false"}
                                    {...register("password", {
                                        required: "Password is required!",
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!"@#$%^&*()_\-+={[}\]|\\:;"'<,>.?\/ ]).{8,}$/,
                                            message: "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character"
                                        }
                                    })} placeholder="Password"  />
                                    {errors.password && <FieldError>{errors.password.message}</FieldError>}
                                </Field>
                                <Field>
                                    <FieldLabel>Confirm password</FieldLabel>
                                    <Input type="password" className="w-full" 
                                    aria-invalid={errors.password_confirmation ? "true" : "false"}
                                    {...register("password_confirmation", {
                                        required: "Confirm password is required!",
                                        validate: (value) => value === watch("password") || "Passwords do not match"
                                    })}
                                    placeholder="Confirm password" />
                                    {errors.password_confirmation && <FieldError>{errors.password_confirmation.message}</FieldError>}
                                </Field>
                                <Input type="hidden" 
                                {...register("token", {value: params.token})} />
                                <Input type="hidden" 
                                {...register("email", {value: params.email})} />
                                
                                <Field>
                                    <Button type="submit" className="w-full" disabled={state !=="idle"}> {state !=="idle"?"Processing":"Reset Password"}</Button>    
                                </Field>
                            </FieldGroup>
                            <p>Have credentials?<Link to="/login" className="underline">Login</Link></p>
                        </FieldSet>
                    )}
                </ReusableForm>

            </div>
        </>
    )
}