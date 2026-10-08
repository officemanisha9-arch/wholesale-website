export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'INR' | 'CAD' | 'AUD' | 'CNY' | 'BRL' | 'AED';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number; // relative to USD (USD = 1)
  flag: string;
}

export interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  defaultCurrency: CurrencyCode;
  zipFormat: string;
}

export interface Supplier {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  city: string;
  flag: string;
  years: number;
  verified: boolean;
  goldSupplier: boolean;
  tradeAssurance: boolean;
  rating: number;
  reviewsCount: number;
  responseRate: string;
  responseTime: string;
  floorSpace: string;
  employees: string;
  annualOutput: string;
  mainMarkets: string[];
  certifications: string[];
  avatar: string;
  bannerImage: string;
  videoUrl?: string;
  oemOdm: boolean;
  cleanRoom: boolean;
  inspectionReport: boolean;
  customizationCapabilities: string[];
  onlineShowroomUrl?: string;
}

export interface PriceTier {
  minQty: number;
  maxQty?: number;
  price: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  color?: string;
  size?: string;
  image?: string;
  additionalPrice?: number;
  sku: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  country: string;
  countryFlag: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  productVariant?: string;
  photos?: string[];
}

export interface Product {
  id: string;
  title: string;
  categoryId: string;
  categoryName: string;
  subcategoryId: string;
  images: string[];
  priceTiers: PriceTier[];
  moq: number; // Minimum Order Quantity
  unit: string;
  supplierId: string;
  supplier: Supplier;
  rating: number;
  reviewsCount: number;
  ordersCount: number;
  readyToShip: boolean;
  usLocalStock: boolean;
  alibabaGuaranteed: boolean;
  fastDispatchDays?: number;
  freeShippingThreshold?: number;
  samplePrice: number;
  sampleLeadTimeDays: number;
  customLogoMoq?: number;
  customPackagingMoq?: number;
  graphicCustomizationMoq?: number;
  variants: ProductVariant[];
  specifications: ProductSpecification[];
  description: string;
  features: string[];
  packagingDetails: string;
  leadTimeTable: { qtyRange: string; leadDays: number }[];
  reviews: ProductReview[];
  tags: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  image: string;
  subcategories: {
    id: string;
    name: string;
    items: string[];
  }[];
  featuredProductsCount: number;
  popularKeywords: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  variantId?: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  selectedCustomization?: {
    customLogo?: boolean;
    customPackaging?: boolean;
    graphicCustomization?: boolean;
    notes?: string;
  };
  shippingMethod: 'air_express' | 'sea_freight_ddp' | 'railway' | 'standard';
  shippingCost: number;
  estimatedDeliveryDays: number;
}

export interface SupplierCartGroup {
  supplier: Supplier;
  items: CartItem[];
  subtotal: number;
  shippingTotal: number;
  total: number;
  shippingMethod: string;
  tradeAssuranceIncluded: boolean;
  supplierNote?: string;
}

export interface RFQRequirement {
  id: string;
  title: string;
  category: string;
  sourcingType: 'Customized Product' | 'Non-customized Product' | 'Total Solution' | 'Business Service';
  quantity: number;
  unit: string;
  targetPrice?: number;
  destinationCountry: string;
  destinationPort?: string;
  tradeTerms: 'FOB' | 'EXW' | 'CIF' | 'DDP';
  paymentTerms: 'T/T' | 'L/C' | 'PayPal' | 'Credit Card' | 'Trade Assurance';
  details: string;
  attachments?: string[];
  status: 'Open' | 'Under Review' | 'Quotes Received' | 'Closed' | 'Awarded';
  createdAt: string;
  quotesReceivedCount: number;
  quotes?: RFQQuote[];
  buyerName: string;
  buyerCountry: string;
  buyerFlag: string;
}

export interface RFQQuote {
  id: string;
  rfqId: string;
  supplierId: string;
  supplier: Supplier;
  unitPrice: number;
  totalPrice: number;
  samplePrice: number;
  leadTimeDays: number;
  validUntil: string;
  notes: string;
  sampleAvailable: boolean;
  status: 'Pending' | 'Accepted' | 'Declined';
}

export interface ChatMessage {
  id: string;
  senderId: string; // 'buyer' | supplier.id
  senderName: string;
  avatar: string;
  text: string;
  timestamp: string;
  productId?: string;
  productData?: Partial<Product>;
  isQuoteOffer?: boolean;
  quoteDetails?: {
    qty: number;
    unitPrice: number;
    shippingCost: number;
    leadTime: string;
  };
  attachments?: string[];
}

export interface ChatConversation {
  id: string;
  supplierId: string;
  supplier: Supplier;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  messages: ChatMessage[];
  relatedProductId?: string;
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  productImage: string;
  variantName?: string;
  unitPrice: number;
  quantity: number;
  unit: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  supplier: Supplier;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  taxFee: number;
  discount: number;
  totalAmount: number;
  currency: CurrencyCode;
  status: 'Waiting Payment' | 'Waiting Dispatch' | 'In Transit' | 'Customs Cleared' | 'Delivered' | 'Completed';
  tradeAssuranceProtected: boolean;
  createdAt: string;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  shippingCarrier: string;
  trackingNumber: string;
  estimatedDeliveryDate: string;
  timeline: {
    status: string;
    timestamp: string;
    completed: boolean;
    description: string;
  }[];
}

export interface AISourcingMatch {
  id: string;
  productName: string;
  targetPriceRange: string;
  recommendedMoq: number;
  suggestedMaterials: string[];
  keySpecs: { label: string; value: string }[];
  matchedSuppliers: {
    supplier: Supplier;
    matchScore: number;
    estimatedUnitCost: number;
    productionDays: number;
    sampleDays: number;
    compliance: string[];
  }[];
}

export interface DeliveryHub {
  id: string;
  name: string;
  portCode: string;
  city: string;
  state?: string;
  country: string;
  countryCode: string;
  flag: string;
  lat: number;
  lng: number;
  airTransitDays: string;
  oceanTransitDays: string;
  dockType: string;
  isPrimary?: boolean;
  formattedAddress?: string;
  postalCode?: string;
}

export interface DetectedAddress {
  formattedAddress: string;
  street?: string;
  locality?: string;
  city: string;
  state?: string;
  country: string;
  countryCode: string;
  postalCode?: string;
  flag: string;
  lat: number;
  lng: number;
  source: 'gps' | 'ip' | 'search';
}


