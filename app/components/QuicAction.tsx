import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Button } from "./ui/button";

import {
  Plus,
  ShoppingCart,
  Receipt,
  Users,
} from "lucide-react";
import { Link } from "react-router";

export default function QuickActions() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4 .md:grid-cols-2">
        <Button asChild className="h-20 justify-start gap-3">
          <Link to={"/new-sale"}>
          <ShoppingCart />
          New Sale
          </Link>
          
        </Button>

        <Button className="h-20 justify-start gap-3">
          <Plus />
          Add Product
        </Button>

        <Button className="h-20 justify-start gap-3">
          <Receipt />
          Generate Report
        </Button>

        <Button className="h-20 justify-start gap-3">
          <Users />
          Customers
        </Button>
      </CardContent>
    </Card>
  );
}