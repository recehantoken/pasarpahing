
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface ProductGridProps {
  selectedCategory: string | null;
}

export const ProductGrid = ({ selectedCategory }: ProductGridProps) => {
  const { user } = useAuth();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", selectedCategory],
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
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });

  const handleAddToCart = () => {
    if (!user) {
      toast("Please sign in to add items to your cart", {
        description: "Create an account or sign in to start shopping",
        action: {
          label: "Sign In",
          onClick: () => window.location.href = "/auth"
        }
      });
      return;
    }
    
    // Cart functionality would go here
    toast.success("Item added to cart");
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
        <Card key={product.id} className="flex flex-col">
          <CardHeader>
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t"
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
            <p className="text-lg font-bold mt-2">${product.price}</p>
            {product.categories && (
              <p className="text-sm text-gray-500">{product.categories.name}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleAddToCart}>Add to Cart</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
