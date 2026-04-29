import Link from 'next/link';
import Navbar from '../components/Navbar';

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3001/products');
  const products = await res.json();
  return {
    props: { products }
  };
}

export default function Home({ products }) {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Semua Produk</h1>
        <p className="text-gray-500 mb-6">{products.length} produk tersedia</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map(product => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer border">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-3">
                  <p className="text-xs text-blue-600 font-medium">{product.category}</p>
                  <h2 className="text-sm font-semibold text-gray-800 mt-1 line-clamp-2">
                    {product.name}
                  </h2>
                  <p className="text-blue-700 font-bold mt-2">
                    Rp {product.price.toLocaleString('id-ID')}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">⭐ {product.rating} · Terjual {product.sold}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}