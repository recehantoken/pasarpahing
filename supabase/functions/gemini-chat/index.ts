import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY") || "your-api-key";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const pasarPahingInfo = {
  general: `
    Pasar Pahing is a digital platform connecting local farmers and artisans with consumers, promoting sustainable, locally sourced products like fresh produce, handcrafted goods, and traditional foods.
  `,
  faq: `
    Frequently Asked Questions:
    - How do I create an account? Click the "Sign up" button in the top right corner, fill in your information, and follow the instructions.
    - How can I track my order? After shipping, you’ll receive a tracking number via email to use on the carrier’s website.
    - What payment methods do you accept? We accept Visa, MasterCard, American Express, PayPal, and bank transfers.
    - Can I cancel my order? Yes, within 24 hours of placing it; contact customer service for assistance.
    - Do you ship internationally? Yes, to most countries, with varying costs and delivery times.
  `,
  privacy: `
    Privacy Policy:
    At Pasar Pahing, we take your privacy seriously. Here’s how we handle your information:
    1. Information We Collect: Name, email, address, phone, payment info from account creation, purchases, support contacts, subscriptions, surveys.
    2. Automatically Collected: IP address, browser type, access times, device info, location, cookies.
    3. How We Use It: To provide services, process transactions, send updates, respond to queries, personalize experiences, analyze trends, prevent fraud.
    4. Sharing: With vendors, other users, legal requests, or with consent.
    5. Data Security: Protected with reasonable measures, though no transmission is fully secure.
    6. Your Choices: Update account info, manage cookies, opt out of promotional emails.
    7. Children’s Privacy: Not for under 13; we delete such data if collected.
    8. Changes: We’ll notify you of material updates via email or site notice.
    9. Contact: info@recehan.gold.
    Last updated: ${new Date().toLocaleDateString()}.
  `,
  returns: `
    Returns & Refunds:
    Return within 30 days for a refund or exchange if unsatisfied.
    - Eligibility: Unused, unworn, original packaging, tags attached, with proof of purchase.
    - Exceptions: No returns for personalized items, digital products, gift cards, intimate apparel, final sale items.
    - Process: 
      1. Contact returns@pasarpahing.com or (123) 456-7890 with order number and reason.
      2. Receive return authorization and shipping label.
      3. Pack items with the return form.
      4. Ship using the prepaid label; keep the tracking number.
      5. Refund processed in 3-5 days to original payment method.
    - Refund Policy: Credit/debit (3-5 days), bank transfers (5-7 days), store credit (immediate); shipping costs non-refundable unless our error.
  `,
  shipping: `
    Shipping Information:
    We offer reliable, affordable shipping options.
    - Methods: Vary by producer (e.g., Standard, Express) with costs and estimated days (e.g., 1-7 days).
    - Processing Time: 1-2 business days, extra during holidays.
    - International: Available worldwide; import duties are your responsibility.
    - Tracking: Provided via email upon shipment.
    - Delays: Possible due to weather, customs, or carrier issues.
  `,
  terms: `
    Terms of Service:
    By using Pasar Pahing, you agree to these terms:
    1. Acceptance: Bound by these terms and laws.
    2. Use: For buying/selling as permitted; you’re responsible for account security.
    3. Accounts: Provide accurate info; we may suspend inaccurate accounts.
    4. Listings: Sellers ensure accuracy; we may remove violating listings.
    5. Prohibited: Illegal acts, spam, false content, account transfers, data harvesting, interference.
    6. Intellectual Property: Content is ours, protected; no unauthorized use.
    7. Liability: No liability for indirect damages from platform use.
    8. Changes: We may update terms with 30 days’ notice for material changes.
    9. Law: Governed by U.S. law.
    10. Contact: info@recehan.gold.
    Last updated: ${new Date().toLocaleDateString()}.
  `,
  about: `
    About Pasar Pahing:
    - Description: A vibrant marketplace connecting buyers and sellers for sustainable local commerce.
    - Mission: Create an accessible, fair, sustainable marketplace supporting small businesses.
    - Values: 
      - Community: Fosters trust and connection.
      - Authenticity: Celebrates genuine Indonesian products.
      - Sustainability: Promotes eco-friendly practices.
    - Team: John Doe (Founder & CEO), Jane Smith (Chief Marketing Officer), Ahmad Yani (Lead Developer).
  `,
  contact: `
    Contact Us:
    - Email: info@recehan.gold
    - Phone: +63 815 5394 2464
    - Address: Office, Sleman, Yogyakarta, Central Java, Indonesia
    - Hours: Mon-Fri 9 AM-6 PM, Sat 10 AM-4 PM, Sun closed
    - Form: Submit name, email, subject, message via our site.
  `,
  cookies: `
    Cookie Policy:
    We use cookies to enhance your experience:
    1. What Are Cookies? Small files for functionality and analytics; first-party (us) and third-party (partners).
    2. Types:
      - Essential: Necessary for site function (e.g., login).
      - Performance: Anonymous analytics on page usage.
      - Functionality: Personalization (e.g., settings).
      - Targeting: Ads based on interests.
    3. Control: Manage via browser settings; see www.allaboutcookies.org.
    4. Advertising: Targeted ads; opt out via NAI (http://www.networkadvertising.org).
    5. Changes: Updated as needed; check back regularly.
    6. Contact: info@recehan.gold.
    Last updated: ${new Date().toLocaleDateString()}.
  `,
};

const pasarPahingInfoIndonesian = {
  general: `
    Pasar Pahing adalah platform digital yang menghubungkan petani dan pengrajin lokal dengan konsumen untuk mempromosikan produk lokal yang berkelanjutan seperti produk segar, kerajinan tangan, dan makanan tradisional.
  `,
  faq: `
    Pertanyaan Umum:
    - Bagaimana cara membuat akun? Klik tombol "Daftar" di pojok kanan atas, isi informasi, dan ikuti petunjuk.
    - Bagaimana melacak pesanan? Setelah dikirim, Anda akan menerima nomor pelacakan via email untuk digunakan di situs kurir.
    - Metode pembayaran apa yang diterima? Visa, MasterCard, American Express, PayPal, dan transfer bank.
    - Bisakah saya membatalkan pesanan? Ya, dalam 24 jam setelah pemesanan; hubungi layanan pelanggan.
    - Apakah Anda mengirim ke luar negeri? Ya, ke sebagian besar negara, dengan biaya dan waktu berbeda.
  `,
  privacy: `
    Kebijakan Privasi:
    Di Pasar Pahing, privasi Anda penting:
    1. Data yang Dikumpulkan: Nama, email, alamat, telepon, info pembayaran dari akun, pembelian, kontak dukungan, langganan, survei.
    2. Otomatis: IP, tipe browser, waktu akses, info perangkat, lokasi, cookie.
    3. Penggunaan: Menyediakan layanan, proses transaksi, kirim pembaruan, jawab pertanyaan, sesuaikan pengalaman, analisis tren, cegah penipuan.
    4. Berbagi: Dengan vendor, pengguna lain, permintaan hukum, atau dengan persetujuan.
    5. Keamanan: Dilindungi dengan langkah wajar, meskipun tidak sepenuhnya aman.
    6. Pilihan: Perbarui info akun, kelola cookie, keluar dari email promosi.
    7. Privasi Anak: Tidak untuk di bawah 13 tahun; data tersebut dihapus jika terkumpul.
    8. Perubahan: Diberitahu via email atau pemberitahuan situs untuk perubahan besar.
    9. Kontak: info@recehan.gold.
    Terakhir diperbarui: ${new Date().toLocaleDateString()}.
  `,
  returns: `
    Pengembalian & Pengembalian Dana:
    Kembalikan dalam 30 hari untuk pengembalian dana atau penukaran jika tidak puas.
    - Kelayakan: Belum digunakan, belum dipakai, kemasan asli, label terpasang, dengan bukti pembelian.
    - Pengecualian: Tidak ada pengembalian untuk barang personal, produk digital, kartu hadiah, pakaian dalam, barang obral akhir.
    - Proses:
      1. Hubungi returns@pasarpahing.com atau (123) 456-7890 dengan nomor pesanan dan alasan.
      2. Terima otorisasi pengembalian dan label pengiriman.
      3. Kemas barang dengan formulir pengembalian.
      4. Kirim dengan label prabayar; simpan nomor pelacakan.
      5. Dana diproses dalam 3-5 hari ke metode pembayaran asli.
    - Kebijakan: Kartu kredit/debit (3-5 hari), transfer bank (5-7 hari), kredit toko (segera); biaya pengiriman tidak dikembalikan kecuali kesalahan kami.
  `,
  shipping: `
    Informasi Pengiriman:
    Kami menawarkan opsi pengiriman yang andal dan terjangkau.
    - Metode: Bervariasi per produsen (mis., Standar, Ekspres) dengan biaya dan hari estimasi (mis., 1-7 hari).
    - Waktu Proses: 1-2 hari kerja, ekstra saat libur.
    - Internasional: Tersedia ke seluruh dunia; bea masuk tanggung jawab Anda.
    - Pelacakan: Diberikan via email saat dikirim.
    - Keterlambatan: Mungkin karena cuaca, bea cukai, atau masalah kurir.
  `,
  terms: `
    Ketentuan Layanan:
    Dengan menggunakan Pasar Pahing, Anda setuju:
    1. Penerimaan: Terikat pada ketentuan ini dan hukum.
    2. Penggunaan: Untuk beli/jual sesuai izin; Anda bertanggung jawab atas keamanan akun.
    3. Akun: Berikan info akurat; akun tidak akurat dapat ditangguhkan.
    4. Daftar: Penjual memastikan akurasi; kami dapat hapus daftar yang melanggar.
    5. Dilarang: Tindakan ilegal, spam, konten palsu, transfer akun, pengumpulan data, gangguan.
    6. Hak Kekayaan: Konten milik kami, dilindungi; tidak ada penggunaan tanpa izin.
    7. Tanggung Jawab: Tidak bertanggung jawab atas kerugian tidak langsung.
    8. Perubahan: Dapat diperbarui dengan pemberitahuan 30 hari untuk perubahan besar.
    9. Hukum: Diatur oleh hukum AS.
    10. Kontak: info@recehan.gold.
    Terakhir diperbarui: ${new Date().toLocaleDateString()}.
  `,
  about: `
    Tentang Pasar Pahing:
    - Deskripsi: Pasar dinamis yang menghubungkan pembeli dan penjual untuk perdagangan lokal berkelanjutan.
    - Misi: Ciptakan pasar yang mudah diakses, adil, dan berkelanjutan untuk usaha kecil.
    - Nilai:
      - Komunitas: Memupuk kepercayaan dan koneksi.
      - Keaslian: Merayakan produk asli Indonesia.
      - Keberlanjutan: Mempromosikan praktik ramah lingkungan.
    - Tim: John Doe (Pendiri & CEO), Jane Smith (Kepala Pemasaran), Ahmad Yani (Pengembang Utama).
  `,
  contact: `
    Hubungi Kami:
    - Email: info@recehan.gold
    - Telepon: +63 815 5394 2464
    - Alamat: Kantor, Sleman, Yogyakarta, Jawa Tengah, Indonesia
    - Jam: Sen-Jum 9-18, Sab 10-16, Minggu tutup
    - Formulir: Kirim nama, email, subjek, pesan via situs kami.
  `,
  cookies: `
    Kebijakan Cookie:
    Kami gunakan cookie untuk tingkatkan pengalaman:
    1. Apa Itu Cookie? File kecil untuk fungsi dan analitik; pihak pertama (kami) dan ketiga (mitra).
    2. Jenis:
      - Esensial: Penting untuk fungsi situs (mis., login).
      - Performa: Analitik anonim penggunaan halaman.
      - Fungsional: Personalisasi (mis., pengaturan).
      - Target: Iklan berdasarkan minat.
    3. Kontrol: Kelola via pengaturan browser; lihat www.allaboutcookies.org.
    4. Iklan: Iklan target; keluar via NAI (http://www.networkadvertising.org).
    5. Perubahan: Diperbarui sesuai kebutuhan; periksa rutin.
    6. Kontak: info@recehan.gold.
    Terakhir diperbarui: ${new Date().toLocaleDateString()}.
  `,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, language = "en", page } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      throw new Error("Messages array is required");
    }

    const infoSource = language === "id" ? pasarPahingInfoIndonesian : pasarPahingInfo;
    const pageInfo = page && infoSource[page] ? infoSource[page] : infoSource.general;

    const systemContext = language === "id"
      ? `Selalu deteksi bahasa pada obrolan, lalu balas dengan bahasa yang digunakan. Nama kamu adalah Dewi, asisten AI untuk Pasar Pahing. Berikan jawaban singkat dan bermanfaat. Berikut informasi tentang halaman ${page || "umum"}:\n\n${pageInfo}`
      : `Detect language on chat, then reply in that language. Your name is Dewi, an AI assistant for Pasar Pahing. Provide concise, helpful answers. Here is information for the ${page || "general"} page:\n\n${pageInfo}`;

    const geminiMessages = [
      { role: "user", parts: [{ text: systemContext }] },
      { role: "model", parts: [{ text: "Understood. I’ll assist as Dewi." }] },
      ...messages.map((message) => ({
        role: message.role === "user" ? "user" : "model",
        parts: [{ text: message.content }],
      })),
    ];

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: geminiMessages,
        generationConfig: { temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 1024 },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        ],
      }),
    });

    const data = await response.json();
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