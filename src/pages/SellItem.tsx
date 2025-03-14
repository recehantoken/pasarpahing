import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Utility function to format price in IDR
const formatIDR = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

// Example ProductForm component with IDR formatting
const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // For price, remove non-numeric characters except decimal
    const numericValue = name === 'price' ? value.replace(/[^0-9]/g, '') : value;
    setFormData(prev => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: formData.name,
          price: parseFloat(formData.price),
          description: formData.description,
        });
      if (error) throw error;
      // Handle success (e.g., show success message, redirect)
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Product Name
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="price" className="block text-sm font-medium mb-1">
          Price (IDR)
        </label>
        <Input
          id="price"
          name="price"
          type="text"
          value={formData.price ? formatIDR(formData.price) : ''}
          onChange={handleChange}
          placeholder="Enter price in IDR"
          required
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <Input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      
      <Button type="submit" className="w-full">
        Submit Product
      </Button>
    </form>
  );
};

const SellItem = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative">
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-15" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B5A2B' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />
      
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Sell Your Item
          </h1>
          
          <Card className="p-6 border border-primary/20">
            <ProductForm />
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellItem;