import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { HeritageStory } from './components/HeritageStory';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { GoogleAuthModal } from './components/GoogleAuthModal';

const MainContent: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    isCartOpen,
    isCheckoutOpen,
    isAuthModalOpen,
    lastCreatedOrder
  } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductGrid />
        <HeritageStory />
      </main>
      <Footer />

      {/* Interactive Customer Modals */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {isCartOpen && <CartDrawer />}
      {isCheckoutOpen && <CheckoutModal />}
      {lastCreatedOrder && <OrderSuccessModal />}
      {isAuthModalOpen && <GoogleAuthModal />}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
