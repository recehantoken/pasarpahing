import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { ProductForm } from "@/components/sell/ProductForm";
import { Footer } from "@/components/layout/Footer";
import { Chatbot } from "@/components/Chatbot";

const SellItem = () => {
  const { user } = useAuth();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative">
      {/* ... existing background styling ... */}
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10 mt-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {language === 'id' ? 'Jual Barang Anda' : 'Sell Your Item'}
          </h1>
          
          <Card className="p-6 border border-primary/20">
            <ProductForm />
          </Card>
        </div>
      </main>
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default SellItem;