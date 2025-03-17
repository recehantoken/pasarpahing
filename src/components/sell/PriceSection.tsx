
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { useLanguage } from "@/contexts/LanguageContext";

interface PriceSectionProps {
  price: string;
  setPrice: (price: string) => void;
  isLoading: boolean;
}

export const PriceSection = ({ price, setPrice, isLoading }: PriceSectionProps) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-2">
      <Label htmlFor="price">{language === 'id' ? 'Harga (USD)*' : 'Price (USD)*'}</Label>
      <Input
        id="price"
        type="number"
        step="0.01"
        min="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="0.00"
        required
        disabled={isLoading}
      />
      
      {price && (
        <div className="mt-2">
          <Label>{language === 'id' ? 'Harga dalam IDR:' : 'Price in IDR:'}</Label>
          <CurrencyDisplay amount={parseFloat(price) || 0} className="text-sm mt-1" />
        </div>
      )}
    </div>
  );
};
