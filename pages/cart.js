import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const updateQty = (id, delta) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">🛍 Keranjang Belanja</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-4">Keranjang masih kosong</p>
            <Link href="/">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Mulai Belanja
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow p-4 flex gap-4 items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded border" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-blue-600 font-bold">Rp {item.price.toLocaleString('id-ID')}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQty(item.id, -1)}
                        className="w-7 h-7 bg-gray-200 rounded-full font-bold hover:bg-gray-300">−</button>
                      <span className="font-semibold">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)}
                        className="w-7 h-7 bg-gray-200 rounded-full font-bold hover:bg-gray-300">+</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-700">
                      Rp {(item.price * item.qty).toLocaleString('id-ID')}
                    </p>
                    <button onClick={() => removeItem(item.id)}
                      className="text-red-500 text-sm hover:underline mt-2">Hapus</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow p-4 h-fit">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Ringkasan Belanja</h2>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Total ({cartItems.length} produk)</span>
                <span>Rp {total.toLocaleString('id-ID')}</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Bayar</span>
                <span className="text-blue-700">Rp {total.toLocaleString('id-ID')}</span>
              </div>
              <Link href="/checkout">
                <button className="mt-4 w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">
                  Checkout Sekarang →
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}