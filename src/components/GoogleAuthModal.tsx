import React, { useState } from 'react';
import { X, LogOut, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DEMO_USERS } from '../data/initialData';

export const GoogleAuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    currentUser,
    loginWithGoogle,
    logout
  } = useStore();

  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [showCustomForm, setShowCustomForm] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim()) return;
    loginWithGoogle(customEmail, 'customer', customName || customEmail.split('@')[0]);
  };

  // Only customer users for selection
  const customerUsers = DEMO_USERS.filter((u) => u.role === 'customer');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            {/* Google G Logo SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.98 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span className="font-semibold text-sm text-stone-800">
              Sign in with Google
            </span>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {currentUser ? (
            /* Already logged in view */
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-[#781822] text-[#FAF8F5] text-2xl font-bold flex items-center justify-center mx-auto shadow-md">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'G'}
                </div>
                <div>
                  <h3 className="font-semibold text-base text-stone-900">{currentUser.name}</h3>
                  <p className="text-xs text-stone-500 font-mono">{currentUser.email}</p>
                  <span className="inline-block mt-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    ✓ Google Account Connected
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setIsAuthModalOpen(false)}
                  className="w-full bg-[#781822] hover:bg-[#60121a] text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
                >
                  Continue Shopping (शॉपिंग जारी रखें)
                </button>

                <button
                  onClick={() => {
                    logout();
                    setIsAuthModalOpen(false);
                  }}
                  className="w-full bg-stone-100 hover:bg-red-50 hover:text-red-600 text-stone-700 font-medium text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out of Google</span>
                </button>
              </div>
            </div>
          ) : (
            /* Choose Account or Login */
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Welcome to Viraasat Sarees
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Sign in with your Google / Gmail account to save orders, delivery address, and wishlist.
                </p>
              </div>

              {/* Preset 1-Click Accounts */}
              <div className="space-y-2">
                {customerUsers.map((usr) => (
                  <button
                    key={usr.id}
                    onClick={() => loginWithGoogle(usr.email, 'customer', usr.name)}
                    className="w-full text-left p-3 border border-stone-200 rounded-xl hover:border-[#781822] hover:bg-[#FAF8F5] transition-all flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-full bg-stone-100 border border-stone-200 text-stone-700 font-bold flex items-center justify-center group-hover:bg-[#781822] group-hover:text-white transition-colors">
                      {usr.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-stone-900">
                        {usr.name}
                      </div>
                      <div className="text-[11px] text-stone-500 font-mono truncate">
                        {usr.email}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Or Use Another Email */}
              <div className="pt-2">
                {!showCustomForm ? (
                  <button
                    onClick={() => setShowCustomForm(true)}
                    className="w-full text-center text-xs font-semibold text-[#781822] hover:underline cursor-pointer"
                  >
                    + Sign in with another Gmail address
                  </button>
                ) : (
                  <form onSubmit={handleCustomSubmit} className="space-y-3 pt-2 border-t border-stone-200">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Your Gmail Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="youremail@gmail.com"
                        value={customEmail}
                        onChange={(e) => setCustomEmail(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#781822]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ramesh Chandra"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#781822]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#781822] hover:bg-[#60121a] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
                    >
                      Sign In with this Gmail
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
