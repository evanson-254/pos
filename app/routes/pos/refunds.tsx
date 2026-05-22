import { RotateCcw } from "lucide-react";
import RefundStats from "~/components/refundStats";
import RefundTable from "~/components/refundTable";
import { Button } from "~/components/ui/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export default function Refunds(){
    return(
        <>
        <title>Refunds - POS</title>
        <section className="space-y-4 px-4 my-4">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Refund Management
                    </CardTitle>
                    <CardDescription>
                        Track and manage all refund requests
                    </CardDescription>
                    <CardAction>
                        <Button>
                            <RotateCcw className="mr-2 h-4 w-4"/>
                            Create Refund
                        </Button>
                    </CardAction>
                </CardHeader>
            </Card>
            <RefundStats />
            <RefundTable />
        </section>
        </>
    )
}