
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { ProductCard } from "./ProductCard";
import { Product } from "@/types/product";

interface ProductGridProps {
  selectedCategory: string | null;
  filter?: 'flash_sale' | 'new_products' | null;
}

export const ProductGrid = ({ selectedCategory, filter }: ProductGridProps) => {
  const { t } = useLanguage();

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
      return data as Product[];
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
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
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
