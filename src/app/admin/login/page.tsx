'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Utensils } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');

  function handle(e: React.FormEvent) {
    e.preventDefault();
    if (user === 'ali' && pass === 'ali') {
      sessionStorage.setItem('admin_auth', '1');
      router.replace('/admin');
    } else {
      setErr('Invalid username or password');
    }
  }

  return (
    <main className="min-h-screen bg-[#172033] grid place-items-center p-4">
      <form onSubmit={handle} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-tr from-[#e8281a] to-[#f6a623] mb-4"><Utensils size={22} className="text-white" /></div>
        <h1 className="font-display text-2xl font-black text-[#1a1a1a]">Sarab Admin</h1>
        <p className="mt-1 mb-6 text-sm text-neutral-500">Sign in to control panel</p>
        <div className="space-y-3">
          <input className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#e8281a]" placeholder="Username" value={user} onChange={e => setUser(e.target.value)} autoComplete="username" />
          <input className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#e8281a]" placeholder="Password" type="password" value={pass} onChange={e => setPass(e.target.value)} autoComplete="current-password" />
        </div>
        {err && <p className="mt-3 text-sm font-semibold text-[#e8281a]">{err}</p>}
        <button type="submit" className="mt-5 w-full rounded-lg bg-[#e8281a] py-2.5 text-sm font-bold text-white hover:bg-[#c91d13]">Sign in</button>
        <p className="mt-4 text-center text-xs text-neutral-400">Default: user <b>ali</b> / pass <b>ali</b></p>
      </form>
    </main>
  );
}