import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import AppModal from "~/components/appmodal";
import { ReusableForm } from "~/components/FetcherForm";
import RefundStats from "~/components/refundStats";
import RefundTable from "~/components/refundTable";
import { Button } from "~/components/ui/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import type { Route } from "./+types/refunds";
import { apiRequest } from "~/services/apiRequest";
import { toast } from "sonner";
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
    const { data } = await apiRequest("GET", `/refunds`);
    return { refunds: data?.refunds, stats: data?.stats }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const action = formData.get("action");
    const { data, errors, message, status } = await apiRequest("POST", `/refunds/${action}`, formData);
    if (status == 200) {
        toast.success(message);
        //return redirect("/pos/refunds");
    }
    return { data, errors, status }
}

export default function Refunds() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<{ action: "create" | "reject" | "approve", data: any } | null>(null);

    const actions = () => ({
        reject: (data: any) => {
            setOpen(true);
            setActive({ action: "reject", data: data })
        },
        approve: (data: any) => {
            setOpen(true);
            setActive({ action: "approve", data: data })
        }
    })

    return (
        <>
            <title>Refunds - POS</title>
            <section className="space-y-4 px-4 my-4">
                <Card>
                    <CardHeader>
                        <CardTitle
                        //  onClick={()=>actions.reject({id:"1"})}
                        >
                            Refund Management
                        </CardTitle>
                        <CardDescription>
                            Track and manage all refund requests
                        </CardDescription>
                        <CardAction>
                            <Button onClick={() => { setOpen(true); setActive({ action: "create", data: null }) }}>
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Create Refund
                            </Button>
                        </CardAction>
                    </CardHeader>
                </Card>
                <RefundStats />
                <RefundTable actions={actions} />
                <AppModal title={"Refund Manager"} open={open} onClose={setOpen} >
                    {active?.action == "create" && <RefundForm active={active} state={()=>setOpen(false)} />}
                    {(active?.action == "approve" || active?.action == "reject") && <AproveRejectDisplay item={active} state={()=>setOpen(false)} />}
                </AppModal>
            </section>
        </>
    )
}

interface RefundFormProps {
    invoice: string,
    reason: string,
    other: string,
    action: string,
}

export function RefundForm({ active, state }: { active: { action: string, data: any }, state:any }) {
    return (
        <ReusableForm<RefundFormProps> actionUrl="/refunds" resetOnSuccess={state}>
            {({ register, formState: { errors }, control, watch }, { state }) => {

                return (
                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Invoice number</FieldLabel>
                                <Input {...register("invoice", {
                                    required: "Invoice number is required",
                                    validate: (value) => {
                                        if (value.length < 8) {
                                            return "Invoice number must be at least 8 characters long"
                                        }
                                        return true;
                                    },
                                    setValueAs: (value) => {
                                        return value.toUpperCase();
                                    },
                                    onChange: (e) => {
                                        e.target.value = e.target.value.toUpperCase();
                                    }
                                })} placeholder="Invoice number" aria-invalid={!!errors.invoice} />
                                {errors.invoice && <FieldError>{errors.invoice.message}</FieldError>}
                                {/* {watch("invoice")} */}
                            </Field>
                            <Field>
                                <FieldLabel>Reason</FieldLabel>
                                <Controller
                                    name="reason"
                                    control={control}
                                    rules={{ required: "Reason is required" }}
                                    render={({ field }) =>
                                        <Select onValueChange={field.onChange} >
                                            <SelectTrigger aria-invalid={!!errors.reason}>
                                                <SelectValue placeholder="Select a reason" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Product defect">Product defect</SelectItem>
                                                <SelectItem value="Wrong amount">Wrong amount</SelectItem>
                                                <SelectItem value="Wrong items">Wrong items</SelectItem>
                                                <SelectItem value="Customer cancelled">Customer Cancelled</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    }

                                />
                                {errors.reason && <FieldError>{errors.reason.message}</FieldError>}
                            </Field>
                            {watch("reason") == "Other" && <Field>
                                <FieldLabel>Briefly describe the reason</FieldLabel>
                                <Input {...register("other", {
                                    required: "Reason is required",
                                })} placeholder="Reason" aria-invalid={!!errors.reason} />
                                {errors.other && <FieldError>{errors.other.message}</FieldError>}
                            </Field>}


                            <Field>
                                <input type="hidden" value={active.action} {...register("action")} />
                                <Button type="submit" disabled={state != "idle"}>{state != "idle" ? "Processing..." : "Create a refund"}</Button>
                            </Field>
                        </FieldGroup>

                    </FieldSet>
                )
            }}
        </ReusableForm>
    )
}

export function AproveRejectDisplay({ item, state }: { item: { data: { customer: string, id: string, invoice: string, amount: string, reason: string, date: string }, action: "reject" | "approve" | "create" }, state: any }) {
    const data = item.data;
    return (
        <div className="space-y-4">
            <div className={cn("space-y-4 p-2", item.action == "approve" && "bg-green-200", item.action == "reject" && "bg-red-100")}>
                <h5 className="text- text-xl font-semibold">
                    <Badge className="text-lg"  variant={item.action=="approve"?"default":"destructive"}>{item.action}</Badge>
                </h5>
                <h6>Refund - {data.id}</h6>
                <div className="font-medium ">Amount: {data.amount}</div>
                <div className="text-muted-foreground">{data.reason}</div>
                <div className="font-sm">
                    By {data.customer} on {data.date}
                </div>

            </div>
            <ReusableForm<ApproveRejectFormProps> actionUrl="/refunds" resetOnSuccess={state} >
                {({register, formState:{errors}, }, {state})=>{
                    return(
                        <div className="space-y-4">
                            <input type="hidden" defaultValue={data.id} {...register("id")} />
                            <input type="hidden" defaultValue={item.action} {...register("action")} />
                            <Button variant={item.action=="approve"?"default":"destructive"} disabled={state!="idle"}>{state!="idle"?"Processing...": item.action}</Button>
                        </div>
                    )
                }}
            </ReusableForm>
        </div>
    )
}

interface ApproveRejectFormProps{
    id:string,
    action:string,
}