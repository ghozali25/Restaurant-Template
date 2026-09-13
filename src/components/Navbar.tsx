'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Utensils, Menu as MenuIcon, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-md py-1' : 'shadow-sm py-2'} border-b border-neutral-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#e8281a] to-[#f6a623] flex items-center justify-center text-white shadow-md shadow-red-500/20 group-hover:scale-105 transition duration-300">
              <Utensils className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-['Playfair_Display'] text-xl sm:text-2xl font-black text-[#1a1a1a] leading-none">
                Sarab <span className="text-[#e8281a]">.</span>
              </span>
              <span className="text-[0.58rem] sm:text-[0.62rem] tracking-[2px] uppercase text-neutral-400 font-bold leading-tight mt-0.5">
                Fast Food & Restaurant
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1 font-medium text-sm text-[#333]">
            <Link href="/" onClick={() => setActiveLink('home')} className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}>
              Home
            </Link>
            <Link href="/#menu" onClick={() => setActiveLink('menu')} className={`nav-link ${activeLink === 'menu' ? 'active' : ''}`}>
              Menu
            </Link>
            <Link href="/#about" onClick={() => setActiveLink('about')} className={`nav-link ${activeLink === 'about' ? 'active' : ''}`}>
              About Us
            </Link>
            <Link href="/#special" onClick={() => setActiveLink('offers')} className={`nav-link ${activeLink === 'offers' ? 'active' : ''}`}>
              Offers
            </Link>
            <Link href="/#chefs" onClick={() => setActiveLink('chefs')} className={`nav-link ${activeLink === 'chefs' ? 'active' : ''}`}>
              Chefs
            </Link>
            <Link href="/#contact-section" onClick={() => setActiveLink('contact')} className={`nav-link ${activeLink === 'contact' ? 'active' : ''}`}>
              Contact
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/#menu" className="relative p-2.5 rounded-full bg-neutral-50 text-neutral-700 hover:text-[#e8281a] hover:bg-red-50 transition">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#e8281a] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                3
              </span>
            </Link>
            <Link
              href="/#reservation"
              className="px-6 py-2.5 bg-gradient-to-r from-[#e8281a] to-[#f6a623] text-white text-sm font-bold rounded-full shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-[1.03] active:scale-[0.98] transition duration-300"
            >
              Book Table
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-neutral-600 hover:text-black focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-neutral-100 bg-white px-4 pt-2 pb-6 space-y-3 font-medium text-slate-800">
          <Link href="/" onClick={() => setIsOpen(false)} className="block py-2 border-b border-neutral-50 text-[#e8281a] font-semibold">Home</Link>
          <Link href="/#menu" onClick={() => setIsOpen(false)} className="block py-2 border-b border-neutral-50 hover:text-[#e8281a]">Menu</Link>
          <Link href="/#about" onClick={() => setIsOpen(false)} className="block py-2 border-b border-neutral-50 hover:text-[#e8281a]">About Us</Link>
          <Link href="/#special" onClick={() => setIsOpen(false)} className="block py-2 border-b border-neutral-50 hover:text-[#e8281a]">Offers</Link>
          <Link href="/#chefs" onClick={() => setIsOpen(false)} className="block py-2 border-b border-neutral-50 hover:text-[#e8281a]">Chefs</Link>
          <Link href="/#contact-section" onClick={() => setIsOpen(false)} className="block py-2 border-b border-neutral-50 hover:text-[#e8281a]">Contact</Link>
          <div className="pt-2">
            <Link
              href="/#reservation"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 bg-[#e8281a] text-white font-bold rounded-xl shadow-md"
            >
              Book Table
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}