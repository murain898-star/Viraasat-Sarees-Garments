import React from 'react';
import { CheckCircle2, MessageCircle, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderSuccessModal: React.FC = () => {
  const { lastCreatedOrder, setLastCreatedOrder, storeConfig } = useStore();

  if (!lastCreatedOrder) return null;

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Namaste Viraasat Sarees!\nI have placed Order #${lastCreatedOrder.orderNumber}.\nName: ${lastCreatedOrder.customer.name}\nTotal: ₹${lastCreatedOrder.totalAmount.toLocaleString('en-IN')}\nPayment: ${lastCreatedOrder.paymentMethod}\nPlease confirm dispatch!`
    );
    window.open(`https://wa.me/${storeConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 p-6 sm:p-8 text-center space-y-5">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#781822]">
            Order Confirmed · धन्यवाद!
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
            Order #{lastCreatedOrder.orderNumber}
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            We have received your royal saree order. Our handloom dispatch team is preparing your package.
          </p>
        </div>

        {/* Receipt Box */}
        <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-4 text-left text-xs space-y-2.5">
          <div className="flex justify-between border-b border-stone-200/80 pb-2">
            <span className="text-stone-500">Customer:</span>
            <span className="font-semibold text-stone-900">{lastCreatedOrder.customer.name}</span>
          </div>
          <div className="flex justify-between border-b border-stone-200/80 pb-2">
            <span className="text-stone-500">Phone (WhatsApp):</span>
            <span className="font-mono text-stone-900">{lastCreatedOrder.customer.phone}</span>
          </div>
          <div className="flex justify-between border-b border-stone-200/80 pb-2">
            <span className="text-stone-500">Delivery Address:</span>
            <span className="text-stone-900 font-medium text-right max-w-[240px] truncate">
              {lastCreatedOrder.customer.address}, {lastCreatedOrder.customer.city} - {lastCreatedOrder.customer.pincode}
            </span>
          </div>
          <div className="flex justify-between border-b border-stone-200/80 pb-2">
            <span className="text-stone-500">Payment:</span>
            <span className="font-semibold text-stone-900">
              {lastCreatedOrder.paymentMethod} ({lastCreatedOrder.paymentStatus})
            </span>
          </div>
          <div className="flex justify-between font-bold text-sm text-stone-900 pt-1">
            <span>Total Amount:</span>
            <span className="font-mono text-[#781822]">
              ₹{lastCreatedOrder.totalAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          {/* WhatsApp share */}
          <button
            onClick={handleWhatsAppShare}
            className="w-full bg-[#EBF7F0] hover:bg-[#DDF2E5] text-[#1E7446] border border-[#BDE5CE] font-semibold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Send Order Copy on WhatsApp (व्हाट्सएप पर भेजें)</span>
          </button>

          <button
            onClick={() => setLastCreatedOrder(null)}
            className="w-full bg-[#781822] hover:bg-[#60121a] text-white font-semibold text-xs py-3 px-4 rounded-xl transition-colors cursor-pointer"
          >
            Continue Shopping (और साड़ियां देखें)
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Handloom Silk Mark Guarantee · Real-Time Order Recorded</span>
        </div>
      </div>
    </div>
  );
};
