import React from 'react';
import { Phone, MessageCircle, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { storeConfig, setActiveCategory } = useStore();

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2B090D] text-stone-300 pt-16 pb-12 border-t border-amber-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF8F5]">
              {storeConfig.brandName}
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Authentic Indian Handlooms, Banarasi Katan Silks, and Bridal Lehengas handcrafted by heirloom weaver families across Varanasi, Kanchipuram, and Rajasthan.
            </p>
          </div>

          {/* Saree Categories */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wide uppercase">
              Handloom Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => handleCategoryClick('Banarasi')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Pure Banarasi Katan Silk Sarees
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Kanjivaram')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Bridal Kanjivaram Silk Sarees
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Organza')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Blush Handloom Organza Sarees
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Bridal Lehenga')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Royal Zardozi Velvet Lehengas
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Chanderi')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Festive Chanderi Tissue Silks
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Help & Trust */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wide uppercase">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Cash on Delivery (COD)</li>
              <li>Silk Mark Purity Certificate</li>
              <li>Free Fall & Pico Service</li>
              <li>Safe 7-Day Exchange Policy</li>
              <li>Worldwide Express Shipping</li>
            </ul>
          </div>

          {/* Contact & Store Address */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wide uppercase">
              Artisan Karigar Studio
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>{storeConfig.shopAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="font-mono">{storeConfig.supportPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: {storeConfig.whatsappNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} {storeConfig.brandName}. Handcrafted with</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>for Indian Heritage Textile Weavers.</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Genuine Handlooms</span>
            </span>
            <span>·</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
