import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Image } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  imageUrl: string;
  isLoading: boolean;
  onImageSelect: (file: File) => void; // Changed to accept File instead of URL
}

export const ImageUpload = ({ 
  imageUrl, 
  isLoading, 
  onImageSelect
}: ImageUploadProps) => {
  const { language } = useLanguage();
  const [previewUrl, setPreviewUrl] = useState<string>(imageUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (500KB = 500 * 1024 bytes)
    if (file.size > 500 * 1024) {
      toast.error(
        language === 'id' ? "Ukuran gambar terlalu besar" : "Image size too large",
        {
          description: language === 'id' 
            ? "Ukuran maksimum adalah 500KB" 
            : "Maximum size is 500KB"
        }
      );
      return;
    }

    // Generate preview URL for immediate feedback
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    
    // Pass the file to parent component
    onImageSelect(file);

    toast.success(
      language === 'id' ? "Gambar dipilih" : "Image selected",
      {
        description: language === 'id' 
          ? "Gambar produk telah diperbarui" 
          : "Product image has been updated"
      }
    );
  };

  // Clean up preview URL when component unmounts or new file is selected
  const handleCleanup = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="image">
        {language === 'id' ? 'Gambar Produk* (maks 500KB)' : 'Product Image* (max 500KB)'}
      </Label>
      
      <Input
        id="image"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        onClick={handleCleanup} // Clean up previous blob URL when clicking to select new file
        disabled={isLoading}
        className="w-full"
      />
      
      {(previewUrl || imageUrl) && (
        <div className="mt-4">
          <p className="text-sm mb-2">
            {language === 'id' ? 'Pratinjau:' : 'Preview:'}
          </p>
          <div className="border border-border rounded p-2 bg-card">
            <img 
              src={previewUrl || imageUrl} 
              alt="Product preview" 
              className="max-h-40 rounded mx-auto"
              onLoad={() => {
                // Clean up blob URL after image loads if it's not the current Supabase URL
                if (previewUrl && previewUrl.startsWith('blob:') && imageUrl !== previewUrl) {
                  URL.revokeObjectURL(previewUrl);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};