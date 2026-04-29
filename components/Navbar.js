import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link href="/" className="text-xl font-bold tracking-wide">
        🛒 TokoSSR
      </Link>
      <div className="flex gap-6 text-sm font-medium">
        <Link href="/" className="hover:text-yellow-300 transition">Produk</Link>
        <Link href="/cart" className="hover:text-yellow-300 transition">🛍 Keranjang</Link>
        <Link href="/checkout" className="hover:text-yellow-300 transition">Checkout</Link>
      </div>
    </nav>
  );
}