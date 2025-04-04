
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useChatbotContent } from "@/hooks/useChatbotContent";
import { Loader2 } from "lucide-react";

const About = () => {
  const { content, loading } = useChatbotContent("about");

  return (
    <div className="min-h-screen flex flex-col pt-16 bg-background dark:bg-sidebar">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-1">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-4">
          About Pasar Pahing
        </h1>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <span className="ml-2 text-muted-foreground">Loading...</span>
          </div>
        ) : content ? (
          <div className="prose max-w-none dark:prose-invert text-muted-foreground whitespace-pre-wrap">
            {content}
          </div>
        ) : (
          <div className="text-muted-foreground">
            <p>
              Pasar Pahing is a vibrant marketplace connecting buyers and sellers in 
              a community-driven platform. We aim to empower local commerce and 
              celebrate authentic Indonesian products and craftsmanship.
            </p>
            <p className="mt-4">
              Our mission is to create an accessible, fair, and sustainable marketplace 
              that supports small businesses and fosters economic growth within communities.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default About;
