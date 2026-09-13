"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/db";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function toggleActive(id: number, active: boolean) {
    await fetch(`/api/products/update`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, active }) });
    setProducts(products.map((p) => p.id === id ? { ...p, active } : p));
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-end justify-between">
        <div><p className="text-sm font-semibold text-orange-600">INVENTORY</p><h2 className="text-3xl font-black">Products</h2></div>
      </div>
      {loading ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><div className="h-48 animate-pulse rounded-xl bg-white" /></div> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.id} className="rounded-xl bg-white p-4 shadow-sm">
              <div className="mb-3 h-32 w-full overflow-hidden rounded-lg bg-slate-100">
                {p.image && <img src={p.image} alt={p.name} className="h-full w-full object-cover" />}
              </div>
              <h3 className="font-bold">{p.name}</h3>
              <p className="text-sm text-slate-500">{p.category}</p>
              <p className="mt-1 text-lg font-black text-orange-600">${p.price.toFixed(2)}</p>
              <label className="mt-3 flex items-center gap-2 text-sm">
                <input type="checkbox" checked={p.active !== false} onChange={(e) => toggleActive(p.id, e.target.checked)} />
                Active
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}