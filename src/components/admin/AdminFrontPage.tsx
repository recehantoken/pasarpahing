
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { ArrowDownUp, Image, LayoutDashboard } from "lucide-react";

export const AdminFrontPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("banner");
  
  // Banner state
  const [bannerTitle, setBannerTitle] = useState("Limited Time Offer");
  const [bannerDescription, setBannerDescription] = useState("Get 20% off on all golden products");
  const [bannerImage, setBannerImage] = useState("/banner.jpg");
  const [bannerButtonText, setBannerButtonText] = useState("Shop Now");
  const [bannerButtonLink, setBannerButtonLink] = useState("/products");
  
  // Featured categories state
  const [categories, setCategories] = useState([
    { id: 1, name: "Gold Jewelry", image: "/category1.jpg" },
    { id: 2, name: "Silver Coins", image: "/category2.jpg" },
    { id: 3, name: "Platinum", image: "/category3.jpg" },
  ]);
  
  // Helper functions
  const handleSaveBanner = () => {
    // Here you would save to your database
    toast({
      title: "Success",
      description: "Banner settings saved successfully",
    });
  };
  
  const handleSaveCategories = () => {
    // Here you would save to your database
    toast({
      title: "Success",
      description: "Featured categories saved successfully",
    });
  };
  
  const handleCategoryChange = (id: number, field: string, value: string) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, [field]: value } : cat
    ));
  };
  
  const handleMoveCategory = (id: number, direction: 'up' | 'down') => {
    const index = categories.findIndex(cat => cat.id === id);
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === categories.length - 1)
    ) {
      return;
    }
    
    const newCategories = [...categories];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newCategories[index], newCategories[targetIndex]] = 
      [newCategories[targetIndex], newCategories[index]];
    
    setCategories(newCategories);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('admin.frontpage')}</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
          <TabsTrigger value="banner" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Banner
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Featured Categories
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="banner">
          <Card>
            <CardHeader>
              <CardTitle>Banner Settings</CardTitle>
              <CardDescription>
                Configure the main promotional banner on the homepage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="banner-title">Title</Label>
                <Input 
                  id="banner-title"
                  value={bannerTitle}
                  onChange={(e) => setBannerTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="banner-description">Description</Label>
                <Textarea 
                  id="banner-description"
                  value={bannerDescription}
                  onChange={(e) => setBannerDescription(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="banner-image">Image URL</Label>
                <Input 
                  id="banner-image"
                  value={bannerImage}
                  onChange={(e) => setBannerImage(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="banner-button-text">Button Text</Label>
                  <Input 
                    id="banner-button-text"
                    value={bannerButtonText}
                    onChange={(e) => setBannerButtonText(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="banner-button-link">Button Link</Label>
                  <Input 
                    id="banner-button-link"
                    value={bannerButtonLink}
                    onChange={(e) => setBannerButtonLink(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSaveBanner}>
                  Save Banner Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Featured Categories</CardTitle>
              <CardDescription>
                Manage the categories displayed on your homepage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {categories.map((category, index) => (
                <div 
                  key={category.id}
                  className="border rounded-lg p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Category {index + 1}</h3>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleMoveCategory(category.id, 'up')}
                        disabled={index === 0}
                      >
                        <ArrowDownUp className="h-4 w-4 rotate-90" />
                        <span className="sr-only">Move up</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleMoveCategory(category.id, 'down')}
                        disabled={index === categories.length - 1}
                      >
                        <ArrowDownUp className="h-4 w-4 -rotate-90" />
                        <span className="sr-only">Move down</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`category-name-${category.id}`}>
                        Category Name
                      </Label>
                      <Input 
                        id={`category-name-${category.id}`}
                        value={category.name}
                        onChange={(e) => handleCategoryChange(
                          category.id, 
                          'name', 
                          e.target.value
                        )}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`category-image-${category.id}`}>
                        Image URL
                      </Label>
                      <Input 
                        id={`category-image-${category.id}`}
                        value={category.image}
                        onChange={(e) => handleCategoryChange(
                          category.id, 
                          'image', 
                          e.target.value
                        )}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="pt-4">
                <Button onClick={handleSaveCategories}>
                  Save Categories
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
