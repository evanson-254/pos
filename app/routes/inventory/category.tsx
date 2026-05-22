import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";

const categories = [
    {
        id: 1,
        name: "Computer Accessories",
        products: 24,
        status: "Active",
    },
    {
        id: 2,
        name: "Chargers",
        products: 12,
        status: "Active",
    },
    {
        id: 3,
        name: "Audio Devices",
        products: 8,
        status: "Inactive",
    },
];

export default function CategoriesPage() {
    return (
        <>
            <title>Categories - POS</title>
            <div className="space-y-6 px-4 my-4">
                {/* header */}
                <Card className="">

                    <CardHeader className="">
                        <CardTitle className="text-2xl font-bold">Categories</CardTitle>
                        <CardDescription className="">
                            Manage product categories
                        </CardDescription>
                        <CardAction>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Category
                            </Button>
                        </CardAction>

                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* search */}
                        <div className="flex items-center gap-4">
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                                <Input placeholder="Search category..." className="pl-9" />
                            </div>
                        </div>

                        {/* category cards */}
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                            {categories.map((category) => (
                                <Card key={category.id} className="p-0">
                                    <CardContent className="p-5 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h2 className="font-semibold truncate" title={category.name}>{category.name}</h2>

                                            <span
                                                className={`text-xs px-2 py-1 rounded-full ${category.status === "Active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {category.status}
                                            </span>
                                        </div>

                                        <p className="text-sm text-muted-foreground">
                                            {category.products} Products
                                        </p>

                                        <div className="flex items-center gap-2">
                                            <Button size="sm" variant="outline">
                                                <Pencil className="h-4 w-4" />
                                            </Button>

                                            <Button size="sm" variant="destructive">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>

                </Card>
            </div>
        </>
    );
}