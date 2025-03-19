import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "id";
type Translations = {
  [key: string]: {
    en: string;
    id: string;
  };
};

const initialTranslations: Translations = {
  // Common
  'common.allRightsReserved': {
    en: 'All rights reserved.',
    id: 'Hak cipta dilindungi.',
  },
  'common.loading': {
    en: 'Loading...',
    id: 'Memuat...',
  },
  'common.signup': {
    en: 'Sign up to join our community',
    id: 'Daftar untuk bergabung dengan komunitas kami',
  },
  'common.login': {
    en: 'Sign in to your account',
    id: 'Masuk ke akun Anda',
  },
  'common.error': {
    en: 'Error',
    id: 'Kesalahan',
  },
  'common.save': {
    en: 'Save Changes',
    id: 'Simpan Perubahan',
  },
  'common.saving': {
    en: 'Saving...',
    id: 'Menyimpan...',
  },
  'common.uploading': {
    en: 'Uploading...',
    id: 'Mengunggah...',
  },

  // Navigation (Header)
  'nav.home': {
    en: 'Home',
    id: 'Beranda',
  },
  'nav.sell': {
    en: 'Sell',
    id: 'Jual',
  },
  'nav.profile': {
    en: 'Profile',
    id: 'Profil',
  },
  'nav.cart': {
    en: 'Cart',
    id: 'Keranjang',
  },
  'nav.admin': {
    en: 'Admin',
    id: 'Admin',
  },
  'nav.login': {
    en: 'Sign In',
    id: 'Masuk',
  },
  'nav.logout': {
    en: 'Sign Out',
    id: 'Keluar',
  },

  // Auth
  'auth.signIn': {
    en: 'Sign In',
    id: 'Masuk',
  },
  'auth.createAccount': {
    en: 'Create Account',
    id: 'Buat Akun',
  },
  'auth.email': {
    en: 'Email',
    id: 'Email',
  },
  'auth.password': {
    en: 'Password',
    id: 'Kata Sandi',
  },
  'auth.firstName': {
    en: 'First Name',
    id: 'Nama Depan',
  },
  'auth.lastName': {
    en: 'Last Name',
    id: 'Nama Belakang',
  },
  'auth.signup': {
    en: 'Sign Up',
    id: 'Daftar',
  },
  'auth.login': {
    en: 'Sign In',
    id: 'Masuk',
  },
  'auth.alreadyHaveAccount': {
    en: 'Already have an account? Sign in',
    id: 'Sudah memiliki akun? Masuk',
  },
  'auth.dontHaveAccount': {
    en: 'Don’t have an account?',
    id: 'Belum memiliki akun?',
  },
  'auth.loggedOut': {
    en: 'Signed out',
    id: 'Keluar',
  },

  // Profile
  'profile.title': {
    en: 'My Profile',
    id: 'Profil Saya',
  },
  'profile.picture': {
    en: 'Profile Picture',
    id: 'Foto Profil',
  },
  'profile.pictureDescription': {
    en: 'Upload a picture to personalize your profile',
    id: 'Unggah foto untuk mempersonalisasi profil Anda',
  },
  'profile.changePicture': {
    en: 'Change Picture',
    id: 'Ubah Foto',
  },
  'profile.pictureUpdated': {
    en: 'Your profile picture has been updated successfully',
    id: 'Foto profil Anda telah berhasil diperbarui',
  },
  'profile.errorUploadingPicture': {
    en: 'There was an error uploading your avatar',
    id: 'Terjadi kesalahan saat mengunggah avatar Anda',
  },
  'profile.personalInfo': {
    en: 'Personal Information',
    id: 'Informasi Pribadi',
  },
  'profile.personalInfoDescription': {
    en: 'Update your personal information and manage your account',
    id: 'Perbarui informasi pribadi Anda dan kelola akun Anda',
  },
  'profile.emailLocked': {
    en: 'Email cannot be changed',
    id: 'Email tidak dapat diubah',
  },
  'profile.errorLoading': {
    en: 'An error occurred while loading your profile',
    id: 'Terjadi kesalahan saat memuat profil Anda',
  },
  'profile.errorUpdating': {
    en: 'An error occurred while updating your profile',
    id: 'Terjadi kesalahan saat memperbarui profil Anda',
  },
  'profile.updated': {
    en: 'Profile updated',
    id: 'Profil diperbarui',
  },
  'profile.updatedDescription': {
    en: 'Your profile has been successfully updated.',
    id: 'Profil Anda telah berhasil diperbarui.',
  },
  'profile.signOutSuccess': {
    en: 'You have been signed out successfully.',
    id: 'Anda telah berhasil keluar.',
  },
  'profile.changePassword': {
    en: 'Change Password',
    id: 'Ubah Kata Sandi',
  },
  'profile.changePasswordDescription': {
    en: 'Update your account password',
    id: 'Perbarui kata sandi akun Anda',
  },
  'profile.newPasswordPlaceholder': {
    en: 'Enter new password',
    id: 'Masukkan kata sandi baru',
  },
  'profile.changePasswordButton': {
    en: 'Change Password',
    id: 'Ubah Kata Sandi',
  },
  'profile.passwordUpdated': {
    en: 'Password updated',
    id: 'Kata sandi diperbarui',
  },
  'profile.passwordUpdatedDescription': {
    en: 'Your password has been successfully updated.',
    id: 'Kata sandi Anda telah berhasil diperbarui.',
  },
  'profile.errorPassword': {
    en: 'An error occurred while updating your password',
    id: 'Terjadi kesalahan saat memperbarui kata sandi Anda',
  },
  'profile.theme': {
    en: 'Theme Preferences',
    id: 'Preferensi Tema',
  },
  'profile.themeDescription': {
    en: 'Customize the appearance of your account',
    id: 'Sesuaikan tampilan akun Anda',
  },
  'profile.darkMode': {
    en: 'Dark Mode',
    id: 'Mode Gelap',
  },
  'profile.darkModeDescription': {
    en: 'Toggle between light and dark mode',
    id: 'Beralih antara mode terang dan gelap',
  },

  // About
  'about.title': {
    en: 'About Us',
    id: 'Tentang Kami',
  },
  'about.description': {
    en: 'Pasar Pahing is a vibrant marketplace connecting buyers and sellers in a seamless, community-driven platform. We aim to empower local commerce and bring value to every transaction.',
    id: 'Pasar Pahing adalah pasar yang dinamis yang menghubungkan pembeli dan penjual dalam platform yang mulus dan didorong oleh komunitas. Kami bertujuan untuk memberdayakan perdagangan lokal dan memberikan nilai pada setiap transaksi.',
  },
  'about.imageAlt': {
    en: 'Our Team at Pasar Pahing',
    id: 'Tim Kami di Pasar Pahing',
  },
  'about.mission': {
    en: 'Our mission is to create an accessible, fair, and sustainable marketplace that supports small businesses and fosters economic growth.',
    id: 'Misi kami adalah menciptakan pasar yang mudah diakses, adil, dan berkelanjutan yang mendukung usaha kecil dan memupuk pertumbuhan ekonomi.',
  },

  // Footer
  'footer.links': {
    en: 'Links',
    id: 'Tautan',
  },
  'footer.about': {
    en: 'About Us',
    id: 'Tentang Kami',
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
    id: 'Ketentuan Layanan',
  },
  'footer.privacy': {
    en: 'Privacy Policy',
    id: 'Kebijakan Privasi',
  },
  'footer.cookies': {
    en: 'Cookie Policy',
    id: 'Kebijakan Cookie',
  },
  'footer.description': {
  en: 'Pasar Pahing is a traditional Indonesian market celebrating local culture and authentic Indonesian products. Experience vibrant trade, heritage crafts, and community spirit in a lively marketplace setting.',
  id: 'Pasar Pahing adalah pasar tradisional Indonesia yang merayakan budaya lokal dan produk autentik Indonesia. Rasakan perdagangan yang semarak, kerajinan warisan, dan semangat komunitas dalam suasana pasar yang hidup.',
},
'footer.quickLinks': {
  en: 'Quick Links',
  id: 'Tautan Cepat',
},
'footer.help': {
  en: 'Help',
  id: 'Bantuan',
},
'footer.developedBy': {
  en: 'developed by',
  id: 'dikembangkan oleh',
},
// Ensure these are already included from previous updates
'nav.sell': {
  en: 'Sell',
  id: 'Jual',
},
'nav.cart': {
  en: 'Cart',
  id: 'Keranjang',
},
'nav.profile': {
  en: 'Profile',
  id: 'Profil',
},
'footer.about': {
  en: 'About Us',
  id: 'Tentang Kami',
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
  id: 'Ketentuan Layanan',
},
'footer.privacy': {
  en: 'Privacy Policy',
  id: 'Kebijakan Privasi',
},
'footer.cookies': {
  en: 'Cookies',
  id: 'Cookie',
},
'about.missionTitle': {
  en: 'Our Mission',
  id: 'Misi Kami',
},
'about.valuesTitle': {
  en: 'Our Values',
  id: 'Nilai Kami',
},
'about.values.community': {
  en: 'Community',
  id: 'Komunitas',
},
'about.values.communityDesc': {
  en: 'We foster a strong community of buyers and sellers, building trust and connection.',
  id: 'Kami membina komunitas yang kuat antara pembeli dan penjual, membangun kepercayaan dan koneksi.',
},
'about.values.authenticity': {
  en: 'Authenticity',
  id: 'Keaslian',
},
'about.values.authenticityDesc': {
  en: 'We celebrate genuine Indonesian products and heritage crafts.',
  id: 'Kami merayakan produk asli Indonesia dan kerajinan warisan.',
},
'about.values.sustainability': {
  en: 'Sustainability',
  id: 'Keberlanjutan',
},
'about.values.sustainabilityDesc': {
  en: 'We promote eco-friendly practices and support sustainable growth.',
  id: 'Kami mempromosikan praktik ramah lingkungan dan mendukung pertumbuhan berkelanjutan.',
},
'about.teamTitle': {
  en: 'Meet Our Team',
  id: 'Temui Tim Kami',
},
'about.team.role1': {
  en: 'Founder & CEO',
  id: 'Pendiri & CEO',
},
'about.team.role2': {
  en: 'Chief Marketing Officer',
  id: 'Kepala Pemasaran',
},
'about.team.role3': {
  en: 'Lead Developer',
  id: 'Pengembang Utama',
},
};

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    const translation = initialTranslations[key];
    return translation ? translation[language] : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};