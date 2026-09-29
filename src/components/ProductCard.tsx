import React from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist, setSelectedProduct } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group relative flex flex-col bg-white border border-stone-200/90 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div
        onClick={() => setSelectedProduct(product)}
        className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Elegant CSS/SVG fallback if image load is blocked
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />

        {/* Fallback container behind image */}
        <div className="absolute inset-0 bg-stone-200 flex flex-col items-center justify-center p-4 text-center -z-10">
          <span className="font-serif text-sm font-semibold text-stone-700">{product.name}</span>
          <span className="text-xs text-stone-500 mt-1">{product.fabric}</span>
        </div>

        {/* Top Badges / Wishlist */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {product.discountPercent > 0 ? (
            <span className="bg-[#781822] text-white text-[11px] font-semibold px-2 py-0.5 rounded shadow-sm">
              {product.discountPercent}% OFF
            </span>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-colors ${
              isWishlisted
                ? 'bg-red-50 text-red-600 shadow-sm'
                : 'bg-white/80 hover:bg-white text-stone-600 hover:text-red-500'
            }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="flex-1 bg-white/95 hover:bg-white text-stone-900 text-xs font-semibold py-2 px-3 rounded-lg shadow-md backdrop-blur-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-stone-600" />
            <span>Quick View</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1, 'unstitched');
            }}
            className="bg-[#781822] hover:bg-[#60121a] text-white text-xs font-semibold py-2 px-3 rounded-lg shadow-md flex items-center justify-center gap-1.5 transition-colors"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata with · separator */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5">
            <span className="font-medium text-[#781822] uppercase tracking-wider text-[11px]">
              {product.category}
            </span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.weaveOrigin.split(',')[0]}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="font-serif text-base font-semibold text-stone-900 line-clamp-1 hover:text-[#781822] cursor-pointer transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Hindi Title Subtitle */}
          {product.hindiName && (
            <p className="text-xs text-stone-500 font-normal line-clamp-1 mt-0.5">
              {product.hindiName}
            </p>
          )}

          {/* Fabric & Zari snippet */}
          <p className="text-xs text-stone-600 line-clamp-1 mt-1.5">
            {product.fabric}
          </p>
        </div>

        {/* Price & Rating Bar */}
        <div className="pt-3 mt-2 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base font-bold text-stone-900 tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="font-mono text-xs text-stone-400 line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs text-stone-600">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium tabular-nums">{product.rating}</span>
            <span className="text-stone-400 text-[11px]">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
