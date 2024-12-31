import { useRouter } from 'next/router';

export default function ConfirmationPage() {
  const router = useRouter();
  const { namaPemesan, nomorTelepon, namaLapangan, harga, waktu, tanggal, paymentStatus } = router.query;

  // Fungsi untuk menuju halaman status pemesanan
  const goToStatusPage = () => {
    router.push({
      pathname: '/status',
      query: {
        namaPemesan,
        nomorTelepon,
        namaLapangan,
        harga,
        waktu,
        tanggal,
        paymentStatus,
      },
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Konfirmasi Pembayaran</h1>
      <p>Pembayaran Anda berhasil diproses. Terima kasih telah menggunakan layanan kami!</p>
      <button
        onClick={goToStatusPage}
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Lihat Status Pemesanan
      </button>
    </div>
  );
}
