import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useChatbotContent } from "@/hooks/useChatbotContent";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQ = () => {
  const { title, content, loading } = useChatbotContent("faq");
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-8 text-center">
          {loading ? t("common.loading") : title}
        </h1>

        {/* FAQ Content as Plain Text */}
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <p className="text-muted-foreground text-center">{t("common.loading")}</p>
          ) : content ? (
            <div className="prose max-w-none text-muted-foreground whitespace-pre-wrap">
              {content}
            </div>
          ) : (
            <p className="text-muted-foreground text-center">{t("faq.noContent")}</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FAQ;