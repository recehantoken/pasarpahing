
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  FileText, 
  Image, 
  Home, 
  ShoppingCart, 
  Info, 
  Mail, 
  HelpCircle, 
  Save,
  Truck
} from "lucide-react";

export const AdminContentManagement = () => {
  const [activeTab, setActiveTab] = useState("home");
  
  const handleSave = () => {
    toast.success("Content saved successfully", {
      description: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} page content has been updated.`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Content Management
        </CardTitle>
        <CardDescription>
          Edit website content across different pages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 w-full mb-6">
            <TabsTrigger value="home" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-1">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-1">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">FAQ</span>
            </TabsTrigger>
            <TabsTrigger value="shipping" className="flex items-center gap-1">
              <Truck className="h-4 w-4" />
              <span className="hidden sm:inline">Shipping</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="space-y-6">
            <TabsContent value="home" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-title">Hero Title</Label>
                <Input id="hero-title" defaultValue="Welcome to Our Store" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
                <Input id="hero-subtitle" defaultValue="Discover amazing products at great prices" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-image">Hero Image URL</Label>
                <div className="flex gap-2">
                  <Input id="hero-image" defaultValue="/batikfloral.jpg" className="flex-1" />
                  <Button variant="outline" size="icon"><Image className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="featured-products-title">Featured Products Title</Label>
                <Input id="featured-products-title" defaultValue="Featured Products" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cta-text">Call to Action Text</Label>
                <Textarea id="cta-text" defaultValue="Shop now and enjoy free shipping on all orders over $50!" />
              </div>
            </TabsContent>
            
            <TabsContent value="products" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="products-title">Products Page Title</Label>
                <Input id="products-title" defaultValue="Our Products" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="products-description">Products Page Description</Label>
                <Textarea id="products-description" defaultValue="Browse our collection of high-quality products." />
              </div>
            </TabsContent>
            
            <TabsContent value="about" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="about-title">About Page Title</Label>
                <Input id="about-title" defaultValue="About Us" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-content">About Page Content</Label>
                <Textarea id="about-content" rows={8} defaultValue="Our company was founded in 2023 with a mission to provide high-quality products at affordable prices. We source our materials ethically and work with the best manufacturers to ensure quality in everything we sell." />
              </div>
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-title">Contact Page Title</Label>
                <Input id="contact-title" defaultValue="Contact Us" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-info">Contact Information</Label>
                <Textarea id="contact-info" rows={4} defaultValue="Email: support@example.com\nPhone: (555) 123-4567\nAddress: 123 Main St, Anytown, USA 12345" />
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="faq-title">FAQ Page Title</Label>
                <Input id="faq-title" defaultValue="Frequently Asked Questions" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="faq-content">FAQ Content</Label>
                <Textarea id="faq-content" rows={8} defaultValue="Q: How long does shipping take?\nA: Shipping typically takes 3-5 business days within the continental US.\n\nQ: What is your return policy?\nA: We offer a 30-day return policy on all unused items." />
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shipping-title">Shipping Page Title</Label>
                <Input id="shipping-title" defaultValue="Shipping Information" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shipping-content">Shipping Policy Content</Label>
                <Textarea id="shipping-content" rows={8} defaultValue="We offer the following shipping options:\n\n- Standard Shipping (3-5 business days): $5.99\n- Express Shipping (1-2 business days): $12.99\n- Free shipping on all orders over $50" />
              </div>
            </TabsContent>
            
            <Button onClick={handleSave} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};
