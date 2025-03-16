import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
      
      // Setup event handler for upload progress
      const eventSource = new EventSource('/api/upload-progress');
      eventSource.onmessage = (event) => {
        const progress = JSON.parse(event.data);
        setUploadProgress(progress.percentage);
      };
      
      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, imageFile, {
          upsert: true
        });
      
      // Close the event source after upload completes
      eventSource.close();
      setUploadProgress(100);
      
      if (error) throw error;
      
      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);
      
      // Return the public URL
      onImageUpload(urlData.publicUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
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
