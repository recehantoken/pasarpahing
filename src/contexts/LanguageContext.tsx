
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available languages
export type Language = 'en' | 'id';

// Define the context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.sell': 'Sell Item',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact Us',
    'nav.shipping': 'Shipping',
    'nav.returns': 'Returns',
    'nav.terms': 'Terms',
    'nav.signIn': 'Sign In',
    'nav.signOut': 'Sign Out',
    'nav.cart': 'Cart',
    
    // Index page
    'index.products': 'Products',
    'index.search': 'Search products...',
    'index.sortBy': 'Sort by',
    'index.newest': 'Newest',
    'index.priceLowHigh': 'Price: Low to High',
    'index.priceHighLow': 'Price: High to Low',
    'index.loading': 'Loading products...',
    'index.cryptoPayments': 'Crypto Payments Now Available!',
    'index.cryptoDesc': 'Pay with your favorite cryptocurrency and get exclusive discounts on all purchases.',
    'index.learnMore': 'Learn More',
    'index.newArrivals': 'New Arrivals',
    'index.checkProducts': 'Check out our latest products',
    'index.shopNow': 'Shop Now',
    'index.limitedOffers': 'Limited Offers',
    'index.specialDiscount': 'Don\'t miss our special discount',
    'index.viewDeals': 'View Deals',
    
    // Category filter
    'category.all': 'All Categories',
    'category.filter': 'Filter by Category',
    
    // Cart page
    'cart.title': 'Your Cart',
    'cart.empty': 'Your cart is empty',
    'cart.continueShopping': 'Continue Shopping',
    'cart.items': 'items',
    'cart.clearCart': 'Clear Cart',
    'cart.orderSummary': 'Order Summary',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.free': 'Free',
    'cart.total': 'Total',
    'cart.paymentMethod': 'Payment Method',
    'cart.selectPayment': 'Select payment method',
    'cart.bankTransfer': 'Bank Transfer',
    'cart.crypto': 'Cryptocurrency',
    'cart.bankName': 'Bank Name',
    'cart.enterBankName': 'Enter bank name',
    'cart.accountNumber': 'Account Number',
    'cart.enterAccountNumber': 'Enter account number',
    'cart.payWithCrypto': 'Pay with Cryptocurrency',
    'cart.cryptoWallet': 'You\'ll be prompted to connect your MetaMask wallet to complete this transaction.',
    'cart.approx': 'approx',
    'cart.completeOrder': 'Complete Order',
    'cart.processing': 'Processing...',
    
    // Auth page
    'auth.createAccount': 'Create an Account',
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    'auth.signUpDesc': 'Sign up to start shopping and selling',
    'auth.signInDesc': 'Sign in to access your account',
    'auth.email': 'Email',
    'auth.enterEmail': 'Enter your email',
    'auth.password': 'Password',
    'auth.enterPassword': 'Enter your password',
    'auth.firstName': 'First Name',
    'auth.enterFirstName': 'Enter your first name',
    'auth.lastName': 'Last Name',
    'auth.enterLastName': 'Enter your last name',
    'auth.continueWith': 'Or continue with',
    'auth.google': 'Google',
    'auth.metamask': 'MetaMask',
    'auth.wait': 'Please wait...',
    'auth.haveAccount': 'Already have an account? Sign In',
    'auth.noAccount': 'Don\'t have an account? Sign Up',
    
    // Contact page
    'contact.title': 'Contact Us',
    'contact.getInTouch': 'Get in Touch',
    'contact.questionDesc': 'Have a question, concern, or feedback? We\'re here to help! Fill out the form and our team will get back to you as soon as possible.',
    'contact.name': 'Name',
    'contact.yourName': 'Your name',
    'contact.email': 'Email',
    'contact.yourEmail': 'Your email address',
    'contact.subject': 'Subject',
    'contact.yourSubject': 'Subject of your message',
    'contact.message': 'Message',
    'contact.yourMessage': 'Your message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.info': 'Contact Information',
    'contact.address': 'Address',
    'contact.businessHours': 'Business Hours',
    'contact.mondayFriday': 'Monday - Friday:',
    'contact.saturday': 'Saturday:',
    'contact.sunday': 'Sunday:',
    'contact.closed': 'Closed',
    
    // FAQ page
    'faq.title': 'Frequently Asked Questions',
    'faq.account': 'How do I create an account?',
    'faq.accountAnswer': 'You can create an account by clicking on the Sign up button in the top right corner of the page. Fill in your information and follow the instructions to complete the registration process.',
    'faq.track': 'How can I track my order?',
    'faq.trackAnswer': 'Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on the shipping carrier\'s website.',
    'faq.payment': 'What payment methods do you accept?',
    'faq.paymentAnswer': 'We accept major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers.',
    'faq.cancel': 'Can I cancel my order?',
    'faq.cancelAnswer': 'You can cancel your order within 24 hours of placing it. Please contact our customer service team for assistance with cancellations.',
    'faq.international': 'Do you ship internationally?',
    'faq.internationalAnswer': 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.',
    
    // Shipping page
    'shipping.title': 'Shipping Information',
    'shipping.desc': 'At Pasar Pahing, we strive to provide reliable and affordable shipping options for all our customers. Below you\'ll find information about our shipping methods, estimated delivery times, and costs.',
    'shipping.methods': 'Available Shipping Methods',
    'shipping.approx': 'Approx.',
    'shipping.day': 'day',
    'shipping.days': 'days',
    'shipping.noMethods': 'No shipping methods available at the moment. Please check back later.',
    'shipping.policies': 'Shipping Policies',
    'shipping.processing': 'Processing Time',
    'shipping.processingDesc': 'Most orders are processed within 1-2 business days after payment confirmation. During high volume periods or holidays, processing may take an additional 1-2 days.',
    'shipping.international': 'International Shipping',
    'shipping.internationalDesc': 'We ship to most countries worldwide. International orders may be subject to import duties and taxes, which are the responsibility of the recipient.',
    'shipping.tracking': 'Tracking',
    'shipping.trackingDesc': 'All orders come with tracking information that will be sent to your email once your order has been shipped.',
    'shipping.delays': 'Shipping Delays',
    'shipping.delaysDesc': 'Occasionally, shipping may be delayed due to unforeseen circumstances such as weather conditions, customs clearance, or carrier delays. We appreciate your patience in these situations.',
    
    // Returns page
    'returns.title': 'Returns & Refunds',
    'returns.desc': 'We want you to be completely satisfied with your purchase. If for any reason you\'re not, you can return your items within 30 days of delivery for a full refund or exchange.',
    'returns.policy': 'Return Policy',
    'returns.eligibility': 'Eligibility',
    'returns.unused': 'Items must be unused, unworn, and in their original packaging',
    'returns.tags': 'All tags and labels must be attached',
    'returns.within': 'Items must be returned within 30 days of delivery',
    'returns.proof': 'Proof of purchase (order number or receipt) is required',
    'returns.exceptions': 'Exceptions',
    'returns.cantReturn': 'The following items cannot be returned or exchanged:',
    'returns.personalized': 'Personalized or custom-made items',
    'returns.digital': 'Digital products',
    'returns.giftcards': 'Gift cards',
    'returns.intimate': 'Intimate apparel for hygiene reasons',
    'returns.final': 'Items marked as final sale',
    'returns.process': 'Return Process',
    'returns.contact': 'Contact Customer Service',
    'returns.contactDesc': 'Email us at returns@pasarpahing.com or call our customer service at (123) 456-7890 to initiate a return. Please include your order number and reason for return.',
    'returns.authorization': 'Receive Return Authorization',
    'returns.authDesc': 'We\'ll review your request and send you a return authorization along with a return shipping label and instructions.',
    'returns.pack': 'Pack Your Return',
    'returns.packDesc': 'Place the items back in their original packaging if possible. Include the return form in the package.',
    'returns.ship': 'Ship Your Return',
    'returns.shipDesc': 'Drop off the package at your nearest shipping location using our prepaid return label. We recommend keeping the tracking number for your records.',
    'returns.refund': 'Refund Processing',
    'returns.refundDesc': 'Once we receive and inspect your return, we\'ll process your refund to the original payment method. This typically takes 3-5 business days.',
    'returns.refundPolicy': 'Refund Policy',
    'returns.original': 'Refunds will be issued to the original payment method used for the purchase.',
    'returns.credit': 'Credit/debit card refunds typically take 3-5 business days to process',
    'returns.bank': 'Bank transfers may take 5-7 business days',
    'returns.store': 'Store credit is processed immediately',
    'returns.shippingNonRefundable': 'Shipping costs are non-refundable unless the return is due to our error',
    'returns.fees': 'Return shipping fees will be deducted from your refund unless the return is due to our error',
    
    // Footer
    'footer.shop': 'Shop',
    'footer.allProducts': 'All Products',
    'footer.newArrivals': 'New Arrivals',
    'footer.bestSellers': 'Best Sellers',
    'footer.featured': 'Featured',
    'footer.onSale': 'On Sale',
    'footer.information': 'Information',
    'footer.aboutUs': 'About Us',
    'footer.contactUs': 'Contact Us',
    'footer.faq': 'FAQ',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.shipping': 'Shipping',
    'footer.returns': 'Returns',
    'footer.policies': 'Policies',
    'footer.cookiePolicy': 'Cookie Policy',
    'footer.termsConditions': 'Terms & Conditions',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.subscribe': 'Subscribe',
    'footer.subscribeDesc': 'Subscribe to our newsletter for updates, promotions and more.',
    'footer.emailAddress': 'Email address',
    'footer.subscribe': 'Subscribe',
    'footer.rights': 'All rights reserved',
  },
  id: {
    // Header
    'nav.home': 'Beranda',
    'nav.sell': 'Jual Barang',
    'nav.faq': 'FAQ',
    'nav.contact': 'Hubungi Kami',
    'nav.shipping': 'Pengiriman',
    'nav.returns': 'Pengembalian',
    'nav.terms': 'Ketentuan',
    'nav.signIn': 'Masuk',
    'nav.signOut': 'Keluar',
    'nav.cart': 'Keranjang',
    
    // Index page
    'index.products': 'Produk',
    'index.search': 'Cari produk...',
    'index.sortBy': 'Urutkan berdasarkan',
    'index.newest': 'Terbaru',
    'index.priceLowHigh': 'Harga: Rendah ke Tinggi',
    'index.priceHighLow': 'Harga: Tinggi ke Rendah',
    'index.loading': 'Memuat produk...',
    'index.cryptoPayments': 'Pembayaran Crypto Sekarang Tersedia!',
    'index.cryptoDesc': 'Bayar dengan cryptocurrency favorit Anda dan dapatkan diskon eksklusif untuk semua pembelian.',
    'index.learnMore': 'Pelajari Lebih Lanjut',
    'index.newArrivals': 'Produk Baru',
    'index.checkProducts': 'Lihat produk terbaru kami',
    'index.shopNow': 'Belanja Sekarang',
    'index.limitedOffers': 'Penawaran Terbatas',
    'index.specialDiscount': 'Jangan lewatkan diskon spesial kami',
    'index.viewDeals': 'Lihat Penawaran',
    
    // Category filter
    'category.all': 'Semua Kategori',
    'category.filter': 'Filter berdasarkan Kategori',
    
    // Cart page
    'cart.title': 'Keranjang Anda',
    'cart.empty': 'Keranjang Anda kosong',
    'cart.continueShopping': 'Lanjutkan Belanja',
    'cart.items': 'item',
    'cart.clearCart': 'Kosongkan Keranjang',
    'cart.orderSummary': 'Ringkasan Pesanan',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Pengiriman',
    'cart.free': 'Gratis',
    'cart.total': 'Total',
    'cart.paymentMethod': 'Metode Pembayaran',
    'cart.selectPayment': 'Pilih metode pembayaran',
    'cart.bankTransfer': 'Transfer Bank',
    'cart.crypto': 'Cryptocurrency',
    'cart.bankName': 'Nama Bank',
    'cart.enterBankName': 'Masukkan nama bank',
    'cart.accountNumber': 'Nomor Rekening',
    'cart.enterAccountNumber': 'Masukkan nomor rekening',
    'cart.payWithCrypto': 'Bayar dengan Cryptocurrency',
    'cart.cryptoWallet': 'Anda akan diminta untuk menghubungkan dompet MetaMask Anda untuk menyelesaikan transaksi ini.',
    'cart.approx': 'sekitar',
    'cart.completeOrder': 'Selesaikan Pesanan',
    'cart.processing': 'Memproses...',
    
    // Auth page
    'auth.createAccount': 'Buat Akun',
    'auth.signIn': 'Masuk',
    'auth.signUp': 'Daftar',
    'auth.signUpDesc': 'Daftar untuk mulai berbelanja dan menjual',
    'auth.signInDesc': 'Masuk untuk mengakses akun Anda',
    'auth.email': 'Email',
    'auth.enterEmail': 'Masukkan email Anda',
    'auth.password': 'Kata Sandi',
    'auth.enterPassword': 'Masukkan kata sandi Anda',
    'auth.firstName': 'Nama Depan',
    'auth.enterFirstName': 'Masukkan nama depan Anda',
    'auth.lastName': 'Nama Belakang',
    'auth.enterLastName': 'Masukkan nama belakang Anda',
    'auth.continueWith': 'Atau lanjutkan dengan',
    'auth.google': 'Google',
    'auth.metamask': 'MetaMask',
    'auth.wait': 'Mohon tunggu...',
    'auth.haveAccount': 'Sudah punya akun? Masuk',
    'auth.noAccount': 'Belum punya akun? Daftar',
    
    // Contact page
    'contact.title': 'Hubungi Kami',
    'contact.getInTouch': 'Hubungi Kami',
    'contact.questionDesc': 'Punya pertanyaan, masalah, atau umpan balik? Kami siap membantu! Isi formulir dan tim kami akan menghubungi Anda sesegera mungkin.',
    'contact.name': 'Nama',
    'contact.yourName': 'Nama Anda',
    'contact.email': 'Email',
    'contact.yourEmail': 'Alamat email Anda',
    'contact.subject': 'Subjek',
    'contact.yourSubject': 'Subjek pesan Anda',
    'contact.message': 'Pesan',
    'contact.yourMessage': 'Pesan Anda',
    'contact.send': 'Kirim Pesan',
    'contact.sending': 'Mengirim...',
    'contact.info': 'Informasi Kontak',
    'contact.address': 'Alamat',
    'contact.businessHours': 'Jam Kerja',
    'contact.mondayFriday': 'Senin - Jumat:',
    'contact.saturday': 'Sabtu:',
    'contact.sunday': 'Minggu:',
    'contact.closed': 'Tutup',
    
    // FAQ page
    'faq.title': 'Pertanyaan yang Sering Diajukan',
    'faq.account': 'Bagaimana cara membuat akun?',
    'faq.accountAnswer': 'Anda dapat membuat akun dengan mengklik tombol Daftar di pojok kanan atas halaman. Isi informasi Anda dan ikuti petunjuk untuk menyelesaikan proses pendaftaran.',
    'faq.track': 'Bagaimana cara melacak pesanan saya?',
    'faq.trackAnswer': 'Setelah pesanan Anda dikirim, Anda akan menerima nomor pelacakan melalui email. Anda dapat menggunakan nomor ini untuk melacak paket Anda di situs web kurir pengiriman.',
    'faq.payment': 'Metode pembayaran apa yang Anda terima?',
    'faq.paymentAnswer': 'Kami menerima kartu kredit utama (Visa, MasterCard, American Express), PayPal, dan transfer bank.',
    'faq.cancel': 'Bisakah saya membatalkan pesanan saya?',
    'faq.cancelAnswer': 'Anda dapat membatalkan pesanan Anda dalam waktu 24 jam setelah melakukan pemesanan. Silakan hubungi tim layanan pelanggan kami untuk bantuan dengan pembatalan.',
    'faq.international': 'Apakah Anda mengirim secara internasional?',
    'faq.internationalAnswer': 'Ya, kami mengirim ke sebagian besar negara di seluruh dunia. Biaya pengiriman dan waktu pengiriman bervariasi berdasarkan lokasi.',
    
    // Shipping page
    'shipping.title': 'Informasi Pengiriman',
    'shipping.desc': 'Di Pasar Pahing, kami berusaha menyediakan opsi pengiriman yang andal dan terjangkau untuk semua pelanggan kami. Di bawah ini Anda akan menemukan informasi tentang metode pengiriman kami, perkiraan waktu pengiriman, dan biaya.',
    'shipping.methods': 'Metode Pengiriman yang Tersedia',
    'shipping.approx': 'Sekitar',
    'shipping.day': 'hari',
    'shipping.days': 'hari',
    'shipping.noMethods': 'Tidak ada metode pengiriman yang tersedia saat ini. Silakan periksa kembali nanti.',
    'shipping.policies': 'Kebijakan Pengiriman',
    'shipping.processing': 'Waktu Pemrosesan',
    'shipping.processingDesc': 'Sebagian besar pesanan diproses dalam waktu 1-2 hari kerja setelah konfirmasi pembayaran. Selama periode volume tinggi atau liburan, pemrosesan mungkin memakan waktu tambahan 1-2 hari.',
    'shipping.international': 'Pengiriman Internasional',
    'shipping.internationalDesc': 'Kami mengirim ke sebagian besar negara di seluruh dunia. Pesanan internasional mungkin dikenakan bea impor dan pajak, yang menjadi tanggung jawab penerima.',
    'shipping.tracking': 'Pelacakan',
    'shipping.trackingDesc': 'Semua pesanan dilengkapi dengan informasi pelacakan yang akan dikirimkan ke email Anda setelah pesanan Anda dikirim.',
    'shipping.delays': 'Keterlambatan Pengiriman',
    'shipping.delaysDesc': 'Terkadang, pengiriman mungkin tertunda karena keadaan tak terduga seperti kondisi cuaca, pemeriksaan bea cukai, atau keterlambatan kurir. Kami menghargai kesabaran Anda dalam situasi ini.',
    
    // Returns page
    'returns.title': 'Pengembalian & Refund',
    'returns.desc': 'Kami ingin Anda benar-benar puas dengan pembelian Anda. Jika karena alasan apa pun Anda tidak puas, Anda dapat mengembalikan barang Anda dalam waktu 30 hari setelah pengiriman untuk pengembalian dana penuh atau penukaran.',
    'returns.policy': 'Kebijakan Pengembalian',
    'returns.eligibility': 'Kelayakan',
    'returns.unused': 'Barang harus belum digunakan, belum dipakai, dan dalam kemasan aslinya',
    'returns.tags': 'Semua tag dan label harus terpasang',
    'returns.within': 'Barang harus dikembalikan dalam waktu 30 hari setelah pengiriman',
    'returns.proof': 'Bukti pembelian (nomor pesanan atau tanda terima) diperlukan',
    'returns.exceptions': 'Pengecualian',
    'returns.cantReturn': 'Barang berikut tidak dapat dikembalikan atau ditukar:',
    'returns.personalized': 'Barang yang dipersonalisasi atau dibuat khusus',
    'returns.digital': 'Produk digital',
    'returns.giftcards': 'Kartu hadiah',
    'returns.intimate': 'Pakaian dalam untuk alasan kebersihan',
    'returns.final': 'Barang yang ditandai sebagai penjualan akhir',
    'returns.process': 'Proses Pengembalian',
    'returns.contact': 'Hubungi Layanan Pelanggan',
    'returns.contactDesc': 'Email kami di returns@pasarpahing.com atau hubungi layanan pelanggan kami di (123) 456-7890 untuk memulai pengembalian. Harap sertakan nomor pesanan dan alasan pengembalian.',
    'returns.authorization': 'Terima Otorisasi Pengembalian',
    'returns.authDesc': 'Kami akan meninjau permintaan Anda dan mengirimkan otorisasi pengembalian bersama dengan label pengiriman pengembalian dan instruksi.',
    'returns.pack': 'Kemas Pengembalian Anda',
    'returns.packDesc': 'Tempatkan barang kembali dalam kemasan aslinya jika memungkinkan. Sertakan formulir pengembalian dalam paket.',
    'returns.ship': 'Kirim Pengembalian Anda',
    'returns.shipDesc': 'Jatuhkan paket di lokasi pengiriman terdekat Anda menggunakan label pengembalian prabayar kami. Kami menyarankan untuk menyimpan nomor pelacakan untuk catatan Anda.',
    'returns.refund': 'Pemrosesan Pengembalian Dana',
    'returns.refundDesc': 'Setelah kami menerima dan memeriksa pengembalian Anda, kami akan memproses pengembalian dana Anda ke metode pembayaran asli. Ini biasanya memakan waktu 3-5 hari kerja.',
    'returns.refundPolicy': 'Kebijakan Pengembalian Dana',
    'returns.original': 'Pengembalian dana akan diberikan ke metode pembayaran asli yang digunakan untuk pembelian.',
    'returns.credit': 'Pengembalian dana kartu kredit/debit biasanya memakan waktu 3-5 hari kerja untuk diproses',
    'returns.bank': 'Transfer bank mungkin memakan waktu 5-7 hari kerja',
    'returns.store': 'Kredit toko diproses segera',
    'returns.shippingNonRefundable': 'Biaya pengiriman tidak dapat dikembalikan kecuali pengembalian disebabkan oleh kesalahan kami',
    'returns.fees': 'Biaya pengiriman pengembalian akan dikurangkan dari pengembalian dana Anda kecuali pengembalian disebabkan oleh kesalahan kami',
    
    // Footer
    'footer.shop': 'Belanja',
    'footer.allProducts': 'Semua Produk',
    'footer.newArrivals': 'Produk Baru',
    'footer.bestSellers': 'Terlaris',
    'footer.featured': 'Unggulan',
    'footer.onSale': 'Diskon',
    'footer.information': 'Informasi',
    'footer.aboutUs': 'Tentang Kami',
    'footer.contactUs': 'Hubungi Kami',
    'footer.faq': 'FAQ',
    'footer.terms': 'Ketentuan Layanan',
    'footer.privacy': 'Kebijakan Privasi',
    'footer.shipping': 'Pengiriman',
    'footer.returns': 'Pengembalian',
    'footer.policies': 'Kebijakan',
    'footer.cookiePolicy': 'Kebijakan Cookie',
    'footer.termsConditions': 'Syarat & Ketentuan',
    'footer.privacyPolicy': 'Kebijakan Privasi',
    'footer.subscribe': 'Berlangganan',
    'footer.subscribeDesc': 'Berlangganan newsletter kami untuk mendapatkan update, promosi, dan lainnya.',
    'footer.emailAddress': 'Alamat email',
    'footer.subscribe': 'Berlangganan',
    'footer.rights': 'Semua hak dilindungi',
  }
};

// Create the provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Read from localStorage or use browser language
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'id')) {
      return savedLanguage;
    }
    // If no saved language, try to detect browser language
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'id' ? 'id' : 'en';
  });

  // Function to set language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
