import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const useChatbotContent = (page: string) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("https://<project-id>.functions.supabase.co/gemini-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: `Provide the full content for the ${page} page.` }],
            language,
            page,
          }),
        });
        const { reply } = await res.json();
        setContent(reply);
      } catch (error) {
        console.error(`Error fetching ${page} content:`, error);
        setContent("Error loading content.");
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [page, language]);

  return { content, loading };
};