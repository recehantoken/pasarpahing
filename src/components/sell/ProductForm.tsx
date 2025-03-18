import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, ensureStorageBucket } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

// Import the refactored components
import { ProductDetails } from "./ProductDetails";
import { PriceSection } from "./PriceSection";
import { CategorySelect } from "./CategorySelect";
import { ImageUpload } from "./ImageUpload";
import { MethodSelectors } from "./MethodSelectors";
import { ProductOptions } from "./ProductOptions";
import { SubmitButton } from "./SubmitButton";

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
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Fetch payment and shipping methods
  useEffect(() => {
    const fetchMethods = async () => {
      try {
        setIsLoading(true);
        
        await ensureStorageBucket();
        
        const { data: paymentData, error: paymentError } = await supabase
          .from("payment_methods")
          .select("*")
          .eq("is_active", true);
          
        if (paymentError) throw paymentError;
        
        if (paymentData && paymentData.length > 0) {
          setPaymentMethods(paymentData);
          setPaymentMethodId(paymentData[0].id);
        } else {
          setPaymentMethods([]);
          setPaymentMethodId("");
          
          if (user?.email === "master@recehan.gold") {
            const { data: newMethod, error: createError } = await supabase
              .from("payment_methods")
              .insert([
                {
                  name: "Cash on Delivery",
                  type: "cash",
                  is_active: true
                }
              ])
              .select()
              .single();
              
            if (!createError && newMethod) {
              setPaymentMethods([newMethod]);
              setPaymentMethodId(newMethod.id);
            }
          }
        }
        
        const { data: shippingData, error: shippingError } = await supabase
          .from("shipping_methods")
          .select("*")
          .eq("is_active", true);
          
        if (shippingError) throw shippingError;
        
        if (shippingData && shippingData.length > 0) {
          setShippingMethods(shippingData);
          setShippingMethodId(shippingData[0].id);
        } else {
          setShippingMethods([]);
          setShippingMethodId("");
        }
      } catch (error: any) {
        console.error("Error fetching methods:", error);
        toast.error(language === 'id' ? "Gagal memuat metode" : "Failed to load methods", {
          description: error.message
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMethods();
  }, [language, user?.email]);

  const refreshPaymentMethods = async () => {
    try {
      const { data, error } = await supabase
        .from("payment_methods")
        .select("*")
        .eq("is_active", true);
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        setPaymentMethods(data);
        if (!paymentMethodId) {
          setPaymentMethodId(data[0].id);
        }
      }
    } catch (error) {
      console.error("Error refreshing payment methods:", error);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      // Check file size (500kb = 500 * 1024 bytes)
      if (file.size > 500 * 1024) {
        throw new Error(language === 'id' 
          ? "Ukuran gambar maksimum 500KB" 
          : "Maximum image size is 500KB");
      }

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('products') // Make sure this bucket exists and is public
        .upload(`public/${fileName}`, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('products')
        .getPublicUrl(`public/${fileName}`);

      const publicUrl = publicUrlData.publicUrl;
      setImageUrl(publicUrl);
      toast.success(language === 'id' ? "Gambar berhasil diunggah" : "Image uploaded successfully");
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast.error(language === 'id' ? "Gagal mengunggah gambar" : "Failed to upload image", {
        description: error.message
      });
    }
  };

  // Format price to Rupiah
  const formatRupiah = (value: string) => {
    const number = value.replace(/[^0-9]/g, '');
    return number ? `Rp ${Number(number).toLocaleString('id-ID')}` : '';
  };

  // Handle price input change
  const handlePriceChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setPrice(numericValue);
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
      
      const { data, error } = await supabase
        .from("products")
        .insert({
          name,
          description,
          price: numericPrice,
          category_id: categoryId,
          image_url: imageUrl || "/placeholder.svg",
          created_by: user.id,
          is_flash_sale: isFlashSale,
          is_new: isNewProduct,
          payment_method_id: paymentMethodId,
          shipping_method_id: shippingMethodId
        })
        .select()
        .single();
        
      if (error) throw error;
      
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
      <ProductDetails
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        isLoading={isLoading}
      />
      
      <PriceSection 
        price={formatRupiah(price)}
        setPrice={handlePriceChange}
        isLoading={isLoading}
      />
      
      <CategorySelect 
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        isLoading={isLoading}
      />
      
      <ImageUpload 
        imageUrl={imageUrl}
        isLoading={isLoading}
        onImageSelect={handleImageUpload}
      />
      
      <MethodSelectors
        paymentMethodId={paymentMethodId}
        setPaymentMethodId={setPaymentMethodId}
        shippingMethodId={shippingMethodId}
        setShippingMethodId={setShippingMethodId}
        paymentMethods={paymentMethods}
        shippingMethods={shippingMethods}
        isLoading={isLoading}
      />
      
      <ProductOptions
        isFlashSale={isFlashSale}
        setIsFlashSale={setIsFlashSale}
        isNewProduct={isNewProduct}
        setIsNewProduct={setIsNewProduct}
        isLoading={isLoading}
      />
      
      <SubmitButton isLoading={isLoading} />
    </form>
  );
};