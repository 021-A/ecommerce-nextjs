import Link from 'next/link';
import { useMemo, useState } from 'react';
import Navbar from '../components/Navbar';

const CATEGORY_IMAGE = {
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

function getFallbackImage(category = 'Produk') {
  const bgMap = {
    Sepatu: '#2563eb',
    Baju: '#059669',
    Tas: '#7c3aed',
    Aksesoris: '#d97706',
    Elektronik: '#0f766e',
  };

  const bg = bgMap[category] || '#334155';

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bg}" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
      </defs>
      <rect width="800" height="800" rx="40" fill="url(#g)" />
      <circle cx="650" cy="130" r="120" fill="rgba(255,255,255,0.12)" />
      <circle cx="120" cy="660" r="100" fill="rgba(255,255,255,0.08)" />
      <text x="60" y="120" fill="white" font-size="36" font-family="Arial, sans-serif">TokoSSR</text>
      <text x="60" y="220" fill="white" font-size="58" font-weight="700" font-family="Arial, sans-serif">${category}</text>
      <text x="60" y="320" fill="rgba(255,255,255,0.92)" font-size="28" font-family="Arial, sans-serif">Produk unggulan</text>
      <text x="60" y="700" fill="rgba(255,255,255,0.85)" font-size="26" font-family="Arial, sans-serif">Belanja lebih nyaman</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function getProductImage(product) {
  return CATEGORY_IMAGE[product.category] || getFallbackImage(product.category);
}

function formatPrice(value = 0) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}

export async function getServerSideProps() {
  try {
    const res = await fetch('http://127.0.0.1:3001/products');
    if (!res.ok) throw new Error('Gagal mengambil data produk');

    const products = await res.json();

    return {
      props: {
        products: Array.isArray(products) ? products : [],
      },
    };
  } catch (error) {
    console.error('FETCH ERROR:', error);
    return {
      props: {
        products: [],
      },
    };
  }
}

export default function Home({ products = [] }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = useMemo(() => {
    const unique = [...new Set(products.map((item) => item.category).filter(Boolean))];
    return ['Semua', ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const q = query.toLowerCase().trim();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'Semua' || product.category === activeCategory;

      const searchText = `${product.name} ${product.category} ${product.description || ''}`.toLowerCase();
      const matchesQuery = !q || searchText.includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [products, query, activeCategory]);

  const bestSellerProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => (b.sold || 0) - (a.sold || 0))
      .slice(0, 4);
  }, [products]);

  const totalSold = useMemo(
    () => products.reduce((sum, item) => sum + (item.sold || 0), 0),
    [products]
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-fuchsia-600 p-6 text-white shadow-2xl sm:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
                SSR • JSON Server • UI Modern
              </span>

              <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
                Belanja lebih cepat, tampilan lebih menarik, dan data lebih rapi.
              </h1>

              <p className="mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
                TokoSSR menampilkan produk dengan desain clean, kategori yang jelas,
                dan pencarian yang memudahkan kamu menemukan produk terbaik.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                  <p className="text-sm text-white/80">Total Produk</p>
                  <p className="mt-1 text-2xl font-bold">{products.length}</p>
                </div>
                <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                  <p className="text-sm text-white/80">Kategori</p>
                  <p className="mt-1 text-2xl font-bold">{categories.length - 1}</p>
                </div>
                <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                  <p className="text-sm text-white/80">Total Terjual</p>
                  <p className="mt-1 text-2xl font-bold">{totalSold}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/70">
                    🔍
                  </span>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cari produk..."
                    className="w-full rounded-2xl border border-white/20 bg-white/15 py-4 pl-12 pr-4 text-white placeholder:text-white/70 outline-none backdrop-blur transition focus:border-white focus:bg-white/20"
                  />
                </div>
                <a
                  href="#produk"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 font-semibold text-blue-700 transition hover:bg-slate-100"
                >
                  Lihat Produk
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {bestSellerProducts.map((product) => (
                <Link
                  href={`/products/${product.id}`}
                  key={product.id}
                  className="group overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = getFallbackImage(product.category);
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-widest text-white/70">
                      {product.category}
                    </p>
                    <h3 className="mt-1 line-clamp-2 font-semibold text-white">
                      {product.name}
                    </h3>
                    <div className="mt-3 flex items-center justify-between text-sm text-white/80">
                      <span>⭐ {product.rating}</span>
                      <span>Terjual {product.sold}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="produk"
          className="mt-8 flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Semua Produk</h2>
            <p className="mt-1 text-sm text-slate-500">
              Menampilkan {filteredProducts.length} dari {products.length} produk
            </p>
          </div>

          <div className="w-full sm:max-w-md">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama produk, kategori, atau deskripsi..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>
        </section>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
            <p className="text-lg font-semibold text-slate-900">Produk tidak ditemukan</p>
            <p className="mt-2 text-slate-500">
              Coba ubah kata kunci pencarian atau pilih kategori lain.
            </p>
          </div>
        ) : (
          <section className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="group block h-full"
              >
                <article className="h-full overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = getProductImage(product);
                      }}
                    />
                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow">
                      {product.category}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="line-clamp-2 text-base font-bold leading-snug text-slate-900">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-lg font-extrabold text-blue-700">
                      {formatPrice(product.price)}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                      <span>⭐ {Number(product.rating).toFixed(1)}</span>
                      <span>Terjual {product.sold}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}