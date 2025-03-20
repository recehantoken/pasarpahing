import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useChatbotContent } from "@/hooks/useChatbotContent";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { title, content, imageUrl, loading } = useChatbotContent("about");
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col pt-16 bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-1">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-8">
          {loading ? t("common.loading") : title}
        </h1>

        {/* Grid Layout: Image on Left, Content on Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image Section (1x1 Aspect Ratio) */}
          <div className="relative w-full max-w-md mx-auto md:mx-0">
            <img
              src={imageUrl || "/about-team.jpg"} // Dynamic URL from Supabase or fallback to static
              alt={t("about.imageAlt")}
              className="w-full h-full object-cover rounded-lg shadow-lg aspect-square"
            />
          </div>

          {/* Content Section */}
          <div>
            {loading ? (
              <p className="text-muted-foreground">{t("common.loading")}</p>
            ) : (
              <div className="prose max-w-none text-muted-foreground whitespace-pre-wrap">
                {content}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;