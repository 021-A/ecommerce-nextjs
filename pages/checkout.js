import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    nama: '', alamat: '', kota: '', kodePos: '', pembayaran: 'Transfer Bank'
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama || !form.alamat || !form.kota || !form.kodePos) {
      alert('Mohon lengkapi semua data pengiriman!');
      return;
    }
    localStorage.removeItem('cart');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Pesanan Berhasil!</h1>
          <p className="text-gray-500 mb-6">Terima kasih {form.nama}, pesanan Anda sedang diproses.</p>
          <Link href="/">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-bold">
              Kembali Belanja
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4 text-gray-700">Data Pengiriman</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Nama Lengkap</label>
                  <input name="nama" value={form.nama} onChange={handleChange}
                    placeholder="Masukkan nama lengkap"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Alamat Lengkap</label>
                  <textarea name="alamat" value={form.alamat} onChange={handleChange}
                    placeholder="Jalan, nomor rumah, RT/RW"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Kota</label>
                    <input name="kota" value={form.kota} onChange={handleChange}
                      placeholder="Nama kota"
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Kode Pos</label>
                    <input name="kodePos" value={form.kodePos} onChange={handleChange}
                      placeholder="Kode pos"
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Metode Pembayaran</label>
                  <select name="pembayaran" value={form.pembayaran} onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>Transfer Bank</option>
                    <option>COD (Bayar di Tempat)</option>
                    <option>Dompet Digital</option>
                  </select>
                </div>
                <button type="submit"
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
                  ✅ Konfirmasi Pesanan
                </button>
              </form>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 h-fit">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Ringkasan Pesanan</h2>
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{item.name} x{item.qty}</span>
                <span>Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
              </div>
            ))}
            <hr className="my-3" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-blue-700">Rp {total.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}