
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY") || "AIzaSyDYEW9MfUbDAw9M2CjX5fPXMR6gGgQswrw"; // Using the provided key

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, language = "en" } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      throw new Error("Messages array is required");
    }

    // Add language preference to system message
    const systemContext = language === "id" 
      ? "Kamu adalah asisten AI yang membantu dan menjawab pertanyaan dalam Bahasa Indonesia. Berikan jawaban yang singkat dan bermanfaat."
      : "You are a helpful AI assistant. Provide concise and useful answers in English.";

    // Format messages for Gemini API
    const geminiMessages = [];
    
    // Add system message first
    geminiMessages.push({
      role: "user",
      parts: [{ text: systemContext }]
    });
    
    geminiMessages.push({
      role: "model",
      parts: [{ text: "I understand. I'll act as a helpful assistant." }]
    });
    
    // Add user conversation
    messages.forEach(message => {
      geminiMessages.push({
        role: message.role === "user" ? "user" : "model",
        parts: [{ text: message.content }]
      });
    });

    console.log("Sending request to Gemini with messages:", JSON.stringify(geminiMessages));

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: geminiMessages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    const data = await response.json();
    console.log("Gemini API response:", JSON.stringify(data));

    if (!response.ok) {
      throw new Error(`Gemini API error: ${data.error?.message || JSON.stringify(data)}`);
    }

    let replyText = "";
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      replyText = data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("No valid response from Gemini API");
    }

    return new Response(
      JSON.stringify({ reply: replyText }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in gemini-chat function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
