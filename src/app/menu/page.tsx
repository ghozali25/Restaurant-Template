'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/db';
import SectionTitle from '@/components/SectionTitle';
import AOSInit from '@/components/AOSInit';

const categories = ["All", "Burgers", "Pizza", "Fried Chicken", "Wraps", "Desserts", "Pasta"];
const menu = [
  ['Classic Smash Burger', 'Juicy double patty, cheddar, house sauce', '12.99', 'menu/1.jpg'], 
  ['Truffle Mushroom Pizza', 'Wild mushrooms, truffle oil, mozzarella', '15.99', 'menu/2.jpg'],
  ['Crispy Fried Chicken', 'Buttermilk fried chicken, spicy honey glaze', '13.49', 'menu/3.jpg'], 
  ['Chicken Caesar Wrap', 'Grilled chicken, lettuce, parmesan, caesar', '10.99', 'menu/4.jpg'],
  ['Molten Lava Cake', 'Warm chocolate cake, vanilla ice cream', '7.99', 'menu/5.jpg'], 
  ['Creamy Alfredo Pasta', 'Fettuccine, parmesan cream, fresh herbs', '11.99', 'menu/6.jpg'],
];

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = selectedCategory === "All" ? products : products.filter((p) => p.category === selectedCategory);

  return (
    <main className="bg-white">
      <AOSInit />
      <div className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center gap-6 py-6">
            <SectionTitle eyebrow="What's Cooking" title="Our Delicious Menu" />
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition ${selectedCategory === cat ? "bg-[#e8281a] text-white" : "bg-white text-slate-700 hover:bg-[#f6a623] hover:text-white"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse rounded-xl bg-white p-4 shadow-sm">
                    <div className="mb-4 h-40 w-full rounded-lg bg-slate-200" />
                    <div className="h-4 w-2/3 rounded bg-slate-200" />
                    <div className="mt-2 h-3 w-1/2 rounded bg-slate-200" />
                  </div>
                ))}
              </div>
            ) : (
              filtered.map((p) => (
                <a 
                  key={p.id} 
                  href={`/menu/${p.id}`} 
                  className="group block rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
                    <Image 
                      src={p.image || "/placeholder-food.jpg"} 
                      alt={p.name} 
                      fill 
                      className="object-cover transition group-hover:scale-105 duration-500"
                    />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-[#1a1a1a]">{p.name}</h3>
                  <p className="mt-1 text-sm text-slate-500 group-hover:text-[#444]">{p.category}</p>
                  <p className="mt-2 text-lg font-black text-orange-600 group-hover:text-[#e8281a]">${p.price.toFixed(2)}</p>
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}