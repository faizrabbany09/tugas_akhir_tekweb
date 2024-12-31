import fs from 'fs';
import path from 'path';

// Path ke file JSON
const databasePath = path.join(process.cwd(), 'database', 'bookings.json');

// Fungsi untuk membaca database
const readDatabase = () => {
  const fileContent = fs.readFileSync(databasePath, 'utf-8');
  return JSON.parse(fileContent);
};

// Fungsi untuk menulis ke database
const writeDatabase = (data) => {
  fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
};

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Ambil semua data pemesanan
    const data = readDatabase();

    // Filter data jika ada query parameters
    const { namaPemesan } = req.query;

    if (namaPemesan) {
      const filteredData = data.bookings.filter((b) => b.name === namaPemesan);
      if (filteredData.length === 0) {
        res.status(404).json({ message: 'Data pemesanan tidak ditemukan untuk nama ini!' });
        return;
      }
      res.status(200).json(filteredData);
    } else {
      res.status(200).json(data);
    }
  } else if (req.method === 'POST') {
    // Tambahkan pemesanan baru
    const { id, name, field, startTime, endTime, paymentMethod, paymentStatus } = req.body;

    if (!name || !field || !startTime || !endTime || !paymentMethod || !paymentStatus) {
      res.status(400).json({ message: 'Semua data wajib diisi!' });
      return;
    }

    const data = readDatabase();
    data.bookings.push({ id, name, field, startTime, endTime, paymentMethod, paymentStatus });
    writeDatabase(data);

    res.status(201).json({ message: 'Pemesanan berhasil ditambahkan!' });
  } else if (req.method === 'PATCH') {
    // Perbarui status pembayaran
    const { namaPemesan, paymentStatus } = req.body;

    const data = readDatabase();
    const bookingIndex = data.bookings.findIndex((b) => b.name === namaPemesan);

    if (bookingIndex === -1) {
      res.status(404).json({ message: 'Pemesanan tidak ditemukan!' });
      return;
    }

    // Perbarui status pembayaran
    data.bookings[bookingIndex].paymentStatus = paymentStatus;
    writeDatabase(data);

    res.status(200).json({ message: 'Status pemesanan berhasil diperbarui!', updatedBooking: data.bookings[bookingIndex] });
  } else if (req.method === 'DELETE') {
    // Hapus pemesanan berdasarkan ID
    const { id } = req.body;

    const data = readDatabase();
    const newBookings = data.bookings.filter((b) => b.id !== id);

    if (data.bookings.length === newBookings.length) {
      res.status(404).json({ message: 'Pemesanan tidak ditemukan!' });
      return;
    }

    writeDatabase({ bookings: newBookings });
    res.status(200).json({ message: 'Pemesanan berhasil dihapus!' });
  } else {
    res.status(405).json({ message: 'Metode tidak diizinkan!' });
  }
}
