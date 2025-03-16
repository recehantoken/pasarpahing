
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
import { AdminUserProfiles } from "@/components/admin/AdminUserProfiles";
import { AdminOrders } from "@/components/admin/AdminOrders";
import { AdminContentManagement } from "@/components/admin/AdminContentManagement";
import { AdminPaymentMethods } from "@/components/admin/AdminPaymentMethods";
import {
  LayoutDashboard,
  Package,
  Tags,
  Users,
  Home,
  Truck,
  Settings,
  UserCog,
  ShoppingBag,
  FileText,
  MessageSquare,
  CreditCard
} from "lucide-react";

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
    <div className="min-h-screen flex flex-col dark:bg-sidebar">
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
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-11 w-full mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden md:inline">{t('admin.dashboard')}</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden md:inline">{t('admin.products')}</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Tags className="h-4 w-4" />
              <span className="hidden md:inline">{t('admin.categories')}</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">{t('admin.users')}</span>
            </TabsTrigger>
            <TabsTrigger value="frontpage" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden md:inline">{t('admin.frontpage')}</span>
            </TabsTrigger>
            <TabsTrigger value="shipping" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <span className="hidden md:inline">{t('admin.shipping')}</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden md:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline">{t('admin.settings')}</span>
            </TabsTrigger>
            <TabsTrigger value="profiles" className="flex items-center gap-2">
              <UserCog className="h-4 w-4" />
              <span className="hidden md:inline">User Profiles</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden md:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Content</span>
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
          
          <TabsContent value="payments">
            <AdminPaymentMethods />
          </TabsContent>
          
          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>
          
          <TabsContent value="profiles">
            <AdminUserProfiles />
          </TabsContent>
          
          <TabsContent value="orders">
            <AdminOrders />
          </TabsContent>
          
          <TabsContent value="content">
            <AdminContentManagement />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
