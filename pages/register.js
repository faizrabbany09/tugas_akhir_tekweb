import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    // Validasi konfirmasi password
    if (password !== confirmPassword) {
      alert('Password dan Konfirmasi Password tidak cocok!');
      return;
    }

    // Ambil data pengguna dari localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Cek apakah pengguna sudah ada
    if (users.find((user) => user.name === name)) {
      alert('Pengguna sudah terdaftar!');
    } else {
      // Menyimpan pengguna baru ke localStorage
      users.push({ name, password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registrasi berhasil!');
      router.push('/login'); // Arahkan ke halaman login setelah registrasi
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Daftar Akun</h1>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
        <label>Nama:</label>
        <input
          type="text"
          name="name"
          required
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          required
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <label>Konfirmasi Password:</label>
        <input
          type="password"
          name="confirmPassword"
          required
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <button type="submit" style={{ display: 'block', marginTop: '10px' }}>
          Daftar
        </button>
      </form>
      <p>
        Sudah punya akun? <a href="/login">Login</a>
      </p>
    </div>
  );
}
