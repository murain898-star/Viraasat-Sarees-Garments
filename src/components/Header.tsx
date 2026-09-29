import React, { useState } from 'react';
import { ShoppingBag, Heart, User, Search, X, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    currentUser,
    setIsAuthModalOpen,
    storeConfig,
    setActiveCategory,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [showBanner, setShowBanner] = useState(true);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navCategories = [
    { label: 'All Sarees', cat: 'All' },
    { label: 'Banarasi Silk', cat: 'Banarasi' },
    { label: 'Kanjivaram', cat: 'Kanjivaram' },
    { label: 'Organza', cat: 'Organza' },
    { label: 'Bridal Lehengas', cat: 'Bridal Lehenga' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80">
      {/* Slim Promotional Announcement Bar */}
      {showBanner && storeConfig.announcementText && (
        <div className="bg-[#781822] text-[#F9F4EB] text-xs font-medium py-1.5 px-4 flex items-center justify-between text-center border-b border-amber-900/30">
          <div className="flex-1 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="truncate">{storeConfig.announcementText}</span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="text-stone-300 hover:text-white ml-2 p-0.5 rounded transition-colors"
            title="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Contract (1 Row, 3 Zones) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveCategory('All');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left group cursor-pointer focus-visible:outline-none"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#4A1017] group-hover:text-[#781822] transition-colors">
              {storeConfig.brandName}
            </span>
          </button>
        </div>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
          {navCategories.map((item) => (
            <button
              key={item.cat}
              onClick={() => {
                setActiveCategory(item.cat);
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#781822] transition-colors py-1 cursor-pointer hover:border-b-2 hover:border-[#781822] focus-visible:outline-none"
            >
              {item.label}
            </button>
          ))}
          <a
            href="#craftsmanship"
            className="hover:text-[#781822] transition-colors py-1 cursor-pointer focus-visible:outline-none"
          >
            Our Heritage
          </a>
        </nav>

        {/* Zone 3: Primary Actions (Search, Wishlist, Bag, Google Profile, Admin Switcher) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Toggle */}
          <div className="relative">
            {showSearchInput ? (
              <div className="flex items-center bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 shadow-sm">
                <Search className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search sarees, silk, lehenga..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-36 sm:w-52 text-xs text-stone-800 placeholder-stone-400 focus:outline-none bg-transparent"
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    setSearchQuery('');
                  }}
                  className="text-stone-400 hover:text-stone-600 ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-stone-700 hover:text-[#781822] hover:bg-stone-100 rounded-full transition-colors"
                title="Search collection"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Wishlist count */}
          <button
            onClick={() => {
              setActiveCategory('All');
              const el = document.getElementById('catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="p-2 text-stone-700 hover:text-[#781822] hover:bg-stone-100 rounded-full transition-colors relative"
            title="Saved Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#781822] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-stone-900 hover:text-[#781822] hover:bg-stone-100 rounded-lg transition-colors relative"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 text-[#781822]" />
            <span className="text-xs font-semibold tabular-nums text-stone-800 hidden sm:inline">
              Bag ({cartCount})
            </span>
            {cartCount > 0 && (
              <span className="sm:hidden absolute top-1 right-1 w-4 h-4 bg-[#781822] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account / Google Login Button */}
          {currentUser ? (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 border border-stone-300 rounded-lg bg-white hover:bg-stone-50 transition-colors text-left cursor-pointer"
              title="Google Account Profile"
            >
              <div className="w-6 h-6 rounded-full bg-[#4A1017] text-[#FAF8F5] text-xs font-semibold flex items-center justify-center shrink-0">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'G'}
              </div>
              <div className="hidden md:block max-w-[100px] truncate text-xs font-medium text-stone-800">
                {currentUser.name.split(' ')[0]}
              </div>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-lg hover:border-stone-400 hover:bg-stone-50 transition-colors cursor-pointer"
            >
              <User className="w-4 h-4 text-stone-600" />
              <span>Sign in</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
