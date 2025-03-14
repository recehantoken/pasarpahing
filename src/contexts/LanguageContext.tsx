
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'id';

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  // Common
  'common.search': {
    en: 'Search',
    id: 'Cari',
  },
  'common.filter': {
    en: 'Filter',
    id: 'Filter',
  },
  'common.sort': {
    en: 'Sort',
    id: 'Urut',
  },
  'common.loading': {
    en: 'Loading...',
    id: 'Memuat...',
  },
  'common.error': {
    en: 'Error',
    id: 'Kesalahan',
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
  'common.edit': {
    en: 'Edit',
    id: 'Ubah',
  },
  'common.delete': {
    en: 'Delete',
    id: 'Hapus',
  },
  'common.all': {
    en: 'All',
    id: 'Semua',
  },
  
  // Navigation
  'nav.home': {
    en: 'Home',
    id: 'Beranda',
  },
  'nav.cart': {
    en: 'Cart',
    id: 'Keranjang',
  },
  'nav.sell': {
    en: 'Sell',
    id: 'Jual',
  },
  'nav.profile': {
    en: 'Profile',
    id: 'Profil',
  },
  'nav.login': {
    en: 'Login',
    id: 'Masuk',
  },
  'nav.register': {
    en: 'Register',
    id: 'Daftar',
  },
  'nav.logout': {
    en: 'Logout',
    id: 'Keluar',
  },
  
  // Home page
  'home.title': {
    en: 'Welcome to Pasar Pahing',
    id: 'Selamat Datang di Pasar Pahing',
  },
  'home.featured': {
    en: 'Featured Products',
    id: 'Produk Unggulan',
  },
  'home.categories': {
    en: 'Categories',
    id: 'Kategori',
  },
  'home.search.placeholder': {
    en: 'Search products...',
    id: 'Cari produk...',
  },
  'home.sort.newest': {
    en: 'Newest',
    id: 'Terbaru',
  },
  'home.sort.price_asc': {
    en: 'Price: Low to High',
    id: 'Harga: Rendah ke Tinggi',
  },
  'home.sort.price_desc': {
    en: 'Price: High to Low',
    id: 'Harga: Tinggi ke Rendah',
  },
  
  // Product
  'product.price': {
    en: 'Price',
    id: 'Harga',
  },
  'product.quantity': {
    en: 'Quantity',
    id: 'Jumlah',
  },
  'product.addToCart': {
    en: 'Add to Cart',
    id: 'Tambah ke Keranjang',
  },
  'product.buyNow': {
    en: 'Buy Now',
    id: 'Beli Sekarang',
  },
  'product.description': {
    en: 'Description',
    id: 'Deskripsi',
  },
  'product.reviews': {
    en: 'Reviews',
    id: 'Ulasan',
  },
  'product.specifications': {
    en: 'Specifications',
    id: 'Spesifikasi',
  },
  
  // Cart
  'cart.title': {
    en: 'Shopping Cart',
    id: 'Keranjang Belanja',
  },
  'cart.empty': {
    en: 'Your cart is empty',
    id: 'Keranjang Anda kosong',
  },
  'cart.checkout': {
    en: 'Checkout',
    id: 'Bayar',
  },
  'cart.continue': {
    en: 'Continue Shopping',
    id: 'Lanjutkan Belanja',
  },
  'cart.total': {
    en: 'Total',
    id: 'Total',
  },
  'cart.remove': {
    en: 'Remove',
    id: 'Hapus',
  },
  
  // Auth
  'auth.login': {
    en: 'Login',
    id: 'Masuk',
  },
  'auth.register': {
    en: 'Register',
    id: 'Daftar',
  },
  'auth.email': {
    en: 'Email',
    id: 'Email',
  },
  'auth.password': {
    en: 'Password',
    id: 'Kata Sandi',
  },
  'auth.confirm': {
    en: 'Confirm Password',
    id: 'Konfirmasi Kata Sandi',
  },
  'auth.forgot': {
    en: 'Forgot Password?',
    id: 'Lupa Kata Sandi?',
  },
  'auth.noAccount': {
    en: "Don't have an account?",
    id: 'Belum punya akun?',
  },
  'auth.haveAccount': {
    en: 'Already have an account?',
    id: 'Sudah punya akun?',
  },
  
  // Sell
  'sell.title': {
    en: 'Sell Your Item',
    id: 'Jual Barang Anda',
  },
  'sell.name': {
    en: 'Product Name',
    id: 'Nama Produk',
  },
  'sell.price': {
    en: 'Price',
    id: 'Harga',
  },
  'sell.category': {
    en: 'Category',
    id: 'Kategori',
  },
  'sell.description': {
    en: 'Description',
    id: 'Deskripsi',
  },
  'sell.images': {
    en: 'Images',
    id: 'Gambar',
  },
  'sell.upload': {
    en: 'Upload',
    id: 'Unggah',
  },
  'sell.success': {
    en: 'Product successfully listed!',
    id: 'Produk berhasil ditambahkan!',
  },
  
  // Footer
  'footer.about': {
    en: 'About Us',
    id: 'Tentang Kami',
  },
  'footer.contact': {
    en: 'Contact Us',
    id: 'Hubungi Kami',
  },
  'footer.faq': {
    en: 'FAQ',
    id: 'FAQ',
  },
  'footer.terms': {
    en: 'Terms of Service',
    id: 'Ketentuan Layanan',
  },
  'footer.privacy': {
    en: 'Privacy Policy',
    id: 'Kebijakan Privasi',
  },
  'footer.copyright': {
    en: '© 2023 Pasar Pahing. All rights reserved.',
    id: '© 2023 Pasar Pahing. Hak cipta dilindungi.',
  },
  
  // Profile
  'profile.title': {
    en: 'My Profile',
    id: 'Profil Saya',
  },
  'profile.orders': {
    en: 'My Orders',
    id: 'Pesanan Saya',
  },
  'profile.listings': {
    en: 'My Listings',
    id: 'Jualan Saya',
  },
  'profile.settings': {
    en: 'Settings',
    id: 'Pengaturan',
  },
  'profile.address': {
    en: 'Address',
    id: 'Alamat',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string) => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found.`);
      return key;
    }
    return translations[key][language] || translations[key]['en'];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
