import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Product } from "@/types";
import { Category } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { supabase } from "@/lib/supabase";

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

// Fix CategoryFilter and ProductGrid props
export const CategoryFilterProps = {
  selectedCategory: "",
  onSelectCategory: (categoryId: string) => {},
};

export const ProductGridProps = {
  productList: [],
};

const Index = () => {
  const { t } = useLanguage();
  const { session } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
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

  const { 
    data: categoriesData, 
    isLoading: categoriesLoading, 
    isError: categoriesError 
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    if (productsData) {
      setProducts(productsData);
    }
  }, [productsData]);

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  const handleCategoryChange = (categoryId: string) => {
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

  if (productsLoading || categoriesLoading) {
    return <div>{t('common.loading')}</div>;
  }

  if (productsError || categoriesError) {
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
              {/* <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter> */}
            </DialogContent>
          </Dialog>
        )}
      </div>

      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onSelectCategory={handleCategoryChange} 
      />

      <ProductGrid 
        productList={products} 
      />
    </div>
  );
};

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onSelectCategory }) => {
  const { t } = useLanguage();
  const { data: categories, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) {
    return <div>{t('common.loading')}</div>;
  }

  if (isError) {
    return <div>{t('common.error')}</div>;
  }

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Categories</h2>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === "" ? "default" : "outline"}
          onClick={() => onSelectCategory("")}
        >
          All
        </Button>
        {categories?.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

interface ProductGridProps {
  productList: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ productList }) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {productList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>
          {product.is_new && <Badge>{t('product.new')}</Badge>}
          {product.is_flash_sale && <Badge variant="secondary">Flash Sale</Badge>}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={product.image_url || "https://via.placeholder.com/640x360"}
            alt={product.name}
            className="object-cover"
          />
        </AspectRatio>
        <div className="p-4">
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span className="text-2xl font-bold">
          {t('product.price')}: ${product.price}
        </span>
        <Button>{t('product.addToCart')}</Button>
      </CardFooter>
    </Card>
  );
};

export default Index;
