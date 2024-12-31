import { useRouter } from 'next/router';
import { useState } from 'react';

export default function BookingPage() {
  const router = useRouter();
  const { namaLapangan, harga, fasilitas } = router.query;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [startTime, setStartTime] = useState(''); // Waktu mulai
  const [endTime, setEndTime] = useState(''); // Waktu selesai
  const [date, setDate] = useState('');

  const handleBookingConfirmation = () => {
    if (!name || !phone || !startTime || !endTime || !date) {
      alert('Harap lengkapi semua informasi pemesanan.');
      return;
    }

    if (!/^\d+$/.test(phone)) {
      alert('Nomor telepon harus berupa angka.');
      return;
    }

    if (startTime >= endTime) {
      alert('Jam selesai harus lebih besar dari jam mulai.');
      return;
    }

    router.push({
      pathname: '/payment',
      query: {
        namaPemesan: name,
        nomorTelepon: phone,
        namaLapangan,
        harga,
        waktu: `${startTime} - ${endTime}`, // Gabungkan waktu mulai dan selesai
        tanggal: date,
      },
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Pemesanan Lapangan {namaLapangan}</h1>

      <div>
        <p>Fasilitas: {fasilitas}</p>
        <p>Harga: Rp{harga?.toLocaleString('id-ID')}/jam</p>
      </div>

      <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>
          Nama Pemesan:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan Nama"
            style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
          />
        </label>
        <label>
          Nomor Telepon:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Masukkan Nomor Telepon"
            style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
          />
        </label>
        <label>
          Waktu Mulai:
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
          />
        </label>
        <label>
          Waktu Selesai:
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
          />
        </label>
        <label>
          Tanggal:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
          />
        </label>
      </div>

      <button
        onClick={handleBookingConfirmation}
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
        Lanjut ke Pembayaran
      </button>
    </div>
  );
}
