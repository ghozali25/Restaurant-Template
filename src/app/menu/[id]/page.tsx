import { notFound } from "next/navigation";
import Image from "next/image";
import { Product } from "@/lib/db";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch("/api/products", { cache: "no-store" });
  const products: Product[] = await res.json();
  const product = products.find((p) => p.id === Number(id));
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-[#f6f7f9] text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <a href="/menu" className="text-sm font-semibold text-orange-600 hover:underline">← Back to menu</a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-white shadow-sm">
            <Image src={product.image || "/placeholder-food.jpg"} alt={product.name} fill className="object-cover" />
          </div>
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-orange-600">{product.category}</span>
            <h1 className="mt-2 text-4xl font-black">{product.name}</h1>
            <p className="mt-4 text-lg text-slate-600">{product.description || "No description available."}</p>
            <div className="mt-6 text-3xl font-black text-orange-600">${product.price.toFixed(2)}</div>
            <div className="mt-6 flex gap-3">
              <button className="rounded-lg bg-orange-600 px-6 py-3 text-sm font-bold text-white hover:bg-orange-500">Add to cart</button>
              <button className="rounded-lg border border-orange-600 px-6 py-3 text-sm font-bold text-orange-600 hover:bg-orange-50">Save for later</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}