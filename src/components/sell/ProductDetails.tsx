
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductDetailsProps {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  isLoading: boolean;
}

export const ProductDetails = ({
  name,
  setName,
  description,
  setDescription,
  isLoading,
}: ProductDetailsProps) => {
  const { language } = useLanguage();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">{language === 'id' ? 'Nama Produk*' : 'Product Name*'}</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={language === 'id' ? 'Masukkan nama produk' : 'Enter product name'}
          required
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">{language === 'id' ? 'Deskripsi' : 'Description'}</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={language === 'id' ? 'Deskripsikan produk Anda' : 'Describe your product'}
          rows={4}
          disabled={isLoading}
        />
      </div>
    </>
  );
};
