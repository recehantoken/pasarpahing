
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ImageUploadProps {
  imageUrl: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

export const ImageUpload = ({ imageUrl, handleImageChange, isLoading }: ImageUploadProps) => {
  return (
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
  );
};
