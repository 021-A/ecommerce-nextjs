import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-lg shadow-lg shadow-blue-600/30">
            🛒
          </div>
          <div>
            <p className="text-lg font-black leading-none">TokoSSR</p>
            <p className="text-xs text-white/60">Modern e-commerce UI</p>
          </div>
        </Link>

        <div className="flex items-center gap-2 text-sm font-medium sm:gap-4">
          <Link
            href="/"
            className="rounded-full px-4 py-2 text-white/90 transition hover:bg-white/10 hover:text-white"
          >
            Produk
          </Link>
          <Link
            href="/cart"
            className="rounded-full px-4 py-2 text-white/90 transition hover:bg-white/10 hover:text-white"
          >
            🛍 Keranjang
          </Link>
          <Link
            href="/checkout"
            className="rounded-full bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500"
          >
            Checkout
          </Link>
        </div>
      </div>
    </nav>
  );
}