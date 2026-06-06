import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Wallet, CreditCard, Banknote, CheckCircle2, Printer } from "lucide-react";
import type { CartItem } from "./cart";
import { ReusableForm } from "../FetcherForm";
import { Receipt } from "./Receipt";
import { useReactToPrint } from 'react-to-print';


interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  items: CartItem[];
  onCompleteSale: any;
}

export function CheckoutModal({
  isOpen,
  onClose,
  totalAmount,
  items,
  onCompleteSale,
}: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
 
  const itemCount = items.length;
  
  
  // Generate logical quick cash values based on the order total
  const quickCashOptions = [
    Math.ceil(totalAmount / 10) * 10,
    Math.ceil(totalAmount / 50) * 50 || 50,
    Math.ceil(totalAmount / 100) * 100 || 100,
  ];
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px] p-6 gap-6 h-[95vh] overflow-y-auto">


        <ReusableForm<combinedsaleFormProps> actionUrl={"/new-sale"} >
          {({ register, formState: { errors }, watch, control, setValue }, { state, data }) => {
            const amountTendered = watch("amount_tendered");
            const changeDue = amountTendered - totalAmount > 0 ? amountTendered - totalAmount : 0;
            const handleQuickCash = (amount: number) => {
              setValue("amount_tendered", amount);
            }
            const handleExactChange = () => {
              setValue("amount_tendered", totalAmount);
            }
            const componentRef = useRef<HTMLDivElement>(null);

            const handlePrint = useReactToPrint({
              contentRef: componentRef,
              documentTitle: 'POS Receipt ' + data?.sale?.invoice_code,
            })

            return (
              <>
                {data?.sale?.invoice_code ? <>
                  <DialogHeader className="text-left border-b pb-4">
                    <DialogTitle className="text-xl font-bold text-slate-900">Receipt</DialogTitle>
                    <DialogDescription>
                      Print receipt for invoice code {data?.sale?.invoice_code}
                    </DialogDescription>
                    
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className=" p-2 overflow-hidden ">
                      <Receipt sale={data?.sale} ref={componentRef} />
                    </div>
                    <Button type="button" onClick={()=>{handlePrint(); onCompleteSale();}} className="flex-1 w-full sm:flex-initial">
                     <Printer className="h-4 w-4" /> Print
                    </Button>
                  </div>
                </>
                  :
                  <>
                    <DialogHeader className="text-left border-b pb-4">
                      <DialogTitle className="text-xl font-bold text-slate-900">Complete Transaction</DialogTitle>
                      <DialogDescription>
                        Processing order of {itemCount} {itemCount === 1 ? "item" : "items"}.
                      </DialogDescription>

                      {/* Big Bold Total Display */}
                      <div className="mt-4 bg-slate-50 border rounded-lg p-4 flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Payable</span>
                        <span className="text-3xl font-extrabold text-slate-900">Ksh {totalAmount.toFixed(2)}</span>
                      </div>
                    </DialogHeader>
                    <div className="space-y-6">
                      <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                        <TabsList className="grid w-full grid-cols-3 h-12 bg-slate-100 p-1">
                          <TabsTrigger value="cash" className="gap-2 text-sm font-medium">
                            <Banknote className="h-4 w-4" /> Cash
                          </TabsTrigger>
                          <TabsTrigger value="card" className="gap-2 text-sm font-medium">
                            <CreditCard className="h-4 w-4" /> Card
                          </TabsTrigger>
                          <TabsTrigger value="mobile" className="gap-2 text-sm font-medium">
                            <Wallet className="h-4 w-4" /> Mobile
                          </TabsTrigger>
                        </TabsList>

                        {/* CASH PAYMENT VIEW */}
                        <TabsContent value="cash" className="space-y-4 pt-4 mt-0">
                          <div className="space-y-2">
                            <Label htmlFor="amount-tendered" className="text-sm font-semibold">Amount Tendered</Label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">Kes</span>
                              <Input
                                id="amount-tendered"
                                // name="amount-tendered"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="pl-8 text-lg font-semibold h-11"
                                {...register("amount_tendered",
                                  {
                                    required: paymentMethod === "cash" ? "Amount tendered is required!" : false,
                                    min: 0,
                                    validate: (value) => totalAmount > value ? "Amount tendered is less than total amount!" : true,
                                  }
                                )}
                                // value={amountTendered}
                                // onChange={(e) => setAmountTendered(e.target.value)}
                                // required={paymentMethod === "cash"}
                                autoFocus
                              />
                              {errors.amount_tendered && <span className="text-xs text-red-600">{errors.amount_tendered.message}</span>}
                            </div>
                          </div>

                          {/* Quick Cash Buttons */}
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-slate-400">Quick Cash Shortcuts</Label>
                            <div className="grid grid-cols-4 gap-2">
                              <Button type="button" variant="outline" size="sm" onClick={handleExactChange} className="font-medium text-xs">
                                Exact
                              </Button>
                              {quickCashOptions.map((amount) => (
                                <Button
                                  key={amount}
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="font-medium text-xs"
                                  onClick={() => handleQuickCash(amount)}
                                >
                                  {amount}
                                </Button>
                              ))}
                            </div>
                          </div>

                          {/* Live Change Due Calculation Box */}
                          <div className={`mt-4 rounded-lg p-4 flex justify-between items-center border ${changeDue > 0 ? "bg-emerald-50/50 border-emerald-200" : "bg-slate-50 border-slate-200"
                            }`}>
                            <span className="text-sm font-medium text-slate-600">Change Due:</span>
                            <span className={`text-2xl font-bold ${changeDue > 0 ? "text-emerald-600" : "text-slate-400"}`}>
                              Kes {changeDue.toFixed(2)}
                            </span>
                          </div>
                        </TabsContent>

                        {/* CARD PAYMENT VIEW */}
                        <TabsContent value="card" className="space-y-4 pt-4 mt-0">
                          <div className="rounded-lg border bg-slate-50 p-4 text-center border-dashed space-y-2">
                            <CreditCard className="h-8 w-8 mx-auto text-slate-400 animate-pulse" />
                            <p className="text-sm font-medium text-slate-700">Awaiting External Card Terminal Swipe...</p>
                            <p className="text-xs text-slate-400">Insert, tap, or swipe card on your physical reader device now.</p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="card-ref" className="text-sm font-medium">Terminal Reference ID (Optional)</Label>
                            <Input
                              id="card-ref"
                              placeholder="e.g. CHG-98432"
                              {...register("reference_id")}
                            // value={referenceId}
                            // onChange={(e) => setReferenceId(e.target.value)}
                            />
                            {errors.reference_id && <span className="text-xs text-red-600">{errors.reference_id.message}</span>}
                          </div>
                        </TabsContent>

                        {/* MOBILE PAYMENT VIEW */}
                        <TabsContent value="mobile" className="space-y-4 pt-4 mt-0">
                          <div className="space-y-2">
                            <Label htmlFor="mobile-ref" className="text-sm font-medium">Mobile Transaction Reference / Phone Code</Label>
                            <Input
                              id="mobile-ref"
                              placeholder="e.g. MPESA-TXN-741"
                              {...register("reference_id", { required: paymentMethod === "mobile" ? "Mobile transaction reference is required!" : false })}
                            // value={referenceId}
                            // onChange={(e) => setReferenceId(e.target.value)}
                            // required={paymentMethod === "mobile"}
                            />
                            {errors.reference_id && <span className="text-xs text-red-600">{errors.reference_id.message}</span>}
                          </div>
                        </TabsContent>
                      </Tabs>
                      <input type="hidden" value={JSON.stringify(items)} {...register("items")} />
                      <input type="hidden" value={paymentMethod} {...register("payment_method")} />
                      <input type="hidden" value={totalAmount} {...register("total")} />

                      <DialogFooter className="border-t pt-4 flex gap-2 sm:gap-0">

                        <Button type="button" variant="ghost" onClick={() => {  onClose(); }} className="flex-1 sm:flex-initial">
                          Cancel
                        </Button>
                        <Button type="submit" className="flex-1 sm:flex-initial gap-2 font-semibold" disabled={state != "idle"}>
                          {state == "idle" ? <> <CheckCircle2 className="h-4 w-4" /> Complete Sale</> : "Processing..."}
                        </Button>
                      </DialogFooter>
                    </div>
                  </>
                }
              </>
            )
          }}
        </ReusableForm>

      </DialogContent>
    </Dialog>
  );
}

type sales_itemFormProps = {
  // sale_id, product_id, subtotal, tax, quantity, price, discount
  product_id: number,
  quantity: number,
  price: number,
  subtotal: number,
  tax: number,
}
type saleCheckoutFormProps = {
  // sale_id, product_id, subtotal, tax, quantity, price, discount,
  //branch_id, customer_id, user_id, invoice_number, subtotal, tax, total
  // paid_amount, change_amount,payment_status, sales_status
  subtotal: number,
  tax: string,
  total: number,
  paid_amount: number,
  change_amount: number,
  payment_status: string,
  sales_status: string,
}

interface combinedsaleFormProps {
  items: sales_itemFormProps[],
  checkout: saleCheckoutFormProps,
  payment_method: string,
  change_due: number,
  reference_id: string,
  amount_tendered: number,
  total: number,
}
