import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useChatbotContent } from "@/hooks/useChatbotContent";

const About = () => {
  const { title, content, loading } = useChatbotContent("about");

  return (
    <div className="min-h-screen flex flex-col pt-16 bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-1">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-4">
          {title}
        </h1>
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

export default About;