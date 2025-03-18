import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ProductForm = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    currency: 'USD',
    description: '',
    image_url: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = async (file: File): Promise<string> => {
    if (file.size > 500 * 1024) {
      throw new Error(language === 'id' 
        ? "Ukuran gambar harus kurang dari 500KB" 
        : "Image size must be less than 500KB");
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: publicData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);

    return publicData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error(language === 'id' ? "Anda harus login terlebih dahulu" : "You must be logged in");
      return;
    }

    if (!formData.name || !formData.price) {
      toast.error(language === 'id' 
        ? "Nama produk dan harga wajib diisi" 
        : "Product name and price are required");
      return;
    }

    setIsSubmitting(true);
    try {
      let imageUrl = formData.image_url;
      if (imageFile) {
        imageUrl = await handleImageUpload(imageFile);
      }

      const { data, error } = await supabase
        .from('products')
        .insert([
          {
            name: formData.name,
            price: formData.price,
            currency: formData.currency,
            description: formData.description || null,
            image_url: imageUrl || null,
            created_by: user.id,
          }
        ])
        .select();

      if (error) throw error;

      toast.success(language === 'id' 
        ? "Produk berhasil ditambahkan" 
        : "Product added successfully");
      
      setFormData({
        name: '',
        price: 0,
        currency: 'USD',
        description: '',
        image_url: '',
      });
      setImageFile(null);
    } catch (error: any) {
      console.error('Error adding product:', error);
      toast.error(language === 'id' 
        ? `Gagal menambahkan produk: ${error.message || 'Kesalahan tidak diketahui'}` 
        : `Failed to add product: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">
          {language === 'id' ? 'Nama Produk*' : 'Product Name*'}
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">
          {language === 'id' ? 'Harga*' : 'Price*'}
        </Label>
        <div className="flex gap-2">
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            required
            disabled={isSubmitting}
            className="flex-grow"
          />
          <Select
            value={formData.currency}
            onValueChange={(value) => setFormData({ ...formData, currency: value })}
            disabled={isSubmitting}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="IDR">IDR (Rp)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          {language === 'id' ? 'Deskripsi' : 'Description'}
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">
          {language === 'id' ? 'Gambar Produk' : 'Product Image'}
        </Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          disabled={isSubmitting}
        />
        <p className="text-sm text-muted-foreground">
          {language === 'id' 
            ? 'Ukuran maksimum: 500KB' 
            : 'Maximum size: 500KB'}
        </p>
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        disabled={isSubmitting}
      >
        {isSubmitting 
          ? (language === 'id' ? 'Mengirim...' : 'Submitting...')
          : (language === 'id' ? 'Jual Produk' : 'Sell Product')}
      </Button>
    </form>
  );
};