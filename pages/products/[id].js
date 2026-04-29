import Link from 'next/link';
import Navbar from '../../components/Navbar';

function formatPrice(value = 0) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}

function getCategoryImage(category = 'Produk') {
  const map = {
    Sepatu:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    Baju:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    Tas:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
    Aksesoris:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
    Elektronik:
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80',
  };

  return map[category] || map.Elektronik;
}

export async function getServerSideProps({ params }) {
  try {
    const [detailRes, allRes] = await Promise.all([
      fetch(`http://127.0.0.1:3001/products/${params.id}`),
      fetch('http://127.0.0.1:3001/products'),
    ]);

    if (!detailRes.ok) {
      return { notFound: true };
    }

    const product = await detailRes.json();
    const allProducts = await allRes.json();

    const relatedProducts = allProducts
      .filter((item) => item.category === product.category && item.id !== product.id)
      .slice(0, 4);

    return {
      props: {
        product,
        relatedProducts,
      },
    };
  } catch (error) {
    console.error('DETAIL FETCH ERROR:', error);
    return { notFound: true };
  }
}

export default function ProductDetail({ product, relatedProducts = [] }) {
  if (!product) return null;

  const image = getCategoryImage(product.category);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-700">
            Produk
          </Link>
          <span>/</span>
          <span className="text-slate-900">{product.name}</span>
        </div>

        <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="aspect-square overflow-hidden bg-slate-100">
              <img
                src={image}
                alt={product.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              {product.category}
            </span>

            <h1 className="mt-4 text-3xl font-black leading-tight text-slate-900">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span>⭐ {Number(product.rating).toFixed(1)}</span>
              <span>Terjual {product.sold}</span>
              <span>Stok {product.stock}</span>
            </div>

            <p className="mt-5 text-3xl font-black text-blue-700">
              {formatPrice(product.price)}
            </p>

            <p className="mt-5 leading-7 text-slate-600">
              {product.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/checkout"
                className="inline-flex flex-1 items-center justify-center rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-500"
              >
                Beli Sekarang
              </Link>
              <Link
                href="/cart"
                className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Tambah ke Keranjang
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Kategori</p>
                <p className="mt-1 font-bold text-slate-900">{product.category}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Rating</p>
                <p className="mt-1 font-bold text-slate-900">⭐ {product.rating}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Stok</p>
                <p className="mt-1 font-bold text-slate-900">{product.stock}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Produk Serupa</h2>
            <Link href="/" className="text-sm font-medium text-blue-700 hover:text-blue-600">
              Lihat semua
            </Link>
          </div>

          {relatedProducts.length === 0 ? (
            <div className="rounded-3xl bg-white p-8 text-slate-500 shadow-sm ring-1 ring-slate-200">
              Belum ada produk serupa.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {relatedProducts.map((item) => (
                <Link key={item.id} href={`/products/${item.id}`} className="group block">
                  <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="aspect-square overflow-hidden bg-slate-100">
                      <img
                        src={getCategoryImage(item.category)}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">
                        {item.category}
                      </p>
                      <h3 className="mt-1 line-clamp-2 font-bold text-slate-900">
                        {item.name}
                      </h3>
                      <p className="mt-2 font-extrabold text-blue-700">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}