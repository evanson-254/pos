// BrandsPage.tsx

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Input } from "~/components/ui/input";


const brands = [
    {
        id: 1,
        name: "Logitech",
        products: 18,
    },
    {
        id: 2,
        name: "Razer",
        products: 10,
    },
    {
        id: 3,
        name: "JBL",
        products: 6,
    },
];

export default function BrandsPage() {
    return (
        <div className="space-y-6 px-4 my-4">
            <title>Brands - POS</title>
            <Card>
                {/* header */}
                <CardHeader >

                    <CardTitle className="text-2xl font-bold">Brands</CardTitle>
                    <CardDescription>
                        Manage product brands
                    </CardDescription>

                    <CardAction>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Brand
                        </Button>
                    </CardAction>

                </CardHeader>

                {/* brands grid */}
                <CardContent className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search brand..." className="pl-9" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {brands.map((brand) => (
                            <Card key={brand.id} className="p-2">
                                <CardContent className="p-5">
                                    <div className="space-y-4">
                                        <div>
                                            <h2 className="font-semibold truncate" title={brand.name}>{brand.name}</h2>

                                            <p className="text-sm text-muted-foreground">
                                                {brand.products} Products
                                            </p>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <Pencil className="h-4 w-4" />
                                            </Button>

                                            <Button variant="destructive" size="sm">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>

            </Card>
        </div>
    );
}