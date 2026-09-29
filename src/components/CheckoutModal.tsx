import React, { useState } from 'react';
import { X, ShieldCheck, Truck, CreditCard, Banknote, QrCode, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CustomerDetails } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    currentUser,
    storeConfig,
    createOrder
  } = useStore();

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'COD' | 'Card' | 'Netbanking'>('UPI');
  const [couponCode, setCouponCode] = useState('UTSAV10');
  const [formData, setFormData] = useState<CustomerDetails>({
    name: currentUser?.name || 'Mura Inamdar',
    email: currentUser?.email || 'mura.in898@gmail.com',
    phone: currentUser?.phone || '+91 98765 12345',
    address: 'B-404, Heritage Towers, Ring Road',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380015',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  if (!isCheckoutOpen) return null;

  // Pricing
  let discountAmount = 0;
  if (couponCode) {
    const coupon = storeConfig.coupons.find((c) => c.code.toUpperCase() === couponCode.toUpperCase());
    if (coupon && cartTotal >= coupon.minOrderAmount) {
      discountAmount = Math.round((cartTotal * coupon.discountPercent) / 100);
    }
  }

  const shippingFee = cartTotal >= storeConfig.freeShippingThreshold ? 0 : 150;
  const finalTotal = Math.max(0, cartTotal - discountAmount + shippingFee);

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = 'Valid 10-digit WhatsApp phone required';
    if (!formData.address.trim()) errors.address = 'Delivery address required';
    if (!formData.city.trim()) errors.city = 'City required';
    if (!formData.pincode.trim() || formData.pincode.length < 6) errors.pincode = '6-digit PIN code required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      createOrder(formData, paymentMethod, couponCode);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 my-6">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-[#FAF8F5] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-[#781822] tracking-wider uppercase">
              100% Secure Checkout
            </div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
              Delivery & Payment Details
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Column: Form Fields */}
            <div className="md:col-span-7 space-y-4">
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#781822]" />
                <span>1. Shipping Address (डिलीवरी पता)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Full Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priyadarshini Mehta"
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#781822]"
                  />
                  {formErrors.name && <span className="text-[10px] text-red-600">{formErrors.name}</span>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    WhatsApp / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#781822]"
                  />
                  {formErrors.phone && <span className="text-[10px] text-red-600">{formErrors.phone}</span>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Email Address (for Receipt)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="customer@gmail.com"
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#781822]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Complete Address (Flat, Wing, Society, Street) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Flat 302, Ganga Heights, Near Silk Market..."
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#781822]"
                  />
                  {formErrors.address && <span className="text-[10px] text-red-600">{formErrors.address}</span>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Mumbai, Varanasi, Jaipur"
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#781822]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    PIN Code (6 digits) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="e.g. 221001"
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#781822]"
                  />
                  {formErrors.pincode && <span className="text-[10px] text-red-600">{formErrors.pincode}</span>}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="pt-3">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                  <CreditCard className="w-4 h-4 text-[#781822]" />
                  <span>2. Payment Option (भुगतान विधि)</span>
                </h3>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-3 text-left border rounded-xl flex items-start gap-2.5 cursor-pointer transition-colors ${
                      paymentMethod === 'UPI'
                        ? 'border-[#781822] bg-[#FAF3F3] text-stone-900 ring-1 ring-[#781822]'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-[#781822] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold">UPI / Google Pay</div>
                      <div className="text-[11px] text-stone-500">GPay, PhonePe, Paytm QR</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-3 text-left border rounded-xl flex items-start gap-2.5 cursor-pointer transition-colors ${
                      paymentMethod === 'COD'
                        ? 'border-[#781822] bg-[#FAF3F3] text-stone-900 ring-1 ring-[#781822]'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold">Cash on Delivery</div>
                      <div className="text-[11px] text-stone-500">Pay when saree arrives</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Card')}
                    className={`p-3 text-left border rounded-xl flex items-start gap-2.5 cursor-pointer transition-colors ${
                      paymentMethod === 'Card'
                        ? 'border-[#781822] bg-[#FAF3F3] text-stone-900 ring-1 ring-[#781822]'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold">Credit / Debit Card</div>
                      <div className="text-[11px] text-stone-500">Visa, RuPay, Master</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Netbanking')}
                    className={`p-3 text-left border rounded-xl flex items-start gap-2.5 cursor-pointer transition-colors ${
                      paymentMethod === 'Netbanking'
                        ? 'border-[#781822] bg-[#FAF3F3] text-stone-900 ring-1 ring-[#781822]'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold">Net Banking</div>
                      <div className="text-[11px] text-stone-500">SBI, HDFC, ICICI, etc.</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Order Review */}
            <div className="md:col-span-5 bg-stone-50 border border-stone-200/80 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Order Summary ({cart.length})
                  </h4>
                  <span className="text-[11px] text-stone-500">Handloom Package</span>
                </div>

                {/* Items preview */}
                <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.blouseOption}`} className="flex items-center gap-2.5 text-xs">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-12 object-cover rounded bg-stone-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-stone-900 truncate">{item.product.name}</div>
                        <div className="text-[11px] text-stone-500">Qty: {item.quantity} · {item.blouseOption}</div>
                      </div>
                      <div className="font-mono font-semibold tabular-nums text-stone-800">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-stone-200 pt-3 space-y-1.5 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Items Total</span>
                    <span className="font-mono tabular-nums text-stone-900 font-medium">
                      ₹{cartTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Discount (UTSAV10)</span>
                      <span className="font-mono tabular-nums">
                        -₹{discountAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-mono tabular-nums">
                      {shippingFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-stone-900 border-t border-stone-200 pt-2">
                    <span>Total Payable</span>
                    <span className="font-mono tabular-nums text-base text-[#781822]">
                      ₹{finalTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {paymentMethod === 'COD' && (
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900">
                    <strong>Cash on Delivery:</strong> Please keep ₹{finalTotal.toLocaleString('en-IN')} ready in cash or UPI scan at delivery time.
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#781822] hover:bg-[#60121a] text-white font-semibold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span>Placing Your Order...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-amber-300" />
                      <span>Confirm Order (ऑर्डर कन्फर्म करें)</span>
                    </>
                  )}
                </button>
                <div className="text-[10px] text-stone-400 text-center mt-2 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Silk Mark Authentic Guarantee · Easy 7-Day Exchange</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
