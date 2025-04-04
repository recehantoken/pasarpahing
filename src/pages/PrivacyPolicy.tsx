
import React from "react";
import { Card } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Kebijakan Privasi</h1>

      <Card className="p-6 mb-8">
        <div className="prose max-w-none">
          <p className="mb-4">
            Terakhir diperbarui: 1 April 2025
          </p>
          
          <h2 className="text-xl font-semibold mb-4">Pendahuluan</h2>
          <p className="mb-4">
            Pasar Pahing menghargai privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, 
            mengungkapkan, dan melindungi informasi pribadi Anda saat Anda menggunakan layanan kami melalui website, aplikasi 
            mobile, dan platform terkait lainnya.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">Informasi yang Kami Kumpulkan</h2>
          <h3 className="text-lg font-medium mt-4 mb-2">Informasi Pribadi</h3>
          <p className="mb-2">
            Saat Anda membuat akun di Pasar Pahing, kami mengumpulkan:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Nama lengkap</li>
            <li>Alamat email</li>
            <li>Nomor telepon</li>
            <li>Alamat pengiriman dan penagihan</li>
            <li>Detail pembayaran (yang diproses secara aman melalui penyedia layanan pembayaran pihak ketiga)</li>
          </ul>

          <h3 className="text-lg font-medium mt-4 mb-2">Informasi Penggunaan</h3>
          <p className="mb-2">
            Kami juga mengumpulkan informasi tentang bagaimana Anda berinteraksi dengan platform kami, termasuk:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Produk yang Anda lihat dan beli</li>
            <li>Waktu dan durasi kunjungan Anda</li>
            <li>Perangkat dan browser yang Anda gunakan</li>
            <li>Alamat IP dan data lokasi umum</li>
            <li>Informasi referral dan data analitik tentang bagaimana Anda menggunakan platform kami</li>
          </ul>

          <h3 className="text-lg font-medium mt-4 mb-2">Informasi Dompet Kripto (Jika Berlaku)</h3>
          <p className="mb-4">
            Jika Anda memilih untuk menggunakan pembayaran kripto, kami dapat mengumpulkan alamat dompet kripto publik Anda 
            untuk keperluan verifikasi transaksi.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">Bagaimana Kami Menggunakan Informasi Anda</h2>
          <p className="mb-2">
            Kami menggunakan informasi yang dikumpulkan untuk:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Memproses pesanan dan transaksi Anda</li>
            <li>Mengirimkan konfirmasi pesanan dan pembaruan status</li>
            <li>Menyediakan layanan pelanggan dan dukungan teknis</li>
            <li>Mempersonalisasi pengalaman belanja Anda</li>
            <li>Mengirimkan informasi tentang produk, layanan, dan promosi yang mungkin menarik bagi Anda (dengan izin Anda)</li>
            <li>Meningkatkan produk, layanan, dan fungsionalitas platform kami</li>
            <li>Mencegah aktivitas penipuan dan meningkatkan keamanan</li>
            <li>Mematuhi kewajiban hukum</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">Berbagi Informasi</h2>
          <p className="mb-4">
            Kami dapat berbagi informasi Anda dengan:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Penjual di platform kami untuk memfasilitasi transaksi dan pengiriman</li>
            <li>Mitra logistik dan pengiriman</li>
            <li>Penyedia layanan pembayaran untuk memproses transaksi</li>
            <li>Penyedia layanan analitik dan pemasaran yang membantu kami meningkatkan layanan</li>
            <li>Otoritas hukum jika diwajibkan oleh hukum atau untuk melindungi hak-hak kami</li>
          </ul>

          <p className="mb-4">
            Kami tidak akan menjual informasi pribadi Anda kepada pihak ketiga untuk tujuan pemasaran tanpa persetujuan eksplisit dari Anda.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">Keamanan Data</h2>
          <p className="mb-4">
            Pasar Pahing mengimplementasikan langkah-langkah keamanan teknis, administratif, dan fisik untuk melindungi informasi pribadi Anda. 
            Namun, tidak ada metode transmisi internet atau penyimpanan elektronik yang 100% aman. Oleh karena itu, kami tidak dapat menjamin 
            keamanan absolut.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">Hak Privasi Anda</h2>
          <p className="mb-2">
            Anda memiliki hak untuk:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Mengakses informasi pribadi yang kami miliki tentang Anda</li>
            <li>Meminta koreksi informasi yang tidak akurat</li>
            <li>Meminta penghapusan data Anda (dengan batasan tertentu)</li>
            <li>Membatasi atau keberatan terhadap pengolahan data Anda</li>
            <li>Meminta data Anda dalam format yang dapat dibaca mesin</li>
            <li>Menarik persetujuan pemasaran kapan saja</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">Penyimpanan Data</h2>
          <p className="mb-4">
            Kami menyimpan informasi pribadi Anda selama dibutuhkan untuk menyediakan layanan yang Anda minta 
            dan untuk tujuan bisnis yang sah lainnya, seperti memelihara catatan keuangan, menyelesaikan sengketa, 
            dan mematuhi kewajiban hukum.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">Perubahan pada Kebijakan Privasi</h2>
          <p className="mb-4">
            Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan perubahan pada praktik 
            kami atau alasan lain. Kami akan memberi tahu Anda tentang perubahan apa pun dengan memposting kebijakan baru 
            di platform kami dan memperbarui tanggal "terakhir diperbarui".
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">Hubungi Kami</h2>
          <p className="mb-4">
            Jika Anda memiliki pertanyaan atau kekhawatiran tentang Kebijakan Privasi kami atau praktik penggunaan data kami, 
            silakan hubungi kami di:
          </p>
          <p className="mb-4">
            Email: privacy@pasarpahing.com<br />
            Telepon: +62 812-3456-7890<br />
            Alamat: Jl. Pasar Tradisional No. 123, Jakarta 12345, Indonesia
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
