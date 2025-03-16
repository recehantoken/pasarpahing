
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export const AdminContentManagement = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Content Management
        </CardTitle>
        <CardDescription>
          Manage website content, pages, and blog posts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Content management features will be available soon. This module will allow admins to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Create and edit static pages</li>
            <li>Publish blog posts and articles</li>
            <li>Manage banners and promotional content</li>
            <li>Update FAQ and help sections</li>
            <li>Create and edit product descriptions</li>
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
