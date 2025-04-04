
import React from "react";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Returns = () => {
  return (
    <div className="min-h-screen flex flex-col pt-16">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Kebijakan Pengembalian</h1>

        <Card className="p-6 mb-8">
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">Ketentuan Umum Pengembalian</h2>
            <p className="mb-4">
              Pasar Pahing berkomitmen untuk memberikan pengalaman belanja yang memuaskan. Kami menerima pengembalian produk 
              dalam jangka waktu 7 hari kalender setelah produk diterima dengan memenuhi syarat dan ketentuan berikut:
            </p>

            <h3 className="text-lg font-medium mt-6 mb-2">Syarat Pengembalian Produk:</h3>
            <ul className="list-disc pl-5 mb-4">
              <li>Produk dalam kondisi utuh dan belum digunakan</li>
              <li>Kemasan produk masih dalam kondisi baik dan tidak rusak</li>
              <li>Semua label, tag, dan segel masih terpasang dan tidak rusak</li>
              <li>Disertai dengan bukti pembelian (invoice/nota)</li>
              <li>Pengembalian dilaporkan dalam waktu 48 jam setelah produk diterima</li>
            </ul>

            <h3 className="text-lg font-medium mt-6 mb-2">Produk yang Tidak Dapat Dikembalikan:</h3>
            <ul className="list-disc pl-5 mb-4">
              <li>Produk makanan segar dan produk yang mudah rusak</li>
              <li>Produk yang sudah digunakan atau dicoba</li>
              <li>Produk dengan segel yang sudah dibuka atau rusak</li>
              <li>Produk diskon atau obral yang ditandai "tidak dapat dikembalikan"</li>
              <li>Produk custom atau personalisasi</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">Proses Pengembalian</h2>
            <ol className="list-decimal pl-5 mb-4">
              <li className="mb-2">
                <strong>Laporkan Pengembalian</strong>: Hubungi layanan pelanggan kami melalui email cs@pasarpahing.com atau WhatsApp ke nomor +62 812-3456-7890 dalam waktu 48 jam setelah menerima produk.
              </li>
              <li className="mb-2">
                <strong>Pengajuan Bukti</strong>: Lampirkan foto produk yang ingin dikembalikan beserta bukti pembelian.
              </li>
              <li className="mb-2">
                <strong>Verifikasi</strong>: Tim kami akan memverifikasi pengajuan Anda dalam waktu 1-2 hari kerja.
              </li>
              <li className="mb-2">
                <strong>Pengiriman</strong>: Setelah disetujui, Anda akan menerima instruksi untuk mengirimkan produk kembali.
              </li>
              <li className="mb-2">
                <strong>Pemeriksaan</strong>: Setelah produk diterima, tim kami akan memeriksa kondisi produk (1-3 hari kerja).
              </li>
              <li className="mb-2">
                <strong>Pengembalian Dana</strong>: Jika disetujui, dana akan dikembalikan melalui metode pembayaran asli dalam waktu 7-14 hari kerja.
              </li>
            </ol>

            <h2 className="text-xl font-semibold mt-8 mb-4">Biaya Pengembalian</h2>
            <p className="mb-4">
              Untuk pengembalian karena kesalahan pengiriman atau produk cacat, biaya pengiriman akan ditanggung oleh Pasar Pahing. 
              Untuk pengembalian karena alasan lain (perubahan pikiran, salah ukuran, dll), biaya pengiriman akan ditanggung oleh pembeli.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Pengembalian Dana</h2>
            <p className="mb-4">
              Pengembalian dana akan diproses melalui metode pembayaran yang sama dengan transaksi asli:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Transfer Bank: 3-5 hari kerja</li>
              <li>E-wallet: 1-3 hari kerja</li>
              <li>Kartu Kredit/Debit: 7-14 hari kerja (tergantung kebijakan bank)</li>
              <li>Cryptocurrency: 2-5 hari kerja</li>
            </ul>

            <p className="mt-6 text-sm italic">
              Pasar Pahing berhak untuk menolak pengembalian yang tidak sesuai dengan ketentuan yang telah ditetapkan. 
              Kebijakan ini dapat berubah sewaktu-waktu, dan perubahan akan diinformasikan melalui website kami.
            </p>
          </div>
        </Card>
        
        <div className="text-center mt-8">
          <p>Untuk pertanyaan lebih lanjut tentang kebijakan pengembalian, silakan hubungi layanan pelanggan kami.</p>
          <a href="/contact" className="inline-block mt-3 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
            Hubungi Kami
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Returns;
