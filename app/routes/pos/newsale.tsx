import { useMemo, useState } from "react";
import SalesCart from "~/components/sales/cart";
import SaleProductDisplay from "~/components/sales/productdisplay";
import SaleSearch from "~/components/sales/search";


export type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
    image?: string
};

type CartItem = Product & {
    quantity: number;
    subtotal: number;
};

const products: Product[] = [
    {
        id: 1,
        name: "Coca Cola 500ml",
        price: 120,
        stock: 20,
        category: "Drinks",
    },
    {
        id: 2,
        name: "Bread Large",
        price: 85,
        stock: 14,
        category: "Bakery",
    },
    {
        id: 3,
        name: "Milk 1L",
        price: 150,
        stock: 8,
        category: "Dairy",
    },
    {
        id: 4,
        name: "Sugar 2KG",
        price: 320,
        stock: 5,
        category: "Groceries",
    },
];


export default function NewSale() {
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState<CartItem[]>([]);
    const filteredProducts = useMemo(() => {
        return products.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

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

  const subtotal = cart.reduce((acc, item) => acc + item.subtotal, 0);

  const tax = subtotal * 0.16;

  const total = subtotal + tax;

    return (
        <>
            <title>New Sale - POS</title>
            <section className="space-y-4 px-4 my-4">
                <div className="grid gap-4 lg:grid-cols-[1fr_400px]">
                    <div className="space-y-4">
                        <SaleSearch search={search} setSearch={setSearch} />
                        <SaleProductDisplay filteredProducts={filteredProducts} addToCart={addToCart} />
                    </div>
                    <SalesCart cart={cart} updateQuantity={updateQuantity} removeItem={removeItem} subtotal={subtotal} tax={tax} total={total} />
                </div>
            </section>
        </>
    )
}