import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, User, StoreConfig, CustomerDetails } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_STORE_CONFIG, DEMO_USERS } from '../data/initialData';

interface StoreContextType {
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  wishlist: string[];
  currentUser: User | null;
  storeConfig: StoreConfig;
  viewMode: 'store' | 'admin';
  isCartOpen: boolean;
  isAuthModalOpen: boolean;
  isCheckoutOpen: boolean;
  selectedProduct: Product | null;
  lastCreatedOrder: Order | null;
  activeCategory: string;
  searchQuery: string;
  
  // Actions
  setViewMode: (mode: 'store' | 'admin') => void;
  setIsCartOpen: (open: boolean) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setSelectedProduct: (product: Product | null) => void;
  setLastCreatedOrder: (order: Order | null) => void;
  setActiveCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  
  addToCart: (product: Product, quantity?: number, blouseOption?: 'unstitched' | 'custom_stitched') => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  
  loginWithGoogle: (email: string, role?: 'customer' | 'admin', name?: string) => void;
  logout: () => void;
  
  createOrder: (customer: CustomerDetails, paymentMethod: 'UPI' | 'COD' | 'Card' | 'Netbanking', couponCode?: string) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateStoreConfig: (newConfig: Partial<StoreConfig>) => void;
  resetToDemoData: () => void;
  
  // Computed
  cartTotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from LocalStorage or fall back to Initial
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('viraasat_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('viraasat_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('viraasat_cart');
      return saved ? JSON.parse(saved) : [
        {
          product: INITIAL_PRODUCTS[0],
          quantity: 1,
          blouseOption: 'unstitched'
        }
      ];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('viraasat_wishlist');
      return saved ? JSON.parse(saved) : [INITIAL_PRODUCTS[1].id];
    } catch {
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('viraasat_user');
      // Default to logged-in customer for effortless demo showcase
      return saved ? JSON.parse(saved) : DEMO_USERS[0];
    } catch {
      return DEMO_USERS[0];
    }
  });

  const [storeConfig, setStoreConfig] = useState<StoreConfig>(() => {
    try {
      const saved = localStorage.getItem('viraasat_config');
      return saved ? JSON.parse(saved) : INITIAL_STORE_CONFIG;
    } catch {
      return INITIAL_STORE_CONFIG;
    }
  });

  const [viewMode, setViewMode] = useState<'store' | 'admin'>('store');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('viraasat_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('viraasat_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('viraasat_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('viraasat_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('viraasat_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('viraasat_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('viraasat_config', JSON.stringify(storeConfig));
  }, [storeConfig]);

  // Actions
  const addToCart = (product: Product, quantity = 1, blouseOption: 'unstitched' | 'custom_stitched' = 'unstitched') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.blouseOption === blouseOption);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.blouseOption === blouseOption
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, blouseOption }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const loginWithGoogle = (email: string, role: 'customer' | 'admin' = 'customer', name?: string) => {
    const existing = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    const user: User = existing || {
      id: 'usr-' + Date.now(),
      name: name || email.split('@')[0],
      email: email,
      avatar: '',
      role: role,
      phone: '+91 98765 00000'
    };
    setCurrentUser(user);
    if (role === 'admin') {
      setViewMode('admin');
    }
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setCurrentUser(null);
    setViewMode('store');
  };

  const createOrder = (
    customer: CustomerDetails,
    paymentMethod: 'UPI' | 'COD' | 'Card' | 'Netbanking',
    couponCode?: string
  ): Order => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    let discount = 0;

    if (couponCode) {
      const foundCoupon = storeConfig.coupons.find(
        (c) => c.code.toUpperCase() === couponCode.toUpperCase()
      );
      if (foundCoupon && subtotal >= foundCoupon.minOrderAmount) {
        discount = Math.round((subtotal * foundCoupon.discountPercent) / 100);
      }
    }

    const shippingFee = subtotal >= storeConfig.freeShippingThreshold ? 0 : 150;
    const totalAmount = Math.max(0, subtotal - discount + shippingFee);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: `VIR-${randomNum}`,
      createdAt: new Date().toISOString(),
      customer,
      items: [...cart],
      subtotal,
      discountAmount: discount,
      shippingFee,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending on Delivery' : 'Paid',
      status: 'Confirmed',
      trackingNumber: `EXP-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setLastCreatedOrder(newOrder);
    setIsCheckoutOpen(false);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: 'prod-' + Date.now()
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === updated.id ? updated : prod))
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateStoreConfig = (newConfig: Partial<StoreConfig>) => {
    setStoreConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const resetToDemoData = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setStoreConfig(INITIAL_STORE_CONFIG);
    setCurrentUser(DEMO_USERS[0]);
    setCart([
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        blouseOption: 'unstitched'
      }
    ]);
    localStorage.removeItem('viraasat_products');
    localStorage.removeItem('viraasat_orders');
    localStorage.removeItem('viraasat_config');
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        cart,
        wishlist,
        currentUser,
        storeConfig,
        viewMode,
        isCartOpen,
        isAuthModalOpen,
        isCheckoutOpen,
        selectedProduct,
        lastCreatedOrder,
        activeCategory,
        searchQuery,
        setViewMode,
        setIsCartOpen,
        setIsAuthModalOpen,
        setIsCheckoutOpen,
        setSelectedProduct,
        setLastCreatedOrder,
        setActiveCategory,
        setSearchQuery,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        loginWithGoogle,
        logout,
        createOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStoreConfig,
        resetToDemoData,
        cartTotal,
        cartCount
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
