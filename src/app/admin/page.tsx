'use client';

import { useEffect, useState } from 'react';
import { Package, TrendingUp, Users, Utensils } from 'lucide-react';
import type { Product } from '@/lib/db';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products").then(r => r.json()).then(d => { setProducts(d); setLoading(false); });
  }, []);

  const active = products.filter(p => p.active !== false).length;
  const categories = new Set(products.map(p => p.category)).size;

  const statCards = [
    { icon: Package, label: "Products", value: products.length, color: "text-[#e8281a]" },
    { icon: TrendingUp, label: "Active", value: active, color: "text-emerald-600" },
    { icon: Users, label: "Categories", value: categories, color: "text-[#f6a623]" },
  ];

  return (
    <main className="bg-[#fff8f0] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-6">
          <p className="text-sm font-semibold text-[#e8281a]">CONTROL CENTER</p>
          <h2 className="font-display text-3xl font-black text-[#1a1a1a]">Dashboard</h2>
          <p className="mt-1 text-sm text-neutral-500">Overview of your restaurant website.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {statCards.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="rounded-xl bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`grid h-10 w-10 place-items-center rounded-xl bg-[#fff0eb] ${color}`}><Icon size={18} /></div>
                <div><p className="text-sm text-neutral-500">{label}</p><p className={`mt-1 text-3xl font-black ${color}`}>{value}</p></div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-black">Recent Products</h3>
            <span className="text-sm text-neutral-500">{loading ? "Loading..." : `${products.length} total`}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b text-left text-neutral-500"><th className="pb-3">Name</th><th className="pb-3">Category</th><th className="pb-3">Price</th><th className="pb-3">Status</th></tr></thead>
              <tbody>
                {products.slice(0, 8).map(p => (
                  <tr key={p.id} className="border-b">
                    <td className="py-3 font-semibold">{p.name}</td>
                    <td className="py-3">{p.category}</td>
                    <td className="py-3">${p.price.toFixed(2)}</td>
                    <td className="py-3">{p.active !== false ? <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">Active</span> : <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-bold text-neutral-500">Inactive</span>}</td>
                  </tr>
                ))}
                {!loading && products.length === 0 && <tr><td colSpan={4} className="py-8 text-center text-neutral-400"><Utensils size={20} className="mx-auto mb-2" />No products yet — add them in Settings.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}