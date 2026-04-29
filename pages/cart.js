import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Cart() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <h1 className="text-3xl font-black text-slate-900">Keranjang</h1>
          <p className="mt-2 text-slate-500">
            Halaman keranjang sudah siap untuk dikembangkan lebih lanjut.
          </p>

          <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-slate-600">
            Saat ini belum ada state keranjang global, jadi halaman ini menjadi tampilan awal
            yang bersih dan siap dihubungkan ke fitur add-to-cart.
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-500"
            >
              Lanjut Belanja
            </Link>
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Ke Checkout
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}