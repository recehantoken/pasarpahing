
import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
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
import { useLanguage } from "@/contexts/LanguageContext";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminProducts } from "@/components/admin/AdminProducts";
import { AdminCategories } from "@/components/admin/AdminCategories";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { AdminFrontPage } from "@/components/admin/AdminFrontPage";
import { AdminShipping } from "@/components/admin/AdminShipping";
import { AdminSettings } from "@/components/admin/AdminSettings";

const Admin = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname.split('/admin/')[1] || 'dashboard';
    return path;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16 mt-8">
        <h1 className="text-3xl font-bold mb-8">{t('admin.dashboard')}</h1>
        
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 w-full mb-8">
            <TabsTrigger value="dashboard" asChild>
              <Link to="/admin/dashboard">{t('admin.dashboard')}</Link>
            </TabsTrigger>
            <TabsTrigger value="products" asChild>
              <Link to="/admin/products">{t('admin.products')}</Link>
            </TabsTrigger>
            <TabsTrigger value="categories" asChild>
              <Link to="/admin/categories">{t('admin.categories')}</Link>
            </TabsTrigger>
            <TabsTrigger value="users" asChild>
              <Link to="/admin/users">{t('admin.users')}</Link>
            </TabsTrigger>
            <TabsTrigger value="frontpage" asChild>
              <Link to="/admin/frontpage">{t('admin.frontpage')}</Link>
            </TabsTrigger>
            <TabsTrigger value="shipping" asChild>
              <Link to="/admin/shipping">{t('admin.shipping')}</Link>
            </TabsTrigger>
            <TabsTrigger value="settings" asChild>
              <Link to="/admin/settings">{t('admin.settings')}</Link>
            </TabsTrigger>
          </TabsList>
          
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/products" element={<AdminProducts />} />
            <Route path="/categories" element={<AdminCategories />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/frontpage" element={<AdminFrontPage />} />
            <Route path="/shipping" element={<AdminShipping />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
