import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useChatbotContent } from "@/hooks/useChatbotContent";
import { Loader2 } from "lucide-react";

const TermsOfService = () => {
  const { content, loading } = useChatbotContent("terms");

  return (
    <div className="min-h-screen flex flex-col dark:bg-sidebar">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Syarat dan Ketentuan
        </h1>

        <Card className="border border-primary/20 mb-8">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Terakhir diperbarui: 1 April 2025
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                <span className="ml-2 text-muted-foreground">Loading...</span>
              </div>
            ) : content ? (
              <div className="prose max-w-none dark:prose-invert prose-headings:text-primary">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            ) : (
              <div className="prose max-w-none dark:prose-invert">
                <p className="mb-4">
                  Selamat datang di Pasar Pahing! Syarat dan Ketentuan ini mengatur penggunaan platform Pasar Pahing, 
                  termasuk situs web dan aplikasi mobile kami. Dengan mengakses atau menggunakan layanan kami, Anda 
                  menyetujui untuk terikat oleh syarat dan ketentuan ini.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-4">1. Definisi</h2>
                <ul className="list-disc pl-5 mb-4">
                  <li><strong>"Kami", "Kita", "Pasar Pahing"</strong> mengacu pada PT. Pasar Pahing Indonesia dan semua afiliasinya.</li>
                  <li><strong>"Layanan"</strong> mengacu pada situs web dan aplikasi Pasar Pahing, termasuk semua fitur, fungsi, dan konten yang tersedia.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-4">2. Akun Pengguna</h2>
                <p className="mb-4">
                  Untuk menggunakan beberapa fitur Platform kami, Anda mungkin perlu membuat akun. Anda bertanggung jawab untuk:
                </p>
                <ul className="list-disc pl-5 mb-4">
                  <li>Menjaga kerahasiaan kata sandi dan informasi akun Anda.</li>
                  <li>Membatasi akses ke komputer dan perangkat Anda.</li>
                  <li>Semua aktivitas yang terjadi di bawah akun Anda.</li>
                </ul>
                <p className="mb-4">
                  Anda harus berusia minimal 18 tahun atau memiliki persetujuan orang tua/wali untuk menggunakan Layanan kami.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-4">3. Pembelian dan Pembayaran</h2>
                <p className="mb-4">
                  Saat melakukan pembelian di Pasar Pahing, Anda setuju bahwa:
                </p>
                <ul className="list-disc pl-5 mb-4">
                  <li>Informasi yang Anda berikan adalah akurat, lengkap, dan terkini.</li>
                  <li>Anda memiliki hak untuk menggunakan metode pembayaran yang dipilih.</li>
                  <li>Harga produk, biaya pengiriman, dan pajak dapat berubah sewaktu-waktu.</li>
                  <li>Kami berhak menolak atau membatalkan pesanan karena alasan tertentu, termasuk kesalahan harga atau ketersediaan stok.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-4">4. Pembayaran dengan Cryptocurrency</h2>
                <p className="mb-4">
                  Untuk pembayaran dengan cryptocurrency:
                </p>
                <ul className="list-disc pl-5 mb-4">
                  <li>Jumlah yang dibayarkan harus sesuai dengan nilai yang ditampilkan pada halaman pembayaran.</li>
                  <li>Transaksi cryptocurrency tidak dapat dibatalkan atau dikembalikan setelah dikonfirmasi di blockchain.</li>
                  <li>Nilai tukar cryptocurrency yang digunakan adalah nilai pada saat transaksi diproses.</li>
                  <li>Anda bertanggung jawab atas segala biaya transaksi blockchain.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-4">5. Kebijakan Pengiriman</h2>
                <p className="mb-4">
                  Produk akan dikirim sesuai dengan alamat yang Anda berikan. Waktu pengiriman yang ditampilkan adalah perkiraan dan dapat 
                  bervariasi. Risiko kerusakan dan kehilangan barang beralih kepada Anda setelah paket diterima oleh Anda atau penerima yang ditunjuk.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-4">6. Kebijakan Pengembalian</h2>
                <p className="mb-4">
                  Kebijakan Pengembalian kami diuraikan secara terpisah dan menjadi bagian dari Syarat dan Ketentuan ini. 
                  Silakan merujuk ke <a href="/returns" className="text-primary hover:underline">Kebijakan Pengembalian</a> kami untuk informasi lebih lanjut.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-4">7. Hak Kekayaan Intelektual</h2>
                <p className="mb-4">
                  Semua konten yang merupakan bagian dari Layanan, termasuk tetapi tidak terbatas pada desain, teks, grafik, logo, ikon, gambar, 
                  klip audio, unduhan digital, kompilasi data, dan perangkat lunak, adalah milik Pasar Pahing atau pemberi lisensinya dan 
                  dilindungi oleh hukum hak cipta Indonesia dan internasional.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-4">8. Konten Pengguna</h2>
                <p className="mb-4">
                  Dengan mengirimkan konten ke platform kami (seperti ulasan, gambar, atau komentar), Anda memberikan kepada Pasar Pahing 
                  hak non-eksklusif, bebas royalti, abadi, dan dapat disublisensikan untuk menggunakan, mereproduksi, memodifikasi, menyesuaikan, 
                  mempublikasikan, menerjemahkan, mendistribusikan, dan menampilkan konten tersebut di seluruh dunia di media apa pun.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-4">9. Penafian Garansi</h2>
                <p className="mb-4">
                  Layanan disediakan "sebagaimana adanya" dan "sebagaimana tersedia" tanpa jaminan apa pun, baik tersurat maupun tersirat. 
                  Kami tidak menjamin bahwa Layanan akan memenuhi kebutuhan Anda, tidak terganggu, tepat waktu, aman, atau bebas dari kesalahan.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-4">10. Batasan Tanggung Jawab</h2>
                <p className="mb-4">
                  Pasar Pahing tidak akan bertanggung jawab atas kerugian tidak langsung, insidental, khusus, atau konsekuensial yang timbul 
                  dari atau terkait dengan penggunaan atau ketidakmampuan menggunakan Layanan.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-4">11. Ganti Rugi</h2>
                <p className="mb-4">
                  Anda setuju untuk mengganti rugi, membela, dan membebaskan Pasar Pahing dan afiliasinya, pejabat, direktur, karyawan, dan agennya 
                  dari dan terhadap klaim, kewajiban, kerusakan, kerugian, dan biaya yang timbul dari penggunaan Layanan oleh Anda atau pelanggaran 
                  Syarat dan Ketentuan ini.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-4">12. Perubahan pada Syarat dan Ketentuan</h2>
                <p className="mb-4">
                  Kami berhak untuk memodifikasi atau mengganti Syarat dan Ketentuan ini kapan saja. Perubahan akan efektif setelah diposting 
                  di platform. Penggunaan berkelanjutan atas Layanan setelah perubahan tersebut merupakan persetujuan Anda terhadap perubahan tersebut.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-4">13. Hukum yang Berlaku</h2>
                <p className="mb-4">
                  Syarat dan Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. Setiap perselisihan yang 
                  timbul dari atau terkait dengan Syarat dan Ketentuan ini akan diselesaikan secara eksklusif oleh pengadilan yang kompeten di Jakarta.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-4">14. Pemisahan</h2>
                <p className="mb-4">
                  Jika ada ketentuan dari Syarat dan Ketentuan ini dianggap tidak sah, ilegal, atau tidak dapat diberlakukan, ketentuan tersebut 
                  akan dipisahkan dari Syarat dan Ketentuan yang tersisa, yang akan tetap berlaku dan dapat diberlakukan.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-4">15. Hubungi Kami</h2>
                <p className="mb-4">
                  Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami di:
                </p>
                <p>
                  Email: legal@pasarpahing.com<br />
                  Telepon: +62 812-3456-7890<br />
                  Alamat: Jl. Pasar Tradisional No. 123, Jakarta 12345, Indonesia
                </p>

                <p className="mt-6 text-sm italic">
                  Dengan mengakses atau menggunakan layanan Pasar Pahing, Anda mengakui bahwa Anda telah membaca, memahami, dan 
                  menyetujui untuk terikat oleh Syarat dan Ketentuan ini.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
