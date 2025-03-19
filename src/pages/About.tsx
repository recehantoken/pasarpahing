import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col pt-16">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <Card className="max-w-3xl mx-auto border-primary/20 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {t('about.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              {t('about.description')}
            </p>
            <div className="flex justify-center">
              <img
                src="/logo-pasarpahing.png" // Replace with your image path
                alt={t('about.imageAlt')}
                className="w-full max-w-md rounded-lg shadow-md"
              />
            </div>
            <p className="text-muted-foreground">
              {t('about.mission')}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;