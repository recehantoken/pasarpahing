
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ProductGrid } from "@/components/layout/ProductGrid";
import { CategoryFilter } from "@/components/layout/CategoryFilter";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to Batik Bazaar</h1>
        <CategoryFilter onSelectCategory={setSelectedCategory} selectedCategory={selectedCategory} />
        <ProductGrid selectedCategory={selectedCategory} />
      </main>
    </div>
  );
};

export default Index;
