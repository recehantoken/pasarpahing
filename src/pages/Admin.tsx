
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminProducts } from "@/components/admin/AdminProducts";
import { AdminCategories } from "@/components/admin/AdminCategories";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { AdminFrontPage } from "@/components/admin/AdminFrontPage";
import { AdminShipping } from "@/components/admin/AdminShipping";
import { AdminSettings } from "@/components/admin/AdminSettings";

const Admin = () => {
  const { t } = useLanguage();
  const { session, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    // Check if user is authorized to access admin
    if (!isLoading && (!session || user?.email !== "master@recehan.gold")) {
      toast({
        variant: "destructive",
        title: "Unauthorized",
        description: "You do not have permission to access the admin area",
      });
      navigate("/");
    }
  }, [session, isLoading, user, navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // If not authorized, don't render the admin content
  if (!session || user?.email !== "master@recehan.gold") {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16 mt-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('admin.dashboard')}</h1>
          <Button onClick={() => navigate("/")} variant="outline">
            Return to Site
          </Button>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 w-full mb-8">
            <TabsTrigger value="dashboard">
              {t('admin.dashboard')}
            </TabsTrigger>
            <TabsTrigger value="products">
              {t('admin.products')}
            </TabsTrigger>
            <TabsTrigger value="categories">
              {t('admin.categories')}
            </TabsTrigger>
            <TabsTrigger value="users">
              {t('admin.users')}
            </TabsTrigger>
            <TabsTrigger value="frontpage">
              {t('admin.frontpage')}
            </TabsTrigger>
            <TabsTrigger value="shipping">
              {t('admin.shipping')}
            </TabsTrigger>
            <TabsTrigger value="settings">
              {t('admin.settings')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <AdminDashboard />
          </TabsContent>
          
          <TabsContent value="products">
            <AdminProducts />
          </TabsContent>
          
          <TabsContent value="categories">
            <AdminCategories />
          </TabsContent>
          
          <TabsContent value="users">
            <AdminUsers />
          </TabsContent>
          
          <TabsContent value="frontpage">
            <AdminFrontPage />
          </TabsContent>
          
          <TabsContent value="shipping">
            <AdminShipping />
          </TabsContent>
          
          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
