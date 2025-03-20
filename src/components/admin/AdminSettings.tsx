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
        <CardDescription>{t('admin.contentDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">{t('admin.general')}</TabsTrigger>
            <TabsTrigger value="payments">{t('admin.payments')}</TabsTrigger>
            <TabsTrigger value="notifications">{t('admin.notifications')}</TabsTrigger>
            <TabsTrigger value="security">{t('admin.security')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="store-name">{t('admin.storeName')}</Label>
                <Input id="store-name" defaultValue="Recehan Gold" />
              </div>
              <div>
                <Label htmlFor="store-email">{t('admin.storeEmail')}</Label>
                <Input id="store-email" defaultValue="info@recehan.gold" type="email" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="maintenance-mode" />
                <Label htmlFor="maintenance-mode">{t('admin.maintenanceMode')}</Label>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="payments" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="payment-paypal" defaultChecked />
                <Label htmlFor="payment-paypal">{t('admin.paymentPaypal')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="payment-stripe" defaultChecked />
                <Label htmlFor="payment-stripe">{t('admin.paymentStripe')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="payment-crypto" defaultChecked />
                <Label htmlFor="payment-crypto">{t('admin.paymentCrypto')}</Label>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="notify-orders" defaultChecked />
                <Label htmlFor="notify-orders">{t('admin.notifyOrders')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notify-products" defaultChecked />
                <Label htmlFor="notify-products">{t('admin.notifyProducts')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notify-users" />
                <Label htmlFor="notify-users">{t('admin.notifyUsers')}</Label>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="security-2fa" />
                <Label htmlFor="security-2fa">{t('admin.security2fa')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="security-login" defaultChecked />
                <Label htmlFor="security-login">{t('admin.securityLogin')}</Label>
              </div>
              <div>
                <Label htmlFor="session-timeout">{t('admin.sessionTimeout')}</Label>
                <Input id="session-timeout" defaultValue="30" type="number" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};