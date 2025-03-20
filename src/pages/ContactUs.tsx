import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useChatbotContent } from "@/hooks/useChatbotContent";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { Send, MapPin, Phone, Mail } from "lucide-react";

const ContactUs = () => {
  const { title, content, loading } = useChatbotContent("contact");
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    toast.success(t("contact.messageSent"), {
      description: t("contact.messageSentDescription"),
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-8 text-center">
          {loading ? t("common.loading") : title}
        </h1>

        {/* Grid Layout: Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Form and Image */}
          <div className="space-y-8">
            {/* Contact Form */}
            <div className="bg-card p-6 rounded-lg shadow-lg border border-primary/10">
              <h2 className="text-2xl font-semibold mb-4 text-primary">{t("contact.getInTouch")}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                    {t("auth.firstName")}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("contact.namePlaceholder")}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                    {t("auth.email")}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("contact.emailPlaceholder")}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">
                    {t("contact.subject")}
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t("contact.subjectPlaceholder")}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                    {t("contact.message")}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("contact.messagePlaceholder")}
                    rows={5}
                    required
                    className="w-full"
                  />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? t("common.saving") : t("contact.sendMessage")}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Image (1x1) */}
            <div className="relative w-full max-w-md mx-auto">
              <img
                src="/contact-office.jpg" // Replace with your image path
                alt={t("contact.officeImageAlt")}
                className="w-full h-full object-cover rounded-lg shadow-lg aspect-square"
              />
            </div>
          </div>

          {/* Right Column: Office Data and Map */}
          <div className="space-y-8">
            {/* Office Information */}
            <div className="bg-card p-6 rounded-lg shadow-lg border border-primary/10">
              <h2 className="text-2xl font-semibold mb-4 text-primary">{t("contact.officeInfo")}</h2>
              {loading ? (
                <p className="text-muted-foreground">{t("common.loading")}</p>
              ) : (
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <p className="whitespace-pre-wrap">{content.split("\n")[2] || "123 Main St, Anytown, USA 12345"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <p>{content.split("\n")[1] || "(555) 123-4567"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <p>{content.split("\n")[0] || "support@example.com"}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Map */}
            <div className="bg-card p-6 rounded-lg shadow-lg border border-primary/10">
              <h2 className="text-2xl font-semibold mb-4 text-primary">{t("contact.findUs")}</h2>
              <div className="w-full h-64 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509372!2d144.9537353153167!3d-37.81627997975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727f9b8c4d4e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1635781234567!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title={t("contact.mapTitle")}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUs;