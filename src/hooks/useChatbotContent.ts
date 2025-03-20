// useChatbotContent.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useChatbotContent = (pageKey: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["chatbot-content", pageKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_content")
        .select("title, content")
        .eq("page_key", pageKey)
        .single();

      if (error) throw error;
      return data;
    },
  });

  return {
    title: data?.title || "",
    content: data?.content || "",
    loading: isLoading,
    error,
  };
};