
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

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

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="paymentMethod">
          {language === 'id' ? 'Metode Pembayaran*' : 'Payment Method*'}
        </Label>
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
