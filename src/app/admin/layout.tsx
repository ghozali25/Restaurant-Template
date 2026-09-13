import React from 'react';
import Link from 'next/link';
import { Utensils } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fff8f0] text-[#444]">
      <nav className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#e8281a] to-[#f6a623] flex items-center justify-center text-white">
            <Utensils className="w-4 h-4" />
          </div>
          <span className="font-['Playfair_Display'] text-xl font-black text-[#1a1a1a]">Sarab<span className="text-[#e8281a]">.</span> <span className="text-sm font-sans font-normal text-neutral-400">Admin</span></span>
        </Link>
        <Link href="/" className="text-sm font-semibold text-[#e8281a] hover:underline">← Back to site</Link>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
