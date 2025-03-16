
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { useAuth } from "@/contexts/AuthContext";
import { CategorySelect } from "./CategorySelect";
import { ImageUpload } from "./ImageUpload";
import { toast } from "sonner";

export const ProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFlashSale, setIsFlashSale] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (publicUrl: string) => {
    setImageUrl(publicUrl);
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
      
      if (!name || !price || !categoryId) {
        throw new Error("Name, price and category are required fields");
      }
      
      const numericPrice = parseFloat(price);
      if (isNaN(numericPrice) || numericPrice <= 0) {
        throw new Error("Price must be a positive number");
      }
      
      if (!imageUrl.startsWith('http')) {
        throw new Error("Please upload an image before submitting");
      }
      
      const { data, error } = await supabase
        .from("products")
        .insert({
          name,
          description,
          price: numericPrice,
          category_id: categoryId,
          image_url: imageUrl,
          created_by: user.id,
          is_flash_sale: isFlashSale,
          is_new: isNewProduct
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
      
      <CategorySelect 
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        isLoading={isLoading}
      />
      
      <ImageUpload 
        imageUrl={imageUrl}
        handleImageChange={handleImageChange}
        isLoading={isLoading}
        imageFile={imageFile}
        onImageUpload={handleImageUpload}
      />
      
      <div className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="flashSale"
            checked={isFlashSale}
            onChange={(e) => setIsFlashSale(e.target.checked)}
            className="rounded border-gray-300"
            disabled={isLoading}
          />
          <Label htmlFor="flashSale" className="cursor-pointer">Flash Sale</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="newProduct"
            checked={isNewProduct}
            onChange={(e) => setIsNewProduct(e.target.checked)}
            className="rounded border-gray-300"
            disabled={isLoading}
          />
          <Label htmlFor="newProduct" className="cursor-pointer">New Product</Label>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isLoading || !imageUrl.startsWith('http')}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Listing Product...
          </>
        ) : "List Product for Sale"}
      </Button>
    </form>
  );
};
