
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const AdminSettings = () => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('admin.settings')}</CardTitle>
        <CardDescription>
          Manage your store settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="store-name">Store Name</Label>
                <Input id="store-name" defaultValue="Recehan Gold" />
              </div>
              
              <div>
                <Label htmlFor="store-email">Store Email</Label>
                <Input id="store-email" defaultValue="info@recehan.gold" type="email" />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="maintenance-mode" />
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="payments" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="payment-paypal" defaultChecked />
                <Label htmlFor="payment-paypal">PayPal</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="payment-stripe" defaultChecked />
                <Label htmlFor="payment-stripe">Stripe</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="payment-crypto" defaultChecked />
                <Label htmlFor="payment-crypto">Cryptocurrency</Label>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="notify-orders" defaultChecked />
                <Label htmlFor="notify-orders">New Order Notifications</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="notify-products" defaultChecked />
                <Label htmlFor="notify-products">Low Stock Notifications</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="notify-users" />
                <Label htmlFor="notify-users">New User Registrations</Label>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="security-2fa" />
                <Label htmlFor="security-2fa">Require 2FA for Admin Users</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="security-login" defaultChecked />
                <Label htmlFor="security-login">Login Attempt Monitoring</Label>
              </div>
              
              <div>
                <Label htmlFor="session-timeout">Admin Session Timeout (minutes)</Label>
                <Input id="session-timeout" defaultValue="30" type="number" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
