
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { CategoryFilter } from "@/components/layout/CategoryFilter";
import { ProductGrid } from "@/components/layout/ProductGrid";
import { Product, Category } from "@/types/product";

const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data as Product[];
};

const fetchCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data as Category[];
};

const Index = () => {
  const { t } = useLanguage();
  const { session } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { 
    data: productsData, 
    isLoading: productsLoading, 
    isError: productsError 
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (productsData) {
      setProducts(productsData);
    }
  }, [productsData]);

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory ? product.category_id === selectedCategory : true;
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  if (productsLoading) {
    return <div>{t('common.loading')}</div>;
  }

  if (productsError) {
    return <div>{t('common.error')}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{t('nav.home')}</h1>

      <div className="flex items-center justify-between mb-4">
        <Input
          type="text"
          placeholder={t('common.search')}
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full md:w-1/3 mr-4"
        />
        {session?.user.email === "master@recehan.gold" && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Add Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Product</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    Name
                  </label>
                  <Input id="name" value={"test"} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="username" className="text-right">
                    Price
                  </label>
                  <Input id="username" value={"100"} className="col-span-3" />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onSelectCategory={handleCategoryChange} 
      />

      <ProductGrid 
        selectedCategory={selectedCategory}
        filter={null}
      />
    </div>
  );
};

export default Index;
