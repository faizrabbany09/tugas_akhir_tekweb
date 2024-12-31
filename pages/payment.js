import { useRouter } from 'next/router';
import { useState } from 'react';

export default function PaymentPage() {
  const router = useRouter();
  const { namaPemesan, nomorTelepon, namaLapangan, harga, waktu, tanggal } = router.query; // Menambahkan nomor telepon dari query

  const [paymentMethod, setPaymentMethod] = useState(null); // Menyimpan metode pembayaran
  const [selectedBank, setSelectedBank] = useState(null); // Menyimpan bank yang dipilih

  // Fungsi untuk menangani konfirmasi pembayaran
  const handlePaymentCompletion = () => {
    if (paymentMethod === 'Cash') {
      alert(`Pembayaran menggunakan ${paymentMethod} berhasil!`);
      router.push({
        pathname: '/confirmation',
        query: {
          namaPemesan,
          nomorTelepon, // Sertakan nomor telepon di query
          namaLapangan,
          harga,
          waktu,
          tanggal,
          paymentStatus: 'Pending', // Pembayaran Cash dianggap tertunda
          paymentMethod: 'Cash',
        }, // Kirim metode pembayaran Cash
      }); // Arahkan ke halaman konfirmasi setelah pembayaran selesai
    } else if (paymentMethod === 'Virtual Account' && selectedBank) {
      alert(`Pembayaran menggunakan Virtual Account ${selectedBank} berhasil!`);
      router.push({
        pathname: '/confirmation',
        query: {
          namaPemesan,
          nomorTelepon, // Sertakan nomor telepon di query
          namaLapangan,
          harga,
          waktu,
          tanggal,
          paymentStatus: 'Completed', // Pembayaran berhasil
          paymentMethod: 'Virtual Account',
          selectedBank, // Menyertakan nama bank yang dipilih
        }, // Kirim metode pembayaran dan bank yang dipilih
      }); // Arahkan ke halaman konfirmasi setelah pembayaran selesai
    } else {
      alert('Pilih bank untuk pembayaran Virtual Account!');
    }
  };

  // Fungsi untuk menangani pemilihan bank
  const handleBankSelection = (bankCode) => {
    let bankName = '';
    switch (bankCode) {
      case 'A':
        bankName = 'Bank Mandiri';
        break;
      case 'B':
        bankName = 'Bank BCA';
        break;
      case 'C':
        bankName = 'Bank BRI';
        break;
      default:
        bankName = '';
    }
    setSelectedBank(bankName); // Set bank yang dipilih
  };

  // Menampilkan pilihan bank untuk mengganti
  const toggleBankSelection = () => {
    setSelectedBank(null); // Reset bank yang dipilih
    setPaymentMethod('Virtual Account'); // Menyediakan opsi memilih bank lagi
  };

  if (!namaPemesan || !nomorTelepon || !namaLapangan || !harga || !waktu || !tanggal) {
    return <p>Data pemesanan tidak tersedia. Silakan kembali ke halaman sebelumnya.</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Halaman Pembayaran</h1>
      <div>
        <p><strong>Nama Pemesan:</strong> {namaPemesan}</p>
        <p><strong>Nomor Telepon:</strong> {nomorTelepon}</p> {/* Tampilkan nomor telepon */}
        <p><strong>Lapangan:</strong> {namaLapangan}</p>
        <p><strong>Harga:</strong> Rp{Number(harga).toLocaleString('id-ID')}</p>
        <p><strong>Waktu:</strong> {waktu}</p>
        <p><strong>Tanggal:</strong> {tanggal}</p>
      </div>

      <h2>Pilih Metode Pembayaran</h2>
      <button
        onClick={() => setPaymentMethod('Cash')}
        style={{
          marginRight: '10px',
          backgroundColor: '#28a745',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Cash
      </button>
      <button
        onClick={() => setPaymentMethod('Virtual Account')}
        style={{
          backgroundColor: '#17a2b8',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Virtual Account
      </button>

      {/* Menampilkan pilihan bank jika Virtual Account dipilih */}
      {paymentMethod === 'Virtual Account' && !selectedBank && (
        <div style={{ marginTop: '20px' }}>
          <h3>Pilih Bank untuk Pembayaran Virtual Account</h3>
          <button
            onClick={() => handleBankSelection('A')}
            style={{ marginRight: '10px' }}
          >
            Bank Mandiri
          </button>
          <button
            onClick={() => handleBankSelection('B')}
            style={{ marginRight: '10px' }}
          >
            Bank BCA
          </button>
          <button
            onClick={() => handleBankSelection('C')}
            style={{ marginRight: '10px' }}
          >
            Bank BRI
          </button>
        </div>
      )}

      {/* Jika bank sudah dipilih, tampilkan nama bank yang dipilih */}
      {selectedBank && (
        <div style={{ marginTop: '20px' }}>
          <p>Bank yang dipilih: {selectedBank}</p>
          <button
            onClick={toggleBankSelection} // Tombol untuk mengganti bank
            style={{
              backgroundColor: '#ffc107',
              color: '#000',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            Ganti Bank
          </button>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handlePaymentCompletion}
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Konfirmasi Pembayaran
        </button>
      </div>
    </div>
  );
}
