
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export const AdminOrders = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Order Management
        </CardTitle>
        <CardDescription>
          Track and manage customer orders and shipping status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Order management features will be available soon. This module will allow admins to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>View all customer orders</li>
            <li>Update order status</li>
            <li>Process refunds</li>
            <li>Generate shipping labels</li>
            <li>Track delivery progress</li>
          </ul>
          <div className="pt-4">
            <Button variant="outline" disabled>
              Feature Coming Soon
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
