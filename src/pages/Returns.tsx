import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useChatbotContent } from "@/hooks/useChatbotContent";

const Returns = () => {
  const { content, loading } = useChatbotContent("returns");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Returns & Refunds</h1>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : (
          <div className="space-y-8 text-muted-foreground whitespace-pre-wrap">
            {content}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Returns;