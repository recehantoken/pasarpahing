
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ProductGrid } from "@/components/layout/ProductGrid";
import { CategoryFilter } from "@/components/layout/CategoryFilter";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Selamat Datang di Pasar Pahing
          </h1>
          <p className="text-lg text-muted-foreground">
            Pasar Online Budaya Asli Indonesia 
          </p>
        </div>
        <div className="bg-card rounded-lg p-6 shadow-lg mb-8">
          <CategoryFilter onSelectCategory={setSelectedCategory} selectedCategory={selectedCategory} />
        </div>
        <ProductGrid selectedCategory={selectedCategory} />
      </main>
    </div>
  );
};

export default Index;
