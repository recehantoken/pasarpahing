import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useChatbotContent } from "@/hooks/useChatbotContent";
import { useLanguage } from "@/contexts/LanguageContext";

const CookiePolicy = () => {
  const { title, content, loading } = useChatbotContent("cookies");
  const { t } = useLanguage();

  // Default cookie policy content
  const defaultTitle = t("footer.cookies"); // "Cookies" or "Cookie"
  const defaultContent = t("language", "en")
    ? `**What Are Cookies?**\nCookies are small text files stored on your device when you visit our website. They help us improve your experience by remembering your preferences and tracking usage patterns.\n\n**How We Use Cookies**\nAt Pasar Pahing, we use cookies to:\n- Enhance website functionality\n- Analyze site traffic and user behavior\n- Personalize your shopping experience\n\n**Managing Cookies**\nYou can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our site.\n\n**Contact Us**\nIf you have questions about our cookie policy, please reach out via the "Contact Us" page.`
    : `**Apa Itu Cookie?**\nCookie adalah file teks kecil yang disimpan di perangkat Anda saat mengunjungi situs web kami. Mereka membantu meningkatkan pengalaman Anda dengan mengingat preferensi dan melacak pola penggunaan.\n\n**Bagaimana Kami Menggunakan Cookie**\nDi Pasar Pahing, kami menggunakan cookie untuk:\n- Meningkatkan fungsi situs web\n- Menganalisis lalu lintas situs dan perilaku pengguna\n- Mempersonalisasi pengalaman belanja Anda\n\n**Mengelola Cookie**\nAnda dapat mengontrol cookie melalui pengaturan browser Anda. Namun, menonaktifkan cookie dapat memengaruhi kemampuan Anda untuk menggunakan fitur tertentu di situs kami.\n\n**Hubungi Kami**\nJika Anda memiliki pertanyaan tentang kebijakan cookie kami, silakan hubungi kami melalui halaman "Hubungi Kami".`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          {loading ? t("common.loading") : title || defaultTitle}
        </h1>
        {loading ? (
          <p className="text-muted-foreground">{t("common.loading")}</p>
        ) : (
          <div className="prose max-w-none text-muted-foreground whitespace-pre-wrap">
            {content || defaultContent}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;