import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartTotal,
    removeFromCart,
    updateCartQuantity,
    setIsCheckoutOpen,
    storeConfig
  } = useStore();

  const [couponInput, setCouponInput] = useState('UTSAV10');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('UTSAV10');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  // Calculate discount
  let discountAmount = 0;
  if (appliedCoupon) {
    const coupon = storeConfig.coupons.find((c) => c.code.toUpperCase() === appliedCoupon.toUpperCase());
    if (coupon && cartTotal >= coupon.minOrderAmount) {
      discountAmount = Math.round((cartTotal * coupon.discountPercent) / 100);
    }
  }

  const freeShippingThreshold = storeConfig.freeShippingThreshold;
  const isFreeShipping = cartTotal >= freeShippingThreshold;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const shippingFee = cart.length === 0 ? 0 : isFreeShipping ? 0 : 150;
  const finalTotal = Math.max(0, cartTotal - discountAmount + shippingFee);

  const handleApplyCoupon = () => {
    setCouponError(null);
    const code = couponInput.trim().toUpperCase();
    const coupon = storeConfig.coupons.find((c) => c.code.toUpperCase() === code);
    if (!coupon) {
      setCouponError('Invalid coupon code. Try "UTSAV10"');
      return;
    }
    if (cartTotal < coupon.minOrderAmount) {
      setCouponError(`Min order value of ₹${coupon.minOrderAmount.toLocaleString('en-IN')} required.`);
      return;
    }
    setAppliedCoupon(code);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#781822]" />
              <h2 className="font-serif text-lg font-bold text-stone-900">
                Your Shopping Bag ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-5 py-3 bg-amber-50/70 border-b border-amber-200/50 text-xs">
            {isFreeShipping ? (
              <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>You unlocked <strong>Free Express Shipping</strong> across India!</span>
              </div>
            ) : (
              <div className="text-stone-700">
                Add <span className="font-bold text-[#781822]">₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</span> more to get <strong>Free Pan-India Delivery</strong>!
                <div className="w-full bg-stone-200 rounded-full h-1.5 mt-1.5 overflow-hidden">
                  <div
                    className="bg-[#781822] h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (cartTotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center text-stone-500 space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                <p className="font-serif text-base font-semibold text-stone-700">Your bag is empty</p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our handwoven Banarasi & Kanjivaram collection to add royal heritage sarees to your wardrobe.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 bg-[#781822] text-white text-xs font-semibold rounded-lg hover:bg-[#60121a] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.blouseOption}`}
                  className="flex gap-3.5 pb-4 border-b border-stone-100 last:border-0"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover rounded-lg bg-stone-100 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-400 hover:text-red-500 p-0.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {item.blouseOption === 'custom_stitched' ? 'Custom Stitched Blouse' : 'Unstitched 0.8m Blouse'}
                      </div>

                      <div className="text-[11px] text-stone-400">
                        {item.product.weaveOrigin.split(',')[0]}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-200 rounded-md overflow-hidden bg-stone-50">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 text-xs"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-semibold tabular-nums text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 text-xs"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-mono text-xs font-bold text-stone-900 tabular-nums">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-[#FAF8F5] space-y-4">
              {/* Coupon Code Box */}
              <div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. UTSAV10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="w-full text-xs pl-8 pr-2 py-2 bg-white border border-stone-300 rounded-lg text-stone-800 uppercase focus:outline-none focus:border-[#781822]"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    className="px-3 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && !couponError && (
                  <p className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1 font-medium">
                    ✓ Coupon &ldquo;{appliedCoupon}&rdquo; applied successfully!
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 mt-1">{couponError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-stone-900 font-medium">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Festive Discount</span>
                    <span className="font-mono tabular-nums">
                      -₹{discountAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-mono tabular-nums">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-medium">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-sm text-stone-900 border-t border-stone-200 pt-2">
                  <span>Estimated Total</span>
                  <span className="font-mono tabular-nums text-base text-[#781822]">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckout}
                className="w-full bg-[#781822] hover:bg-[#60121a] text-white font-semibold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-stone-400 text-center">
                100% Secure Checkout · COD & UPI Supported
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
