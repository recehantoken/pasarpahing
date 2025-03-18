import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/layout/Footer";
import { Chatbot } from "@/components/Chatbot";
import { supabase } from "@/lib/supabase"; // Ensure Supabase client is set up
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const SellItem = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null as File | null,
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "price") {
      // Remove non-numeric characters for storage, display as Rupiah
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle image upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (500KB = 500 * 1024 bytes)
    if (file.size > 500 * 1024) {
      toast({
        title: language === "id" ? "Ukuran file terlalu besar" : "File size too large",
        description: language === "id" ? "Maksimum 500KB" : "Maximum 500KB",
        variant: "destructive",
      });
      return;
    }

    setFormData({ ...formData, image: file });
    await uploadImage(file);
  };

  // Upload image to Supabase storage
  const uploadImage = async (file: File) => {
    if (!user) return;

    setLoading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("product-images") // Your Supabase bucket name
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      toast({
        title: language === "id" ? "Gagal mengunggah gambar" : "Failed to upload image",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    setImageUrl(publicUrlData.publicUrl);
    setLoading(false);
    toast({
      title: language === "id" ? "Berhasil mengunggah gambar" : "Image uploaded successfully",
    });
  };

  // Format price as Rupiah
  const formatRupiah = (value: string) => {
    if (!value) return "";
    const number = parseInt(value.replace(/[^0-9]/g, ""));
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: language === "id" ? "Anda harus login" : "You must be logged in",
        variant: "destructive",
      });
      return;
    }

    const productData = {
      name: formData.name,
      price: parseInt(formData.price),
      description: formData.description,
      image_url: imageUrl,
      user_id: user.id,
    };

    // Insert into Supabase database
    const { error } = await supabase.from("products").insert([productData]);

    if (error) {
      toast({
        title: language === "id" ? "Gagal menyimpan produk" : "Failed to save product",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: language === "id" ? "Produk berhasil ditambahkan" : "Product added successfully",
      });
      setFormData({ name: "", price: "", description: "", image: null });
      setImageUrl(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative">
      <div
        className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B5A2B' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 relative z-10 mt-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {language === "id" ? "Jual Barang Anda" : "Sell Your Item"}
          </h1>

          <Card className="p-6 border border-primary/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">{language === "id" ? "Nama Produk" : "Product Name"}</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="price">{language === "id" ? "Harga (Rp)" : "Price (IDR)"}</Label>
                <Input
                  id="price"
                  name="price"
                  value={formatRupiah(formData.price)}
                  onChange={handleChange}
                  placeholder="Rp"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">{language === "id" ? "Deskripsi" : "Description"}</Label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="image">{language === "id" ? "Gambar Produk" : "Product Image"}</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={loading}
                />
                {imageUrl && (
                  <img src={imageUrl} alt="Preview" className="mt-2 max-w-xs" />
                )}
                <p className="text-sm text-muted-foreground mt-1">
                  {language === "id" ? "Maksimum 500KB" : "Maximum 500KB"}
                </p>
              </div>

              <Button type="submit" disabled={loading}>
                {loading
                  ? language === "id"
                    ? "Menyimpan..."
                    : "Saving..."
                  : language === "id"
                  ? "Jual Produk"
                  : "Sell Product"}
              </Button>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default SellItem;