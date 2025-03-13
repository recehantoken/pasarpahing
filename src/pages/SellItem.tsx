
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const SellItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch categories for dropdown
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Preview image
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) return "";
    
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `product-images/${fileName}`;
    
    // Check if storage bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const productImagesBucket = buckets?.find(bucket => bucket.name === 'product-images');
    
    // Create bucket if it doesn't exist
    if (!productImagesBucket) {
      const { error } = await supabase.storage.createBucket('product-images', {
        public: true,
        fileSizeLimit: 5242880, // 5MB
      });
      
      if (error) throw error;
    }
    
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, imageFile, {
        upsert: true
      });
    
    if (uploadError) throw uploadError;
    
    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);
      
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "You must be logged in to sell items",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Validate form
      if (!name || !price || !categoryId) {
        throw new Error("Name, price and category are required fields");
      }
      
      // Convert price to numeric
      const numericPrice = parseFloat(price);
      if (isNaN(numericPrice) || numericPrice <= 0) {
        throw new Error("Price must be a positive number");
      }
      
      // Upload image if provided
      let publicImageUrl = "";
      if (imageFile) {
        publicImageUrl = await uploadImage();
      }
      
      // Save product to database
      const { data, error } = await supabase
        .from("products")
        .insert({
          name,
          description,
          price: numericPrice,
          category_id: categoryId,
          image_url: publicImageUrl,
          created_by: user.id
        })
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Item listed successfully",
        description: "Your item is now available for sale",
      });
      
      navigate("/");
    } catch (error: any) {
      console.error("Error selling item:", error);
      toast({
        variant: "destructive",
        title: "Error listing item",
        description: error.message || "Failed to list your item. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative">
      {/* Batik Pattern Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-15" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B5A2B' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />
      
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Sell Your Item
          </h1>
          
          <Card className="p-6 border border-primary/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name*</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter product name"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your product"
                  rows={4}
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price (USD)*</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  required
                  disabled={isLoading}
                />
                
                {price && (
                  <div className="mt-2">
                    <Label>Price in IDR:</Label>
                    <CurrencyDisplay amount={parseFloat(price) || 0} className="text-sm mt-1" />
                  </div>
                )}
              </div>
              
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
              
              <div className="space-y-2">
                <Label htmlFor="image">Product Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isLoading}
                />
                
                {imageUrl && (
                  <div className="mt-2">
                    <p className="text-sm mb-2">Preview:</p>
                    <img 
                      src={imageUrl} 
                      alt="Product preview" 
                      className="max-h-40 rounded border border-border"
                    />
                  </div>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Listing Product...
                  </>
                ) : "List Product for Sale"}
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SellItem;
