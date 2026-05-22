import SalesHistoryDatatable from "~/components/salesHistorytable";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function SalesHistory() {
    return (
        <>
            <title>Sales History - POS</title>
            <section className="space-y-4 px-4 my-4">
                <SalesHistoryDatatable />
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
                                        $565
                                    </h2>
                                </CardContent>
                            </Card>

                            <Card className="p-0 shadow-none">
                                <CardContent className="p-6">
                                    <p className="text-sm text-muted-foreground">
                                        Transactions
                                    </p>

                                    <h2 className="text-3xl font-bold mt-2">
                                        4
                                    </h2>
                                </CardContent>
                            </Card>

                            <Card className="p-0 shadow-none">
                                <CardContent className="p-6">
                                    <p className="text-sm text-muted-foreground">
                                        Refunds
                                    </p>

                                    <h2 className="text-3xl font-bold mt-2">
                                        1
                                    </h2>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>

            </section>
        </>
    )
}