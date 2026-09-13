import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-neutral-300 pt-16 pb-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#e8281a] to-[#f6a623] flex items-center justify-center text-white font-bold">
                <i className="fa-solid fa-utensils"></i>
              </div>
              <span className="font-['Playfair_Display'] text-2xl font-black text-white">
                Sarab<span className="text-[#e8281a]">.</span>
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              We bring the world's finest flavors together in a fast, friendly, and affordable experience. Fresh ingredients, crafted daily with love.
            </p>
            <div className="flex gap-2 pt-2">
              {['facebook-f', 'instagram', 'tiktok', 'youtube'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-[#e8281a] hover:text-white transition"
                >
                  <i className={`fa-brands fa-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick links */}
          <div>
            <h4 className="font-['Playfair_Display'] text-white text-lg font-bold mb-5 border-b border-neutral-800 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li><Link href="/" className="hover:text-[#e8281a] transition">Home</Link></li>
              <li><Link href="/#about" className="hover:text-[#e8281a] transition">About Us</Link></li>
              <li><Link href="/#menu" className="hover:text-[#e8281a] transition">Our Menu</Link></li>
              <li><Link href="/#special" className="hover:text-[#e8281a] transition">Special Offers</Link></li>
              <li><Link href="/#reservation" className="hover:text-[#e8281a] transition">Book a Table</Link></li>
              <li><Link href="/admin" className="hover:text-[#e8281a] transition">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Col 3: Opening Hours */}
          <div>
            <h4 className="font-['Playfair_Display'] text-white text-lg font-bold mb-5 border-b border-neutral-800 pb-2 inline-block">
              Opening Hours
            </h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex justify-between border-b border-neutral-800 pb-2">
                <span>Mon - Tue:</span>
                <span className="text-[#e8281a] font-semibold">Closed</span>
              </li>
              <li className="flex justify-between border-b border-neutral-800 pb-2">
                <span>Wed - Thu:</span>
                <span>09:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-neutral-800 pb-2">
                <span>Fri - Sat:</span>
                <span>09:00 AM - 11:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>10:00 AM - 10:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div>
            <h4 className="font-['Playfair_Display'] text-white text-lg font-bold mb-5 border-b border-neutral-800 pb-2 inline-block">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-location-dot text-[#e8281a] mt-1"></i>
                <span>42 Flavor Street, Manhattan, NY 10001, USA</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-phone text-[#e8281a]"></i>
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-envelope text-[#e8281a]"></i>
                <span>hello@sarabfood.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-neutral-800 text-center text-xs text-neutral-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Sarab Restaurant. Inspired by ThemeWagon Sarab HTML Template.</p>
          <p>Integrated with Odoo ERP backend for seamless ordering.</p>
        </div>
      </div>
    </footer>
  );
}