
import React from "react";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen flex flex-col pt-16">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Kebijakan Cookie</h1>

        <Card className="p-6 mb-8">
          <div className="prose max-w-none">
            <p className="mb-4">
              Terakhir diperbarui: 1 April 2025
            </p>
            
            <h2 className="text-xl font-semibold mb-4">Apa Itu Cookie?</h2>
            <p className="mb-4">
              Cookie adalah file teks kecil yang disimpan di perangkat Anda (komputer, tablet, atau ponsel) ketika Anda mengunjungi 
              situs web. Cookie digunakan secara luas untuk membuat situs web berfungsi dengan lebih efisien dan memberikan 
              informasi kepada pemilik situs.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">Bagaimana Kami Menggunakan Cookie</h2>
            <p className="mb-4">
              Pasar Pahing menggunakan cookie untuk berbagai tujuan, termasuk:
            </p>

            <h3 className="text-lg font-medium mt-4 mb-2">Cookie yang Diperlukan</h3>
            <p className="mb-4">
              Cookie ini diperlukan agar situs web berfungsi dengan baik. Termasuk cookie yang memungkinkan Anda masuk ke area aman 
              situs web, menggunakan keranjang belanja, atau menggunakan layanan e-billing. Anda tidak dapat menonaktifkan cookie ini.
            </p>

            <h3 className="text-lg font-medium mt-4 mb-2">Cookie Preferensi</h3>
            <p className="mb-4">
              Cookie ini memungkinkan situs web mengingat pilihan yang telah Anda buat saat menjelajahi situs, seperti bahasa 
              pilihan Anda, mata uang yang Anda pilih, atau wilayah Anda berada. Cookie ini bertujuan untuk memberikan pengalaman 
              yang lebih personal.
            </p>

            <h3 className="text-lg font-medium mt-4 mb-2">Cookie Analitik</h3>
            <p className="mb-4">
              Cookie ini membantu kami memahami bagaimana pengunjung berinteraksi dengan situs web dengan mengumpulkan dan melaporkan 
              informasi secara anonim. Cookie ini membantu kami meningkatkan cara kerja situs web.
            </p>

            <h3 className="text-lg font-medium mt-4 mb-2">Cookie Pemasaran</h3>
            <p className="mb-4">
              Cookie ini digunakan untuk melacak pengunjung di berbagai situs web. Tujuannya adalah untuk menampilkan iklan yang 
              relevan dan menarik bagi pengguna individual. Cookie ini juga membantu mengukur efektivitas kampanye iklan.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">Cookie Pihak Ketiga</h2>
            <p className="mb-4">
              Selain cookie kami sendiri, kami juga menggunakan berbagai cookie pihak ketiga untuk melaporkan statistik penggunaan, 
              menyediakan iklan di dan melalui situs web, dan sebagainya. Berikut adalah beberapa pihak ketiga yang cookie-nya 
              mungkin kami gunakan:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Google Analytics</li>
              <li>Google Ads</li>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
              <li>LinkedIn</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-4">Mengelola Cookie</h2>
            <p className="mb-4">
              Kebanyakan browser web memungkinkan Anda mengendalikan cookie melalui pengaturan browser mereka. Namun, jika Anda 
              membatasi kemampuan situs web untuk menempatkan cookie, Anda mungkin akan mengurangi fungsionalitas keseluruhan 
              dan pengalaman pengguna Anda.
            </p>

            <p className="mb-4">
              Untuk mempelajari lebih lanjut tentang cara mengelola cookie di browser web Anda, kunjungi:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Google Chrome: <a href="https://support.google.com/chrome/answer/95647" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://support.google.com/chrome/answer/95647</a></li>
              <li>Mozilla Firefox: <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://support.mozilla.org/kb/cookies</a></li>
              <li>Safari: <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://support.apple.com/guide/safari/manage-cookies</a></li>
              <li>Microsoft Edge: <a href="https://support.microsoft.com/en-us/help/4468242/microsoft-edge-browsing-data-and-privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://support.microsoft.com/edge</a></li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-4">Perubahan pada Kebijakan Cookie</h2>
            <p className="mb-4">
              Kami dapat memperbarui Kebijakan Cookie ini dari waktu ke waktu untuk mencerminkan perubahan pada teknologi, 
              peraturan, atau praktik bisnis kami. Jika kami melakukan perubahan, kami akan memperbarui tanggal "terakhir 
              diperbarui" di bagian atas kebijakan ini.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">Hubungi Kami</h2>
            <p className="mb-4">
              Jika Anda memiliki pertanyaan tentang penggunaan cookie kami, silakan hubungi kami di:
            </p>
            <p className="mb-4">
              Email: privacy@pasarpahing.com<br />
              Telepon: +62 812-3456-7890
            </p>

            <p className="mt-6 text-sm italic">
              Dengan terus menggunakan situs web kami tanpa mengubah pengaturan cookie Anda, Anda menyetujui penggunaan cookie kami 
              sesuai dengan Kebijakan Cookie ini.
            </p>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
