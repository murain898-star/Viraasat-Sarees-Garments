import React from 'react';
import { ArrowRight, Award, Truck, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import heroImg from '../assets/images/hero_luxury_banarasi_saree_1790675121602.jpg';

export const Hero: React.FC = () => {
  const { setActiveCategory } = useStore();

  const handleExplore = (category = 'All') => {
    setActiveCategory(category);
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#781822]">
              <span className="w-6 h-[1.5px] bg-[#781822]" />
              <span>Handcrafted In Varanasi & Kanchipuram</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#340B10] leading-tight text-balance">
              Heirloom Saree Weaves of Royal India
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              Immerse yourself in authentic pure silk artistry. Master weaver creations in pure Banarasi Katan, Kanjivaram Korvai, and royal bridal couture crafted to be cherished across generations.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => handleExplore('All')}
                className="px-6 py-3.5 bg-[#781822] hover:bg-[#60121a] text-white text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Shop Sarees & Lehengas</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleExplore('Banarasi')}
                className="px-5 py-3.5 bg-white hover:bg-stone-50 text-stone-800 text-sm font-medium border border-stone-300 rounded-lg transition-colors cursor-pointer"
              >
                Explore Banarasi Silk
              </button>
            </div>

            {/* Trust Markers - 3 items */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-700 shrink-0" />
                <div className="text-xs text-stone-700">
                  <div className="font-semibold text-stone-900">Silk Mark</div>
                  <div className="text-[11px] text-stone-500">100% Certified</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-700 shrink-0" />
                <div className="text-xs text-stone-700">
                  <div className="font-semibold text-stone-900">Free Shipping</div>
                  <div className="text-[11px] text-stone-500">Above ₹1,999</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
                <div className="text-xs text-stone-700">
                  <div className="font-semibold text-stone-900">COD Available</div>
                  <div className="text-[11px] text-stone-500">Cash on Delivery</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/10] bg-stone-200 shadow-xl border border-stone-200/80 group">
              <img
                src={heroImg}
                alt="Royal Banarasi Silk Saree Collection"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Bottom Subtle Overlay Legend */}
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs flex items-center justify-between pointer-events-none">
                <div>
                  <div className="font-serif text-sm font-semibold tracking-wide text-amber-100">
                    The Shikargah Collection
                  </div>
                  <div className="text-stone-300 text-[11px]">
                    Pure Varanasi Brocade Silk with Tested Gold Zari
                  </div>
                </div>
                <span className="font-mono text-xs tabular-nums text-amber-200 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                  Handcrafted
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
