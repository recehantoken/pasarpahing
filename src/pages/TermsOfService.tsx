import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useChatbotContent } from "@/hooks/useChatbotContent";
import { useLanguage } from "@/contexts/LanguageContext";

const TermsOfService = () => {
  const { title, content, loading } = useChatbotContent("terms");
  const { t } = useLanguage();

  // Default terms of service content
  const defaultTitle = t("footer.terms"); // "Terms of Service" or "Ketentuan Layanan"
  const defaultContent = t("language", "en")
    ? `**Acceptance of Terms**\nBy using Pasar Pahing, you agree to these Terms of Service. If you do not agree, please do not use our platform.\n\n**User Responsibilities**\nYou must:\n- Provide accurate information during registration\n- Comply with all applicable laws\n- Not engage in fraudulent or harmful activities\n\n**Our Responsibilities**\nWe will:\n- Provide a platform for buying and selling goods\n- Ensure secure payment processing\n- Mediate disputes when necessary\n\n**Prohibited Activities**\nYou may not:\n- Sell illegal or prohibited items\n- Violate intellectual property rights\n- Engage in harassment or abuse\n\n**Termination**\nWe reserve the right to suspend or terminate your account if you violate these terms.\n\n**Contact Us**\nFor questions about these terms, please visit our "Contact Us" page.`
    : `**Penerimaan Ketentuan**\nDengan menggunakan Pasar Pahing, Anda setuju dengan Ketentuan Layanan ini. Jika Anda tidak setuju, harap jangan menggunakan platform kami.\n\n**Tanggung Jawab Pengguna**\nAnda harus:\n- Memberikan informasi yang akurat saat mendaftar\n- Mematuhi semua hukum yang berlaku\n- Tidak terlibat dalam aktivitas penipuan atau berbahaya\n\n**Tanggung Jawab Kami**\nKami akan:\n- Menyediakan platform untuk membeli dan menjual barang\n- Memastikan pemrosesan pembayaran yang aman\n- Menengahi sengketa jika diperlukan\n\n**Aktivitas yang Dilarang**\nAnda tidak boleh:\n- Menjual barang ilegal atau dilarang\n- Melanggar hak kekayaan intelektual\n- Terlibat dalam pelecehan atau penyalahgunaan\n\n**Pemutusan**\nKami berhak untuk menangguhkan atau mengakhiri akun Anda jika Anda melanggar ketentuan ini.\n\n**Hubungi Kami**\nUntuk pertanyaan tentang ketentuan ini, silakan kunjungi halaman "Hubungi Kami".`;

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

export default TermsOfService;