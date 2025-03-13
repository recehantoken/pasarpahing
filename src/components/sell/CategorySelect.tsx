
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface CategorySelectProps {
  categoryId: string;
  setCategoryId: (id: string) => void;
  isLoading: boolean;
}

export const CategorySelect = ({ categoryId, setCategoryId, isLoading }: CategorySelectProps) => {
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <div className="space-y-2">
      <Label htmlFor="category">Category*</Label>
      {categoriesLoading ? (
        <div className="flex items-center space-x-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading categories...</span>
        </div>
      ) : (
        <Select 
          value={categoryId} 
          onValueChange={setCategoryId}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};
