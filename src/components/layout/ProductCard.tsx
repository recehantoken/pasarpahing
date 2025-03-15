
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { Flame, Sparkles } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { t } = useLanguage();
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <Card className="flex flex-col border border-primary/20 relative group">
      {product.is_flash_sale && (
        <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white flex items-center gap-1 z-10">
          <Flame className="h-3 w-3" /> Flash Sale
        </Badge>
      )}
      
      {product.is_new && !product.is_flash_sale && (
        <Badge className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1 z-10">
          <Sparkles className="h-3 w-3" /> New
        </Badge>
      )}
      
      <CardHeader>
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-t flex items-center justify-center">
            No Image
          </div>
        )}
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <CardDescription>
          {product.is_new && <Badge>{t('product.new')}</Badge>}
          {product.is_flash_sale && <Badge variant="secondary">Flash Sale</Badge>}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <div className="mt-2">
          <p className="text-lg font-bold">${product.price}</p>
          <CurrencyDisplay amount={product.price} className="text-sm text-muted-foreground" />
        </div>
        {product.categories && (
          <p className="text-sm text-gray-500 mt-1">{product.categories.name}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleAddToCart}>
          {t('product.addToCart')}
        </Button>
      </CardFooter>
    </Card>
  );
};
