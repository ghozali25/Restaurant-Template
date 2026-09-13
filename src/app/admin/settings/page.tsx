'use client';

import { useEffect, useState } from 'react';
import type { Product } from '@/lib/db';

const input = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#e8281a]";

export default function SettingsPage() {
  const [tab, setTab] = useState<"products" | "content" | "odoo">("content");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ url: "", db: "", username: "", apiKey: "" });
  const [content, setContent] = useState({
    companyName: "",
    heroTitle: "",
    heroSubtitle: "",
    aboutHistory: "",
    promoTitle: "",
    promoDesc: "",
    promoPrice: 17.49,
    promoOriginalPrice: 24.99,
    contactAddress: "",
    contactPhone: "",
    contactEmail: "",
    openingHours: "",
    openingHoursDetails: ""
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products").then(r => r.json()).then(d => { setProducts(d); setLoading(false); });
    fetch("/api/admin/pages").then(r => r.json()).then(d => {
      if (d) {
        setContent(prev => ({
          companyName: d.companyName ?? prev.companyName ?? "",
          heroTitle: d.heroTitle ?? prev.heroTitle ?? "",
          heroSubtitle: d.heroSubtitle ?? prev.heroSubtitle ?? "",
          aboutHistory: d.aboutHistory ?? prev.aboutHistory ?? "",
          promoTitle: d.promoTitle ?? prev.promoTitle ?? "",
          promoDesc: d.promoDesc ?? prev.promoDesc ?? "",
          promoPrice: d.promoPrice ?? prev.promoPrice ?? 17.49,
          promoOriginalPrice: d.promoOriginalPrice ?? prev.promoOriginalPrice ?? 24.99,
          contactAddress: d.contactAddress ?? prev.contactAddress ?? "",
          contactPhone: d.contactPhone ?? prev.contactPhone ?? "",
          contactEmail: d.contactEmail ?? prev.contactEmail ?? "",
          openingHours: d.openingHours ?? prev.openingHours ?? "",
          openingHoursDetails: d.openingHoursDetails ?? prev.openingHoursDetails ?? "",
        }));
      }
    });
  }, []);

  async function testConnection() {
    setMessage("Testing connection...");
    const res = await fetch("/api/odoo/test-connection", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    setMessage(data.message);
  }

  async function syncProducts() {
    setMessage("Syncing products...");
    const res = await fetch("/api/odoo/sync-products", { method: "POST" });
    const data = await res.json();
    setMessage(data.ok ? `Synced ${data.count} products.` : data.message);
  }

  async function saveContent() {
    await fetch("/api/admin/pages", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
    setMessage("Page content saved.");
  }

  async function saveProduct(p: Product) {
    await fetch("/api/products/update", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) });
    setProducts(products.map(x => x.id === p.id ? p : x));
    setEditing(null);
    setMessage("Product saved.");
  }

  async function deleteProduct(id: number) {
    await fetch("/api/products/update", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setProducts(products.filter((p) => p.id !== id));
    setMessage("Product deleted.");
  }

  return (
    <main className="bg-[#fff8f0] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-sm font-semibold text-[#e8281a]">SETTINGS</p><h2 className="font-display text-3xl font-black text-[#1a1a1a]">Settings</h2><p className="mt-1 text-sm text-neutral-500">Manage products, page content, and integrations.</p></div>
          {message && <div className="rounded-lg bg-[#e8281a]/10 px-4 py-3 text-sm font-semibold text-[#e8281a]">{message}</div>}
        </div>

        <div className="mb-6 flex gap-2 border-b border-neutral-200">
          {(["products", "content", "odoo"] as const).map((key) => (
            <button key={key} onClick={() => setTab(key)} className={`border-b-2 px-4 py-3 text-sm font-bold ${tab === key ? "border-[#e8281a] text-[#e8281a]" : "border-transparent text-neutral-500"}`}>{key === "products" ? "Menu Products" : key === "content" ? "Page Content" : "Odoo Integration"}</button>
          ))}
        </div>

        {tab === "products" && (
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between"><h3 className="text-xl font-black">Menu Products</h3><button onClick={() => setEditing({ id: Date.now(), name: "", price: 0, category: "", image: "", active: true })} className="rounded-lg bg-[#e8281a] px-4 py-2 text-sm font-bold text-white hover:bg-[#c91d13]">+ Add Product</button></div>
            <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left text-neutral-500"><th className="pb-3">Image</th><th className="pb-3">Name</th><th className="pb-3">Category</th><th className="pb-3">Price</th><th className="pb-3">Active</th><th className="pb-3">Actions</th></tr></thead>
            <tbody>{products.map(p => <tr key={p.id} className="border-b">
              <td className="py-3"><img src={p.image || "https://themewagon.github.io/sarab/img/menu/1.jpg"} className="h-10 w-10 rounded-lg object-cover" /></td>
              <td className="py-3 font-semibold">{editing?.id === p.id ? <input className={input} value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} /> : p.name}</td>
              <td className="py-3">{editing?.id === p.id ? <input className={input} value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })} /> : p.category}</td>
              <td className="py-3">{editing?.id === p.id ? <input className={input} type="number" value={editing.price} onChange={e => setEditing({ ...editing, price: Number(e.target.value) })} /> : `$${p.price.toFixed(2)}`}</td>
              <td className="py-3">{editing?.id === p.id ? <input type="checkbox" checked={editing.active} onChange={e => setEditing({ ...editing, active: e.target.checked })} /> : (p.active !== false ? "Yes" : "No")}</td>
              <td className="py-3">{editing?.id === p.id ? <button onClick={() => saveProduct(editing)} className="text-sm font-bold text-[#e8281a]">Save</button> : <div className="flex gap-3"><button onClick={() => setEditing(p)} className="text-sm font-bold text-[#e8281a]">Edit</button><button onClick={() => deleteProduct(p.id)} className="text-sm font-bold text-red-400">Delete</button></div>}</td>
            </tr>)}</tbody></table></div>
          </section>
        )}

        {tab === "content" && (
          <section className="max-w-3xl rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-black">Frontend Content Manager</h3>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="font-bold text-[#e8281a] text-sm mb-3 uppercase">General Information</h4>
                <label className="block text-sm font-semibold">Company Name<input className={input} value={content.companyName} onChange={e => setContent({ ...content, companyName: e.target.value })} placeholder="Sarab" /></label>
              </div>

              <div className="border-b pb-4">
                <h4 className="font-bold text-[#e8281a] text-sm mb-3 uppercase">Hero Section</h4>
                <label className="block text-sm font-semibold mb-2">Hero Title<input className={input} value={content.heroTitle} onChange={e => setContent({ ...content, heroTitle: e.target.value })} placeholder="Delicious & Fast Food for Every Moment" /></label>
                <label className="block text-sm font-semibold">Hero Subtitle<textarea className={input} value={content.heroSubtitle} onChange={e => setContent({ ...content, heroSubtitle: e.target.value })} rows={2} /></label>
              </div>

              <div className="border-b pb-4">
                <h4 className="font-bold text-[#e8281a] text-sm mb-3 uppercase">Our History (About Us)</h4>
                <label className="block text-sm font-semibold">History Text<textarea className={input} value={content.aboutHistory} onChange={e => setContent({ ...content, aboutHistory: e.target.value })} rows={3} /></label>
              </div>

              <div className="border-b pb-4">
                <h4 className="font-bold text-[#e8281a] text-sm mb-3 uppercase">Special Offer Section</h4>
                <label className="block text-sm font-semibold mb-2">Offer Title<input className={input} value={content.promoTitle} onChange={e => setContent({ ...content, promoTitle: e.target.value })} /></label>
                <label className="block text-sm font-semibold mb-2">Offer Description<textarea className={input} value={content.promoDesc} onChange={e => setContent({ ...content, promoDesc: e.target.value })} rows={2} /></label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="text-sm font-semibold">Promo Price<input className={input} type="number" value={content.promoPrice} onChange={e => setContent({ ...content, promoPrice: Number(e.target.value) })} /></label>
                  <label className="text-sm font-semibold">Original Price<input className={input} type="number" value={content.promoOriginalPrice} onChange={e => setContent({ ...content, promoOriginalPrice: Number(e.target.value) })} /></label>
                </div>
              </div>

              <div className="border-b pb-4">
                <h4 className="font-bold text-[#e8281a] text-sm mb-3 uppercase">Contact Information</h4>
                <div className="space-y-3">
                  <label className="block text-sm font-semibold">Address<input className={input} value={content.contactAddress} onChange={e => setContent({ ...content, contactAddress: e.target.value })} /></label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="text-sm font-semibold">Phone<input className={input} value={content.contactPhone} onChange={e => setContent({ ...content, contactPhone: e.target.value })} /></label>
                    <label className="text-sm font-semibold">Email<input className={input} value={content.contactEmail} onChange={e => setContent({ ...content, contactEmail: e.target.value })} /></label>
                  </div>
                </div>
              </div>

              <div className="pb-2">
                <h4 className="font-bold text-[#e8281a] text-sm mb-3 uppercase">Opening Hours</h4>
                <label className="block text-sm font-semibold">Hours Summary<input className={input} value={content.openingHours} onChange={e => setContent({ ...content, openingHours: e.target.value })} placeholder="Mon‑Tue: Closed; Wed‑Thu: 09:00‑22:00" /></label>
                <label className="block text-sm font-semibold mt-2">Details<textarea className={input} value={content.openingHoursDetails} onChange={e => setContent({ ...content, openingHoursDetails: e.target.value })} rows={2} /></label>
              </div>

              <button onClick={saveContent} className="rounded-lg bg-[#e8281a] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#c91d13]">Save all changes</button>
            </div>
          </section>
        )}

        {tab === "odoo" && (
          <section className="max-w-2xl rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-black">Odoo connection</h3>
            <p className="mb-5 mt-1 text-sm text-neutral-500">Use Odoo JSON-RPC credentials. API key recommended.</p>
            <div className="space-y-4">
              <label className="block text-sm font-semibold">Odoo URL<input className={input} value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} placeholder="https://your-company.odoo.com" /></label>
              <label className="block text-sm font-semibold">Database<input className={input} value={form.db} onChange={e => setForm({ ...form, db: e.target.value })} /></label>
              <label className="block text-sm font-semibold">Username<input className={input} value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} /></label>
              <label className="block text-sm font-semibold">API key / password<input className={input} type="password" value={form.apiKey} onChange={e => setForm({ ...form, apiKey: e.target.value })} /></label>
              <div className="flex gap-3">
                <button onClick={testConnection} className="rounded-lg border border-[#e8281a] px-5 py-2.5 text-sm font-bold text-[#e8281a]">Test connection</button>
                <button onClick={syncProducts} className="rounded-lg bg-[#e8281a] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#c91d13]">Sync products</button>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}