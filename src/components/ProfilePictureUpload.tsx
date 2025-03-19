import { useState } from "react";
import { supabase, ensureStorageBucket } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";
import { Upload } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type ProfilePictureUploadProps = {
  user: User;
  avatarUrl: string | null;
  onAvatarChange: (url: string) => void;
};

export const ProfilePictureUpload = ({ user, avatarUrl, onAvatarChange }: ProfilePictureUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage(); // Use t instead of language for consistency

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      
      await ensureStorageBucket();
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });
        
      if (uploadError) {
        throw uploadError;
      }
      
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      if (data.publicUrl) {
        onAvatarChange(data.publicUrl); // Pass URL to Profile.tsx
        toast({
          title: t('profile.updated'),
          description: t('profile.pictureUpdated'),
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: error.message || t('profile.errorUploadingPicture'),
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="w-24 h-24 border-4 border-primary/20">
        <AvatarImage src={avatarUrl || ""} alt="Profile picture" />
        <AvatarFallback className="bg-primary/10 text-primary text-xl">
          {user?.email?.charAt(0).toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex items-center">
        <Button 
          variant="outline" 
          className="relative overflow-hidden border-primary/20" 
          disabled={uploading}
        >
          <input
            type="file"
            className="absolute inset-0 cursor-pointer opacity-0"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
          <Upload size={16} className="mr-2" />
          {uploading ? t('common.uploading') : t('profile.changePicture')}
        </Button>
      </div>
    </div>
  );
};