import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useChatbotContent } from "@/hooks/useChatbotContent";

const FAQ = () => {
  const { content, loading } = useChatbotContent("faq");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : (
          <div className="space-y-6 text-muted-foreground whitespace-pre-wrap">
            {content}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;