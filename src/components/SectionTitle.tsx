import React from 'react';

export default function SectionTitle({ eyebrow, title, description, light = false }: { eyebrow: string; title: string; description?: string; light?: boolean }) {
  return <div className={`text-center max-w-2xl mx-auto mb-12 ${light ? 'text-white' : ''}`} data-aos="fade-up">
    <p className="text-[#e8281a] uppercase tracking-[3px] text-xs font-bold mb-3">{eyebrow}</p>
    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-4">{title}</h2>
    {description && <p className={`leading-relaxed ${light ? 'text-white/70' : 'text-neutral-500'}`}>{description}</p>}
  </div>;
}