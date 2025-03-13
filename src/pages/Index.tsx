
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { CategoryFilter } from "@/components/layout/CategoryFilter";
import { ProductGrid } from "@/components/layout/ProductGrid";
import { Button } from "@/components/ui/button";
import { Fire, Sparkles } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'flash_sale' | 'new_products' | null>(null);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Reset filter when changing category
    setActiveFilter(null);
  };

  const toggleFilter = (filter: 'flash_sale' | 'new_products') => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2 text-center">Welcome to Pasar Pahing</h1>
        <p className="text-center text-muted-foreground mb-8">Discover unique products from sellers around the world</p>
        
        <div className="mb-6 flex flex-wrap justify-center gap-4">
          <Button 
            variant={activeFilter === 'flash_sale' ? 'default' : 'outline'} 
            onClick={() => toggleFilter('flash_sale')}
            className="flex items-center gap-2"
          >
            <Fire className="h-4 w-4" />
            Flash Sales
          </Button>
          
          <Button 
            variant={activeFilter === 'new_products' ? 'default' : 'outline'} 
            onClick={() => toggleFilter('new_products')}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            New Products
          </Button>
        </div>
        
        <div className="mb-8">
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onCategoryChange={handleCategoryChange}
          />
        </div>
        
        <ProductGrid 
          selectedCategory={selectedCategory} 
          filter={activeFilter}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
