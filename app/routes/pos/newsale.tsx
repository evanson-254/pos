import { useMemo, useState } from "react";
import SalesCart from "~/components/sales/cart";
import SaleProductDisplay from "~/components/sales/productdisplay";
import SaleSearch from "~/components/sales/search";
import type { Route } from "./+types/newsale";
import { apiRequest } from "~/services/apiRequest";
import { CheckoutModal } from "~/components/sales/checkout";
import { toast } from "sonner";
import { useGlobalBarcodeScanner } from "~/components/BarcodeInput";


export type Product = {
    id: number;
    barcode: string;
    sku: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
    image?: string
};

type CartItem = Product & {
    quantity: number;
    subtotal: number;
};

// const products: Product[] = [
//     {
//         id: 1,
//         name: "Coca Cola 500ml",
//         price: 120,
//         stock: 20,
//         category: "Drinks",
//     },
//     {
//         id: 2,
//         name: "Bread Large",
//         price: 85,
//         stock: 14,
//         category: "Bakery",
//     },
//     {
//         id: 3,
//         name: "Milk 1L",
//         price: 150,
//         stock: 8,
//         category: "Dairy",
//     },
//     {
//         id: 4,
//         name: "Sugar 2KG",
//         price: 320,
//         stock: 5,
//         category: "Groceries",
//     },
// ];

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
    const { data } = await apiRequest("GET", "/sales");
    return { products: data?.products as Product[] };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const {data, errors, message, status} = await apiRequest("POST", "/sales/new", formData);
    if (status === 200) {
        toast.success(message);
    }
    return { data, errors, status }
}

export default function NewSale({ loaderData }: Route.ComponentProps) {
    const { products } = loaderData;
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState<CartItem[]>([]);
    const filteredProducts = useMemo(() => {
        return products?.filter((product) =>
            product.name?.toLowerCase().includes(search.toLowerCase())||product.barcode?.toLowerCase().includes(search.toLowerCase())||product.sku?.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, products]);

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);

            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                            subtotal: (item.quantity + 1) * item.price,
                        }
                        : item
                );
            }

            return [
                ...prev,
                {
                    ...product,
                    quantity: 1,
                    subtotal: product.price,
                },
            ];
        });
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) return;

        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity,
                        subtotal: quantity * item.price,
                    }
                    : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const total = cart.reduce((acc, item) => acc + item.subtotal, 0);

    const tax = total * 0.16;

    const subtotal = total - tax;
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const handleSaleCompletion = () => {
        setCart([]);
        setIsCheckoutOpen(false);
    };
    const handleBarcodeScan = (barcode: string) => {
        //setSearch(barcode);
        const selectedProduct = products.find((product) => product.barcode === barcode);
        selectedProduct&& addToCart(selectedProduct);
    }
    useGlobalBarcodeScanner(handleBarcodeScan);
    return (
        <>
            <title>New Sale - POS</title>
            <section className="space-y-4 px-4 my-4">
                <div className="grid gap-4 lg:grid-cols-[1fr_400px]">
                    <div className="space-y-4">
                        <SaleSearch search={search} setSearch={setSearch} />
                        <SaleProductDisplay filteredProducts={filteredProducts} addToCart={addToCart} />
                    </div>
                    <SalesCart openCheckoutModal={() => setIsCheckoutOpen(true)} cart={cart} updateQuantity={updateQuantity} removeItem={removeItem} subtotal={subtotal} tax={tax} total={total} />
                </div>
                <CheckoutModal
                    isOpen={isCheckoutOpen}
                    onClose={() => {setIsCheckoutOpen(false); handleSaleCompletion();}}
                    totalAmount={total} // dynamically map from active cart state
                    items={cart}        // dynamically map from active cart state
                    onCompleteSale={handleSaleCompletion}
                />
            </section>
        </>
    )
}