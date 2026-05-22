import type { Product } from "~/routes/pos/newsale"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"



interface SaleProductDisplayProps {
    filteredProducts: Product[],
    addToCart: (product: Product) => void
}

export default function SaleProductDisplay({ filteredProducts, addToCart }: SaleProductDisplayProps) {

    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
                // <Card
                //     key={product.id}
                //     className="cursor-pointer  transition hover:shadow-lg"
                //     onClick={() => addToCart(product)}
                // >
                //     <CardHeader >    
                //         <img src="/logo.png" alt="" />
                //     </CardHeader>
                //     <CardContent className="space-y-3 p-4">
                //         <div className="flex items-center justify-between">
                //             <Badge>{product.category}</Badge>

                //             <Badge
                //                 variant={product.stock <= 5 ? "destructive" : "secondary"}
                //             >
                //                 Stock: {product.stock}
                //             </Badge>
                //         </div>

                //         <div>
                //             <h2 className="font-semibold">{product.name}</h2>

                //             <p className="text-2xl font-bold">
                //                 KES {product.price}
                //             </p>
                //         </div>

                //         <Button className="w-full">
                //             Add To Cart
                //         </Button>
                //     </CardContent>
                // </Card>
                <Card
                    key={product.id}
                    className="py-2 group overflow-hidden border bg-background transition hover:-translate-y-1 hover:shadow-xl"
                    onClick={() => addToCart(product)}
                >
                    {/* IMAGE */}
                    <div className="relative h-16 overflow-hidden justify-center flex">
                        <img
                            src={
                                product.image ||
                                "/logo.png"
                            }
                            alt={product.name}
                            className=" h-full w-auto object-cover transition duration-300 group-hover:scale-105"
                        />

                        {/* CATEGORY */}
                        <div className="absolute left-3 top-3">
                            <Badge variant={"outline"} className="backdrop-blur-sm">
                                {product.category}
                            </Badge>
                        </div>

                        {/* STOCK */}
                        <div className="absolute right-3 top-3">
                            <Badge
                                variant={product.stock <= 5 ? "destructive" : "secondary"}
                                className="backdrop-blur-sm"
                            >
                                {product.stock} Left
                            </Badge>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <CardContent className="space-y-4 px-4 mt-0">
                        <div className="space-y-1">
                            <h2 className="line-clamp-1 text-base font-semibold">
                                {product.name}
                            </h2>

                            <p className="text-2xl font-bold tracking-tight">
                                KES {product.price}
                            </p>
                        </div>

                        <Button
                            className="w-full "
                            size="lg"
                        >
                            Add To Cart
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}