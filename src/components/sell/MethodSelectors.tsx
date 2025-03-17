
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

interface Method {
  id: string;
  name: string;
}

interface MethodSelectorsProps {
  paymentMethodId: string;
  setPaymentMethodId: (id: string) => void;
  shippingMethodId: string;
  setShippingMethodId: (id: string) => void;
  paymentMethods: Method[];
  shippingMethods: Method[];
  isLoading: boolean;
}

export const MethodSelectors = ({
  paymentMethodId,
  setPaymentMethodId,
  shippingMethodId,
  setShippingMethodId,
  paymentMethods,
  shippingMethods,
  isLoading,
}: MethodSelectorsProps) => {
  const { language } = useLanguage();
  const [isCreatingPaymentMethod, setIsCreatingPaymentMethod] = useState(false);

  const handleCreateDefaultPaymentMethod = async () => {
    try {
      setIsCreatingPaymentMethod(true);
      
      // Create a default payment method if none exists
      const { data, error } = await supabase
        .from("payment_methods")
        .insert([
          {
            name: "Cash on Delivery",
            type: "cash",
            is_active: true
          }
        ])
        .select()
        .single();
        
      if (error) throw error;
      
      toast.success(
        language === 'id' 
          ? "Metode pembayaran ditambahkan" 
          : "Payment method added"
      );
      
      // Return the new payment method so it can be added to the list
      return data;
    } catch (error: any) {
      console.error("Error creating payment method:", error);
      toast.error(
        language === 'id'
          ? "Gagal menambahkan metode pembayaran"
          : "Failed to add payment method",
        {
          description: error.message
        }
      );
      return null;
    } finally {
      setIsCreatingPaymentMethod(false);
    }
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="paymentMethod">
          {language === 'id' ? 'Metode Pembayaran*' : 'Payment Method*'}
        </Label>
        
        {paymentMethods.length === 0 ? (
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">
              {language === 'id' 
                ? 'Tidak ada metode pembayaran tersedia. Tambahkan satu untuk melanjutkan.' 
                : 'No payment methods available. Add one to continue.'}
            </div>
            <Button 
              type="button"
              variant="outline" 
              size="sm"
              onClick={handleCreateDefaultPaymentMethod}
              disabled={isCreatingPaymentMethod}
              className="w-full flex items-center justify-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              {isCreatingPaymentMethod 
                ? (language === 'id' ? 'Menambahkan...' : 'Adding...') 
                : (language === 'id' ? 'Tambahkan Metode Pembayaran Default' : 'Add Default Payment Method')}
            </Button>
          </div>
        ) : (
          <Select 
            value={paymentMethodId} 
            onValueChange={setPaymentMethodId}
            disabled={isLoading || paymentMethods.length === 0}
          >
            <SelectTrigger id="paymentMethod">
              <SelectValue placeholder={language === 'id' ? 'Pilih metode pembayaran' : 'Select payment method'} />
            </SelectTrigger>
            <SelectContent>
              {paymentMethods.map((method) => (
                <SelectItem key={method.id} value={method.id}>
                  {method.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="shippingMethod">
          {language === 'id' ? 'Metode Pengiriman*' : 'Shipping Method*'}
        </Label>
        <Select 
          value={shippingMethodId} 
          onValueChange={setShippingMethodId}
          disabled={isLoading || shippingMethods.length === 0}
        >
          <SelectTrigger id="shippingMethod">
            <SelectValue placeholder={language === 'id' ? 'Pilih metode pengiriman' : 'Select shipping method'} />
          </SelectTrigger>
          <SelectContent>
            {shippingMethods.map((method) => (
              <SelectItem key={method.id} value={method.id}>
                {method.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
