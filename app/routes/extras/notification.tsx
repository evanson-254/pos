import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { Button } from "~/components/ui/button";

import { Badge } from "~/components/ui/badge";

import {
  Bell,
  AlertTriangle,
  ShoppingCart,
  Package,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Low Stock Alert",
    description: "Coca Cola 500ml is running low.",
    type: "warning",
    time: "5 mins ago",
    icon: AlertTriangle,
  },
  {
    id: 2,
    title: "New Sale Completed",
    description: "Order #POS-1004 completed successfully.",
    type: "success",
    time: "10 mins ago",
    icon: ShoppingCart,
  },
  {
    id: 3,
    title: "New Inventory Added",
    description: "20 new products were added.",
    type: "info",
    time: "1 hour ago",
    icon: Package,
  },
];

export default function NotificationPage() {
  return (
    <div className="p-6">
      <Card className="rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Notifications</CardTitle>

            <CardDescription>
              Recent POS alerts and activities
            </CardDescription>
          </div>

          <Button variant="outline">
            <Bell className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {notifications.map((notification) => {
            const Icon = notification.icon;

            return (
              <Card
                key={notification.id}
                className="rounded-2xl border"
              >
                <CardContent className="p-4 flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="p-3 rounded-xl bg-muted">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">
                          {notification.title}
                        </h3>

                        <Badge variant="secondary">
                          {notification.type}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.description}
                      </p>

                      <p className="text-xs text-muted-foreground mt-2">
                        {notification.time}
                      </p>
                    </div>
                  </div>

                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}