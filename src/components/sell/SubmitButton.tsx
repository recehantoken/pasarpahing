
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SubmitButtonProps {
  isLoading: boolean;
}

export const SubmitButton = ({ isLoading }: SubmitButtonProps) => {
  const { language } = useLanguage();

  return (
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
  );
};
