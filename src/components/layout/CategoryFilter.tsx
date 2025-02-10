
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const CategoryFilter = ({ onSelectCategory }: { onSelectCategory: (categoryId: string | null) => void }) => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*");
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Loading categories...</div>;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant="outline"
        onClick={() => onSelectCategory(null)}
      >
        All
      </Button>
      {categories?.map((category) => (
        <Button
          key={category.id}
          variant="outline"
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};
