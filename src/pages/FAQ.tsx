
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col pt-16">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Pertanyaan yang Sering Diajukan</h1>
        
        <Card className="p-6 mb-10">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium">Apa itu Pasar Pahing?</AccordionTrigger>
              <AccordionContent className="text-base">
                Pasar Pahing adalah platform digital yang menghubungkan pedagang pasar tradisional dengan pelanggan secara online. 
                Kami bertujuan untuk melestarikan warisan budaya pasar tradisional Indonesia sambil memberikan kemudahan akses bagi konsumen modern.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium">Bagaimana cara membuat akun di Pasar Pahing?</AccordionTrigger>
              <AccordionContent className="text-base">
                Klik tombol "Masuk/Daftar" di sudut kanan atas halaman. Anda bisa mendaftar menggunakan email atau akun Google Anda. 
                Setelah memverifikasi email, akun Anda akan aktif dan siap digunakan untuk berbelanja.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium">Bagaimana cara memesan produk?</AccordionTrigger>
              <AccordionContent className="text-base">
                Pilih produk yang ingin Anda beli, tambahkan ke keranjang, lalu klik "Checkout" untuk menyelesaikan pembelian. 
                Anda akan diminta untuk memasukkan alamat pengiriman dan memilih metode pembayaran yang tersedia.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-medium">Metode pembayaran apa saja yang tersedia?</AccordionTrigger>
              <AccordionContent className="text-base">
                Kami menerima berbagai metode pembayaran termasuk transfer bank, e-wallet (GoPay, OVO, DANA, LinkAja), 
                kartu kredit/debit, dan mata uang kripto (Bitcoin, Ethereum, USDT).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-medium">Bagaimana cara melakukan pembayaran dengan mata uang kripto?</AccordionTrigger>
              <AccordionContent className="text-base">
                Pada halaman pembayaran, pilih opsi "Bayar dengan Crypto". Anda akan diarahkan ke halaman dengan alamat wallet tujuan. 
                Gunakan dompet kripto Anda (seperti MetaMask) untuk mengirim pembayaran ke alamat yang tertera. Sistem kami akan memverifikasi 
                transaksi dan memproses pesanan Anda setelah pembayaran dikonfirmasi.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-lg font-medium">Berapa lama waktu pengiriman?</AccordionTrigger>
              <AccordionContent className="text-base">
                Waktu pengiriman bervariasi tergantung lokasi Anda:
                <ul className="list-disc pl-5 mt-2">
                  <li>Area Jabodetabek: 1-2 hari kerja</li>
                  <li>Pulau Jawa: 2-4 hari kerja</li>
                  <li>Luar Pulau Jawa: 4-7 hari kerja</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-lg font-medium">Bagaimana jika saya ingin mengembalikan produk?</AccordionTrigger>
              <AccordionContent className="text-base">
                Kami menerima pengembalian dalam waktu 7 hari setelah produk diterima dengan syarat dan ketentuan tertentu. 
                Silakan kunjungi halaman <a href="/returns" className="text-primary hover:underline">Kebijakan Pengembalian</a> untuk informasi lengkap.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-lg font-medium">Bagaimana cara menjadi pedagang di Pasar Pahing?</AccordionTrigger>
              <AccordionContent className="text-base">
                Pedagang yang ingin bergabung dapat mengisi formulir pendaftaran di halaman "Jual di Pasar Pahing". 
                Tim kami akan meninjau aplikasi Anda dan menghubungi untuk proses verifikasi. Kami menyediakan pelatihan dan 
                dukungan untuk membantu pedagang tradisional beradaptasi dengan platform digital kami.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger className="text-lg font-medium">Apakah Pasar Pahing tersedia di seluruh Indonesia?</AccordionTrigger>
              <AccordionContent className="text-base">
                Ya, Pasar Pahing melayani pengiriman ke seluruh wilayah Indonesia. Namun, beberapa produk segar mungkin 
                hanya tersedia untuk area tertentu untuk menjaga kualitas produk saat tiba di tujuan.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger className="text-lg font-medium">Bagaimana cara menghubungi layanan pelanggan?</AccordionTrigger>
              <AccordionContent className="text-base">
                Anda dapat menghubungi tim layanan pelanggan kami melalui:
                <ul className="list-disc pl-5 mt-2">
                  <li>Email: cs@pasarpahing.com</li>
                  <li>WhatsApp: +62 812-3456-7890</li>
                  <li>Live Chat: Tersedia di website dari pukul 08.00-20.00 WIB</li>
                </ul>
                Atau kunjungi halaman <a href="/contact" className="text-primary hover:underline">Hubungi Kami</a> untuk informasi lebih lanjut.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
