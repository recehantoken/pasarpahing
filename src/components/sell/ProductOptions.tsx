
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductOptionsProps {
  isFlashSale: boolean;
  setIsFlashSale: (isFlashSale: boolean) => void;
  isNewProduct: boolean;
  setIsNewProduct: (isNewProduct: boolean) => void;
  isLoading: boolean;
}

export const ProductOptions = ({
  isFlashSale,
  setIsFlashSale,
  isNewProduct,
  setIsNewProduct,
  isLoading,
}: ProductOptionsProps) => {
  const { language } = useLanguage();

  return (
    <div className="flex space-x-4">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="flashSale"
          checked={isFlashSale}
          onChange={(e) => setIsFlashSale(e.target.checked)}
          className="rounded border-gray-300"
          disabled={isLoading}
        />
        <Label htmlFor="flashSale" className="cursor-pointer">
          {language === 'id' ? 'Flash Sale' : 'Flash Sale'}
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="newProduct"
          checked={isNewProduct}
          onChange={(e) => setIsNewProduct(e.target.checked)}
          className="rounded border-gray-300"
          disabled={isLoading}
        />
        <Label htmlFor="newProduct" className="cursor-pointer">
          {language === 'id' ? 'Produk Baru' : 'New Product'}
        </Label>
      </div>
    </div>
  );
};
