import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Checkout() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h1 className="text-3xl font-black text-slate-900">Checkout</h1>
            <p className="mt-2 text-slate-500">Form checkout modern untuk tampilan demo.</p>

            <form className="mt-8 grid gap-4">
              <input
                type="text"
                placeholder="Nama lengkap"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
              />
              <input
                type="email"
                placeholder="Email"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
              />
              <input
                type="text"
                placeholder="Alamat pengiriman"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
              />
              <textarea
                rows="4"
                placeholder="Catatan tambahan"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </form>
          </section>

          <aside className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Ringkasan Pesanan</h2>

            <div className="mt-6 space-y-4 rounded-2xl bg-slate-50 p-5">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-semibold">Rp 0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Ongkir</span>
                <span className="font-semibold">Rp 0</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                <span className="font-bold text-slate-900">Total</span>
                <span className="text-xl font-black text-blue-700">Rp 0</span>
              </div>
            </div>

            <button className="mt-6 w-full rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-500">
              Bayar Sekarang
            </button>

            <Link
              href="/"
              className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Kembali ke Produk
            </Link>
          </aside>
        </div>
      </main>
    </div>
  );
}