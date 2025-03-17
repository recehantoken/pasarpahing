
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  imageUrl: string;
  isLoading: boolean;
  onImageSelect: (url: string) => void;
}

// Predefined product images from public folder
const publicImages = [
  { id: "placeholder", path: "/placeholder.svg", name: "Default" },
  { id: "kebaya", path: "/kebaya.jpg", name: "Kebaya" },
  { id: "scarf", path: "/scarf.jpg", name: "Scarf" },
  { id: "scarf2", path: "/scarf2.jpg", name: "Scarf 2" },
  { id: "batik", path: "/batikfloral.jpg", name: "Batik Floral" },
  { id: "batiktulis", path: "/batiktulis.jpg", name: "Batik Tulis" },
  { id: "batik2", path: "/batik2.jpg", name: "Batik 2" },
];

export const ImageUpload = ({ 
  imageUrl, 
  isLoading, 
  onImageSelect
}: ImageUploadProps) => {
  const [selectedImage, setSelectedImage] = useState(imageUrl || publicImages[0].path);
  const { language } = useLanguage();

  useEffect(() => {
    // Initialize with the first image if none is set
    if (!imageUrl) {
      onImageSelect(publicImages[0].path);
    }
  }, [imageUrl, onImageSelect]);

  const handleImageChange = (value: string) => {
    setSelectedImage(value);
    onImageSelect(value);
    
    toast.success(
      language === 'id' ? "Gambar dipilih" : "Image selected",
      { description: language === 'id' ? "Gambar produk telah diperbarui" : "Product image has been updated" }
    );
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="image">{language === 'id' ? 'Gambar Produk' : 'Product Image'}</Label>
      
      <Select 
        value={selectedImage} 
        onValueChange={handleImageChange}
        disabled={isLoading}
      >
        <SelectTrigger id="image" className="w-full">
          <SelectValue placeholder={language === 'id' ? "Pilih gambar" : "Select an image"} />
        </SelectTrigger>
        <SelectContent>
          {publicImages.map((img) => (
            <SelectItem key={img.id} value={img.path}>
              <div className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                <span>{img.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {selectedImage && (
        <div className="mt-4">
          <p className="text-sm mb-2">{language === 'id' ? 'Pratinjau:' : 'Preview:'}</p>
          <div className="border border-border rounded p-2 bg-card">
            <img 
              src={selectedImage} 
              alt="Product preview" 
              className="max-h-40 rounded mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};
