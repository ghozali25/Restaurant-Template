'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { BarChart3, ExternalLink, LayoutDashboard, Settings, Utensils, LogOut, type LucideIcon } from 'lucide-react';

const links: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') return;
    if (sessionStorage.getItem('admin_auth') !== '1') {
      router.replace('/admin/login');
    } else {
      setAuth(true);
    }
  }, [pathname, router]);

  if (pathname === '/admin/login') return <>{children}</>;
  if (!auth) return null;

  function logout() {
    sessionStorage.removeItem('admin_auth');
    router.replace('/admin/login');
  }

  return <div className="min-h-screen bg-[#f6f7fb] text-slate-700 lg:flex">
    <aside className="w-full shrink-0 bg-[#172033] text-white lg:min-h-screen lg:w-64">
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-tr from-[#e8281a] to-[#f6a623]"><Utensils size={19} /></div>
        <div><div className="font-display text-xl font-black">Sarab<span className="text-[#f6a623]">.</span></div><div className="text-[10px] uppercase tracking-[2px] text-white/45">Admin panel</div></div>
      </div>
      <nav className="space-y-1 p-4">
        <p className="px-3 pb-2 pt-3 text-[10px] font-bold uppercase tracking-[2px] text-white/35">Main menu</p>
        {links.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white/65 transition hover:bg-white/10 hover:text-white"><Icon size={18} />{label}</Link>)}
        <p className="px-3 pb-2 pt-7 text-[10px] font-bold uppercase tracking-[2px] text-white/35">System</p>
        <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white/65 hover:bg-white/10 hover:text-white"><ExternalLink size={18} />View website</Link>
        <button onClick={logout} className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white/65 hover:bg-white/10 hover:text-white"><LogOut size={18} />Sign out</button>
      </nav>
    </aside>
    <div className="min-w-0 flex-1"><header className="flex h-20 items-center justify-between border-b bg-white px-5 shadow-sm sm:px-8"><div><p className="text-xs font-bold uppercase tracking-[2px] text-[#e8281a]">Sarab restaurant</p><h1 className="font-display text-xl font-black text-[#172033]">Management Center</h1></div><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-full bg-[#fff0eb] text-[#e8281a]"><BarChart3 size={17} /></div><span className="hidden text-sm font-semibold sm:block">Administrator</span></div></header><main className="p-5 sm:p-8">{children}</main></div>
  </div>;
}
