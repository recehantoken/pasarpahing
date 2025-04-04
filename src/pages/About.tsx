
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useChatbotContent } from "@/hooks/useChatbotContent";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const { content, loading } = useChatbotContent("about");

  return (
    <div className="min-h-screen flex flex-col dark:bg-sidebar">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-1">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-8">
          About Pasar Pahing
        </h1>
        
        <Card className="border border-primary/20 mb-8">
          <CardContent className="pt-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                <span className="ml-2 text-muted-foreground">Loading...</span>
              </div>
            ) : content ? (
              <div className="prose max-w-none dark:prose-invert prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary/80">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            ) : (
              <div className="space-y-6 text-muted-foreground">
                <p>
                  Pasar Pahing is a vibrant marketplace connecting buyers and sellers in 
                  a community-driven platform. We aim to empower local commerce and 
                  celebrate authentic Indonesian products and craftsmanship.
                </p>
                <p>
                  Our mission is to create an accessible, fair, and sustainable marketplace 
                  that supports small businesses and fosters economic growth within communities.
                </p>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Values</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-medium text-lg mb-2 text-foreground">Community</h3>
                    <p>We foster strong relationships between buyers and sellers, building trust and connections.</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-medium text-lg mb-2 text-foreground">Authenticity</h3>
                    <p>We celebrate genuine Indonesian products and heritage craftsmanship.</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-medium text-lg mb-2 text-foreground">Sustainability</h3>
                    <p>We promote eco-friendly practices and support sustainable business models.</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default About;
