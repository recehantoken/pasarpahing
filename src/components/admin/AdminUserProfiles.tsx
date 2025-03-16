
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCog } from "lucide-react";

export const AdminUserProfiles = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCog className="h-5 w-5" />
          User Profiles Management
        </CardTitle>
        <CardDescription>
          View and manage user profile details and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            User profile management features will be available soon. This module will allow admins to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>View user profile information</li>
            <li>Edit user details</li>
            <li>Manage user preferences</li>
            <li>Set user permissions and access levels</li>
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
