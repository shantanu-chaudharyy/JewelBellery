// JewelBellery — Single-file React app (App.jsx)
// Usage notes (read before running):
// 1) This is a single-file React component ready for use in a create-react-app / Vite + React project.
// 2) The design uses Tailwind CSS. Install and configure Tailwind in your project, or replace classes with your own CSS.
// 3) Optional packages (recommended): framer-motion, lottie-react, lucide-react. Install with:
//    npm install framer-motion lottie-react lucide-react
// 4) Replace placeholder image URLs and Lottie URLs with your own assets for production.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { ShoppingCart, Search, Heart, X } from 'lucide-react';

// --- Mock data ---
const products = [
  { id: 1, name: 'Aurora Diamond Ring', price: 2499, img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=1' },
  { id: 2, name: 'Moonstone Pendant', price: 1299, img: 'https://images.unsplash.com/photo-1549237515-66d7f5b0e9b5?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=2' },
  { id: 3, name: 'Gold Hoop Earrings', price: 899, img: 'https://images.unsplash.com/photo-1556228720-4f6f0f1b0d3b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3' },
  { id: 4, name: 'Sapphire Bracelet', price: 3199, img: 'https://images.unsplash.com/photo-1619880199256-3a3ce1b8b0e0?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=4' },
  { id: 5, name: 'Pearl Classic Set', price: 1999, img: 'https://images.unsplash.com/photo-1602810316360-8b2a6c4a1a7a?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=5' },
  { id: 6, name: 'Minimalist Band', price: 499, img: 'https://images.unsplash.com/photo-1526318472351-c75fcf070e5d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6' }
];

// Lottie URL example from lottie.host (replace with your own if wanted)
const lottieUrl = 'https://assets4.lottiefiles.com/packages/lf20_touohxv0.json';

export default function App() {
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const filtered = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  function addToCart(product) {
    setCart(prev => {
      const found = prev.find(i => i.id === product.id);
      if (found) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(p => p.id !== id));
  }

  function cartTotal() {
    return cart.reduce((s, i) => s + i.price * i.qty, 0);
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Promo bar */}
      <div className="w-full bg-brand-50 text-brand-700 text-sm py-2 text-center border-b border-brand-100">
        Flat 30% on Silver Jewellery. Use: <span className="font-semibold">GRAND30</span>
      </div>

      {/* NAV */}
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-full p-2 shadow-md flex items-center gap-3">
            <img src="/logo.png" alt="Jewelbellery logo" className="h-12 w-12 rounded-full object-contain" />
            <div className="hidden md:block">
              <div className="text-xl font-[600]" style={{fontFamily:'Playfair Display'}}>Jewelbellery</div>
              <div className="text-xs text-gray-500">Your Premium Jewellery At Your Doorstep</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search rings, pendants, collections..."
              className="pl-10 pr-4 py-2 rounded-full shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
            <div className="absolute left-3 top-2.5 text-gray-500"><Search size={16} /></div>
          </div>

          <button onClick={() => setShowCart(true)} className="relative bg-white p-2 rounded-xl shadow hover:scale-105 transition-transform">
            <ShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cart.length}</span>
            )}
          </button>
        </div>
      </nav>

      {/* Categories strip */}
      <div className="w-full border-y bg-white">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
          <div className="flex gap-6 text-sm py-3 whitespace-nowrap">
            <button className="hover:text-brand-700">Shop by Category</button>
            <button className="hover:text-brand-700">Gold with Lab Diamonds</button>
            <button className="hover:text-brand-700">Gift Store</button>
            <button className="hover:text-brand-700">Men's Jewellery</button>
            <button className="hover:text-brand-700">Latest Collections</button>
            <button className="hover:text-brand-700">More at JB</button>
          </div>
        </div>
      </div>

      {/* HERO */}
      <header className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight" style={{fontFamily:'Playfair Display'}}>Timeless jewellery, thoughtfully crafted.</h1>
          <p className="mt-4 text-gray-600">Discover artisan rings, necklaces and bracelets — curated for special moments and everyday shine.</p>
          <div className="mt-6 flex gap-3">
            <button className="px-6 py-3 bg-gradient-to-r from-brand-600 to-accent-500 rounded-full text-white font-semibold shadow-lg hover:scale-105 transform transition">Shop Collections</button>
            <button onClick={() => setSelected(products[0])} className="px-6 py-3 border rounded-full border-gray-300">Quick look</button>
          </div>

          <div className="mt-6 flex gap-4">
            <div className="text-sm text-gray-500">Free worldwide shipping • 30-day returns</div>
          </div>
        </motion.div>

        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="relative">
          <div className="rounded-[1.5rem] overflow-hidden shadow-2xl bg-gradient-to-br from-brand-50 via-white to-accent-100 border border-brand-100">
            {/* Lottie animation layered on a soft card */}
            <div className="relative bg-white/70 backdrop-blur p-6 flex items-center justify-center">
              <div className="w-full h-64 md:h-80">
                <Lottie animationData={null} path={lottieUrl} />
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* PRODUCT GRID */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold" style={{fontFamily:'Playfair Display'}}>Featured</h2>
          <div className="text-sm text-gray-500">Hand-picked pieces</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map(product => (
            <motion.div key={product.id} whileHover={{ translateY: -6 }} className="bg-white rounded-[1.25rem] p-4 shadow hover:shadow-xl transition-shadow border border-gray-100">
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{product.name}</div>
                  <div className="text-sm text-gray-500">$ {product.price}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => addToCart(product)} className="p-2 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700">
                    <ShoppingCart size={16} />
                  </button>
                  <button onClick={() => setSelected(product)} className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100">
                    Quick
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 py-12 text-sm text-gray-600 border-t">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          <div>
            <div className="font-semibold">JewelBellery</div>
            <div className="mt-2">Handcrafted by artisans — ethical materials, timeless design.</div>
          </div>
          <div className="flex gap-6">
            <div>
              <div className="font-semibold">Customer Care</div>
              <div className="mt-2">Shipping · Returns · FAQs</div>
            </div>
            <div>
              <div className="font-semibold">Contact</div>
              <div className="mt-2">hello@jewelbellery.example</div>
            </div>
          </div>
        </div>
      </footer>

      {/* Quick view modal */}
      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-6">
              <button className="absolute right-4 top-4 p-2 rounded-md" onClick={() => setSelected(null)}><X /></button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="rounded-xl overflow-hidden">
                  <img src={selected.img} alt={selected.name} className="w-full h-96 object-cover" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{selected.name}</div>
                  <div className="text-brand-600 text-xl mt-2">$ {selected.price}</div>
                  <p className="mt-4 text-gray-600">A refined piece inspired by classic forms and modern sensibility. Perfect for gifting or everyday elegance.</p>
                  <div className="mt-6 flex gap-3">
                    <button onClick={() => { addToCart(selected); setSelected(null); }} className="px-6 py-3 bg-gradient-to-r from-brand-600 to-accent-500 text-white rounded-full font-semibold">Add to cart</button>
                    <button className="px-6 py-3 border rounded-full" onClick={() => alert('Added to wishlist (demo)')}>Wishlist</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart slide-over */}
      <AnimatePresence>
        {showCart && (
          <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed right-0 top-0 h-full w-full md:w-96 bg-white z-50 shadow-2xl">
            <div className="p-6 flex items-center justify-between border-b">
              <div className="font-semibold text-lg">Cart</div>
              <button onClick={() => setShowCart(false)} className="p-2 rounded-md"><X /></button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto h-[calc(100%-160px)]">
              {cart.length === 0 && <div className="text-gray-500">Your cart is empty. Add your favorite piece!</div>}
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <img src={item.img} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">${item.price} · Qty: {item.qty}</div>
                  </div>
                  <div>
                    <button onClick={() => removeFromCart(item.id)} className="text-sm text-pink-500">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t">
              <div className="flex items-center justify-between text-gray-700 font-medium">Total <span>${cartTotal()}</span></div>
              <div className="mt-4">
                <button className="w-full py-3 rounded-full bg-pink-600 text-white font-semibold">Checkout</button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

    </div>
  );
}
