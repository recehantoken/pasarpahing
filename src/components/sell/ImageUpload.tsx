
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ImageUploadProps {
  imageUrl: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  imageFile: File | null;
  onImageUpload: (url: string) => void;
}

export const ImageUpload = ({ 
  imageUrl, 
  handleImageChange, 
  isLoading, 
  imageFile,
  onImageUpload
}: ImageUploadProps) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const uploadToStorage = async () => {
    if (!imageFile) return;
    
    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Create a unique file name
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;
      
      // Simple progress simulation since direct progress tracking isn't available
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);
      
      // Check if product-images bucket exists, create if it doesn't
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(b => b.name === 'product-images');
      
      if (!bucketExists) {
        console.log("Creating product-images bucket");
        await supabase.storage.createBucket('product-images', {
          public: true
        });
      }
      
      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, imageFile, {
          upsert: true
        });
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (error) throw error;
      
      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);
      
      // Return the public URL
      console.log("Uploaded image URL:", urlData.publicUrl);
      onImageUpload(urlData.publicUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="image">Product Image</Label>
      <Input
        id="image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        disabled={isLoading || isUploading}
      />
      
      {imageFile && !imageUrl.startsWith('http') && (
        <Button
          type="button"
          onClick={uploadToStorage}
          disabled={isUploading || !imageFile}
          className="mt-2"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading... {uploadProgress}%
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </>
          )}
        </Button>
      )}
      
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
  );
};
