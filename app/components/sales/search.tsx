import { Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";

export default function SaleSearch({ search, setSearch }: { search: string, setSearch: React.Dispatch<React.SetStateAction<string>> }) {

    return (
         <Card className="">
            <CardHeader>
              <CardTitle>New Sale</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
    )
}