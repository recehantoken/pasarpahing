
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AdminShipping = () => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('admin.shipping')}</CardTitle>
        <CardDescription>
          {t('admin.shipping')} settings and configuration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="shipping-methods">
          <TabsList className="mb-4">
            <TabsTrigger value="shipping-methods">Shipping Methods</TabsTrigger>
            <TabsTrigger value="shipping-zones">Shipping Zones</TabsTrigger>
            <TabsTrigger value="shipping-rates">Shipping Rates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="shipping-methods" className="space-y-4">
            <div className="rounded-md border p-4">
              <h3 className="font-medium">Standard Shipping</h3>
              <p className="text-sm text-muted-foreground">
                Regular shipping option with standard delivery times
              </p>
            </div>
            
            <div className="rounded-md border p-4">
              <h3 className="font-medium">Express Shipping</h3>
              <p className="text-sm text-muted-foreground">
                Faster shipping option with expedited delivery
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="shipping-zones" className="space-y-4">
            <div className="rounded-md border p-4">
              <h3 className="font-medium">Domestic</h3>
              <p className="text-sm text-muted-foreground">
                Shipping within the country
              </p>
            </div>
            
            <div className="rounded-md border p-4">
              <h3 className="font-medium">International</h3>
              <p className="text-sm text-muted-foreground">
                Shipping to international destinations
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="shipping-rates" className="space-y-4">
            <div className="rounded-md border p-4">
              <h3 className="font-medium">Standard Domestic</h3>
              <p className="text-sm text-muted-foreground">
                $5.99
              </p>
            </div>
            
            <div className="rounded-md border p-4">
              <h3 className="font-medium">Express Domestic</h3>
              <p className="text-sm text-muted-foreground">
                $12.99
              </p>
            </div>
            
            <div className="rounded-md border p-4">
              <h3 className="font-medium">Standard International</h3>
              <p className="text-sm text-muted-foreground">
                $15.99
              </p>
            </div>
            
            <div className="rounded-md border p-4">
              <h3 className="font-medium">Express International</h3>
              <p className="text-sm text-muted-foreground">
                $29.99
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
