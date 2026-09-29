import { Product, Order, StoreConfig, User } from '../types';
import heroImg from '../assets/images/hero_luxury_banarasi_saree_1790675121602.jpg';
import sareeRedImg from '../assets/images/saree_royal_red_banarasi_1790675142272.jpg';
import sareeGreenImg from '../assets/images/saree_emerald_kanjivaram_1790675157139.jpg';
import sareePinkImg from '../assets/images/saree_pastel_pink_organza_1790675176390.jpg';
import lehengaImg from '../assets/images/garment_bridal_lehenga_1790675191689.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Kashi Shikargah Pure Banarasi Katan Silk Saree',
    hindiName: 'काशी शिकारगाह बनारसी कतान सिल्क साड़ी',
    category: 'Banarasi',
    price: 18500,
    originalPrice: 24999,
    discountPercent: 26,
    fabric: 'Pure Katan Silk (Silk Mark Certified)',
    weaveOrigin: 'Varanasi, Uttar Pradesh',
    color: 'Royal Crimson Red & Antique Gold',
    zariType: 'Pure Tested Gold Zari',
    borderType: 'Traditional Floral Meenakari Kadwa Border',
    blouseIncluded: true,
    length: '5.5m Saree + 0.8m Running Blouse Piece',
    stock: 8,
    rating: 4.9,
    reviewCount: 42,
    imageUrl: sareeRedImg,
    featured: true,
    description: 'An authentic heirloom piece handwoven by master craftsmen in Varanasi over 28 days. Featuring dense gold zari Shikargah flora and fauna jaal motifs with a grand meenakari pallu, perfect for royal bridal trousseau and milestone celebrations.',
    careInstructions: 'Strictly dry clean only. Wrap in soft muslin cloth. Never spray perfume directly on zari work.'
  },
  {
    id: 'prod-2',
    name: 'Mayil Temple Pure Kanjivaram Silk Saree',
    hindiName: 'मयिल टेम्पल कांजीवरम पट्टू सिल्क साड़ी',
    category: 'Kanjivaram',
    price: 22400,
    originalPrice: 29500,
    discountPercent: 24,
    fabric: 'Pure Mulberry Silk 3-Ply Warp (Silk Mark)',
    weaveOrigin: 'Kanchipuram, Tamil Nadu',
    color: 'Deep Emerald Green with Rani Magenta',
    zariType: 'Rich 2G Gold Thread Zari',
    borderType: 'Korvai Contrast Temple Border (Gopuram Weave)',
    blouseIncluded: true,
    length: '5.5m Saree + 0.8m Contrast Magenta Blouse',
    stock: 5,
    rating: 5.0,
    reviewCount: 38,
    imageUrl: sareeGreenImg,
    featured: true,
    description: 'Woven with the ancient Korvai technique where body and borders are woven separately and locked together with petni joint. Adorned with traditional peacock (Mayil) and temple tower motifs symbolizing prosperity and spiritual grandeur.',
    careInstructions: 'Dry clean only. Air out every 6 months in indirect shade. Store flat without sharp creasing.'
  },
  {
    id: 'prod-3',
    name: 'Gulabi Handloom Organza Silk Saree with Gota Patti',
    hindiName: 'गुलाबी हैंडलूम ऑर्गेंजा सिल्क साड़ी गोटा पत्ती वर्क',
    category: 'Organza',
    price: 11200,
    originalPrice: 14800,
    discountPercent: 24,
    fabric: 'Ultra-light Handwoven Pure Organza Silk',
    weaveOrigin: 'Surat & Jaipur Artisans',
    color: 'Blush Pastel Rose Pink',
    zariType: 'Fine Light Gold Gota Patti & Resham',
    borderType: 'Hand-scalloped Cutwork Gota Border',
    blouseIncluded: true,
    length: '5.5m Saree + 0.8m Heavy Raw Silk Blouse Piece',
    stock: 12,
    rating: 4.8,
    reviewCount: 29,
    imageUrl: sareePinkImg,
    featured: true,
    description: 'Featherlight sheer organza crafted with delicate pastel botanicals and fine hand-tucked gota patti borders. Offers an effortlessly regal drape that feels weightless for day weddings, sangeet cocktails, and summer receptions.',
    careInstructions: 'Dry clean only. Gentle steam iron on reverse side under protective cotton cloth.'
  },
  {
    id: 'prod-4',
    name: 'Noor-E-Zardozi Velvet Royal Bridal Lehenga Choli',
    hindiName: 'नूर-ए-जरदोजी वेलवेट शाही ब्राइडल लहंगा चोली',
    category: 'Bridal Lehenga',
    price: 46500,
    originalPrice: 58000,
    discountPercent: 20,
    fabric: 'Micro Velvet with Handcrafted Zardozi & Dabka',
    weaveOrigin: 'Lucknow & Old Delhi Zari Guild',
    color: 'Deep Wine Ruby Maroon',
    zariType: 'Antique Dabka, Nakshi, Kundan & Sequins',
    borderType: 'Heavy 4-inch Multi-layer Embroidered Border',
    blouseIncluded: true,
    length: 'Semi-stitched 4.2m Flared Lehenga + Unstitched Blouse + Dual Dupattas',
    stock: 3,
    rating: 5.0,
    reviewCount: 19,
    imageUrl: lehengaImg,
    featured: true,
    description: 'The crown jewel of Indian bridal heritage. Hand-embroidered over 180 artisan hours featuring mughal floral jaals, hand-embossed dabka, and pearl highlights. Includes double dupattas (one heavy velvet veil and one airy tissue organza shoulder dupatta).',
    careInstructions: 'Professional bridal dry clean only. Store in breathable canvas garment box provided.'
  },
  {
    id: 'prod-5',
    name: 'Surya Chanderi Tissue Silk Saree with Ashawali Border',
    hindiName: 'सूर्य चंदेरी टिशू सिल्क साड़ी आशावली बॉर्डर',
    category: 'Chanderi',
    price: 9800,
    originalPrice: 12500,
    discountPercent: 21,
    fabric: 'Chanderi Katan Silk by Tissue Metallic Warp',
    weaveOrigin: 'Chanderi, Madhya Pradesh',
    color: 'Golden Champagne with Vermillion Accents',
    zariType: 'Fine Tested Metallic Zari',
    borderType: 'Handloom Ashawali Floral Vine Border',
    blouseIncluded: true,
    length: '5.5m Saree + 0.8m Tissue Blouse',
    stock: 14,
    rating: 4.7,
    reviewCount: 31,
    imageUrl: heroImg,
    featured: false,
    description: 'Subtle metallic sheen woven by weavers of historical Chanderi. Lightweight with remarkable crisp fall and subtle shimmer, suitable for pooja ceremonies, Diwali gatherings, and festive family celebrations.',
    careInstructions: 'Dry clean only. Roll in cotton rolls to preserve tissue crispness.'
  },
  {
    id: 'prod-6',
    name: 'Maharani Handwoven Paithani Silk Saree',
    hindiName: 'महारानी हथकरघा पैठणी सिल्क साड़ी मोर पल्लू',
    category: 'Festive Wear',
    price: 24500,
    originalPrice: 31000,
    discountPercent: 21,
    fabric: 'Pure Mulberry Silk with Tapestry Weave',
    weaveOrigin: 'Yeola, Maharashtra',
    color: 'Royal Midnight Blue with Sunset Orange Pallu',
    zariType: 'Fine Gold Zari with Muniya & Mor (Peacock) Motifs',
    borderType: 'Oblique Tapestry Weave Border',
    blouseIncluded: true,
    length: '5.5m Saree + 0.8m Running Blouse Piece',
    stock: 6,
    rating: 4.9,
    reviewCount: 23,
    imageUrl: sareeRedImg,
    featured: false,
    description: 'Renowned for its kaleidoscopic gold pallu featuring dancing peacocks in pure silk threads. Woven using the ancient tapestry technique where both sides look almost identical.',
    careInstructions: 'Dry clean only. Keep away from direct sunlight.'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'VIR-9041',
    createdAt: '2026-09-28T14:30:00Z',
    customer: {
      name: 'Sunita Sharma',
      email: 'sunita.sharma@gmail.com',
      phone: '+91 98201 44521',
      address: 'Flat 402, Royal Palms, Link Road, Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400053',
      notes: 'Please double box packing for wedding gift.'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        blouseOption: 'unstitched'
      }
    ],
    subtotal: 18500,
    discountAmount: 1850,
    shippingFee: 0,
    totalAmount: 16650,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'In Stitching / Packing',
    trackingNumber: 'DELHIVERY-9812491'
  },
  {
    id: 'ord-102',
    orderNumber: 'VIR-9040',
    createdAt: '2026-09-27T10:15:00Z',
    customer: {
      name: 'Pooja Agarwal',
      email: 'pooja.agarwal@gmail.com',
      phone: '+91 98112 39014',
      address: 'B-12, Sector 14, Near City Centre',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[1],
        quantity: 1,
        blouseOption: 'unstitched'
      },
      {
        product: INITIAL_PRODUCTS[2],
        quantity: 1,
        blouseOption: 'unstitched'
      }
    ],
    subtotal: 33600,
    discountAmount: 3360,
    shippingFee: 0,
    totalAmount: 30240,
    paymentMethod: 'COD',
    paymentStatus: 'Pending on Delivery',
    status: 'Dispatched',
    trackingNumber: 'BLUEDART-882103'
  },
  {
    id: 'ord-103',
    orderNumber: 'VIR-9039',
    createdAt: '2026-09-25T16:45:00Z',
    customer: {
      name: 'Ananya Deshmukh',
      email: 'ananya.desh@gmail.com',
      phone: '+91 94220 89123',
      address: '703, Pride Panorama, Senapati Bapat Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411016'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[3],
        quantity: 1,
        blouseOption: 'custom_stitched'
      }
    ],
    subtotal: 46500,
    discountAmount: 0,
    shippingFee: 0,
    totalAmount: 46500,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'Delivered',
    trackingNumber: 'BLUEDART-772911'
  }
];

export const INITIAL_STORE_CONFIG: StoreConfig = {
  brandName: 'Viraasat Sarees & Garments',
  brandTagline: 'विरासत · शुद्ध हथकरघा बनारसी एवं कांजीवरम सिल्क',
  announcementText: '✨ Festive Wedding Season Offer: Use code UTSAV10 for 10% Flat Discount · Free Express Delivery Across India',
  supportPhone: '+91 98765 43210',
  whatsappNumber: '+91 98765 43210',
  shopAddress: 'Heritage Handloom Chowk, Godowlia, Varanasi, UP - 221001',
  freeShippingThreshold: 1999,
  coupons: [
    {
      code: 'UTSAV10',
      discountPercent: 10,
      minOrderAmount: 2000,
      description: '10% discount on orders above ₹2,000'
    },
    {
      code: 'BRIDAL15',
      discountPercent: 15,
      minOrderAmount: 25000,
      description: '15% festive wedding discount on orders above ₹25,000'
    }
  ]
};

export const DEMO_USERS: User[] = [
  {
    id: 'usr-customer-1',
    name: 'Mura Inamdar',
    email: 'mura.in898@gmail.com',
    avatar: '',
    role: 'customer',
    phone: '+91 98765 12345'
  }
];
