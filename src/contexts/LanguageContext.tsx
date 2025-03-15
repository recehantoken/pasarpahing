
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
  t: (key: string) => string;
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

  // Translation function
  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
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
