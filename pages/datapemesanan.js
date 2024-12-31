import { useState, useEffect } from 'react';

export default function DataPemesanan() {
  const [dataPemesanan, setDataPemesanan] = useState([]);

  useEffect(() => {
    // Fetch data dari API
    fetch('/api/booking')
      .then((response) => response.json())
      .then((data) => setDataPemesanan(data.bookings))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-4">
        Data Pemesanan Lapangan
      </h1>

      {dataPemesanan.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada data pemesanan.</p>
      ) : (
        <table className="min-w-full border-collapse bg-white shadow-md">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">Nama Pemesan</th>
              <th className="border px-4 py-2 text-left">Lapangan</th>
              <th className="border px-4 py-2 text-left">Tanggal</th>
              <th className="border px-4 py-2 text-left">Waktu</th>
              <th className="border px-4 py-2 text-left">Pembayaran</th>
            </tr>
          </thead>
          <tbody>
            {dataPemesanan.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.namaPemesan}</td>
                <td className="border px-4 py-2">{item.namaLapangan}</td>
                <td className="border px-4 py-2">{item.tanggal}</td>
                <td className="border px-4 py-2">{item.waktu}</td>
                <td className="border px-4 py-2">
                  {item.paymentStatus === 'Completed'
                    ? 'Lunas'
                    : 'Tertunda'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
