import React from 'react';
import Image from 'next/image';
import { Leaf, Medal, Truck } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import AOSInit from '@/components/AOSInit';

const image = (file: string) => `https://themewagon.github.io/sarab/img/${file}`;

export default function AboutPage() {
  return <main className="bg-[#fff8f0] text-[#444]">
    <AOSInit />
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-14 items-center">
        <div data-aos="fade-right" className="relative">
          <img src={image('about1.jpg')} alt="Restaurant" className="rounded-2xl shadow-xl w-full" />
          <div className="absolute -bottom-6 -right-2 sm:right-8 bg-[#e8281a] text-white p-5 rounded-xl flex gap-3 items-center shadow-lg">
            <b className="font-display text-4xl">12+</b><span className="text-sm">Years of<br/>Excellence</span>
          </div>
        </div>
        <div data-aos="fade-left">
          <p className="text-[#e8281a] uppercase tracking-[3px] text-xs font-bold mb-3">Our Story</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-[#1a1a1a] leading-tight">We Invite You to Visit Our Food Restaurant</h2>
          <p className="text-neutral-500 leading-7 mt-6">Founded in 2012, Sarab began as a small corner joint with a big dream — to serve food that brings people together. Today we&apos;re proud to serve thousands of happy customers every week with same passion that started it all.</p>
          <div className="space-y-5 mt-8">
            {[[Leaf,'100% Fresh Ingredients','We source locally and sustainably. Every ingredient is hand-picked daily for maximum freshness.'],[Medal,'Award-Winning Recipes','Our signature recipes have won national culinary awards 5 years in a row.'],[Truck,'Lightning-Fast Delivery','Hot, fresh food at your door in under 25 minutes.']].map(([Icon,title,text]) => {const Component=Icon as typeof Leaf; return <div key={title as string} className="flex gap-4"><span className="w-11 h-11 rounded-full bg-white text-[#e8281a] grid place-items-center shadow-sm flex-none"><Component size={20}/></span><div><h3 className="font-semibold text-[#1a1a1a]">{title as string}</h3><p className="text-sm text-neutral-500 mt-1">{text as string}</p></div></div>})}</div>
          <a href="#menu" className="inline-block mt-8 bg-[#e8281a] text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-[#c91d13] transition">Discover Our Story</a>
        </div>
      </div>
    </section>
  </main>;
}