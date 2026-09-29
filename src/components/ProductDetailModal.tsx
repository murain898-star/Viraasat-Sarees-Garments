import React, { useState } from 'react';
import { X, Check, Star, ShieldCheck, ShoppingBag, MessageCircle, Heart } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, wishlist, toggleWishlist, setIsCheckoutOpen, storeConfig } = useStore();
  const [selectedBlouse, setSelectedBlouse] = useState<'unstitched' | 'custom_stitched'>('unstitched');
  const [quantity, setQuantity] = useState(1);
  const isWishlisted = wishlist.includes(product.id);

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedBlouse);
    onClose();
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Namaste, I want to inquire about: "${product.name}" (Price: ₹${product.price.toLocaleString('en-IN')}). Is it in stock for dispatch?`
    );
    window.open(`https://wa.me/${storeConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-500 hover:text-stone-900 bg-white/80 hover:bg-white rounded-full backdrop-blur-md shadow-sm transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Image Showcase */}
          <div className="md:col-span-6 bg-stone-100 relative">
            <div className="aspect-[4/3] md:aspect-auto md:h-full relative overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-stone-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-[#781822] uppercase tracking-wider">
                    Handloom Certified
                  </div>
                  <div className="text-xs text-stone-700 font-medium">
                    {product.weaveOrigin}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-700 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Silk Mark Assured</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Origin */}
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="font-semibold text-[#781822] tracking-wider uppercase">
                  {product.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-stone-800">{product.rating}</span>
                  <span>({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              {/* Title */}
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                  {product.name}
                </h2>
                {product.hindiName && (
                  <p className="text-xs text-stone-500 font-medium mt-1">
                    {product.hindiName}
                  </p>
                )}
              </div>

              {/* Price & Savings */}
              <div className="flex items-baseline gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                <span className="font-mono text-2xl font-bold text-stone-900 tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="font-mono text-sm text-stone-400 line-through tabular-nums">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                      Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({product.discountPercent}% OFF)
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* Fabric Specs Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs border-y border-stone-200 py-3">
                <div>
                  <span className="text-stone-400 block text-[11px]">Fabric</span>
                  <span className="font-medium text-stone-800">{product.fabric}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Zari Work</span>
                  <span className="font-medium text-stone-800">{product.zariType}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Saree Length</span>
                  <span className="font-medium text-stone-800">{product.length}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Border Style</span>
                  <span className="font-medium text-stone-800">{product.borderType}</span>
                </div>
              </div>

              {/* Blouse Stitching Option */}
              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-2">
                  Blouse Piece Option:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedBlouse('unstitched')}
                    className={`p-2.5 text-left border rounded-lg text-xs transition-colors cursor-pointer ${
                      selectedBlouse === 'unstitched'
                        ? 'border-[#781822] bg-[#FAF3F3] text-stone-900 ring-1 ring-[#781822]'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600'
                    }`}
                  >
                    <div className="font-semibold flex items-center justify-between">
                      <span>Unstitched Piece</span>
                      {selectedBlouse === 'unstitched' && <Check className="w-3.5 h-3.5 text-[#781822]" />}
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">Included (0.8m running)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedBlouse('custom_stitched')}
                    className={`p-2.5 text-left border rounded-lg text-xs transition-colors cursor-pointer ${
                      selectedBlouse === 'custom_stitched'
                        ? 'border-[#781822] bg-[#FAF3F3] text-stone-900 ring-1 ring-[#781822]'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600'
                    }`}
                  >
                    <div className="font-semibold flex items-center justify-between">
                      <span>Custom Stitched</span>
                      {selectedBlouse === 'custom_stitched' && <Check className="w-3.5 h-3.5 text-[#781822]" />}
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">Tailored to your size</div>
                  </button>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-stone-800">Quantity:</span>
                <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 text-sm font-semibold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold text-stone-800 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 text-sm font-semibold transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-emerald-700 font-medium">
                  {product.stock} pieces in stock
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-4 border-t border-stone-200">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    addToCart(product, quantity, selectedBlouse);
                    onClose();
                  }}
                  className="flex-1 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-300" />
                  <span>Add to Shopping Bag</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#781822] hover:bg-[#60121a] text-white font-semibold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                >
                  <span>Buy Now (Instant)</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-xl border transition-colors ${
                    isWishlisted
                      ? 'border-red-200 bg-red-50 text-red-600'
                      : 'border-stone-300 text-stone-600 hover:bg-stone-50'
                  }`}
                  title={isWishlisted ? 'Saved' : 'Wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* WhatsApp direct talk button */}
              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                className="w-full bg-[#EBF7F0] hover:bg-[#DDF2E5] text-[#1E7446] border border-[#BDE5CE] font-medium text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Enquire on WhatsApp (दुकानदार से बात करें)</span>
              </button>

              <div className="text-center text-[11px] text-stone-500">
                Care: {product.careInstructions}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
