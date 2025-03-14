
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { Badge } from "@/components/ui/badge";
import { Flame, Sparkles } from "lucide-react";

interface ProductGridProps {
  selectedCategory: string | null;
  filter?: 'flash_sale' | 'new_products' | null;
}

export const ProductGrid = ({ selectedCategory, filter }: ProductGridProps) => {
  const { user } = useAuth();
  const { addToCart } = useCart();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", selectedCategory, filter],
    queryFn: async () => {
      let query = supabase
        .from("products")
        .select(`
          *,
          categories (
            name
          )
        `);
      
      if (selectedCategory) {
        query = query.eq('category_id', selectedCategory);
      }
      
      if (filter === 'flash_sale') {
        query = query.eq('is_flash_sale', true);
      }
      
      if (filter === 'new_products') {
        query = query.eq('is_new', true);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="h-48 bg-gray-200" />
            <CardContent className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-600">No products found</h2>
        <p className="text-gray-500 mt-2">Try selecting a different category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="flex flex-col border border-primary/20 relative group">
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
            <Button className="w-full" onClick={() => handleAddToCart(product.id)}>Add to Cart</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
