'use client';

import { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import AOSInit from '@/components/AOSInit';

export default function AdminPage() {
  const [tab, setTab] = useState<"overview" | "pages" | "odoo">("overview");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ url: "", db: "", username: "", apiKey: "" });
  const [content, setContent] = useState({ heroTitle: "", heroSubtitle: "", promoTitle: "", promoPrice: 17.49, promoOriginalPrice: 24.99 });

  async function testConnection() {
    setMessage("Testing connection...");
    const response = await fetch("/api/odoo/test-connection", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await response.json();
    setMessage(data.message);
  }

  async function syncProducts() {
    setMessage("Syncing products...");
    const response = await fetch("/api/odoo/sync-products", { method: "POST" });
    const data = await response.json();
    setMessage(data.ok ? `Synced ${data.count} products.` : data.message);
  }

  async function saveContent() {
    await fetch("/api/admin/pages", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
    setMessage("Page content saved.");
  }

  const input = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#e8281a]";
  return (
    <main className="bg-[#fff8f0] min-h-screen">
      <AOSInit />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#e8281a]">CONTROL CENTER</p>
            <h2 className="font-display text-3xl font-black text-[#1a1a1a]">Dashboard</h2>
            <p className="mt-1 text-sm text-neutral-500">Manage website content and Odoo products.</p>
          </div>
          {message && <div className="rounded-lg bg-[#e8281a]/10 px-4 py-3 text-sm font-semibold text-[#e8281a]">{message}</div>}
        </div>
        <div className="mb-6 flex gap-2 border-b border-neutral-200">
          {["overview", "pages", "odoo"].map((key) => (
            <button key={key} onClick={() => setTab(key as typeof tab)} className={`border-b-2 px-4 py-3 text-sm font-bold ${tab === key ? "border-[#e8281a] text-[#e8281a]" : "border-transparent text-neutral-500"}`}>
              {key === "overview" ? "Overview" : key === "pages" ? "Page Manager" : "Odoo Integration"}
            </button>
          ))}
        </div>
        {tab === "overview" && (
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-5 shadow-sm"><p className="text-sm text-neutral-500">Products</p><p className="mt-2 text-3xl font-black">Odoo</p></div>
            <div className="rounded-xl bg-white p-5 shadow-sm"><p className="text-sm text-neutral-500">Pages</p><p className="mt-2 text-3xl font-black">4</p></div>
            <div className="rounded-xl bg-white p-5 shadow-sm"><p className="text-sm text-neutral-500">Status</p><p className="mt-2 text-3xl font-black text-emerald-600">Live</p></div>
          </div>
        )}
        {tab === "pages" && (
          <section className="max-w-2xl rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-black">Homepage content</h3>
            <div className="space-y-4">
              <label className="block text-sm font-semibold">Hero title<input className={input} value={content.heroTitle} onChange={e => setContent({ ...content, heroTitle: e.target.value })} placeholder="Delicious & Fast Food for Every Moment" /></label>
              <label className="block text-sm font-semibold">Hero subtitle<textarea className={input} value={content.heroSubtitle} onChange={e => setContent({ ...content, heroSubtitle: e.target.value })} rows={3} /></label>
              <label className="block text-sm font-semibold">Promo title<input className={input} value={content.promoTitle} onChange={e => setContent({ ...content, promoTitle: e.target.value })} /></label>
              <div className="grid grid-cols-2 gap-4">
                <label className="text-sm font-semibold">Promo price<input className={input} type="number" value={content.promoPrice} onChange={e => setContent({ ...content, promoPrice: Number(e.target.value) })} /></label>
                <label className="text-sm font-semibold">Original price<input className={input} type="number" value={content.promoOriginalPrice} onChange={e => setContent({ ...content, promoOriginalPrice: Number(e.target.value) })} /></label>
              </div>
              <button onClick={saveContent} className="rounded-lg bg-[#e8281a] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#c91d13]">Save changes</button>
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