import React from 'react';
import { Award, Feather, ShieldCheck, HeartHandshake } from 'lucide-react';

export const HeritageStory: React.FC = () => {
  return (
    <section id="craftsmanship" className="py-16 bg-[#F4F0EA] border-y border-stone-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#781822]">
            Authentic Weaving Tradition
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1.5">
            The Living Art of Handloom Heritage
          </h2>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">
            Every thread is spun with ancestral devotion. We collaborate directly with master karigars across India&apos;s most celebrated handloom clusters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-stone-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAF3F3] text-[#781822] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-stone-900">
              100% Silk Mark Certified
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every saree undergoes rigorous purity testing for mulberry, katan, and munga silk fibers, backed by official Silk Mark certification.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAF3F3] text-[#781822] flex items-center justify-center">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-stone-900">
              Direct Weaver Guilds
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              No middlemen or wholesale markups. Over 40 handloom artisan families in Varanasi & Kanchipuram receive fair wages directly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAF3F3] text-[#781822] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-stone-900">
              Tested Real Zari
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Woven with authentic gold and silver plated electroplated threads that retain their luminous royal luster over decades of celebrations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAF3F3] text-[#781822] flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-stone-900">
              Bridal Customization
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Complimentary blouse fall-pico, custom master tailoring, and dedicated WhatsApp video call viewings for your special day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
