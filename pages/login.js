import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const password = e.target.password.value;

    // Ambil data pengguna dari localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.name === name && user.password === password);

    if (user) {
      alert('Login berhasil!');
      router.push('/main'); // Arahkan ke MainPage setelah login berhasil
    } else {
      alert('Nama atau password salah!');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Login</h1>
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
        <button type="submit" style={{ display: 'block', marginTop: '10px' }}>
          Login
        </button>
      </form>
      <p>
        Belum punya akun? <a href="/register">Daftar</a>
      </p>
    </div>
  );
}
