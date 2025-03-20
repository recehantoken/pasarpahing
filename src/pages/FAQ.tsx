import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useChatbotContent } from "@/hooks/useChatbotContent";
import { useLanguage } from "@/contexts/LanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const { title, content, loading } = useChatbotContent("faq");
  const { t } = useLanguage();

  // Parse FAQ content into question-answer pairs
  const faqItems = loading
    ? []
    : content
        .split("\n\n") // Assumes double newline separates Q&A pairs
        .map((item) => {
          const [question, answer] = item.split("\nA: ");
          return {
            question: question?.startsWith("Q: ") ? question.slice(3) : question,
            answer: answer || "",
          };
        })
        .filter((item) => item.question && item.answer);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-8 text-center flex items-center justify-center gap-2">
          <HelpCircle className="h-8 w-8" />
          {loading ? t("common.loading") : title}
        </h1>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <p className="text-muted-foreground text-center">{t("common.loading")}</p>
          ) : faqItems.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-primary/10">
                  <AccordionTrigger className="text-left text-lg font-semibold text-primary hover:text-primary/80">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground whitespace-pre-wrap">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-muted-foreground text-center">{t("faq.noContent")}</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FAQ;