import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { ProductGrid } from "@/components/layout/ProductGrid";
import { CategoryFilter } from "@/components/layout/CategoryFilter";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BannerAd } from "@/components/layout/BannerAd";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState("newest");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data;
    }
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from("products")
          .select(`
            *,
            category:categories(name)
          `);

        if (selectedCategory) {
          query = query.eq("category_id", selectedCategory);
        }

        if (searchQuery) {
          query = query.ilike("name", `%${searchQuery}%`);
        }

        if (sortOrder === "newest") {
          query = query.order("created_at", { ascending: false });
        } else if (sortOrder === "price_asc") {
          query = query.order("price", { ascending: true });
        } else if (sortOrder === "price_desc") {
          query = query.order("price", { ascending: false });
        }

        const { data, error } = await query;

        if (error) throw error;
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchQuery, sortOrder]);

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setIsMobileMenuOpen(false); // Close mobile menu on category selection
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Banner Ads Section */}
        <div className="mb-8">
          <div className="grid grid-cols-1 gap-4">
            <BannerAd
              title="Crypto Payments Now Available!"
              description="Pay with your favorite cryptocurrency and get exclusive discounts on all purchases."
              imageUrl="https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2832&auto=format&fit=crop"
              linkUrl="/faq"
              buttonText="Learn More"
              className="h-[300px] sm:h-[250px]"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <BannerAd
                title="New Arrivals"
                description="Check out our latest products"
                imageUrl="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
                linkUrl="/"
                buttonText="Shop Now"
                className="h-[200px] sm:h-[150px]"
              />
              <BannerAd
                title="Limited Offers"
                description="Don't miss our special discount"
                imageUrl="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop"
                linkUrl="/"
                buttonText="View Deals"
                className="h-[200px] sm:h-[150px]"
              />
            </div>
          </div>
        </div>
        
        {/* Product Grid Section with Left Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Menu Toggle */}
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="mr-2 h-4 w-4" /> Categories
            </Button>
          </div>

          {/* Category Sidebar */}
          <div
            className={`
              w-full lg:w-64 
              ${isMobileMenuOpen ? 'block' : 'hidden'} 
              lg:block 
              transition-all duration-300
            `}
          >
            <div className="sticky top-4">
              <CategoryFilter 
                selectedCategory={selectedCategory} 
                onSelectCategory={handleCategoryChange} 
                className="bg-white p-4 rounded-lg shadow-md"
              />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h1 className="text-2xl font-bold">Products</h1>
              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-[200px]"
                />
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Main Product Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p>Loading products...</p>
              </div>
            ) : (
              <ProductGrid products={products} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;