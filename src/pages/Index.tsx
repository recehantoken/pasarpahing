
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
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BannerAd } from "@/components/layout/BannerAd";
import { toast } from "sonner";
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
  const { session, signInWithMetaMask } = useAuth();
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

  const handleMetaMaskLogin = async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
      toast("MetaMask Not Detected", {
        description: "Please install the MetaMask browser extension to use this feature."
      });
      return;
    }
    
    try {
      await signInWithMetaMask();
    } catch (error) {
      console.error("MetaMask login error:", error);
      toast("Login Failed", {
        description: "There was an error connecting with MetaMask."
      });
    }
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
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-4">{t('nav.home')}</h1>

        {/* Featured Banner Ad - Summer Deals */}
        <BannerAd 
          title="Special Summer Deals"
          description="Get up to 50% off on selected items for a limited time"
          imageUrl="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          linkUrl="/sale"
          buttonText="Shop Now"
          className="w-full h-[300px] mb-8"
        />

        {/* Crypto Banner Ad */}
        <BannerAd 
          title="Trade with Crypto"
          description="Now accepting Bitcoin, Ethereum and other cryptocurrencies for all purchases"
          imageUrl="https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          linkUrl="/crypto-payments"
          buttonText="Learn More"
          className="w-full h-[250px] mb-8"
        />

        {/* New Products Banner Ad */}
        <BannerAd 
          title="New Arrivals"
          description="Check out our latest gold and silver collections fresh from the vault"
          imageUrl="https://images.unsplash.com/photo-1610399214658-52b9fdea4627?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          linkUrl="/new-arrivals"
          buttonText="Explore"
          className="w-full h-[250px] mb-8"
        />

        {/* Flash Sale Banner Ad */}
        <BannerAd 
          title="Flash Sale - 24 Hours Only!"
          description="Limited time offers on premium jewelry - ends midnight tonight!"
          imageUrl="https://images.unsplash.com/photo-1512207846876-bb54ef5056fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          linkUrl="/flash-sale"
          buttonText="Shop Now"
          className="w-full h-[250px] mb-8"
        />

        <div className="flex items-center justify-between mb-4">
          <Input
            type="text"
            placeholder={t('common.search')}
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full md:w-1/3 mr-4"
          />
          {!session && (
            <Button 
              onClick={handleMetaMaskLogin} 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <img 
                src="/logo.svg" 
                alt="MetaMask" 
                className="w-5 h-5" 
              />
              Login with MetaMask
            </Button>
          )}
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
      <Footer />
    </>
  );
};

export default Index;
