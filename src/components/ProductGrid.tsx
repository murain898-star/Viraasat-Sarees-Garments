import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { useStore } from '../context/StoreContext';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { products, activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useStore();
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categories = [
    'All',
    'Banarasi',
    'Kanjivaram',
    'Organza',
    'Bridal Lehenga',
    'Chanderi',
    'Festive Wear'
  ];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (activeCategory !== 'All') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.hindiName && p.hindiName.toLowerCase().includes(q)) ||
          p.fabric.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.weaveOrigin.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // Featured
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <section id="catalog-section" className="py-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#781822]">
              The Royal Wardrobe
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Curated Handloom Sarees & Garments
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Hand-selected weaves from Varanasi, Kanchipuram, Chanderi, and Jaipur royal karigars.
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <SlidersHorizontal className="w-4 h-4 text-stone-500" />
            <span className="text-xs font-medium text-stone-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-medium bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-stone-800 focus:outline-none focus:border-[#781822] cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Category Filter Tabs - Interactive Buttons (Allowed by Constitution) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#781822] text-white shadow-sm'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              {cat === 'All' ? 'All Collections' : cat}
            </button>
          ))}
        </div>

        {/* Active Search Badge */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between bg-stone-100/80 px-4 py-2 rounded-lg text-xs text-stone-700">
            <span>
              Showing results for &ldquo;<span className="font-semibold text-stone-900">{searchQuery}</span>&rdquo; ({filteredProducts.length} items found)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#781822] font-semibold hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear search</span>
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white border border-stone-200 rounded-xl p-8 max-w-lg mx-auto">
            <h3 className="font-serif text-lg font-semibold text-stone-800">
              No sarees found in this category
            </h3>
            <p className="text-xs text-stone-500 mt-2">
              Try switching to &ldquo;All Collections&rdquo; or clearing your search keywords.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#781822] text-white text-xs font-semibold rounded-lg hover:bg-[#60121a] transition-colors"
            >
              View All Sarees
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
