import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import type { Product } from "~/routes/pos/newsale";
import { Separator } from "../ui/separator";
import { ReusableForm } from "../FetcherForm";

 export type CartItem = Product & {
    quantity: number;
    subtotal: number;
};

interface SalesCartProps {
    cart: CartItem[],
    updateQuantity: any,
    removeItem: any,
    total: number,
    tax: number,
    subtotal: number,
    openCheckoutModal?: any,
}


export default function SalesCart({ cart, updateQuantity, removeItem, subtotal, tax, total, openCheckoutModal }: SalesCartProps) {
    //sale item table fields
    //branch_id, customer_id, user_id, invoice_number, subtotal, tax, total
    // paid_amount, change_amount,payment_status, sales_status
    // sale item
    // sale_id, product_id, subtotal, tax, quantity, price, discount
    return (
        <Card className="sticky top-4 h-fit">
            <CardHeader>
                <CardTitle>Current Cart</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="max-h-[400px] overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead>Qty</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead />
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {cart.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center text-muted-foreground"
                                    >
                                        No items added
                                    </TableCell>
                                </TableRow>
                            )}

                            {cart.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">{item.name}</p>

                                            <p className="text-xs text-muted-foreground">
                                                KES {item.price}
                                            </p>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <Input
                                            type="number"
                                            min={1}
                                            className="w-20"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                updateQuantity(
                                                    item.id,
                                                    Number(e.target.value)
                                                )
                                            }
                                        />
                                    </TableCell>

                                    <TableCell>
                                        KES {item.subtotal.toFixed(2)}
                                    </TableCell>

                                    <TableCell>
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <Separator />

                {/* TOTALS */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span>Subtotal</span>

                        <span>KES {subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span>Tax (16%)</span>

                        <span>KES {tax.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center justify-between text-lg font-bold">
                        <span>Total</span>

                        <span>KES {total.toFixed(2)}</span>
                    </div>
                </div>

                <Button size="lg" className="w-full" disabled={cart.length === 0} onClick={() => openCheckoutModal()}>
                    Complete Sale
                </Button>
            </CardContent>
        </Card>
    )
}



// export function SalesItemForm() {
//     return (
//         <ReusableForm<combinedsaleFormProps> actionUrl={"/new-sale"}>
//             {({register }, ) => {
//                 return (
//                     <div>
                        
//                     </div>
//                 )
//             }}
//         </ReusableForm>
//     )
// }