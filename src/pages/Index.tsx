
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
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState("newest");
  const { t } = useLanguage();

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
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchQuery, sortOrder]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">{t('home.title')}</h1>
        
        <BannerAd 
          title="Special Offer" 
          description="Get up to 50% off on selected items this weekend only!" 
          imageUrl="/placeholder.svg" 
          linkUrl="/special-offers" 
          buttonText="Shop Now" 
          className="mb-8"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-xl font-semibold mb-4">{t('home.categories')}</h2>
              {categories && (
                <CategoryFilter 
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              )}
            </div>
          </div>
          
          <div className="md:col-span-3">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="w-full md:w-1/2">
                <Input
                  placeholder={t('home.search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="w-full md:w-auto">
                <Select
                  value={sortOrder}
                  onValueChange={setSortOrder}
                >
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder={t('common.sort')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">{t('home.sort.newest')}</SelectItem>
                    <SelectItem value="price_asc">{t('home.sort.price_asc')}</SelectItem>
                    <SelectItem value="price_desc">{t('home.sort.price_desc')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p>{t('common.loading')}</p>
              </div>
            ) : (
              products.length > 0 ? (
                <ProductGrid 
                  selectedCategory={selectedCategory}
                  filter={null}
                />
              ) : (
                <div className="flex justify-center items-center h-64">
                  <p>No products found.</p>
                </div>
              )
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
