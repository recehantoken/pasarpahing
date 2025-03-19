import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'id';

// Define translations type
export type Translations = {
  [key: string]: {
    [key in Language]: string;
  };
};

// Translation context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  translations: Translations;
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Define initial translations
const initialTranslations: Translations = {
  // Common
  'common.search': {
    en: 'Search',
    id: 'Cari',
  },
  'common.submit': {
    en: 'Submit',
    id: 'Kirim',
  },
  'common.cancel': {
    en: 'Cancel',
    id: 'Batal',
  },
  'common.save': {
    en: 'Save',
    id: 'Simpan',
  },
  'common.delete': {
    en: 'Delete',
    id: 'Hapus',
  },
  'common.edit': {
    en: 'Edit',
    id: 'Ubah',
  },
  'common.loading': {
    en: 'Loading...',
    id: 'Memuat...',
  },
  'common.error': {
    en: 'Error',
    id: 'Kesalahan',
  },
  'common.success': {
    en: 'Success',
    id: 'Berhasil',
  },
  'common.required': {
    en: 'Required',
    id: 'Wajib',
  },
  'common.optional': {
    en: 'Optional',
    id: 'Opsional',
  },
  'common.select': {
    en: 'Select',
    id: 'Pilih',
  },
  'common.preview': {
    en: 'Preview',
    id: 'Pratinjau',
  },
  'common.status': {
    en: 'Status',
    id: 'Status',
  },
  'common.active': {
    en: 'Active',
    id: 'Aktif',
  },
  'common.inactive': {
    en: 'Inactive',
    id: 'Nonaktif',
  },
  'common.action': {
    en: 'Action',
    id: 'Tindakan',
  },
  'common.actions': {
    en: 'Actions',
    id: 'Tindakan',
  },
  'common.add': {
    en: 'Add',
    id: 'Tambah',
  },
  'common.create': {
    en: 'Create',
    id: 'Buat',
  },
  'common.update': {
    en: 'Update',
    id: 'Perbarui',
  },
  'common.confirm': {
    en: 'Confirm',
    id: 'Konfirmasi',
  },
  'common.continue': {
    en: 'Continue',
    id: 'Lanjutkan',
  },
  'common.back': {
    en: 'Back',
    id: 'Kembali',
  },
  'common.next': {
    en: 'Next',
    id: 'Berikutnya',
  },
  'common.previous': {
    en: 'Previous',
    id: 'Sebelumnya',
  },
  'common.done': {
    en: 'Done',
    id: 'Selesai',
  },
  'common.finish': {
    en: 'Finish',
    id: 'Selesai',
  },
  'common.yes': {
    en: 'Yes',
    id: 'Ya',
  },
  'common.no': {
    en: 'No',
    id: 'Tidak',
  },
  'common.or': {
    en: 'Or',
    id: 'Atau',
  },
  'common.and': {
    en: 'And',
    id: 'Dan',
  },
  
  // Navigation
  'nav.home': {
    en: 'Home',
    id: 'Beranda',
  },
  'nav.profile': {
    en: 'Profile',
    id: 'Profil',
  },
  'nav.cart': {
    en: 'Cart',
    id: 'Keranjang',
  },
  'nav.sell': {
    en: 'Sell',
    id: 'Jual',
  },
  'nav.admin': {
    en: 'Admin',
    id: 'Admin',
  },
  'nav.login': {
    en: 'Login',
    id: 'Masuk',
  },
  'nav.logout': {
    en: 'Logout',
    id: 'Keluar',
  },
  'nav.signup': {
    en: 'Sign Up',
    id: 'Daftar',
  },
  'nav.about': {
    en: 'About',
    id: 'Tentang',
  },
  'nav.contact': {
    en: 'Contact',
    id: 'Kontak',
  },
  'nav.faq': {
    en: 'FAQ',
    id: 'FAQ',
  },
  'nav.terms': {
    en: 'Terms',
    id: 'Ketentuan',
  },
  'nav.privacy': {
    en: 'Privacy',
    id: 'Privasi',
  },
  'nav.shipping': {
    en: 'Shipping',
    id: 'Pengiriman',
  },
  'nav.returns': {
    en: 'Returns',
    id: 'Pengembalian',
  },
  
  // Auth
  'auth.email': {
    en: 'Email',
    id: 'Email',
  },
  'auth.password': {
    en: 'Password',
    id: 'Kata Sandi',
  },
  'auth.login': {
    en: 'Login',
    id: 'Masuk',
  },
  'auth.signup': {
    en: 'Sign Up',
    id: 'Daftar',
  },
  'auth.firstName': {
    en: 'First Name',
    id: 'Nama Depan',
  },
  'auth.lastName': {
    en: 'Last Name',
    id: 'Nama Belakang',
  },
  'auth.continueWith': {
    en: 'Or continue with',
    id: 'Atau lanjutkan dengan',
  },
  'auth.createAccount': {
    en: 'Create an Account',
    id: 'Buat Akun',
  },
  'auth.signIn': {
    en: 'Sign In',
    id: 'Masuk',
  },
  'auth.alreadyHaveAccount': {
    en: 'Already have an account? Sign In',
    id: 'Sudah memiliki akun? Masuk',
  },
  'auth.dontHaveAccount': {
    en: 'Don\'t have an account? Sign Up',
    id: 'Belum memiliki akun? Daftar',
  },
  'auth.forgotPassword': {
    en: 'Forgot Password?',
    id: 'Lupa Kata Sandi?',
  },
  'auth.resetPassword': {
    en: 'Reset Password',
    id: 'Atur Ulang Kata Sandi',
  },
  'auth.verification': {
    en: 'Verification',
    id: 'Verifikasi',
  },
  'auth.accountCreated': {
    en: 'Account Created',
    id: 'Akun Dibuat',
  },
  'auth.loggedIn': {
    en: 'Logged In',
    id: 'Berhasil Masuk',
  },
  'auth.loggedOut': {
    en: 'Logged Out',
    id: 'Berhasil Keluar',
  },
  
  // Products
  'product.price': {
    en: 'Price',
    id: 'Harga',
  },
  'product.category': {
    en: 'Category',
    id: 'Kategori',
  },
  'product.description': {
    en: 'Description',
    id: 'Deskripsi',
  },
  'product.addToCart': {
    en: 'Add to Cart',
    id: 'Tambahkan ke Keranjang',
  },
  'product.buyNow': {
    en: 'Buy Now',
    id: 'Beli Sekarang',
  },
  'product.outOfStock': {
    en: 'Out of Stock',
    id: 'Stok Habis',
  },
  'product.name': {
    en: 'Product Name',
    id: 'Nama Produk',
  },
  'product.image': {
    en: 'Product Image',
    id: 'Gambar Produk',
  },
  'product.selectImage': {
    en: 'Select Image',
    id: 'Pilih Gambar',
  },
  'product.flashSale': {
    en: 'Flash Sale',
    id: 'Flash Sale',
  },
  'product.new': {
    en: 'New Product',
    id: 'Produk Baru',
  },
  'product.list': {
    en: 'List Product for Sale',
    id: 'Daftarkan Produk Untuk Dijual',
  },
  'product.listing': {
    en: 'Listing Product...',
    id: 'Mendaftarkan Produk...',
  },
  'product.listed': {
    en: 'Item listed successfully',
    id: 'Barang terdaftar berhasil',
  },
  'product.listingFailed': {
    en: 'Error listing item',
    id: 'Gagal mendaftarkan barang',
  },
  'product.requiredFields': {
    en: 'Required fields',
    id: 'Kolom wajib diisi',
  },
  
  // Cart
  'cart.title': {
    en: 'Your Cart',
    id: 'Keranjang Anda',
  },
  'cart.empty': {
    en: 'Your cart is empty',
    id: 'Keranjang Anda kosong',
  },
  'cart.total': {
    en: 'Total',
    id: 'Total',
  },
  'cart.checkout': {
    en: 'Checkout',
    id: 'Bayar',
  },
  'cart.remove': {
    en: 'Remove',
    id: 'Hapus',
  },
  'cart.quantity': {
    en: 'Quantity',
    id: 'Jumlah',
  },
  'cart.continue': {
    en: 'Continue Shopping',
    id: 'Lanjutkan Belanja',
  },
  'cart.summary': {
    en: 'Order Summary',
    id: 'Ringkasan Pesanan',
  },
  'cart.shipping': {
    en: 'Shipping',
    id: 'Pengiriman',
  },
  'cart.tax': {
    en: 'Tax',
    id: 'Pajak',
  },
  'cart.discount': {
    en: 'Discount',
    id: 'Diskon',
  },
  'cart.subtotal': {
    en: 'Subtotal',
    id: 'Subtotal',
  },
  'cart.estimatedTotal': {
    en: 'Estimated Total',
    id: 'Total Estimasi',
  },
  
  // Profile
  'profile.title': {
    en: 'Profile',
    id: 'Profil',
  },
  'profile.personalInfo': {
    en: 'Personal Information',
    id: 'Informasi Pribadi',
  },
  'profile.orders': {
    en: 'Orders',
    id: 'Pesanan',
  },
  'profile.settings': {
    en: 'Settings',
    id: 'Pengaturan',
  },
  'profile.language': {
    en: 'Language',
    id: 'Bahasa',
  },
  'profile.changePassword': {
    en: 'Change Password',
    id: 'Ubah Kata Sandi',
  },
  'profile.accountSettings': {
    en: 'Account Settings',
    id: 'Pengaturan Akun',
  },
  'profile.notifications': {
    en: 'Notifications',
    id: 'Notifikasi',
  },
  'profile.preferences': {
    en: 'Preferences',
    id: 'Preferensi',
  },
  'profile.address': {
    en: 'Address',
    id: 'Alamat',
  },
  'profile.paymentMethods': {
    en: 'Payment Methods',
    id: 'Metode Pembayaran',
  },
  'profile.changeEmail': {
    en: 'Change Email',
    id: 'Ubah Email',
  },
  'profile.deleteAccount': {
    en: 'Delete Account',
    id: 'Hapus Akun',
  },
  'profile.exportData': {
    en: 'Export My Data',
    id: 'Ekspor Data Saya',
  },
  
  // Admin
  'admin.dashboard': {
    en: 'Dashboard',
    id: 'Dasbor',
  },
  'admin.products': {
    en: 'Products',
    id: 'Produk',
  },
  'admin.categories': {
    en: 'Categories',
    id: 'Kategori',
  },
  'admin.users': {
    en: 'Users',
    id: 'Pengguna',
  },
  'admin.orders': {
    en: 'Orders',
    id: 'Pesanan',
  },
  'admin.settings': {
    en: 'Settings',
    id: 'Pengaturan',
  },
  'admin.shipping': {
    en: 'Shipping',
    id: 'Pengiriman',
  },
  'admin.frontpage': {
    en: 'Front Page',
    id: 'Halaman Depan',
  },
  'admin.addProduct': {
    en: 'Add Product',
    id: 'Tambah Produk',
  },
  'admin.editProduct': {
    en: 'Edit Product',
    id: 'Edit Produk',
  },
  'admin.addCategory': {
    en: 'Add Category',
    id: 'Tambah Kategori',
  },
  'admin.editCategory': {
    en: 'Edit Category',
    id: 'Edit Kategori',
  },
  'admin.addShipping': {
    en: 'Add Shipping Method',
    id: 'Tambah Metode Pengiriman',
  },
  'admin.editShipping': {
    en: 'Edit Shipping Method',
    id: 'Edit Metode Pengiriman',
  },
  'admin.payments': {
    en: 'Payment Methods',
    id: 'Metode Pembayaran',
  },
  'admin.addPayment': {
    en: 'Add Payment Method',
    id: 'Tambah Metode Pembayaran',
  },
  'admin.editPayment': {
    en: 'Edit Payment Method',
    id: 'Edit Metode Pembayaran',
  },
  'admin.statistics': {
    en: 'Statistics',
    id: 'Statistik',
  },
  'admin.analytics': {
    en: 'Analytics',
    id: 'Analitik',
  },
  'admin.sales': {
    en: 'Sales',
    id: 'Penjualan',
  },
  'admin.revenue': {
    en: 'Revenue',
    id: 'Pendapatan',
  },
  'admin.customers': {
    en: 'Customers',
    id: 'Pelanggan',
  },
  'admin.content': {
    en: 'Content',
    id: 'Konten',
  },
  'admin.marketing': {
    en: 'Marketing',
    id: 'Pemasaran',
  },
  'admin.discounts': {
    en: 'Discounts',
    id: 'Diskon',
  },
  'admin.reports': {
    en: 'Reports',
    id: 'Laporan',
  },
  'admin.inventory': {
    en: 'Inventory',
    id: 'Inventaris',
  },
  
  // Payment and Shipping
  'payment.method': {
    en: 'Payment Method',
    id: 'Metode Pembayaran',
  },
  'payment.methods': {
    en: 'Payment Methods',
    id: 'Metode Pembayaran',
  },
  'payment.cardNumber': {
    en: 'Card Number',
    id: 'Nomor Kartu',
  },
  'payment.expiryDate': {
    en: 'Expiry Date',
    id: 'Tanggal Kadaluwarsa',
  },
  'payment.cvv': {
    en: 'CVV',
    id: 'CVV',
  },
  'payment.nameOnCard': {
    en: 'Name on Card',
    id: 'Nama pada Kartu',
  },
  'payment.billingAddress': {
    en: 'Billing Address',
    id: 'Alamat Penagihan',
  },
  'payment.crypto': {
    en: 'Cryptocurrency',
    id: 'Mata Uang Kripto',
  },
  'payment.wallet': {
    en: 'Wallet Address',
    id: 'Alamat Dompet',
  },
  'payment.bankTransfer': {
    en: 'Bank Transfer',
    id: 'Transfer Bank',
  },
  'payment.accountNumber': {
    en: 'Account Number',
    id: 'Nomor Rekening',
  },
  'payment.accountName': {
    en: 'Account Name',
    id: 'Nama Pemilik Rekening',
  },
  'payment.bankName': {
    en: 'Bank Name',
    id: 'Nama Bank',
  },
  'payment.payNow': {
    en: 'Pay Now',
    id: 'Bayar Sekarang',
  },
  'payment.paymentSummary': {
    en: 'Payment Summary',
    id: 'Ringkasan Pembayaran',
  },
  'payment.paymentSuccessful': {
    en: 'Payment Successful',
    id: 'Pembayaran Berhasil',
  },
  'payment.paymentFailed': {
    en: 'Payment Failed',
    id: 'Pembayaran Gagal',
  },
  'shipping.method': {
    en: 'Shipping Method',
    id: 'Metode Pengiriman',
  },
  'shipping.methods': {
    en: 'Shipping Methods',
    id: 'Metode Pengiriman',
  },
  'shipping.address': {
    en: 'Shipping Address',
    id: 'Alamat Pengiriman',
  },
  'shipping.cost': {
    en: 'Shipping Cost',
    id: 'Biaya Pengiriman',
  },
  'shipping.expedited': {
    en: 'Expedited Shipping',
    id: 'Pengiriman Ekspres',
  },
  'shipping.standard': {
    en: 'Standard Shipping',
    id: 'Pengiriman Standar',
  },
  'shipping.free': {
    en: 'Free Shipping',
    id: 'Pengiriman Gratis',
  },
  'shipping.estimatedDelivery': {
    en: 'Estimated Delivery',
    id: 'Perkiraan Pengiriman',
  },
  'shipping.tracking': {
    en: 'Tracking Number',
    id: 'Nomor Pelacakan',
  },
  'shipping.track': {
    en: 'Track Package',
    id: 'Lacak Paket',
  },
  'shipping.days': {
    en: 'days',
    id: 'hari',
  },
  
  // Chat
  'chat.title': {
    en: 'Chat',
    id: 'Obrolan',
  },
  'chat.message': {
    en: 'Message',
    id: 'Pesan',
  },
  'chat.send': {
    en: 'Send',
    id: 'Kirim',
  },
  'chat.typing': {
    en: 'Typing...',
    id: 'Mengetik...',
  },
  'chat.placeholder': {
    en: 'Type a message...',
    id: 'Ketik pesan...',
  },
  'chat.assistant': {
    en: 'Assistant',
    id: 'Asisten',
  },
  'chat.loadMore': {
    en: 'Load more messages',
    id: 'Muat lebih banyak pesan',
  },
  'chat.welcome': {
    en: 'Hello! How can I help you today?',
    id: 'Halo! Apa yang bisa saya bantu hari ini?',
  },
  'chat.networkError': {
    en: 'Network error. Please try again.',
    id: 'Kesalahan jaringan. Silakan coba lagi.',
  },
  'chat.errorMessage': {
    en: 'Sorry, there was an error. Please try again.',
    id: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
  },

  // Footer (New Additions)
  'footer.about': {
    en: 'Pasar Pahing is a traditional Indonesian market celebrating local culture and authentic Indonesian products. Experience vibrant trade, heritage crafts, and community spirit in a lively marketplace setting.',
    id: 'Pasar Pahing adalah pasar tradisional Indonesia yang merayakan budaya lokal dan produk autentik Indonesia. Nikmati perdagangan yang hidup, kerajinan warisan, dan semangat komunitas dalam suasana pasar yang ramai.',
  },
  'footer.quickLinks': {
    en: 'Quick Links',
    id: 'Tautan Cepat',
  },
  'footer.help': {
    en: 'Help',
    id: 'Bantuan',
  },
  'footer.faq': {
    en: 'FAQ',
    id: 'FAQ',
  },
  'footer.shipping': {
    en: 'Shipping',
    id: 'Pengiriman',
  },
  'footer.returns': {
    en: 'Returns',
    id: 'Pengembalian',
  },
  'footer.contact': {
    en: 'Contact Us',
    id: 'Hubungi Kami',
  },
  'footer.legal': {
    en: 'Legal',
    id: 'Hukum',
  },
  'footer.terms': {
    en: 'Terms of Service',
    id: 'Syarat Layanan',
  },
  'footer.privacy': {
    en: 'Privacy Policy',
    id: 'Kebijakan Privasi',
  },
  'footer.cookies': {
    en: 'Cookies',
    id: 'Kuki',
  },
  'footer.copyright': {
    en: '© {year} Pasar Pahing developed by ID Cent. All rights reserved.',
    id: '© {year} Pasar Pahing dikembangkan oleh ID Cent. Semua hak dilindungi.',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Get language from localStorage or use default
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });
  const [translations, setTranslations] = useState<Translations>(initialTranslations);

  // Update localStorage when language changes
  const setLanguage = (lang: Language) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);
  };

  // Translation function with parameter support
  const t = (key: string, params?: Record<string, string | number>): string => {
    if (translations[key] && translations[key][language]) {
      let translated = translations[key][language];
      if (params) {
        Object.entries(params).forEach(([param, value]) => {
          translated = translated.replace(`{${param}}`, value.toString());
        });
      }
      return translated;
    }
    // Fallback to English or key if translation not found
    return translations[key]?.['en'] || key;
  };

  // Store language in localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};