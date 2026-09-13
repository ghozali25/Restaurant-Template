'use client';

import { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import AOSInit from '@/components/AOSInit';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  const input = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#e8281a]";
  
  return <main className="bg-white">
    <AOSInit />
    <section id="contact-section" className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle eyebrow="Get In Touch" title="Contact Us" description="Have a question, feedback, or want to plan a special event? We&apos;d love to hear from you." />
        <div className="grid md:grid-cols-3 gap-6">
          {([
            ['fa-location-dot','Visit Us','42 Flavor Street, Manhattan, NY 10001'],
            ['fa-phone','Call Us','+1 (800) 123-4567'],
            ['fa-envelope','Email Us','hello@sarabfood.com'],
          ] as [string,string,string][]).map(([icon,title,text]) => 
            <div key={title} data-aos="fade-up" className="p-7 rounded-2xl bg-[#fff8f0] text-center">
              <span className="w-12 h-12 bg-[#e8281a] text-white rounded-full inline-grid place-items-center">
                <i className={`fa-solid ${icon}`}></i>
              </span>
              <h3 className="font-display text-xl font-bold mt-4">{title}</h3>
              <p className="text-sm text-neutral-500 mt-2">{text}</p>
            </div>
          )}
        </div>
      </div>
    </section>

    <section className="py-24 bg-[#fff8f0]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2">
          <div data-aos="fade-right">
            <p className="text-[#e8281a] uppercase tracking-[3px] font-bold text-xs mb-3">Send a Message</p>
            <h2 className="font-display text-3xl font-black text-[#1a1a1a]">Get in Touch</h2>
            <p className="text-neutral-500 mt-4">We&apos;re here to answer any questions you might have.</p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <i className="fa-solid fa-envelope text-[#e8281a] text-xl"></i>
                <span className="text-sm">hello@sarabfood.com</span>
              </div>
              <div className="flex items-center gap-4">
                <i className="fa-solid fa-phone text-[#e8281a] text-xl"></i>
                <span className="text-sm">+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-4">
                <i className="fa-solid fa-location-dot text-[#e8281a] text-xl"></i>
                <span className="text-sm">42 Flavor Street, Manhattan, NY 10001</span>
              </div>
            </div>
          </div>
          <div data-aos="fade-left" className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold mb-4">Send a message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input className={input} placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <input className={input} placeholder="Email Address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <input className={input} placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input className={input} placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
              <textarea className={input} placeholder="Message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
              <button type="submit" className="w-full rounded-lg bg-[#e8281a] py-3 text-sm font-bold text-white hover:bg-[#c91d13]">Send Message</button>
              {submitted && <p className="text-center text-sm font-semibold text-emerald-600">Message sent successfully!</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>;
}