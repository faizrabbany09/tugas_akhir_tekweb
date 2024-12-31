import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-indigo-400 flex flex-col justify-center items-center p-8">
      <h1 className="text-5xl font-extrabold text-center text-white mb-6 shadow-lg">
        Selamat Datang di Sistem Pemesanan Lapangan Mini Soccer
      </h1>
      <p className="text-lg text-white mb-12 max-w-xl text-center opacity-80">
        Silakan login untuk melanjutkan dan menikmati pengalaman pemesanan lapangan terbaik.
      </p>

      <div className="flex flex-col items-center gap-6">
        <Link 
          href="/login" 
          className="bg-blue-600 text-white py-3 px-8 rounded-full shadow-xl hover:bg-blue-700 transform transition-all duration-300 ease-in-out hover:scale-105"
        >
          Login
        </Link>
        
        {/* Anda bisa menambahkan tombol atau elemen lain di sini */}
        <Link 
          href="/about" 
          className="text-blue-600 text-lg underline hover:text-blue-700 transition duration-300"
        >
          Learn More
        </Link>
      </div>

      {/* Animasi tambahan menggunakan background parallax */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-opacity-40 bg-fixed bg-cover" style={{ backgroundImage: 'url(/path-to-image.jpg)' }} />
    </div>
  );
}
