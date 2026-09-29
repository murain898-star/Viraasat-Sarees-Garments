export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  category: 'Banarasi' | 'Kanjivaram' | 'Organza' | 'Bridal Lehenga' | 'Chanderi' | 'Festive Wear';
  price: number;
  originalPrice: number;
  discountPercent: number;
  fabric: string;
  weaveOrigin: string;
  color: string;
  zariType: string;
  borderType: string;
  blouseIncluded: boolean;
  length: string; // e.g. "5.5m Saree + 0.8m Blouse Piece"
  stock: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  featured: boolean;
  description: string;
  careInstructions: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  blouseOption: 'unstitched' | 'custom_stitched';
}

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: 'UPI' | 'COD' | 'Card' | 'Netbanking';
  paymentStatus: 'Paid' | 'Pending on Delivery';
  status: 'Pending' | 'Confirmed' | 'In Stitching / Packing' | 'Dispatched' | 'Delivered' | 'Cancelled';
  trackingNumber?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'customer' | 'admin';
  phone?: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minOrderAmount: number;
  description: string;
}

export interface StoreConfig {
  brandName: string;
  brandTagline: string;
  announcementText: string;
  supportPhone: string;
  whatsappNumber: string;
  shopAddress: string;
  freeShippingThreshold: number;
  coupons: Coupon[];
}
