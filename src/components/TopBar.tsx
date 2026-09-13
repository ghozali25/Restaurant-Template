import React from 'react';
import Link from 'next/link';

export default function TopBar() {
  return (
    <div id="topbar" className="bg-[#111] py-2 text-[0.82rem] text-[#aaa] border-b border-neutral-900 hidden sm:block">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center">
        <div className="flex flex-wrap gap-4 items-center">
          <span><i className="fa-solid fa-phone text-[#f6a623] mr-1.5"></i> +1 (800) 123-4567</span>
          <span><i className="fa-solid fa-envelope text-[#f6a623] mr-1.5"></i> hello@sarabfood.com</span>
          <span><i className="fa-solid fa-location-dot text-[#f6a623] mr-1.5"></i> 42 Flavor Street, NY</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-[#e8281a] text-white px-2.5 py-0.5 rounded-full text-[0.7rem] font-semibold uppercase tracking-wider">
            <i className="fa-solid fa-fire mr-1"></i> Free Delivery Today!
          </span>
          <div className="flex items-center gap-1.5">
            {['facebook-f', 'instagram', 'tiktok', 'youtube'].map((icon) => (
              <a
                key={icon}
                href="#"
                className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[#bbb] text-xs hover:bg-[#e8281a] hover:text-white transition"
              >
                <i className={`fa-brands fa-${icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}