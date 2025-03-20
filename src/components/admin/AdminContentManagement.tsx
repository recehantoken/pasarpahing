import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import {
  FileText,
  Image,
  Home,
  ShoppingCart,
  Info,
  Mail,
  HelpCircle,
  Save,
  Truck,
  Lock,
  Shield,
  FileCheck,
} from "lucide-react";

type PageContent = {
  page_key: string;
  title: string;
  content: string;
};

export const AdminContentManagement = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("home");
  const [content, setContent] = useState<{
    [key: string]: { title: string; content: string };
  }>({
    home: { title: "", content: "" },
    products: { title: "", content: "" },
    about: { title: "", content: "" },
    contact: { title: "", content: "" },
    faq: { title: "", content: "" },
    shipping: { title: "", content: "" },
    cookies: { title: "", content: "" },
    privacy: { title: "", content: "" },
    terms: { title: "", content: "" },
  });

  // Fetch content from Supabase on mount
  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase.from("page_content").select("page_key, title, content");
      if (error) {
        toast.error(t("common.error"), { description: "Failed to load content" });
        return;
      }

      const contentMap = data.reduce((acc: any, item: PageContent) => {
        acc[item.page_key] = { title: item.title || "", content: item.content || "" };
        return acc;
      }, {});

      setContent((prev) => ({
        ...prev,
        ...contentMap,
      }));
    };

    fetchContent();
  }, [t]);

  const handleInputChange = (field: "title" | "content", value: string) => {
    setContent((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], [field]: value },
    }));
  };

  const handleSave = async () => {
    const currentContent = content[activeTab];
    if (!currentContent) return;

    try {
      const { error } = await supabase
        .from("page_content")
        .upsert(
          {
            page_key: activeTab,
            title: currentContent.title,
            content: currentContent.content,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "page_key" }
        );

      if (error) throw error;
      toast.success(t("admin.contentSaved"), {
        description: `${t(`admin.${activeTab}`)} ${t("admin.pageUpdated")}`,
      });
    } catch (error) {
      toast.error(t("common.error"), { description: t("admin.saveFailed") });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {t("admin.contentManagement")}
        </CardTitle>
        <CardDescription>{t("admin.contentDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-9 gap-2 w-full mb-6">
            <TabsTrigger value="home" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">{t("admin.home")}</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-1">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">{t("admin.products")}</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">{t("admin.about")}</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">{t("admin.contact")}</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-1">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">{t("admin.faq")}</span>
            </TabsTrigger>
            <TabsTrigger value="shipping" className="flex items-center gap-1">
              <Truck className="h-4 w-4" />
              <span className="hidden sm:inline">{t("admin.shipping")}</span>
            </TabsTrigger>
            <TabsTrigger value="cookies" className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">{t("admin.cookies")}</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-1">
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">{t("admin.privacy")}</span>
            </TabsTrigger>
            <TabsTrigger value="terms" className="flex items-center gap-1">
              <FileCheck className="h-4 w-4" />
              <span className="hidden sm:inline">{t("admin.terms")}</span>
            </TabsTrigger>
          </TabsList>

          <div className="space-y-6">
            <TabsContent value="home" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="home-title">{t("admin.homePageTitle")}</Label>
                <Input
                  id="home-title"
                  value={content.home?.title || ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="home-content">{t("admin.homePageContent")}</Label>
                <Textarea
                  id="home-content"
                  rows={8}
                  value={content.home?.content || ""}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="products-title">{t("admin.productsPageTitle")}</Label>
                <Input
                  id="products-title"
                  value={content.products?.title || ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="products-content">{t("admin.productsPageContent")}</Label>
                <Textarea
                  id="products-content"
                  rows={8}
                  value={content.products?.content || ""}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="about" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="about-title">{t("admin.aboutPageTitle")}</Label>
                <Input
                  id="about-title"
                  value={content.about?.title || ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-content">{t("admin.aboutPageContent")}</Label>
                <Textarea
                  id="about-content"
                  rows={8}
                  value={content.about?.content || ""}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-title">{t("admin.contactPageTitle")}</Label>
                <Input
                  id="contact-title"
                  value={content.contact?.title || ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-content">{t("admin.contactPageContent")}</Label>
                <Textarea
                  id="contact-content"
                  rows={8}
                  value={content.contact?.content || ""}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="faq" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="faq-title">{t("admin.faqPageTitle")}</Label>
                <Input
                  id="faq-title"
                  value={content.faq?.title || ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="faq-content">{t("admin.faqPageContent")}</Label>
                <Textarea
                  id="faq-content"
                  rows={8}
                  value={content.faq?.content || ""}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shipping-title">{t("admin.shippingPageTitle")}</Label>
                <Input
                  id="shipping-title"
                  value={content.shipping?.title || ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shipping-content">{t("admin.shippingPageContent")}</Label>
                <Textarea
                  id="shipping-content"
                  rows={8}
                  value={content.shipping?.content || ""}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="cookies" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cookies-title">{t("admin.cookiesPageTitle")}</Label>
                <Input
                  id="cookies-title"
                  value={content.cookies?.title || ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cookies-content">{t("admin.cookiesPageContent")}</Label>
                <Textarea
                  id="cookies-content"
                  rows={8}
                  value={content.cookies?.content || ""}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="privacy-title">{t("admin.privacyPageTitle")}</Label>
                <Input
                  id="privacy-title"
                  value={content.privacy?.title || ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="privacy-content">{t("admin.privacyPageContent")}</Label>
                <Textarea
                  id="privacy-content"
                  rows={8}
                  value={content.privacy?.content || ""}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="terms" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="terms-title">{t("admin.termsPageTitle")}</Label>
                <Input
                  id="terms-title"
                  value={content.terms?.title || ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="terms-content">{t("admin.termsPageContent")}</Label>
                <Textarea
                  id="terms-content"
                  rows={8}
                  value={content.terms?.content || ""}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                />
              </div>
            </TabsContent>

            <Button onClick={handleSave} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              {t("common.save")}
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};