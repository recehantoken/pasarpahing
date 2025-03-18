import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

interface PriceSectionProps {
  price: string;
  setPrice: (price: string) => void;
  currency: "IDR" | "USD";
  setCurrency: (currency: "IDR" | "USD") => void;
  isLoading: boolean;
}

export const PriceSection = ({ price, setPrice, currency, setCurrency, isLoading }: PriceSectionProps) => {
  const { language } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    setPrice(value);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="price">
        {language === 'id' ? 'Harga*' : 'Price*'}
      </Label>
      <div className="flex gap-2">
        <Input
          id="price"
          type="text"
          value={price}
          onChange={handleChange}
          placeholder={currency === 'IDR' ? 'Rp 0' : '$ 0'}
          required
          disabled={isLoading}
          className="font-mono flex-grow"
        />
        <Select
          value={currency}
          onValueChange={setCurrency}
          disabled={isLoading}
        >
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="IDR">IDR</SelectItem>
            <SelectItem value="USD">USD</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};