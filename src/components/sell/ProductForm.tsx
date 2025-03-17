
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, ensureStorageBucket } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { CategorySelect } from "./CategorySelect";
import { ImageUpload } from "./ImageUpload";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const ProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFlashSale, setIsFlashSale] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(true);
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [shippingMethodId, setShippingMethodId] = useState("");
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [shippingMethods, setShippingMethods] = useState<any[]>([]);

  const { user } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Fetch payment and shipping methods
  useEffect(() => {
    const fetchMethods = async () => {
      try {
        // Ensure storage buckets exist
        await ensureStorageBucket();
        
        // Fetch payment methods
        const { data: paymentData, error: paymentError } = await supabase
          .from("payment_methods")
          .select("*")
          .eq("is_active", true);
          
        if (paymentError) throw paymentError;
        setPaymentMethods(paymentData || []);
        
        // Fetch shipping methods
        const { data: shippingData, error: shippingError } = await supabase
          .from("shipping_methods")
          .select("*")
          .eq("is_active", true);
          
        if (shippingError) throw shippingError;
        setShippingMethods(shippingData || []);
        
        // Set defaults if available
        if (paymentData?.length > 0) setPaymentMethodId(paymentData[0].id);
        if (shippingData?.length > 0) setShippingMethodId(shippingData[0].id);
      } catch (error: any) {
        console.error("Error fetching methods:", error);
        toast.error(language === 'id' ? "Gagal memuat metode" : "Failed to load methods", {
          description: error.message
        });
      }
    };
    
    fetchMethods();
  }, [language]);

  const handleImageUpload = (publicUrl: string) => {
    console.log("Image uploaded, URL:", publicUrl);
    setImageUrl(publicUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast(language === 'id' ? "Otentikasi diperlukan" : "Authentication required", {
        description: language === 'id' ? "Anda harus masuk untuk menjual barang" : "You must be logged in to sell items",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      if (!name || !price || !categoryId || !paymentMethodId || !shippingMethodId) {
        throw new Error(language === 'id' 
          ? "Nama, harga, kategori, metode pembayaran, dan metode pengiriman diperlukan" 
          : "Name, price, category, payment method, and shipping method are required fields");
      }
      
      const numericPrice = parseFloat(price);
      if (isNaN(numericPrice) || numericPrice <= 0) {
        throw new Error(language === 'id' 
          ? "Harga harus berupa angka positif" 
          : "Price must be a positive number");
      }
      
      console.log("Submitting product:", {
        name,
        description,
        price: numericPrice,
        category_id: categoryId,
        image_url: "/placeholder.svg", // Use a public image
        created_by: user.id,
        is_flash_sale: isFlashSale,
        is_new: isNewProduct,
        payment_method_id: paymentMethodId,
        shipping_method_id: shippingMethodId
      });
      
      const { data, error } = await supabase
        .from("products")
        .insert({
          name,
          description,
          price: numericPrice,
          category_id: categoryId,
          image_url: "/placeholder.svg", // Use a public image
          created_by: user.id,
          is_flash_sale: isFlashSale,
          is_new: isNewProduct
        })
        .select()
        .single();
        
      if (error) {
        console.error("Error details:", error);
        throw error;
      }
      
      toast.success(language === 'id' ? "Barang terdaftar berhasil" : "Item listed successfully", {
        description: language === 'id' ? "Barang Anda sekarang tersedia untuk dijual" : "Your item is now available for sale",
      });
      
      navigate("/");
    } catch (error: any) {
      console.error("Error selling item:", error);
      toast.error(language === 'id' ? "Gagal mendaftarkan barang" : "Error listing item", {
        description: error.message || (language === 'id' ? "Gagal mendaftarkan barang Anda. Silakan coba lagi." : "Failed to list your item. Please try again."),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">{language === 'id' ? 'Nama Produk*' : 'Product Name*'}</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={language === 'id' ? 'Masukkan nama produk' : 'Enter product name'}
          required
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">{language === 'id' ? 'Deskripsi' : 'Description'}</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={language === 'id' ? 'Deskripsikan produk Anda' : 'Describe your product'}
          rows={4}
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="price">{language === 'id' ? 'Harga (USD)*' : 'Price (USD)*'}</Label>
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
            <Label>{language === 'id' ? 'Harga dalam IDR:' : 'Price in IDR:'}</Label>
            <CurrencyDisplay amount={parseFloat(price) || 0} className="text-sm mt-1" />
          </div>
        )}
      </div>
      
      <CategorySelect 
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        isLoading={isLoading}
      />
      
      <div className="space-y-2">
        <Label htmlFor="paymentMethod">{language === 'id' ? 'Metode Pembayaran*' : 'Payment Method*'}</Label>
        <Select 
          value={paymentMethodId} 
          onValueChange={setPaymentMethodId}
          disabled={isLoading || paymentMethods.length === 0}
        >
          <SelectTrigger id="paymentMethod">
            <SelectValue placeholder={language === 'id' ? 'Pilih metode pembayaran' : 'Select payment method'} />
          </SelectTrigger>
          <SelectContent>
            {paymentMethods.map((method) => (
              <SelectItem key={method.id} value={method.id}>
                {method.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="shippingMethod">{language === 'id' ? 'Metode Pengiriman*' : 'Shipping Method*'}</Label>
        <Select 
          value={shippingMethodId} 
          onValueChange={setShippingMethodId}
          disabled={isLoading || shippingMethods.length === 0}
        >
          <SelectTrigger id="shippingMethod">
            <SelectValue placeholder={language === 'id' ? 'Pilih metode pengiriman' : 'Select shipping method'} />
          </SelectTrigger>
          <SelectContent>
            {shippingMethods.map((method) => (
              <SelectItem key={method.id} value={method.id}>
                {method.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
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
          <Label htmlFor="flashSale" className="cursor-pointer">
            {language === 'id' ? 'Flash Sale' : 'Flash Sale'}
          </Label>
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
          <Label htmlFor="newProduct" className="cursor-pointer">
            {language === 'id' ? 'Produk Baru' : 'New Product'}
          </Label>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {language === 'id' ? 'Mendaftarkan Produk...' : 'Listing Product...'}
          </>
        ) : language === 'id' ? 'Daftarkan Produk Untuk Dijual' : 'List Product for Sale'}
      </Button>
    </form>
  );
};
