import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useChatbotContent } from "@/hooks/useChatbotContent";

const TermsOfService = () => {
  const { content, loading } = useChatbotContent("terms");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : (
          <div className="prose max-w-none text-muted-foreground whitespace-pre-wrap">
            {content}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;