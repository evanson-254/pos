import { productsColumn } from "./datatable/column";
import { DataTable } from "./datatable/table";

export type Product = {
    id: number;
    name: string;
    sku: string;
    barcode: string;
    category_id: number;
    brand_id?: number;

    cost_price: number;
    selling_price: number;

    stock_quantity: number;
    reorder_level: number;

    image?: string;

    supplier_id?: number;

    status: "in_stock" | "low_stock" | "out_of_stock";

    created_at: string;
    updated_at: string;
}
// export const products: Product[] = [
//     {
//         id: 1,
//         name: "Wireless Mouse",
//         sku: "WM-001",
//         barcode: "100000000001",
//         category_id: 1,
//         brand_id: 1,
//         cost_price: 800,
//         selling_price: 1200,
//         stock_quantity: 45,
//         reorder_level: 10,
//         image: "/images/products/mouse.jpg",
//         supplier_id: 1,
//         status: "in_stock",
//         created_at: "2026-05-01",
//         updated_at: "2026-05-15",
//     },

//     {
//         id: 2,
//         name: "Mechanical Keyboard",
//         sku: "MK-002",
//         barcode: "100000000002",
//         category_id: 1,
//         brand_id: 2,
//         cost_price: 3500,
//         selling_price: 5000,
//         stock_quantity: 12,
//         reorder_level: 8,
//         image: "/images/products/keyboard.jpg",
//         supplier_id: 2,
//         status: "in_stock",
//         created_at: "2026-05-02",
//         updated_at: "2026-05-14",
//     },

//     {
//         id: 3,
//         name: "USB-C Charger 20W",
//         sku: "UC-003",
//         barcode: "100000000003",
//         category_id: 2,
//         brand_id: 3,
//         cost_price: 900,
//         selling_price: 1500,
//         stock_quantity: 5,
//         reorder_level: 10,
//         image: "/images/products/charger.jpg",
//         supplier_id: 1,
//         status: "low_stock",
//         created_at: "2026-05-03",
//         updated_at: "2026-05-16",
//     },

//     {
//         id: 4,
//         name: "Bluetooth Speaker",
//         sku: "BS-004",
//         barcode: "100000000004",
//         category_id: 3,
//         brand_id: 4,
//         cost_price: 2500,
//         selling_price: 4200,
//         stock_quantity: 0,
//         reorder_level: 5,
//         image: "/images/products/speaker.jpg",
//         supplier_id: 3,
//         status: "out_of_stock",
//         created_at: "2026-05-04",
//         updated_at: "2026-05-17",
//     },

//     {
//         id: 5,
//         name: "Gaming Headset",
//         sku: "GH-005",
//         barcode: "100000000005",
//         category_id: 3,
//         brand_id: 2,
//         cost_price: 2800,
//         selling_price: 4500,
//         stock_quantity: 18,
//         reorder_level: 6,
//         image: "/images/products/headset.jpg",
//         supplier_id: 2,
//         status: "in_stock",
//         created_at: "2026-05-05",
//         updated_at: "2026-05-15",
//     },

//     {
//         id: 6,
//         name: "32GB Flash Drive",
//         sku: "FD-006",
//         barcode: "100000000006",
//         category_id: 4,
//         brand_id: 5,
//         cost_price: 600,
//         selling_price: 1000,
//         stock_quantity: 60,
//         reorder_level: 15,
//         image: "/images/products/flashdrive.jpg",
//         supplier_id: 1,
//         status: "in_stock",
//         created_at: "2026-05-06",
//         updated_at: "2026-05-12",
//     },

//     {
//         id: 7,
//         name: "Laptop Stand",
//         sku: "LS-007",
//         barcode: "100000000007",
//         category_id: 5,
//         brand_id: 6,
//         cost_price: 1400,
//         selling_price: 2300,
//         stock_quantity: 7,
//         reorder_level: 10,
//         image: "/images/products/laptopstand.jpg",
//         supplier_id: 4,
//         status: "low_stock",
//         created_at: "2026-05-07",
//         updated_at: "2026-05-16",
//     },

//     {
//         id: 8,
//         name: "Smartphone Tripod",
//         sku: "ST-008",
//         barcode: "100000000008",
//         category_id: 6,
//         brand_id: 7,
//         cost_price: 1100,
//         selling_price: 1800,
//         stock_quantity: 25,
//         reorder_level: 5,
//         image: "/images/products/tripod.jpg",
//         supplier_id: 3,
//         status: "in_stock",
//         created_at: "2026-05-08",
//         updated_at: "2026-05-13",
//     },

//     {
//         id: 9,
//         name: "External Hard Drive 1TB",
//         sku: "HD-009",
//         barcode: "100000000009",
//         category_id: 4,
//         brand_id: 5,
//         cost_price: 5500,
//         selling_price: 7200,
//         stock_quantity: 3,
//         reorder_level: 5,
//         image: "/images/products/harddrive.jpg",
//         supplier_id: 2,
//         status: "low_stock",
//         created_at: "2026-05-09",
//         updated_at: "2026-05-17",
//     },

//     {
//         id: 10,
//         name: "Webcam HD 1080p",
//         sku: "WC-010",
//         barcode: "100000000010",
//         category_id: 7,
//         brand_id: 8,
//         cost_price: 2100,
//         selling_price: 3500,
//         stock_quantity: 14,
//         reorder_level: 5,
//         image: "/images/products/webcam.jpg",
//         supplier_id: 4,
//         status: "in_stock",
//         created_at: "2026-05-10",
//         updated_at: "2026-05-14",
//     },
// ];

export default function ProductTable({products, actions}:{products:Product[], actions?:any}) {
    return <DataTable columns={productsColumn({delAct:actions?.delete?.act, printAct:actions?.print?.act, exportAct:actions?.export?.act})} data={products} actions={actions} />

}