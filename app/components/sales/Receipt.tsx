import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { useAppData } from '~/middleware/user';

interface ReceiptProps {
    sale: {
        invoice_code: string;
        created_at: string;
        items: Array<{ name: string; quantity: number; price: number; subtotal: number }>;
        total: number;
        payment_method: string;
        change: number;
        paid_amount: number;
    };
}

export const Receipt = React.forwardRef<HTMLDivElement, ReceiptProps>(({ sale }, ref) => {
    const { branch, user } = useAppData();
    const total = sale.items.reduce((acc, item) => acc + item.subtotal, 0);
    const tax = total * 0.16;
    const subtotal = total - tax;
    return (
        <div ref={ref} className="p-4 max-w-[80mm] mx-auto bg-white text-black text-xs font-mono">
            {/* Header */}
            <div className="text-center mb-4">
                <h2 className="text-base font-bold uppercase">pos</h2>
                <p className="text-[10px] text-gray-500">{branch?.address}, Branch - {branch?.name}</p>
                <p className="text-[10px] text-gray-500">Tel:{branch?.phone}</p>
            </div>

            {/* Meta Data */}
            <div className="border-b border-dashed pb-2 mb-2 space-y-0.5">
                <div><strong>Receipt:</strong> {sale.invoice_code}</div>
                <div><strong>Date:</strong> {new Date(sale.created_at).toLocaleString()}</div>
            </div>

            {/* Items Table */}
            <Table className="w-full mb-4">
                <TableHeader className="border-b border-dashed">
                    <TableRow className="hover:bg-transparent border-none">
                        <TableHead className="h-auto p-0 text-black font-bold">Item</TableHead>
                        <TableHead className="h-auto p-0 text-center text-black font-bold">Qty</TableHead>
                        <TableHead className="h-auto p-0 text-right text-black font-bold">Price</TableHead>
                        <TableHead className="h-auto p-0 text-right text-black font-bold">Subtotal</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sale.items.map((item, index) => (
                        <TableRow key={index} className="hover:bg-transparent border-none">
                            <TableCell className="p-0 py-1 align-top max-w-[40mm] truncate">{item.name}</TableCell>
                            <TableCell className="p-0 py-1 align-top text-center">{item.quantity}</TableCell>
                            <TableCell className="p-0 py-1 align-top text-center">{item.price?.toFixed(2)}</TableCell>
                            <TableCell className="p-0 py-1 align-top text-right">{item.subtotal?.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Total Section */}
            <div className="border-t border-dashed pt-2 text-right text-sm font-bold  space-y-2 ">
                <div className="flex justify-between">
                    <span>SUBTOTAL:</span>
                    <span>KES {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Tax (16%):</span>
                    <span>KES {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>TOTAL:</span>
                    <span>KES {Number(sale.total).toFixed(2)}</span>
                </div>
            </div>

            {/* Payment Method */}
            <div className="border-t border-dashed pt-2 text-right text-sm font-bold flex justify-between">
                <span>{sale.payment_method}</span>
                <span>{Number(sale.paid_amount)?.toFixed(2)}</span>
                <span>{Number(sale.change)?.toFixed(2)}</span>
            </div>
            <div className="border-t border-dashed pt-2 text-right text-sm font-bold flex justify-between">
                <span>Served By:</span>
                <span>{user.name}</span>
            </div>

            {/* Footer */}
            <div className="text-center mt-6 text-[10px] text-gray-400">
                Thank you for shopping with us!<br />Please keep this receipt.
            </div>
             <style dangerouslySetInnerHTML={{
                __html: `
                @page {
                    size: 80mm auto; /* 80mm wide, auto-scroll length */
                    margin: 0mm !important;
                    }

                `}} />
        </div>
    );
});

Receipt.displayName = "Receipt";
