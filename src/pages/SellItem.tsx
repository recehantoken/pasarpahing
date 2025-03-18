import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/layout/Footer";
import { Chatbot } from "@/components/Chatbot";
import { ProductForm } from "@/components/sell/ProductForm";

const SellItem = () => {
  const { user } = useAuth();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative">
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-15" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B5A2B' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />
      
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