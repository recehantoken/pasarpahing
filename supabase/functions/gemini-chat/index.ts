import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY") || "AIzaSyDYEW9MfUbDAw9M2CjX5fPXMR6gGgQswrw";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const pasarPahingInfo = `
Pasar Pahing is a digital platform that connects local farmers and artisans with consumers, aiming to promote sustainable and locally sourced products. The platform offers a wide range of products, including fresh produce, handcrafted goods, and traditional foods, all sourced directly from local producers. By eliminating intermediaries, Pasar Pahing ensures fair pricing for both producers and consumers. The platform also emphasizes eco-friendly practices, encouraging the use of minimal packaging and supporting organic farming methods.

Key Features:
- Product Categories: Users can browse various categories such as fresh vegetables, fruits, dairy products, handmade crafts, and more.
- Producer Profiles: Each product listing includes detailed information about the producer, allowing consumers to learn about the origins of their purchases and the people behind them.
- Sustainable Practices: Pasar Pahing is committed to environmental sustainability, promoting products that are organic, use minimal packaging, and are produced through eco-friendly methods.
- Community Engagement: The platform hosts events and workshops to educate consumers about sustainable living and to strengthen the connection between producers and the community.

Page Information:
- /faq: Answers common questions about using Pasar Pahing, like how to buy, sell, or troubleshoot issues.
- /shipping: Details shipping policies, costs, and delivery options for purchased products.
- /about: Describes Pasar Pahing’s mission to create an accessible, fair, and sustainable marketplace, its values (community, authenticity, sustainability), and team details.
- /contact: Offers ways to reach support, such as email or a contact form.
- /returns: Explains the return policy, including conditions and steps for returning items.
- /terms: Lists the Terms of Service governing platform use.
- /privacy: Details the Privacy Policy on how user data is collected, used, and protected.
- /cookies: Describes the Cookie Policy, including types of cookies and user options.

By focusing on local and sustainable products, Pasar Pahing aims to foster a community that values quality, transparency, and environmental responsibility.
`;

const pasarPahingInfoIndonesian = `
Pasar Pahing adalah platform digital yang menghubungkan petani dan pengrajin lokal dengan konsumen, bertujuan untuk mempromosikan produk berkelanjutan dan bersumber lokal. Platform ini menawarkan berbagai macam produk, termasuk produk segar, barang kerajinan tangan, dan makanan tradisional, semuanya bersumber langsung dari produsen lokal. Dengan menghilangkan perantara, Pasar Pahing memastikan harga yang adil untuk produsen dan konsumen. Platform ini juga menekankan praktik ramah lingkungan, mendorong penggunaan kemasan minimal dan mendukung metode pertanian organik.

Fitur Utama:
- Kategori Produk: Pengguna dapat menjelajahi berbagai kategori seperti sayuran segar, buah-buahan, produk susu, kerajinan tangan, dan lainnya.
- Profil Produsen: Setiap daftar produk mencakup informasi rinci tentang produsen, memungkinkan konsumen untuk mempelajari asal-usul pembelian mereka dan orang-orang di baliknya.
- Praktik Berkelanjutan: Pasar Pahing berkomitmen pada keberlanjutan lingkungan, mempromosikan produk yang organik, menggunakan kemasan minimal, dan diproduksi melalui metode ramah lingkungan.
- Keterlibatan Komunitas: Platform ini menyelenggarakan acara dan lokakarya untuk mendidik konsumen tentang hidup berkelanjutan dan untuk memperkuat hubungan antara produsen dan komunitas.

Informasi Halaman:
- /faq: Menjawab pertanyaan umum tentang penggunaan Pasar Pahing, seperti cara membeli, menjual, atau mengatasi masalah.
- /shipping: Merinci kebijakan pengiriman, biaya, dan opsi pengiriman untuk produk yang dibeli.
- /about: Menjelaskan misi Pasar Pahing untuk menciptakan pasar yang mudah diakses, adil, dan berkelanjutan, nilai-nilainya (komunitas, keaslian, keberlanjutan), dan detail tim.
- /contact: Menawarkan cara untuk menghubungi dukungan, seperti email atau formulir kontak.
- /returns: Menjelaskan kebijakan pengembalian, termasuk syarat dan langkah-langkah untuk mengembalikan barang.
- /terms: Mencantumkan Ketentuan Layanan yang mengatur penggunaan platform.
- /privacy: Merinci Kebijakan Privasi tentang bagaimana data pengguna dikumpulkan, digunakan, dan dilindungi.
- /cookies: Menjelaskan Kebijakan Cookie, termasuk jenis cookie dan opsi pengguna.

Dengan fokus pada produk lokal dan berkelanjutan, Pasar Pahing bertujuan untuk memupuk komunitas yang menghargai kualitas, transparansi, dan tanggung jawab lingkungan.
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, language = "en" } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      throw new Error("Messages array is required");
    }

    const systemContext = language === "id"
      ? `Selalu deteksi bahasa pada obrolan, lalu balas dengan bahasa yang digunakan. Selalu tinjau riwayat obrolan sebelum membuat pesan. Nama kamu adalah Dewi, kamu adalah asisten AI untuk Pasar Pahing yang membantu dan menjawab pertanyaan dalam Bahasa Indonesia. Berikan jawaban yang singkat dan bermanfaat. Berikut informasi tentang Pasar Pahing:\n\n${pasarPahingInfoIndonesian}`
      : `Detect language on chat, then reply with their language. Always review chat history before creating messages. Your name is Dewi, you are a helpful AI assistant for Pasar Pahing. Provide concise and useful answers in English. Here is information about Pasar Pahing:\n\n${pasarPahingInfo}`;

    const geminiMessages = [
      { role: "user", parts: [{ text: systemContext }] },
      { role: "model", parts: [{ text: "Understood. I’ll assist as Dewi for Pasar Pahing with the provided info." }] },
      ...messages.map((message) => ({
        role: message.role === "user" ? "user" : "model",
        parts: [{ text: message.content }],
      })),
    ];

    console.log("Sending request to Gemini with messages:", JSON.stringify(geminiMessages));

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: geminiMessages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        ],
      }),
    });

    const data = await response.json();
    console.log("Gemini API response:", JSON.stringify(data));

    if (!response.ok) {
      throw new Error(`Gemini API error: ${data.error?.message || JSON.stringify(data)}`);
    }

    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    if (!replyText) {
      throw new Error("No valid response from Gemini API");
    }

    return new Response(
      JSON.stringify({ reply: replyText }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Error in gemini-chat function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});