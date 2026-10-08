import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type {
  CurrencyCode,
  CurrencyConfig,
  CountryConfig,
  Product,
  Supplier,
  CartItem,
  SupplierCartGroup,
  RFQRequirement,
  RFQQuote,
  ChatConversation,
  ChatMessage,
  Order,
  DeliveryHub,
  DetectedAddress
} from '../types';
import { CURRENCIES, COUNTRIES } from '../data/currencies';
import { PRODUCTS } from '../data/products';
import { SUPPLIERS } from '../data/suppliers';
import { INITIAL_RFQS } from '../data/rfqs';
import { GLOBAL_DELIVERY_HUBS } from '../data/deliveryHubs';

interface ToastInfo {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  companyName: string;
  role: 'Buyer' | 'Verified Buyer' | 'VIP Pro Buyer' | 'Supplier';
  country: string;
  avatar: string;
  phone: string;
}

interface AppContextType {
  // Localization & Currency
  currency: CurrencyCode;
  currencyConfig: CurrencyConfig;
  setCurrency: (code: CurrencyCode) => void;
  country: CountryConfig;
  setCountry: (country: CountryConfig) => void;
  activeDeliveryHub: DeliveryHub;
  setActiveDeliveryHub: (hub: DeliveryHub) => void;
  detectedAddress: DetectedAddress | null;
  setDetectedAddress: (addr: DetectedAddress | null) => void;
  detectCurrentLocation: () => Promise<DeliveryHub | null>;
  setCustomAddressLocation: (addr: Partial<DetectedAddress>) => DeliveryHub;
  language: string;
  setLanguage: (lang: string) => void;
  formatPrice: (amountInUSD: number, showDecimals?: boolean) => string;

  // Cart
  cart: CartItem[];
  cartSupplierGroups: SupplierCartGroup[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity: number, variantId?: string, customization?: CartItem['selectedCustomization']) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  updateCartCustomization: (cartItemId: string, customization: CartItem['selectedCustomization']) => void;
  setSupplierShipping: (supplierId: string, method: CartItem['shippingMethod']) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;

  // Favorites
  favoriteProductIds: string[];
  favoriteSupplierIds: string[];
  toggleFavoriteProduct: (productId: string) => void;
  toggleFavoriteSupplier: (supplierId: string) => void;
  isProductFavorited: (productId: string) => boolean;
  isSupplierFavorited: (supplierId: string) => boolean;

  // RFQ
  rfqs: RFQRequirement[];
  submitRFQ: (rfq: Omit<RFQRequirement, 'id' | 'createdAt' | 'status' | 'quotesReceivedCount' | 'quotes' | 'buyerName' | 'buyerCountry' | 'buyerFlag'>) => string;
  acceptRFQQuote: (rfqId: string, quoteId: string) => void;

  // Messages / Chat
  conversations: ChatConversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (conversationId: string, text: string, attachments?: string[], quoteDetails?: ChatMessage['quoteDetails']) => void;
  startChatWithSupplier: (supplierId: string, relatedProductId?: string, initialMessage?: string) => string;

  // Orders
  orders: Order[];
  createOrderFromCart: (shippingAddress: Order['shippingAddress'], paymentMethod: string) => Order;

  // Search & Global State
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchTab: 'products' | 'manufacturers' | 'worldwide' | 'ai-mode';
  setSearchTab: (tab: 'products' | 'manufacturers' | 'worldwide' | 'ai-mode') => void;

  // Products & Marketplace
  products: Product[];
  addProduct: (newProduct: Partial<Product>) => Product;
  updateProduct: (productId: string, updatedData: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;

  // Supplier / Seller Workbench Profile
  supplierProfile: Supplier;
  updateSupplierProfile: (updatedData: Partial<Supplier>) => void;
  updateOrderStatus: (orderId: string, status: Order['status'], trackingNumber?: string, carrier?: string) => void;
  submitSellerQuote: (rfqId: string, quoteData: { unitPrice: number; leadTimeDays: number; samplePrice: number; notes: string; sampleAvailable: boolean }) => void;

  // Modals
  isCurrencyModalOpen: boolean;
  setCurrencyModalOpen: (b: boolean) => void;
  isLocationMapModalOpen: boolean;
  setLocationMapModalOpen: (b: boolean) => void;
  isImageSearchModalOpen: boolean;
  setImageSearchModalOpen: (b: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | null) => void;
  contactSupplierData: { supplier: Supplier; product?: Product } | null;
  setContactSupplierData: (data: { supplier: Supplier; product?: Product } | null) => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (b: boolean) => void;
  isTradeAssuranceModalOpen: boolean;
  setTradeAssuranceModalOpen: (b: boolean) => void;

  // User Auth
  currentUser: UserProfile | null;
  loginUser: (role?: UserProfile['role']) => void;
  logoutUser: () => void;

  // Toasts
  toasts: ToastInfo[];
  showToast: (title: string, message: string, type?: ToastInfo['type']) => void;
  removeToast: (id: string) => void;
}

const getFlagForCountry = (code: string, fallback: string = '🌐') => {
  const found = COUNTRIES.find(c => c.code.toLowerCase() === (code || '').toLowerCase());
  if (found) return found.flag;
  try {
    const codePoints = (code || 'US')
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } catch {
    return fallback;
  }
};

const findClosestHub = (lat: number, lng: number): DeliveryHub => {
  let closest = GLOBAL_DELIVERY_HUBS[0];
  let minDistance = Infinity;
  for (const hub of GLOBAL_DELIVERY_HUBS) {
    const dist = Math.hypot(hub.lat - lat, hub.lng - lng);
    if (dist < minDistance) {
      minDistance = dist;
      closest = hub;
    }
  }
  return closest;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Localization State
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');
  const [country, setCountryState] = useState<CountryConfig>(COUNTRIES[0]);
  const [activeDeliveryHub, setActiveDeliveryHubState] = useState<DeliveryHub>(GLOBAL_DELIVERY_HUBS[0]);
  const [detectedAddress, setDetectedAddressState] = useState<DetectedAddress | null>(null);
  const [language, setLanguage] = useState<string>('en');

  const setDetectedAddress = (addr: DetectedAddress | null) => {
    setDetectedAddressState(addr);
    if (addr) {
      try {
        localStorage.setItem('alib2b_detected_address', JSON.stringify(addr));
      } catch (e) {}
    } else {
      localStorage.removeItem('alib2b_detected_address');
    }
  };

  const setActiveDeliveryHub = (hub: DeliveryHub) => {
    setActiveDeliveryHubState(hub);
    try {
      localStorage.setItem('alib2b_active_hub', JSON.stringify(hub));
    } catch (e) {}
  };

  const applyLocation = (hub: DeliveryHub, address?: DetectedAddress) => {
    setActiveDeliveryHub(hub);
    if (address) {
      setDetectedAddress(address);
    }
    const matchedCountry = COUNTRIES.find(
      c => c.code.toUpperCase() === hub.countryCode.toUpperCase() ||
           c.name.toLowerCase() === hub.country.toLowerCase()
    );
    if (matchedCountry) {
      setCountryState(matchedCountry);
      setCurrencyState(matchedCountry.defaultCurrency);
      try {
        localStorage.setItem('alib2b_country', JSON.stringify(matchedCountry));
        localStorage.setItem('alib2b_currency', matchedCountry.defaultCurrency);
      } catch (e) {}
    }
  };

  // Reverse geocodes exact coordinates using BigDataCloud + Nominatim
  const reverseGeocodeCoordinates = async (lat: number, lng: number): Promise<DetectedAddress | null> => {
    try {
      const bdcRes = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      if (bdcRes.ok) {
        const data = await bdcRes.json();
        const city = data.city || data.locality || data.principalSubdivision || 'Detected City';
        const state = data.principalSubdivision || '';
        const countryName = data.countryName || 'India';
        const countryCode = (data.countryCode || 'IN').toUpperCase();
        const postalCode = data.postcode || '';
        const locality = data.locality || '';
        const flag = getFlagForCountry(countryCode);
        const formattedParts = [locality, city, state, postalCode, countryName].filter(Boolean);
        const formattedAddress = formattedParts.length > 0 ? formattedParts.join(', ') : `${city}, ${countryName}`;

        return {
          formattedAddress,
          street: locality ? `${locality}, ${city}` : city,
          locality,
          city,
          state,
          country: countryName,
          countryCode,
          postalCode,
          flag,
          lat,
          lng,
          source: 'gps'
        };
      }
    } catch (err) {
      console.warn('BigDataCloud reverse geocode error:', err);
    }

    try {
      const nomRes = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      if (nomRes.ok) {
        const nomData = await nomRes.json();
        const addr = nomData.address || {};
        const city = addr.city || addr.town || addr.village || addr.suburb || addr.county || 'Detected Area';
        const state = addr.state || '';
        const countryName = addr.country || 'India';
        const countryCode = (addr.country_code || 'in').toUpperCase();
        const postalCode = addr.postcode || '';
        const street = addr.road || addr.neighbourhood || addr.suburb || '';
        const flag = getFlagForCountry(countryCode);

        return {
          formattedAddress: nomData.display_name || `${city}, ${countryName}`,
          street: street ? `${street}, ${city}` : city,
          locality: addr.suburb || addr.neighbourhood || '',
          city,
          state,
          country: countryName,
          countryCode,
          postalCode,
          flag,
          lat,
          lng,
          source: 'gps'
        };
      }
    } catch (err) {
      console.warn('Nominatim reverse geocode error:', err);
    }

    return {
      formattedAddress: `Coordinates: ${lat.toFixed(4)}°, ${lng.toFixed(4)}°`,
      city: 'Current GPS Location',
      country: 'Detected Region',
      countryCode: 'IN',
      flag: '📍',
      lat,
      lng,
      source: 'gps'
    };
  };

  // High-accuracy IP Geolocation fallback
  const detectByIP = async (): Promise<{ hub: DeliveryHub; address: DetectedAddress } | null> => {
    try {
      const res = await fetch('https://ipwho.is/');
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          const city = data.city || 'Detected City';
          const state = data.region || '';
          const countryName = data.country || 'India';
          const countryCode = (data.country_code || 'IN').toUpperCase();
          const postalCode = data.postal || '';
          const lat = data.latitude || 28.61;
          const lng = data.longitude || 77.20;
          const flag = data.flag?.emoji || getFlagForCountry(countryCode);
          const formattedAddress = [city, state, postalCode, countryName].filter(Boolean).join(', ');

          const address: DetectedAddress = {
            formattedAddress,
            street: `${city} Receiving Facility`,
            city,
            state,
            country: countryName,
            countryCode,
            postalCode,
            flag,
            lat,
            lng,
            source: 'ip'
          };

          const hub: DeliveryHub = {
            id: `hub-ip-${countryCode.toLowerCase()}-${city.toLowerCase().replace(/\s+/g, '-')}`,
            name: `${city}, ${state || countryName} (${countryCode})`,
            portCode: `${countryCode}-${(city || 'HUB').substring(0, 3).toUpperCase()}`,
            city,
            state,
            country: countryName,
            countryCode,
            flag,
            lat,
            lng,
            airTransitDays: '1-3 Days Express',
            oceanTransitDays: '7-12 Days DDP',
            dockType: 'Direct Local Logistics Receiving Hub (IP Geolocation)',
            formattedAddress,
            postalCode,
            isPrimary: true
          };

          return { hub, address };
        }
      }
    } catch (err) {
      console.warn('ipwhois failed, trying ipapi fallback:', err);
    }

    try {
      const res2 = await fetch('https://ipapi.co/json/');
      if (res2.ok) {
        const data = await res2.json();
        const city = data.city || 'Detected City';
        const state = data.region || '';
        const countryName = data.country_name || 'India';
        const countryCode = (data.country_code || 'IN').toUpperCase();
        const postalCode = data.postal || '';
        const lat = data.latitude || 28.61;
        const lng = data.longitude || 77.20;
        const flag = getFlagForCountry(countryCode);
        const formattedAddress = [city, state, postalCode, countryName].filter(Boolean).join(', ');

        const address: DetectedAddress = {
          formattedAddress,
          street: `${city} Receiving Dock`,
          city,
          state,
          country: countryName,
          countryCode,
          postalCode,
          flag,
          lat,
          lng,
          source: 'ip'
        };

        const hub: DeliveryHub = {
          id: `hub-ip-${countryCode.toLowerCase()}-${city.toLowerCase().replace(/\s+/g, '-')}`,
          name: `${city}, ${state || countryName} (${countryCode})`,
          portCode: `${countryCode}-${(city || 'HUB').substring(0, 3).toUpperCase()}`,
          city,
          state,
          country: countryName,
          countryCode,
          flag,
          lat,
          lng,
          airTransitDays: '1-3 Days Express',
          oceanTransitDays: '7-12 Days DDP',
          dockType: 'Direct Local Logistics Receiving Hub (IP Geolocation)',
          formattedAddress,
          postalCode,
          isPrimary: true
        };

        return { hub, address };
      }
    } catch (err) {
      console.warn('IP detection failed:', err);
    }

    return null;
  };

  // Main high-precision GPS detection function
  const detectCurrentLocation = async (): Promise<DeliveryHub | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        detectByIP().then(ipResult => {
          if (ipResult) {
            applyLocation(ipResult.hub, ipResult.address);
            showToast('Current Location Detected', `📍 ${ipResult.address.formattedAddress}`, 'success');
            resolve(ipResult.hub);
          } else {
            showToast('Location Info', `Active Hub: ${activeDeliveryHub.name}`, 'info');
            resolve(activeDeliveryHub);
          }
        });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const rev = await reverseGeocodeCoordinates(latitude, longitude);
          if (rev) {
            const hub: DeliveryHub = {
              id: `hub-gps-${Date.now()}`,
              name: rev.locality ? `${rev.locality}, ${rev.city} (${rev.countryCode})` : `${rev.city}, ${rev.country} (${rev.countryCode})`,
              portCode: `${rev.countryCode}-${(rev.city || 'GPS').substring(0, 3).toUpperCase()}`,
              city: rev.city,
              state: rev.state,
              country: rev.country,
              countryCode: rev.countryCode,
              flag: rev.flag,
              lat: latitude,
              lng: longitude,
              airTransitDays: '1-3 Days Express',
              oceanTransitDays: '7-12 Days DDP',
              dockType: 'Exact GPS Delivery Location & Address',
              formattedAddress: rev.formattedAddress,
              postalCode: rev.postalCode,
              isPrimary: true
            };

            applyLocation(hub, rev);
            showToast(
              'Real GPS Address Detected',
              `📍 ${rev.formattedAddress} (${latitude.toFixed(3)}°, ${longitude.toFixed(3)}°)`,
              'success'
            );
            resolve(hub);
          } else {
            const closest = findClosestHub(latitude, longitude);
            setActiveDeliveryHub(closest);
            resolve(closest);
          }
        },
        async (err) => {
          console.warn('Browser GPS permission not granted, using IP geolocation:', err);
          const ipResult = await detectByIP();
          if (ipResult) {
            applyLocation(ipResult.hub, ipResult.address);
            showToast('Location Auto-Detected', `📍 ${ipResult.address.formattedAddress}`, 'success');
            resolve(ipResult.hub);
          } else {
            const fallback = GLOBAL_DELIVERY_HUBS[0];
            setActiveDeliveryHub(fallback);
            showToast('Location Info', `Active Receiving Port: ${fallback.name}`, 'info');
            resolve(fallback);
          }
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
      );
    });
  };

  const setCustomAddressLocation = (addr: Partial<DetectedAddress>): DeliveryHub => {
    const city = addr.city || 'Custom Delivery Hub';
    const countryName = addr.country || country.name;
    const countryCode = addr.countryCode || country.code;
    const flag = addr.flag || getFlagForCountry(countryCode);
    const lat = addr.lat || activeDeliveryHub.lat;
    const lng = addr.lng || activeDeliveryHub.lng;

    const customHub: DeliveryHub = {
      id: `hub-custom-${Date.now()}`,
      name: `${city}, ${countryName}`,
      portCode: `${countryCode}-${city.substring(0, 3).toUpperCase()}`,
      city,
      state: addr.state,
      country: countryName,
      countryCode,
      flag,
      lat,
      lng,
      airTransitDays: '2-4 Days Express',
      oceanTransitDays: '10-15 Days DDP',
      dockType: 'Custom Designated Receiving Facility',
      formattedAddress: addr.formattedAddress,
      postalCode: addr.postalCode,
      isPrimary: true
    };

    const fullDetected: DetectedAddress = {
      formattedAddress: addr.formattedAddress || `${city}, ${countryName}`,
      street: addr.street,
      locality: addr.locality,
      city,
      state: addr.state,
      country: countryName,
      countryCode,
      postalCode: addr.postalCode,
      flag,
      lat,
      lng,
      source: 'search'
    };

    applyLocation(customHub, fullDetected);
    return customHub;
  };

  // Initial load: restore saved location or auto-detect based on user's real network IP
  useEffect(() => {
    try {
      const savedHub = localStorage.getItem('alib2b_active_hub');
      const savedAddr = localStorage.getItem('alib2b_detected_address');
      const savedCountry = localStorage.getItem('alib2b_country');
      const savedCurrency = localStorage.getItem('alib2b_currency');

      if (savedHub) {
        setActiveDeliveryHubState(JSON.parse(savedHub));
      }
      if (savedAddr) {
        setDetectedAddressState(JSON.parse(savedAddr));
      }
      if (savedCountry) {
        setCountryState(JSON.parse(savedCountry));
      }
      if (savedCurrency) {
        setCurrencyState(savedCurrency as CurrencyCode);
      }

      // If first time visit with no saved preferences: silently auto-detect IP location
      if (!savedHub && !savedCountry) {
        detectByIP().then(res => {
          if (res) {
            applyLocation(res.hub, res.address);
          }
        });
      }
    } catch (e) {
      console.error('Failed to parse localStorage location:', e);
    }
  }, []);

  const currencyConfig = useMemo(() => CURRENCIES[currency] || CURRENCIES.USD, [currency]);


  const setCurrency = (code: CurrencyCode) => {
    if (CURRENCIES[code]) {
      setCurrencyState(code);
      localStorage.setItem('alib2b_currency', code);
    }
  };

  const setCountry = (newCountry: CountryConfig) => {
    setCountryState(newCountry);
    setCurrency(newCountry.defaultCurrency);
    localStorage.setItem('alib2b_country', JSON.stringify(newCountry));
  };

  const formatPrice = (amountInUSD: number, showDecimals: boolean = true): string => {
    const converted = amountInUSD * currencyConfig.rate;
    if (currency === 'JPY') {
      return `${currencyConfig.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${currencyConfig.symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: showDecimals ? 2 : 0,
      maximumFractionDigits: showDecimals ? 2 : 0,
    })}`;
  };

  // User Profile
  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
    id: 'usr-901',
    name: 'Alexander Wright',
    email: 'alex.wright@globalnexus.com',
    companyName: 'Nexus Global Imports LLC',
    role: 'VIP Pro Buyer',
    country: 'United States',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    phone: '+1 (415) 890-3412'
  });

  // Supplier / Seller Workbench Profile State
  const [supplierProfile, setSupplierProfile] = useState<Supplier>(SUPPLIERS[0]);

  // Global Dynamic Products State
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  const addProduct = (newProductData: Partial<Product>): Product => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      title: newProductData.title || 'Custom Manufactured Wholesale Product',
      categoryId: newProductData.categoryId || 'electronics',
      categoryName: newProductData.categoryName || 'Consumer Electronics',
      subcategoryId: newProductData.subcategoryId || 'smart-electronics',
      images: newProductData.images && newProductData.images.length > 0
        ? newProductData.images
        : ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80'],
      priceTiers: newProductData.priceTiers && newProductData.priceTiers.length > 0
        ? newProductData.priceTiers
        : [{ minQty: 50, price: 15.00 }, { minQty: 200, price: 12.50 }, { minQty: 500, price: 10.00 }],
      moq: newProductData.moq || 50,
      unit: newProductData.unit || 'pieces',
      supplierId: supplierProfile.id,
      supplier: supplierProfile,
      rating: 5.0,
      reviewsCount: 1,
      ordersCount: 0,
      readyToShip: newProductData.readyToShip ?? true,
      usLocalStock: newProductData.usLocalStock ?? false,
      alibabaGuaranteed: newProductData.alibabaGuaranteed ?? true,
      fastDispatchDays: newProductData.fastDispatchDays || 3,
      samplePrice: newProductData.samplePrice || 25.00,
      sampleLeadTimeDays: newProductData.sampleLeadTimeDays || 5,
      customLogoMoq: newProductData.customLogoMoq || 100,
      customPackagingMoq: newProductData.customPackagingMoq || 500,
      graphicCustomizationMoq: newProductData.graphicCustomizationMoq || 200,
      variants: newProductData.variants || [
        { id: `v-${Date.now()}-1`, name: 'Standard Black', sku: `SKU-${Date.now()}-BLK` },
        { id: `v-${Date.now()}-2`, name: 'Metallic Silver', sku: `SKU-${Date.now()}-SLV` }
      ],
      specifications: newProductData.specifications || [
        { label: 'Quality Certification', value: 'CE / RoHS / ISO9001' },
        { label: 'Warranty', value: '2 Years Factory Guarantee' },
        { label: 'OEM/ODM Capability', value: 'Custom logo, packaging & firmware' }
      ],
      description: newProductData.description || 'Verified manufacturer wholesale product with full Trade Assurance order protection, ISO-certified pre-shipment quality inspection, and rapid global DDP air express dispatch.',
      features: newProductData.features || [
        '100% Pre-Shipment Optical & Electronic Inspection',
        'Custom laser engraving and custom box packaging available',
        'Factory direct pricing with volume tier discounts',
        'Trade Assurance escrow protected contract'
      ],
      packagingDetails: newProductData.packagingDetails || 'Standard export master carton with foam protection inserts (50 pcs/carton).',
      leadTimeTable: [
        { qtyRange: '1 - 100 pcs', leadDays: 3 },
        { qtyRange: '101 - 500 pcs', leadDays: 7 },
        { qtyRange: '501+ pcs', leadDays: 14 }
      ],
      reviews: [],
      tags: newProductData.tags || ['OEM/ODM', 'Fast Dispatch', 'Trade Assurance', 'Factory Direct'],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setProducts(prev => [newProduct, ...prev]);
    showToast('Product Published!', `"${newProduct.title}" is now active in your factory catalog.`, 'success');
    return newProduct;
  };

  const updateProduct = (productId: string, updatedData: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === productId ? { ...p, ...updatedData } : p)));
    showToast('Product Updated', 'Changes saved and synced to live wholesale listing.', 'success');
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Product Delisted', 'Product removed from factory active catalog.', 'info');
  };

  const updateSupplierProfile = (updatedData: Partial<Supplier>) => {
    setSupplierProfile(prev => ({ ...prev, ...updatedData }));
    showToast('Factory Profile Updated', 'Verified factory credentials & certification badges updated.', 'success');
  };

  const updateOrderStatus = (orderId: string, status: Order['status'], trackingNumber?: string, carrier?: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const newTimeline = [...ord.timeline];
          newTimeline.push({
            status: `Factory Status: ${status}`,
            timestamp: 'Just now',
            completed: true,
            description: trackingNumber ? `Dispatched via ${carrier || 'DHL Global Forwarding'}. Tracking Number: ${trackingNumber}` : `Order moved to ${status} stage.`
          });
          return {
            ...ord,
            status,
            trackingNumber: trackingNumber || ord.trackingNumber,
            shippingCarrier: carrier || ord.shippingCarrier,
            timeline: newTimeline
          };
        }
        return ord;
      })
    );
    showToast('Order Updated', `Order marked as "${status}". Buyer notified in real time.`, 'success');
  };

  const submitSellerQuote = (
    rfqId: string,
    quoteData: { unitPrice: number; leadTimeDays: number; samplePrice: number; notes: string; sampleAvailable: boolean }
  ) => {
    const newQuote: RFQQuote = {
      id: `quote-${Date.now()}`,
      rfqId,
      supplierId: supplierProfile.id,
      supplier: supplierProfile,
      unitPrice: quoteData.unitPrice,
      totalPrice: quoteData.unitPrice,
      samplePrice: quoteData.samplePrice,
      leadTimeDays: quoteData.leadTimeDays,
      validUntil: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      notes: quoteData.notes,
      sampleAvailable: quoteData.sampleAvailable,
      status: 'Pending'
    };

    setRfqs(prev =>
      prev.map(r => {
        if (r.id === rfqId) {
          const quotes = r.quotes ? [...r.quotes, newQuote] : [newQuote];
          return {
            ...r,
            quotesReceivedCount: quotes.length,
            quotes
          };
        }
        return r;
      })
    );
    showToast('Quotation Bid Submitted!', `Your official factory quotation has been submitted to the buyer.`, 'success');
  };

  const loginUser = (role: UserProfile['role'] = 'VIP Pro Buyer') => {
    setCurrentUser({
      id: 'usr-901',
      name: 'Alexander Wright',
      email: 'alex.wright@globalnexus.com',
      companyName: 'Nexus Global Imports LLC',
      role: role,
      country: 'United States',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      phone: '+1 (415) 890-3412'
    });
    showToast('Signed In', `Welcome back, Alexander Wright (${role})`, 'success');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('Signed Out', 'You have been logged out of Alibaba.com', 'info');
  };

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-item-1',
      productId: 'prod-1',
      product: PRODUCTS[0],
      variantId: 'v-1',
      variantName: 'Space Black / Silicone Strap',
      quantity: 50,
      unitPrice: 15.20,
      selectedCustomization: {
        customLogo: true,
        notes: 'Laser engrave Nexus logo on side titanium bezel'
      },
      shippingMethod: 'air_express',
      shippingCost: 45.00,
      estimatedDeliveryDays: 4
    },
    {
      id: 'cart-item-2',
      productId: 'prod-5',
      product: PRODUCTS[4],
      variantId: 'v-52',
      variantName: 'Cyber Matte Black / LCD Screen',
      quantity: 100,
      unitPrice: 11.50,
      selectedCustomization: {
        customPackaging: true,
        notes: 'Custom barcode stickers on master packaging'
      },
      shippingMethod: 'air_express',
      shippingCost: 55.00,
      estimatedDeliveryDays: 4
    }
  ]);

  // Helper to get tiered unit price based on quantity
  const getProductTierPrice = (product: Product, quantity: number): number => {
    const sortedTiers = [...product.priceTiers].sort((a, b) => b.minQty - a.minQty);
    for (const tier of sortedTiers) {
      if (quantity >= tier.minQty) {
        return tier.price;
      }
    }
    return product.priceTiers[0]?.price || 0;
  };

  const addToCart = (
    product: Product,
    quantity: number,
    variantId?: string,
    customization?: CartItem['selectedCustomization']
  ) => {
    const chosenVariant = product.variants.find(v => v.id === variantId) || product.variants[0];
    const unitPrice = getProductTierPrice(product, quantity);

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.productId === product.id && item.variantId === chosenVariant?.id
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        const newUnitPrice = getProductTierPrice(product, newQty);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          unitPrice: newUnitPrice,
          selectedCustomization: customization || updated[existingIndex].selectedCustomization
        };
        return updated;
      }

      const newItem: CartItem = {
        id: `cart-item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: product.id,
        product,
        variantId: chosenVariant?.id,
        variantName: chosenVariant?.name,
        quantity,
        unitPrice,
        selectedCustomization: customization,
        shippingMethod: 'air_express',
        shippingCost: Math.max(25, quantity * 0.8),
        estimatedDeliveryDays: 5
      };

      return [...prev, newItem];
    });

    showToast('Added to Cart', `${quantity} ${product.unit} added to your wholesale order`, 'success');
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart(prev =>
      prev.map(item => {
        if (item.id === cartItemId) {
          const unitPrice = getProductTierPrice(item.product, newQty);
          return {
            ...item,
            quantity: newQty,
            unitPrice,
            shippingCost: Math.max(25, newQty * 0.8)
          };
        }
        return item;
      })
    );
  };

  const updateCartCustomization = (
    cartItemId: string,
    customization: CartItem['selectedCustomization']
  ) => {
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, selectedCustomization: customization } : item))
    );
  };

  const setSupplierShipping = (supplierId: string, method: CartItem['shippingMethod']) => {
    setCart(prev =>
      prev.map(item => {
        if (item.product.supplierId === supplierId) {
          let multiplier = 1.0;
          let days = 5;
          if (method === 'sea_freight_ddp') {
            multiplier = 0.35;
            days = 25;
          } else if (method === 'railway') {
            multiplier = 0.55;
            days = 18;
          } else if (method === 'standard') {
            multiplier = 0.75;
            days = 10;
          }
          return {
            ...item,
            shippingMethod: method,
            shippingCost: Math.max(15, item.quantity * 0.8 * multiplier),
            estimatedDeliveryDays: days
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(i => i.id !== cartItemId));
    showToast('Item Removed', 'Product removed from wholesale cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Group cart by supplier
  const cartSupplierGroups = useMemo<SupplierCartGroup[]>(() => {
    const groupsMap = new Map<string, CartItem[]>();
    cart.forEach(item => {
      const sId = item.product.supplierId;
      if (!groupsMap.has(sId)) {
        groupsMap.set(sId, []);
      }
      groupsMap.get(sId)!.push(item);
    });

    const groups: SupplierCartGroup[] = [];
    groupsMap.forEach((items, sId) => {
      const supplier = items[0].product.supplier || SUPPLIERS.find(s => s.id === sId) || SUPPLIERS[0];
      const subtotal = items.reduce((acc, it) => acc + it.quantity * it.unitPrice, 0);
      const shippingTotal = items.reduce((acc, it) => acc + it.shippingCost, 0);
      groups.push({
        supplier,
        items,
        subtotal,
        shippingTotal,
        total: subtotal + shippingTotal,
        shippingMethod: items[0].shippingMethod,
        tradeAssuranceIncluded: true,
        supplierNote: ''
      });
    });

    return groups;
  }, [cart]);

  const cartCount = useMemo(() => cart.reduce((acc, it) => acc + it.quantity, 0), [cart]);
  const cartTotal = useMemo(
    () => cartSupplierGroups.reduce((acc, g) => acc + g.total, 0),
    [cartSupplierGroups]
  );

  // Favorites
  const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>(['prod-1', 'prod-4', 'prod-7']);
  const [favoriteSupplierIds, setFavoriteSupplierIds] = useState<string[]>(['sup-1', 'sup-4']);

  const toggleFavoriteProduct = (productId: string) => {
    setFavoriteProductIds(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Favorites', 'Item removed from your saved list', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to Favorites', 'Item added to your saved products', 'success');
        return [...prev, productId];
      }
    });
  };

  const toggleFavoriteSupplier = (supplierId: string) => {
    setFavoriteSupplierIds(prev => {
      const exists = prev.includes(supplierId);
      if (exists) {
        showToast('Supplier Unfollowed', 'Supplier removed from followed manufacturers', 'info');
        return prev.filter(id => id !== supplierId);
      } else {
        showToast('Supplier Followed', 'You will receive product updates from this verified manufacturer', 'success');
        return [...prev, supplierId];
      }
    });
  };

  const isProductFavorited = (productId: string) => favoriteProductIds.includes(productId);
  const isSupplierFavorited = (supplierId: string) => favoriteSupplierIds.includes(supplierId);

  // RFQ Management
  const [rfqs, setRfqs] = useState<RFQRequirement[]>(INITIAL_RFQS);

  const submitRFQ = (
    rfqData: Omit<
      RFQRequirement,
      'id' | 'createdAt' | 'status' | 'quotesReceivedCount' | 'quotes' | 'buyerName' | 'buyerCountry' | 'buyerFlag'
    >
  ): string => {
    const newId = `rfq-${Date.now()}`;
    const newRFQ: RFQRequirement = {
      ...rfqData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Open',
      quotesReceivedCount: 1,
      buyerName: currentUser?.companyName || 'Verified Sourcing Buyer',
      buyerCountry: country.name,
      buyerFlag: country.flag,
      quotes: [
        {
          id: `quote-${Date.now()}`,
          rfqId: newId,
          supplierId: SUPPLIERS[0].id,
          supplier: SUPPLIERS[0],
          unitPrice: (rfqData.targetPrice || 10) * 0.92,
          totalPrice: (rfqData.targetPrice || 10) * 0.92 * rfqData.quantity,
          samplePrice: 30.00,
          leadTimeDays: 14,
          validUntil: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
          notes: 'Hello! We reviewed your customized RFQ requirements and our factory can produce this to exact specs with Trade Assurance order protection. Ready to prepare sample for your review.',
          sampleAvailable: true,
          status: 'Pending'
        }
      ]
    };

    setRfqs(prev => [newRFQ, ...prev]);
    showToast('RFQ Published Successfully', 'Your RFQ is now live. Verified suppliers are preparing quotes.', 'success');
    return newId;
  };

  const acceptRFQQuote = (rfqId: string, quoteId: string) => {
    setRfqs(prev =>
      prev.map(rfq => {
        if (rfq.id === rfqId) {
          const updatedQuotes = rfq.quotes?.map(q => ({
            ...q,
            status: q.id === quoteId ? ('Accepted' as const) : ('Declined' as const)
          }));
          return {
            ...rfq,
            status: 'Awarded',
            quotes: updatedQuotes
          };
        }
        return rfq;
      })
    );
    showToast('Quotation Accepted', 'Trade Assurance draft contract generated. Proceed to checkout.', 'success');
  };

  // Instant Chat Messenger
  const [conversations, setConversations] = useState<ChatConversation[]>([
    {
      id: 'conv-1',
      supplierId: 'sup-1',
      supplier: SUPPLIERS[0],
      lastMessage: 'We have applied the 500 pcs wholesale discount and included free laser engraving samples.',
      lastTimestamp: '10:45 AM',
      unreadCount: 1,
      relatedProductId: 'prod-1',
      messages: [
        {
          id: 'msg-1',
          senderId: 'sup-1',
          senderName: SUPPLIERS[0].name,
          avatar: SUPPLIERS[0].avatar,
          text: 'Hello Mr. Wright, thank you for contacting Shenzhen Apex. How can we support your wholesale smartwatch sourcing today?',
          timestamp: '10:20 AM'
        },
        {
          id: 'msg-2',
          senderId: 'buyer',
          senderName: 'Alexander Wright',
          avatar: currentUser?.avatar || '',
          text: 'Hi! Can you do custom laser branding on 200 units of the Ultra AMOLED Smart Watch?',
          timestamp: '10:32 AM'
        },
        {
          id: 'msg-3',
          senderId: 'sup-1',
          senderName: SUPPLIERS[0].name,
          avatar: SUPPLIERS[0].avatar,
          text: 'Yes absolutely! We have applied the 500 pcs wholesale discount and included free laser engraving samples.',
          timestamp: '10:45 AM',
          isQuoteOffer: true,
          quoteDetails: {
            qty: 200,
            unitPrice: 12.80,
            shippingCost: 85.00,
            leadTime: '5-7 business days'
          }
        }
      ]
    },
    {
      id: 'conv-2',
      supplierId: 'sup-2',
      supplier: SUPPLIERS[1],
      lastMessage: 'Lab dip swatches for the vintage charcoal wash have been dispatched via DHL Express.',
      lastTimestamp: 'Yesterday',
      unreadCount: 0,
      relatedProductId: 'prod-2',
      messages: [
        {
          id: 'msg-21',
          senderId: 'buyer',
          senderName: 'Alexander Wright',
          avatar: currentUser?.avatar || '',
          text: 'Could you please send us the lab dips for the 450 GSM French Terry blanks?',
          timestamp: 'Yesterday 2:15 PM'
        },
        {
          id: 'msg-22',
          senderId: 'sup-2',
          senderName: SUPPLIERS[1].name,
          avatar: SUPPLIERS[1].avatar,
          text: 'Lab dip swatches for the vintage charcoal wash have been dispatched via DHL Express.',
          timestamp: 'Yesterday 3:30 PM'
        }
      ]
    }
  ]);

  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv-1');

  const sendMessage = (
    conversationId: string,
    text: string,
    attachments?: string[],
    quoteDetails?: ChatMessage['quoteDetails']
  ) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'buyer',
      senderName: currentUser?.name || 'Alexander Wright',
      avatar: currentUser?.avatar || '',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments,
      isQuoteOffer: !!quoteDetails,
      quoteDetails
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: text,
            lastTimestamp: 'Just now',
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    // Realistic automated simulated response from supplier after 2 seconds!
    setTimeout(() => {
      setConversations(prev =>
        prev.map(c => {
          if (c.id === conversationId) {
            const supplierResponse: ChatMessage = {
              id: `msg-auto-${Date.now()}`,
              senderId: c.supplierId,
              senderName: c.supplier.name,
              avatar: c.supplier.avatar,
              text: `Thank you for your message! Our trade manager has received your inquiry: "${text.substring(0, 40)}...". We are preparing the official Trade Assurance PI document and custom spec sheet right now.`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            return {
              ...c,
              lastMessage: supplierResponse.text,
              lastTimestamp: 'Just now',
              messages: [...c.messages, supplierResponse]
            };
          }
          return c;
        })
      );
      showToast('New Supplier Message', `Response received from ${SUPPLIERS.find(s => s.id === conversations.find(c => c.id === conversationId)?.supplierId)?.name || 'Supplier'}`, 'info');
    }, 2200);
  };

  const startChatWithSupplier = (supplierId: string, relatedProductId?: string, initialMessage?: string): string => {
    const existing = conversations.find(c => c.supplierId === supplierId);
    if (existing) {
      if (initialMessage) {
        sendMessage(existing.id, initialMessage);
      }
      setActiveConversationId(existing.id);
      return existing.id;
    }

    const targetSupplier = SUPPLIERS.find(s => s.id === supplierId) || SUPPLIERS[0];
    const newConvId = `conv-${Date.now()}`;
    const newConv: ChatConversation = {
      id: newConvId,
      supplierId,
      supplier: targetSupplier,
      lastMessage: initialMessage || 'Conversation started',
      lastTimestamp: 'Just now',
      unreadCount: 0,
      relatedProductId,
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: 'sup-' + supplierId,
          senderName: targetSupplier.name,
          avatar: targetSupplier.avatar,
          text: `Welcome to ${targetSupplier.name}! How may we assist your bulk purchase order today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    if (initialMessage) {
      newConv.messages.push({
        id: `msg-init-${Date.now()}`,
        senderId: 'buyer',
        senderName: currentUser?.name || 'Alexander Wright',
        avatar: currentUser?.avatar || '',
        text: initialMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }

    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConvId);
    return newConvId;
  };

  // Orders Management
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ord-8801',
      orderNumber: 'TA-2026-9041285',
      supplier: SUPPLIERS[0],
      items: [
        {
          productId: 'prod-1',
          productTitle: 'Ultra Smart Watch AMOLED Screen Bluetooth Calling IP68 Waterproof Smartwatch',
          productImage: PRODUCTS[0].images[0],
          variantName: 'Space Black / Silicone Strap',
          unitPrice: 15.20,
          quantity: 100,
          unit: 'pieces'
        }
      ],
      subtotal: 1520.00,
      shippingFee: 85.00,
      taxFee: 0.00,
      discount: 50.00,
      totalAmount: 1555.00,
      currency: 'USD',
      status: 'In Transit',
      tradeAssuranceProtected: true,
      createdAt: '2026-08-20',
      shippingAddress: {
        fullName: 'Alexander Wright',
        street: '750 Battery Street, Suite 400',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94111',
        country: 'United States',
        phone: '+1 (415) 890-3412'
      },
      shippingCarrier: 'FedEx International Priority',
      trackingNumber: 'FX-88492019482',
      estimatedDeliveryDate: '2026-09-02',
      timeline: [
        { status: 'Order Placed & Contract Signed', timestamp: '2026-08-20 09:30', completed: true, description: 'Trade Assurance contract activated with payment held in escrow.' },
        { status: 'Payment Escrow Verified', timestamp: '2026-08-20 11:15', completed: true, description: 'Bank transfer verified by Citibank Trade Assurance Escrow.' },
        { status: 'Production & Factory QA Inspection', timestamp: '2026-08-23 16:00', completed: true, description: 'TUV Rheinland 100% pre-shipment quality inspection passed.' },
        { status: 'Dispatched from Factory Warehouse', timestamp: '2026-08-25 14:20', completed: true, description: 'Package picked up by air courier.' },
        { status: 'International Transit / Air Cargo Flight', timestamp: '2026-08-27 08:45', completed: true, description: 'Departed transit hub in Hong Kong airport en route to SFO.' },
        { status: 'Customs Clearance & Out for Delivery', timestamp: 'Pending', completed: false, description: 'US Customs DDP clearance and final mile delivery.' }
      ]
    },
    {
      id: 'ord-8802',
      orderNumber: 'TA-2026-9037411',
      supplier: SUPPLIERS[3],
      items: [
        {
          productId: 'prod-4',
          productTitle: 'Custom Eco-friendly Kraft Paper Magnetic Closure Rigid Gift Box',
          productImage: PRODUCTS[3].images[0],
          variantName: 'Matte Black / Gold Foil Logo',
          unitPrice: 0.85,
          quantity: 1000,
          unit: 'pieces'
        }
      ],
      subtotal: 850.00,
      shippingFee: 140.00,
      taxFee: 0.00,
      discount: 30.00,
      totalAmount: 960.00,
      currency: 'USD',
      status: 'Delivered',
      tradeAssuranceProtected: true,
      createdAt: '2026-07-10',
      shippingAddress: {
        fullName: 'Alexander Wright',
        street: '750 Battery Street, Suite 400',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94111',
        country: 'United States',
        phone: '+1 (415) 890-3412'
      },
      shippingCarrier: 'DHL Global Forwarding DDP',
      trackingNumber: 'DHL-489201948',
      estimatedDeliveryDate: '2026-07-28',
      timeline: [
        { status: 'Order Placed', timestamp: '2026-07-10', completed: true, description: 'Trade Assurance order generated.' },
        { status: 'Dispatched', timestamp: '2026-07-18', completed: true, description: 'Shipment loaded onto container.' },
        { status: 'Delivered & Completed', timestamp: '2026-07-28', completed: true, description: 'Signed and accepted by buyer warehouse.' }
      ]
    }
  ]);

  const createOrderFromCart = (
    shippingAddress: Order['shippingAddress'],
    paymentMethod: string
  ): Order => {
    const firstGroup = cartSupplierGroups[0];
    const orderItems: Order['items'] = cart.map(item => ({
      productId: item.productId,
      productTitle: item.product.title,
      productImage: item.product.images[0],
      variantName: item.variantName,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      unit: item.product.unit
    }));

    const subtotal = cart.reduce((acc, it) => acc + it.quantity * it.unitPrice, 0);
    const shippingFee = cart.reduce((acc, it) => acc + it.shippingCost, 0);
    const totalAmount = subtotal + shippingFee;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `TA-${new Date().getFullYear()}-${Math.floor(1000000 + Math.random() * 9000000)}`,
      supplier: firstGroup?.supplier || SUPPLIERS[0],
      items: orderItems,
      subtotal,
      shippingFee,
      taxFee: 0,
      discount: subtotal > 1000 ? 50 : 0,
      totalAmount: totalAmount - (subtotal > 1000 ? 50 : 0),
      currency: currency,
      status: 'Waiting Dispatch',
      tradeAssuranceProtected: true,
      createdAt: new Date().toISOString().split('T')[0],
      shippingAddress,
      shippingCarrier: 'Alibaba Verified Logistics (Air DDP Express)',
      trackingNumber: `ALI-EXP-${Math.floor(100000000 + Math.random() * 900000000)}`,
      estimatedDeliveryDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      timeline: [
        { status: 'Trade Assurance Order Created', timestamp: 'Just now', completed: true, description: `Order secured with Alibaba Trade Assurance via ${paymentMethod}.` },
        { status: 'Payment Escrow Confirmed', timestamp: 'Just now', completed: true, description: 'Payment held safely in escrow. Supplier authorized to start production.' },
        { status: 'Production & Quality Inspection', timestamp: 'Estimated in 2 days', completed: false, description: 'Factory preparing goods with packaging & serialization.' },
        { status: 'Dispatch & Carrier Pickup', timestamp: 'Estimated in 3 days', completed: false, description: 'Air express courier assigned.' }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    showToast('Order Placed Successfully!', `Trade Assurance Order #${newOrder.orderNumber} is now active.`, 'success');
    return newOrder;
  };

  // Search & Global Navigation State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTab, setSearchTab] = useState<'products' | 'manufacturers' | 'worldwide' | 'ai-mode'>('products');

  // Modals
  const [isCurrencyModalOpen, setCurrencyModalOpen] = useState(false);
  const [isLocationMapModalOpen, setLocationMapModalOpen] = useState(false);
  const [isImageSearchModalOpen, setImageSearchModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [contactSupplierData, setContactSupplierData] = useState<{ supplier: Supplier; product?: Product } | null>(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isTradeAssuranceModalOpen, setTradeAssuranceModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const showToast = (title: string, message: string, type: ToastInfo['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        currency,
        currencyConfig,
        setCurrency,
        country,
        setCountry,
        activeDeliveryHub,
        setActiveDeliveryHub,
        detectedAddress,
        setDetectedAddress,
        detectCurrentLocation,
        setCustomAddressLocation,
        language,
        setLanguage,
        formatPrice,
        cart,
        cartSupplierGroups,
        cartCount,
        cartTotal,
        addToCart,
        updateCartQuantity,
        updateCartCustomization,
        setSupplierShipping,
        removeFromCart,
        clearCart,
        favoriteProductIds,
        favoriteSupplierIds,
        toggleFavoriteProduct,
        toggleFavoriteSupplier,
        isProductFavorited,
        isSupplierFavorited,
        rfqs,
        submitRFQ,
        acceptRFQQuote,
        conversations,
        activeConversationId,
        setActiveConversationId,
        sendMessage,
        startChatWithSupplier,
        orders,
        createOrderFromCart,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        supplierProfile,
        updateSupplierProfile,
        updateOrderStatus,
        submitSellerQuote,
        searchQuery,
        setSearchQuery,
        searchTab,
        setSearchTab,
        isCurrencyModalOpen,
        setCurrencyModalOpen,
        isLocationMapModalOpen,
        setLocationMapModalOpen,
        isImageSearchModalOpen,
        setImageSearchModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        contactSupplierData,
        setContactSupplierData,
        isAuthModalOpen,
        setAuthModalOpen,
        isTradeAssuranceModalOpen,
        setTradeAssuranceModalOpen,
        currentUser,
        loginUser,
        logoutUser,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
