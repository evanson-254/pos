import React, { forwardRef } from "react";
import Barcode from "react-barcode";
import { Card } from "~/components/ui/card";

export const BarcodePrintSheet = forwardRef(({ products }: { products: any[] }, ref: any) => {
    return (
        <div ref={ref} className="p-4 bg-white text-black w-full ">

            {/* 3-Column Sticker Matrix Layout Sheet */}
            <div className="grid grid-cols-3 gap-2.5">
                {products.map((product) => (
                    <Card
                        key={product.id}
                        className="p-3 flex flex-col items-center justify-between text-center border border-dashed border-slate-400 w-full overflow-hidden shadow-none rounded-sm bg-white text-black break-inside-avoid"
                        style={{ height: '40mm', maxHeight: '40mm' }} // Strict sticker size parameter
                    >
                        <div>
                            <h4 className="text-[10px] font-bold tracking-tight uppercase truncate max-w-full">
                                {product.name}
                            </h4>
                            <p className="text-xs font-black mt-0.5">
                                KES {Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </p>
                        </div>

                        {/* Crisp Barcode Canvas */}
                        <div className="scale-90 origin-center my-0.5 flex justify-center w-full">
                            <Barcode
                                value={product.barcode}
                                width={1.1}
                                height={35}
                                fontSize={9}
                                margin={0}
                                background="transparent"
                            />
                        </div>
                    </Card>
                ))}
            </div>

            {/* Strict inline styling specifically applied inside the printer stream thread */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @page {
          size: auto;
          margin: 6mm 4mm !important; /* Resets outer receipt sheet bounding borders */
        }
        @media print {
        @page {
            size: A4 portrait; /* Forces layout tracking onto standard matrix paper sheets */
            margin: 5mm !important; /* Fixed border boundary constraints */
        }
        }

        .break-inside-avoid {
          page-break-inside: avoid;
          break-inside: avoid;
        }
      `}} />
        </div>
    );
});

BarcodePrintSheet.displayName = "BarcodePrintSheet";
