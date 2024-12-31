import { useRouter } from 'next/router';
import { useState } from 'react';

export default function MainPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState({
    1: 0,
    2: 0,
  });

  const goToBookingPage = (lapangan) => {
    router.push({
      pathname: '/booking',
      query: {
        namaLapangan: lapangan.nama,
        harga: lapangan.harga,
        fasilitas: lapangan.fasilitas,
      },
    });
  };

  const daftarLapangan = [
    {
      id: 1,
      nama: 'All Play Mini Soccer',
      harga: 500000,
      fasilitas: 'Rumput sintetis Grade A, dengan ukuran lapangan 33m x 50m, Tersedia bench pemain cadangan, dan tribune penonton .'
              ,
      gambar: ['/Lapangan mini soccer B.jpg', '/Lapangan mini soccer B1.jpg', '/Lapangan mini soccer B2.jpg', '/Lapangan mini soccer B3.jpg', '/Lapangan mini soccer B4.jpg'],
    },
    {
      id: 2,
      nama: 'Graha Laras Mini Soccer',
      harga: 400000,
      fasilitas: 'rumput sintetis, dengan ukuran lapangan 40m x 20m, Dan tribun penonton.',    
      gambar: ['/Lapangan mini soccer A.jpg', '/Lapangan mini soccer A2.jpg', '/Lapangan mini soccer A3.jpg'],
    },
  ];

  const nextSlide = (lapanganId) => {
    setCurrentIndex((prevState) => ({
      ...prevState,
      [lapanganId]: (prevState[lapanganId] + 1) % daftarLapangan.find((l) => l.id === lapanganId).gambar.length,
    }));
  };

  const prevSlide = (lapanganId) => {
    setCurrentIndex((prevState) => ({
      ...prevState,
      [lapanganId]:
        (prevState[lapanganId] - 1 + daftarLapangan.find((l) => l.id === lapanganId).gambar.length) %
        daftarLapangan.find((l) => l.id === lapanganId).gambar.length,
    }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <header>
        <h1 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Daftar Lapangan</h1>
      </header>
      <main
        style={{
          display: 'flex',
          gap: '20px',
          overflowX: 'auto',
          padding: '10px',
          flexWrap: 'nowrap',
        }}
      >
        {daftarLapangan.map((lapangan) => (
          <div
            key={lapangan.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              width: '800px', // Lebar container diperkecil sedikit
              minHeight: '650px', // Tinggi minimum container juga diperkecil
              textAlign: 'center',
              flex: '0 0 auto',
              backgroundColor: '#fff',
            }}
          >
            {/* Gambar dengan fitur slide */}
            <div style={{ position: 'relative', height: '600px', overflow: 'hidden' }}> {/* Tinggi div gambar diperkecil */}
              <img
                src={lapangan.gambar[currentIndex[lapangan.id]]}
                alt={lapangan.nama}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  imageRendering: 'auto',
                }}
              />
              <button
                onClick={() => prevSlide(lapangan.id)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '10px',
                  transform: 'translateY(-50%)',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  padding: '10px', // Ukuran tombol diperkecil sedikit
                  cursor: 'pointer',
                }}
              >
                &#8249;
              </button>
              <button
                onClick={() => nextSlide(lapangan.id)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  padding: '10px', // Ukuran tombol diperkecil sedikit
                  cursor: 'pointer',
                }}
              >
                &#8250;
              </button>
            </div>

            <h2 style={{ margin: '20px 0' }}>{lapangan.nama}</h2>
            <p>Harga: Rp{lapangan.harga.toLocaleString('id-ID')}/jam</p>
            <p>Fasilitas: {lapangan.fasilitas}</p>
            <button
              onClick={() => goToBookingPage(lapangan)}
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Booking Sekarang
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
