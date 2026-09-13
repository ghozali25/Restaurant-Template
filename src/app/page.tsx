'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, Leaf, Medal, Play, Star, Truck, Utensils } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import AOSInit from '@/components/AOSInit';

const image = (file: string) => `https://themewagon.github.io/sarab/img/${file}`;

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All');

  const menuItems = [
    { cat: 'Burgers', name: 'Classic Smash Burger', desc: 'Double smashed patty, cheddar, caramelized onions, pickles & special sauce', price: '$14.99', old: '$18.99', img: 'menu/1.jpg', badge: 'Hot', stars: 128 },
    { cat: 'Pizza', name: 'Margherita Royale', desc: 'San Marzano tomatoes, buffalo mozzarella, basil & truffle oil on sourdough', price: '$19.99', old: '$24.99', img: 'menu/2.jpg', badge: 'New', stars: 95 },
    { cat: 'Chicken', name: 'Nashville Hot Chicken', desc: 'Crispy fried chicken in fiery Nashville spice blend with honey drizzle', price: '$12.99', old: '$16.99', img: 'menu/3.jpg', badge: 'Best Seller', stars: 210 },
    { cat: 'Wraps', name: 'Loaded Fajita Wrap', desc: 'Grilled chicken, peppers, sour cream & guacamole in a warm tortilla', price: '$10.99', img: 'menu/4.jpg', stars: 74 },
    { cat: 'Desserts', name: 'Nutella Lava Cake', desc: 'Molten chocolate cake with Nutella center, vanilla ice cream & caramel', price: '$8.99', old: '$11.99', img: 'menu/5.jpg', badge: 'New', stars: 56 },
    { cat: 'Pasta', name: 'Truffle Mushroom Pasta', desc: 'Al dente tagliatelle, wild mushrooms, black truffle, parmesan & thyme', price: '$16.99', img: 'menu/6.jpg', badge: "Chef's Pick", stars: 88 }
  ];

  const filteredItems = activeFilter === 'All' ? menuItems : menuItems.filter(item => item.cat.toLowerCase() === activeFilter.toLowerCase());
  return <main className="bg-white">
    <AOSInit />
    <TopBar /><Navbar />

    <section id="hero">
      <div className="hs hs1"></div>
      <div className="hs hs2"></div>
      <div className="hbgtxt">FOOD</div>
      <div className="max-w-7xl mx-auto px-4 min-h-[650px] lg:min-h-[700px] grid lg:grid-cols-2 gap-8 items-center relative py-16 lg:py-10">
        <div data-aos="fade-right" className="relative z-10">
          <div className="hbadge">
            <div className="hbi"><i className="fas fa-star"></i></div>
            <span>#1 Rated Fast Food Restaurant in New York</span>
          </div>
          <h1 className="font-display text-[#1a1a1a] font-black text-5xl sm:text-6xl lg:text-7xl leading-[1.08] max-w-xl">Delicious <span className="hl">Fast Food</span><br />for Every Moment</h1>
          <p className="hdesc">Experience bold flavors crafted from premium ingredients. From crispy burgers to gourmet pizzas — every bite is an adventure worth savoring.</p>
          <div className="flex gap-4 flex-wrap mt-8">
            <Link href="#menu" className="btn-red"><i className="fas fa-utensils"></i> Explore Menu</Link>
            <a href="https://www.youtube.com/watch?v=RXv_uIN6e-Y" target="_blank" className="btn-play">
              <div className="pico"><i className="fas fa-play"></i></div>
              <span>Watch Our Story</span>
            </a>
          </div>
          <div className="hstats">
            {[['850+', 'Happy Customers'], ['120+', 'Menu Items'], ['15+', 'Expert Chefs'], ['12yr', 'Experience']].map(([n, l], i) => <React.Fragment key={l}>{i > 0 && <div className="sdiv"></div>}<div className="hstat"><strong className="snum">{n.replace('+', '')}<em>{n.includes('+') ? '+' : ''}</em></strong><small>{l}</small></div></React.Fragment>)}
          </div>
        </div>
        <div data-aos="fade-left" className="relative min-h-[390px] flex items-center justify-center">
          <div className="hcircle">
            <img src={image('banner-img.jpg')} alt="Burger" />
          </div>
          <div className="fcard fc1">
            <div className="fcoi r"><i className="fas fa-fire"></i></div>
            <div><span className="fcnum">Hot Deal</span><span className="fcsm">30% off today</span></div>
          </div>
          <div className="fcard fc2">
            <div className="fcoi y"><i className="fas fa-star"></i></div>
            <div><span className="fcnum">4.9/5</span><span className="fcsm">2k+ reviews</span></div>
          </div>
          <div className="fcard fc3">
            <div className="fcoi g"><i className="fas fa-clock"></i></div>
            <div><span className="fcnum">20 min</span><span className="fcsm">Fast delivery</span></div>
          </div>
        </div>
      </div>
    </section>

    <div className="bg-[#1a1a1a] text-white overflow-hidden whitespace-nowrap py-4"><div className="marquee inline-flex gap-10 min-w-[200%] text-sm font-semibold tracking-wide">{Array(2).fill(['Crispy Fried Chicken','Gourmet Burgers','Artisan Pizzas','Fresh Wraps & Rolls','Loaded Fries','Ice Cream Shakes','Grilled Sandwiches']).flat().map((item, i) => <span key={i}><i className="fa-solid fa-circle text-[#e8281a] text-[7px] mr-3 align-middle"></i>{item}</span>)}</div></div>

    <section id="category" className="py-24 bg-white"><div className="max-w-7xl mx-auto px-4"><SectionTitle eyebrow="What We Offer" title="Browse by Category" description="From sizzling burgers to exotic world cuisines — find your favourite in our menu" /><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">{['All Items','Burgers','Pizza','Fried Chicken','Wraps','Desserts'].map((title,i) => <Link href="#menu" key={title} data-aos="fade-up" className="group relative h-48 rounded-2xl overflow-hidden shadow-sm" style={{transitionDelay:`${i * 70}ms`}}><img src={image(['category/1.jpg','category/2.jpg','category/3.jpg','category/4.jpg','category/5.jpg','category/6.jpg'][i])} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5"></div><div className="absolute left-4 bottom-4 text-white"><h3 className="font-display font-bold text-xl">{title}</h3><small className="text-white/75">{['99 items','24 items','18 items','15 items','12 items','20 items'][i]}</small></div></Link>)}</div></div></section>

    <section id="about" className="py-24 bg-[#fff8f0]"><div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-14 items-center"><div data-aos="fade-right" className="relative"><img src={image('about1.jpg')} alt="Restaurant" className="rounded-2xl shadow-xl w-full" /><div className="absolute -bottom-6 -right-2 sm:right-8 bg-[#e8281a] text-white p-5 rounded-xl flex gap-3 items-center shadow-lg"><b className="font-display text-4xl">12+</b><span className="text-sm">Years of<br/>Excellence</span></div></div><div data-aos="fade-left"><p className="text-[#e8281a] uppercase tracking-[3px] text-xs font-bold mb-3">Our Story</p><h2 className="font-display text-4xl md:text-5xl font-black text-[#1a1a1a] leading-tight">We Invite You to Visit Our Food Restaurant</h2><p className="text-neutral-500 leading-7 mt-6">Founded in 2012, Sarab began as a small corner joint with a big dream — to serve food that brings people together. Today we&apos;re proud to serve thousands of happy customers every week with same passion that started it all.</p><div className="space-y-5 mt-8">{[[Leaf,'100% Fresh Ingredients','We source locally and sustainably. Every ingredient is hand-picked daily for maximum freshness.'],[Medal,'Award-Winning Recipes','Our signature recipes have won national culinary awards 5 years in a row.'],[Truck,'Lightning-Fast Delivery','Hot, fresh food at your door in under 25 minutes.']].map(([Icon,title,text]) => {const Component=Icon as typeof Leaf; return <div key={title as string} className="flex gap-4"><span className="w-11 h-11 rounded-full bg-white text-[#e8281a] grid place-items-center shadow-sm flex-none"><Component size={20}/></span><div><h3 className="font-semibold text-[#1a1a1a]">{title as string}</h3><p className="text-sm text-neutral-500 mt-1">{text as string}</p></div></div>})}</div><Link href="/about" className="inline-block mt-8 bg-[#e8281a] text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-[#c91d13] transition">Discover Our Story</Link></div></div></section>

    <section id="menu" className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle eyebrow="What's Cooking" title="Our Delicious Menu" />
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {['All', 'Burgers', 'Pizza', 'Chicken', 'Wraps', 'Desserts', 'Pasta'].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveFilter(c)}
              className={`filtbtn ${activeFilter === c ? 'active' : ''}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredItems.map((item, i) => (
            <div
              key={item.name}
              data-aos="fade-up"
              style={{ transitionDelay: `${i * 80}ms` }}
              className="mcard group"
            >
              <div className="mimg">
                <img src={image(item.img)} alt={item.name} />
                {item.badge && (
                  <span className={`mbdg ${item.badge === 'New' ? 'new' : item.badge === 'Hot' ? 'hot' : ''}`}>
                    <i className="fas fa-star mr-1 text-[10px]"></i>{item.badge}
                  </span>
                )}
              </div>
              <div className="mbody">
                <div className="mcat">{item.cat}</div>
                <div className="mtit">{item.name}</div>
                <div className="mdesc">{item.desc}</div>
                <div className="mfoot">
                  <div>
                    <div className="mprice">{item.price}{item.old && <small>{item.old}</small>}</div>
                    <div className="mstars"><i className="fas fa-star"></i> <span>({item.stars})</span></div>
                  </div>
                  <button type="button" className="madd" title="View Details"><i className="fas fa-plus"></i></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="special" className="py-20 bg-[#fff8f0] overflow-hidden relative">
      <div className="hs hs1"></div>
      <div className="hs hs2"></div>
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 items-center gap-8 relative z-10">
        <div data-aos="fade-right" className="text-[#1a1a1a]">
          <p className="text-[#e8281a] uppercase tracking-[3px] font-bold text-xs">Limited Time Offer</p>
          <h2 className="font-display text-4xl md:text-5xl font-black mt-3">Get 30% Off Our Signature Burger Meal</h2>
          <p className="text-neutral-500 mt-5 leading-7">Don&apos;t miss our weekend special — grab our mouthwatering signature burger meal while offer lasts.</p>
          <div className="mt-7 flex gap-4 items-center">
            <span className="font-display font-black text-4xl text-[#e8281a]">$17.49</span>
            <span className="text-neutral-400 line-through text-lg">$24.99</span>
            <Link href="#menu" className="btn-red ml-4">Order Now</Link>
          </div>
        </div>
        <div data-aos="fade-left" className="relative flex items-center justify-center min-h-[380px]">
          <div className="offcircle">
            <img src={image('off-img.jpg')} alt="Special Burger" />
            <div className="fcard fc1">
              <div className="fcoi r"><i className="fas fa-fire"></i></div>
              <div><span className="fcnum">30% OFF</span><span className="fcsm">Limited deal</span></div>
            </div>
            <div className="fcard fc2">
              <div className="fcoi y"><i className="fas fa-star"></i></div>
              <div><span className="fcnum">Combo</span><span className="fcsm">Meal deal</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="gallery" className="py-24 bg-[#fff8f0]"><div className="max-w-7xl mx-auto px-4"><SectionTitle eyebrow="Food Showcase" title="Let&apos;s See Our Fast Food" /><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{['portfolio/work1.jpg','portfolio/work2.jpg','portfolio/work3.jpg','portfolio/work4.jpg','portfolio/work5.jpg','menu/6.jpg','about2.jpg','menu/4.jpg'].map((src,i)=><div key={src} data-aos="fade-up" className={`overflow-hidden rounded-xl group ${i===0||i===4?'md:col-span-2':''}`}><img src={image(src)} alt="Sarab food" className="w-full h-48 md:h-60 object-cover group-hover:scale-110 transition duration-500" /></div>)}</div></div></section>

    <section id="chefs" className="py-24"><div className="max-w-7xl mx-auto px-4"><SectionTitle eyebrow="The Culinary Team" title="Meet Our Expert Chefs" /><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{[['chef/chef1.jpg','Alice Mortal','Head Chef'],['chef/chef2.jpg','Michael Corn','Grill Master'],['chef/chef3.jpg','Sarah Jackson','Pastry Chef'],['chef/chef4.jpg','John Rambo','Sous Chef']].map(([src,name,role],i)=><div key={name} data-aos="fade-up" style={{transitionDelay:`${i*80}ms`}} className="text-center group"><div className="overflow-hidden rounded-2xl bg-[#fff8f0]"><img src={image(src)} alt={name} className="w-full h-72 object-cover object-top group-hover:scale-105 transition duration-500" /></div><h3 className="font-display font-bold text-xl mt-4">{name}</h3><p className="text-[#e8281a] text-xs uppercase tracking-widest mt-1">{role}</p></div>)}</div></div></section>

    <section id="hours" className="py-24 bg-[#2d6a4f] text-white"><div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center"><div data-aos="fade-right"><p className="text-[#f6a623] uppercase tracking-[3px] font-bold text-xs">Opening Hours</p><h2 className="font-display font-black text-4xl md:text-5xl mt-3">We&apos;re Open For You</h2><p className="text-white/70 mt-5">Fresh food and good moments await. Visit us or place your order online.</p></div><div data-aos="fade-left" className="rounded-2xl bg-white/10 border border-white/10 p-6 divide-y divide-white/10">{[['Monday - Tuesday','Closed'],['Wednesday - Thursday','09:00 AM - 10:00 PM'],['Friday - Saturday','09:00 AM - 11:30 PM'],['Sunday','10:00 AM - 10:00 PM']].map(([day,time])=><div key={day} className="flex justify-between gap-4 py-4 text-sm"><span>{day}</span><strong className={time==='Closed'?'text-[#f6a623]':''}>{time}</strong></div>)}</div></div></section>

    <section id="testimonials" className="py-24 bg-[#fff8f0]">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle eyebrow="What People Say" title="Our Customers Feedback" />
        <div data-aos="fade-up" className="bg-white shadow-xl rounded-2xl p-8 sm:p-12 text-center">
          <div className="text-[#f6a623] flex justify-center gap-1 mb-5">
            {Array(5).fill(0).map((_,i)=><Star key={i} size={17} fill="currentColor"/>)}
          </div>
          <blockquote className="font-display text-2xl md:text-3xl leading-relaxed text-[#1a1a1a] mt-5">
            “Honestly the best burgers I&apos;ve ever had. The smash burger was perfectly cooked, and loaded fries were incredible!”
          </blockquote>
          <div className="mt-7">
            <strong className="block">Emma Wilson</strong>
            <small className="text-neutral-500">Food Enthusiast</small>
          </div>
        </div>
      </div>
    </section>

    <section id="reservation" className="py-24">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
        <div data-aos="fade-right">
          <p className="text-[#e8281a] uppercase tracking-[3px] font-bold text-xs">Book a Table</p>
          <h2 className="font-display font-black text-4xl md:text-5xl mt-3 text-[#1a1a1a]">Make a Reservation</h2>
          <p className="text-neutral-500 mt-5 leading-7">Reserve your table for a memorable dining experience. We recommend booking ahead for weekends.</p>
          <img src={image('reservation.jpg')} alt="Restaurant table" className="rounded-2xl mt-8 h-48 w-full object-cover" />
        </div>
        <form data-aos="fade-left" className="bg-[#fff8f0] rounded-2xl p-6 sm:p-8 grid sm:grid-cols-2 gap-4">
          <input required placeholder="Your Name" className="rounded-lg bg-white border border-neutral-200 px-4 py-3.5 text-sm outline-none focus:border-[#e8281a]"/>
          <input required type="email" placeholder="Email Address" className="rounded-lg bg-white border border-neutral-200 px-4 py-3.5 text-sm outline-none focus:border-[#e8281a]"/>
          <input placeholder="Phone Number" className="rounded-lg bg-white border border-neutral-200 px-4 py-3.5 text-sm outline-none focus:border-[#e8281a]"/>
          <select className="rounded-lg bg-white border border-neutral-200 px-4 py-3.5 text-sm outline-none focus:border-[#e8281a]">
            <option>2 Persons</option>
            <option>3 Persons</option>
            <option>4 Persons</option>
          </select>
          <input type="date" className="rounded-lg bg-white border border-neutral-200 px-4 py-3.5 text-sm outline-none focus:border-[#e8281a]"/>
          <input type="time" className="rounded-lg bg-white border border-neutral-200 px-4 py-3.5 text-sm outline-none focus:border-[#e8281a]"/>
          <textarea placeholder="Special requests" className="sm:col-span-2 rounded-lg bg-white border border-neutral-200 px-4 py-3.5 text-sm outline-none focus:border-[#e8281a] h-28 resize-none"></textarea>
          <button className="sm:col-span-2 bg-[#e8281a] hover:bg-[#c91d13] text-white font-semibold py-3.5 rounded-lg transition">Reserve Your Table</button>
        </form>
      </div>
    </section>

    <section id="newsletter" className="py-16 bg-[#e8281a] text-white">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-7">
        <div>
          <p className="text-[#f6a623] uppercase text-xs tracking-[3px] font-bold">Stay Connected</p>
          <h2 className="font-display text-3xl font-black mt-2">Subscribe & Get Exclusive Deals</h2>
        </div>
        <form className="flex w-full md:w-auto">
          <input type="email" placeholder="Your email address" className="min-w-0 w-full md:w-64 px-4 py-3 rounded-l-lg text-[#444] outline-none"/>
          <button className="bg-[#1a1a1a] px-5 py-3 font-semibold text-sm rounded-r-lg">Subscribe</button>
        </form>
      </div>
    </section>

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
    <Footer />
  </main>;
}