import Navbar from '../../components/Navbar';
import Link from 'next/link';

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:3001/products/${params.id}`);
  const product = await res.json();
  return { props: { product } };
}

export default function ProductDetail({ product }) {
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produk berhasil ditambahkan ke keranjang!');
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="text-blue-600 hover:underline text-sm mb-4 block">
          ← Kembali ke Produk
        </Link>
        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg shadow p-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg border"
          />
          <div>
            <p className="text-blue-600 text-sm font-medium">{product.category}</p>
            <h1 className="text-2xl font-bold text-gray-800 mt-1">{product.name}</h1>
            <p className="text-yellow-500 mt-2">⭐ {product.rating} · Terjual {product.sold}</p>
            <p className="text-3xl font-bold text-blue-700 mt-3">
              Rp {product.price.toLocaleString('id-ID')}
            </p>
            <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>
            <p className="text-sm text-gray-400 mt-2">Stok: {product.stock} tersisa</p>
            <button
              onClick={addToCart}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
            >
              + Tambah ke Keranjang
            </button>
            <Link href="/cart">
              <button className="mt-3 w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 rounded-lg transition">
                🛍 Lihat Keranjang
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}