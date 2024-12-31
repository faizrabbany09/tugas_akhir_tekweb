import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function StatusPage() {
  const router = useRouter();
  const {
    namaPemesan,
    nomorTelepon,
    namaLapangan,
    harga,
    waktu,
    tanggal,
    paymentStatus,
  } = router.query;

  // Fungsi untuk menyimpan data ke database
  useEffect(() => {
    if (namaPemesan && nomorTelepon) {
      fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          namaPemesan,
          nomorTelepon,
          namaLapangan,
          harga,
          waktu,
          tanggal,
          paymentStatus,
        }),
      }).catch((error) => console.error('Error saving booking:', error));
    }
  }, [namaPemesan, nomorTelepon]);

  // Fungsi untuk kembali ke halaman utama
  const handleBackToHome = () => {
    router.push('/'); // Sesuaikan path halaman utama sesuai kebutuhan
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Status Pemesanan</h1>
      <div>
        <p><strong>Nama Pemesan:</strong> {namaPemesan}</p>
        <p><strong>Nomor Telepon:</strong> {nomorTelepon}</p>
        <p><strong>Lapangan:</strong> {namaLapangan}</p>
        <p><strong>Harga:</strong> Rp{Number(harga).toLocaleString('id-ID')}/jam</p>
        <p><strong>Tanggal Main:</strong> {tanggal}</p>
        <p><strong>Jam:</strong> {waktu}</p>
        <p><strong>Status Pembayaran:</strong> {paymentStatus === 'Completed' ? 'Pembayaran Lunas' : 'Pembayaran Tertunda'}</p>
      </div>

      {/* Tombol Kembali ke Halaman Utama */}
      <button
        onClick={handleBackToHome}
        style={{
          marginTop: '20px',
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Kembali ke halaman utama
      </button>
    </div>
  );
}
