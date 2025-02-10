
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ProductGrid = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          categories (
            name
          )
        `);
      
      if (error) throw error;
      return data;
    },
  });

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products?.map((product) => (
        <Card key={product.id}>
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
          <CardContent>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-lg font-bold mt-2">${product.price}</p>
            {product.categories && (
              <p className="text-sm text-gray-500">{product.categories.name}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full">Add to Cart</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
