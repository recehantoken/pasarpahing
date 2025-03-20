import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useChatbotContent } from "@/hooks/useChatbotContent";
import { useLanguage } from "@/contexts/LanguageContext";

const PrivacyPolicy = () => {
  const { title, content, loading } = useChatbotContent("privacy");
  const { t } = useLanguage();

  // Default privacy policy content
  const defaultTitle = t("footer.privacy"); // "Privacy Policy" or "Kebijakan Privasi"
  const defaultContent = t("language", "en")
    ? `**Our Commitment to Privacy**\nAt Pasar Pahing, we are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.\n\n**What Data We Collect**\nWe may collect:\n- Personal information (e.g., name, email, address)\n- Payment details for processing orders\n- Browsing activity to improve our services\n\n**How We Use Your Data**\nWe use your information to:\n- Process and fulfill your orders\n- Communicate with you about your account or purchases\n- Improve our website and services\n\n**Data Sharing**\nWe do not sell your personal data. We may share data with trusted partners (e.g., payment processors, shipping providers) to fulfill orders.\n\n**Your Rights**\nYou have the right to access, update, or delete your personal information. Contact us to exercise these rights.\n\n**Contact Us**\nFor privacy-related inquiries, please visit our "Contact Us" page.`
    : `**Komitmen Kami terhadap Privasi**\nDi Pasar Pahing, kami berkomitmen untuk melindungi informasi pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan menjaga data Anda.\n\n**Data Apa yang Kami Kumpulkan**\nKami dapat mengumpulkan:\n- Informasi pribadi (misalnya, nama, email, alamat)\n- Detail pembayaran untuk memproses pesanan\n- Aktivitas penelusuran untuk meningkatkan layanan kami\n\n**Bagaimana Kami Menggunakan Data Anda**\nKami menggunakan informasi Anda untuk:\n- Memproses dan memenuhi pesanan Anda\n- Berkomunikasi dengan Anda tentang akun atau pembelian Anda\n- Meningkatkan situs web dan layanan kami\n\n**Berbagi Data**\nKami tidak menjual data pribadi Anda. Kami dapat membagikan data dengan mitra tepercaya (misalnya, pemroses pembayaran, penyedia pengiriman) untuk memenuhi pesanan.\n\n**Hak Anda**\nAnda berhak untuk mengakses, memperbarui, atau menghapus informasi pribadi Anda. Hubungi kami untuk menggunakan hak ini.\n\n**Hubungi Kami**\nUntuk pertanyaan terkait privasi, silakan kunjungi halaman "Hubungi Kami".`;

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

export default PrivacyPolicy;