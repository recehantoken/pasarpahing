
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";

interface Category {
  id: string;
  name: string;
  description?: string;
}

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const CategoryFilter = ({ 
  selectedCategory, 
  onSelectCategory 
}: CategoryFilterProps) => {
  const { t } = useLanguage();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data as Category[];
    }
  });

  return (
    <Card className="border border-primary/20">
      <CardHeader className="px-4 py-3 border-b">
        <CardTitle className="text-lg font-medium">{t('category.filter')}</CardTitle>
      </CardHeader>
      <CardContent className="px-2 py-2">
        <ScrollArea className="h-[50vh] md:h-[60vh] pr-2">
          <div className="space-y-1 p-2">
            <Button
              variant={selectedCategory === null ? "default" : "ghost"}
              className="w-full justify-start text-left"
              onClick={() => onSelectCategory(null)}
            >
              {t('category.all')}
            </Button>
            
            {isLoading ? (
              <div className="space-y-2 pt-2">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : (
              categories?.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  className="w-full justify-start text-left"
                  onClick={() => onSelectCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
