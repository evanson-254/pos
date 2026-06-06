import SalesHistoryDatatable from "~/components/salesHistorytable";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { apiRequest } from "~/services/apiRequest";
import type { Route } from "./+types/saleshistory";
import AppModal from "~/components/appmodal";
import { useRef, useState } from "react";
import { Receipt } from "~/components/sales/Receipt";
import { useReactToPrint } from "react-to-print";
import { Button } from "~/components/ui/button";
import { Printer } from "lucide-react";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
    const { data } = await apiRequest("GET", "/sales-history");
    return { sales: data?.sale_history, stats: data?.stats };
}

export default function SalesHistory({ loaderData }: Route.ComponentProps) {
    const { sales, stats } = loaderData;
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<any>(null);
    const displayReceipt = (sale: any) => {
        setActiveItem(sale);
        setOpen(true);
    };
    const componentRef = useRef<HTMLDivElement>(null);
    const printReceipt = useReactToPrint({
        contentRef: componentRef,
        documentTitle: 'POS Receipt ',
    })
    return (
        <>
            <title>Sales History - POS</title>
            <section className="space-y-4 px-4 my-4">
                {/* {JSON.stringify(sales)}  */}
                {/* {JSON.stringify(stats)}k */}
                <SalesHistoryDatatable displayReceipt={displayReceipt} />
                <Card>
                    <CardHeader>
                        <CardTitle>Sales Summary</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Sales summary for this month
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 mt-6 md:grid-cols-3">
                            <Card className="p-0 shadow-none">
                                <CardContent className="p-6">
                                    <p className="text-sm text-muted-foreground">
                                        Total Sales
                                    </p>

                                    <h2 className="text-3xl font-bold mt-2">
                                        {stats?.total}
                                    </h2>
                                </CardContent>
                            </Card>

                            <Card className="p-0 shadow-none">
                                <CardContent className="p-6">
                                    <p className="text-sm text-muted-foreground">
                                        Transactions
                                    </p>

                                    <h2 className="text-3xl font-bold mt-2">
                                        {stats?.complete + stats?.pending + stats?.refunded}
                                    </h2>
                                </CardContent>
                            </Card>

                            <Card className="p-0 shadow-none">
                                <CardContent className="p-6">
                                    <p className="text-sm text-muted-foreground">
                                        Refunds
                                    </p>

                                    <h2 className="text-3xl font-bold mt-2">
                                        {stats?.refunded}
                                    </h2>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
                <AppModal title="Sales Receipt" open={open} onClose={() => setOpen(false)}>
                    <div className="space-y-4">
                        <Receipt sale={activeItem} ref={componentRef} />
                        <Button type="button" onClick={() => { setOpen(false); printReceipt(); }} className="flex-1 w-full sm:flex-initial">
                            <Printer className="h-4 w-4" /> Print
                        </Button>
                    </div>
                </AppModal>
            </section>
        </>
    )
}