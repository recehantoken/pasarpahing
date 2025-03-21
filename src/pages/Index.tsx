
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

// Loading Spinner Component
const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-primary text-sm font-medium animate-pulse">Loading...</span>
        </div>
      </div>
    </div>
  );
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
    return <LoadingSpinner />;
  }

  if (productsError) {
    return <div>{t('common.error')}</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-4">{t('nav.home')}</h1>

        {/* Crypto Banner Ad */}
        <BannerAd 
          title="Trade with Crypto"
          description="Now accepting Bitcoin, Ethereum and other cryptocurrencies for all purchases"
          imageUrl="/crypto-img.jpg"
          linkUrl="/crypto-payments"
          buttonText="Learn More"
          className="w-full h-[250px] mb-8"
        />

        {/* Two-column banner section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* New Products Banner Ad */}
          <BannerAd 
            title="New Arrivals"
            description="Check out our latest gold and silver collections fresh from the vault"
            imageUrl="/kebaya.jpg"
            linkUrl="/new-arrivals"
            buttonText="Explore"
            className="w-full h-[250px]"
          />

          {/* Flash Sale Banner Ad */}
          <BannerAd 
            title="Flash Sale - 24 Hours Only!"
            description="Limited time offers on premium jewelry - ends midnight tonight!"
            imageUrl="/scarf2.jpg"
            linkUrl="/flash-sale"
            buttonText="Shop Now"
            className="w-full h-[250px]"
          />
        </div>

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
                src="/metamask.png" 
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
