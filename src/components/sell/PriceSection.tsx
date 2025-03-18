import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

interface PriceSectionProps {
  price: string; // This will now be the formatted Rupiah string
  setPrice: (price: string) => void; // This expects raw numeric string
  isLoading: boolean;
}

export const PriceSection = ({ price, setPrice, isLoading }: PriceSectionProps) => {
  const { language } = useLanguage();

  // Handle input change to maintain formatting
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    setPrice(value); // Send raw numeric value to parent
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="price">
        {language === 'id' ? 'Harga (IDR)*' : 'Price (IDR)*'}
      </Label>
      <Input
        id="price"
        type="text" // Changed from number to text to show Rp prefix
        value={price} // This is the formatted value from ProductForm
        onChange={handleChange}
        placeholder="Rp 0"
        required
        disabled={isLoading}
        className="font-mono" // Optional: makes numbers align nicely
      />
    </div>
  );
};