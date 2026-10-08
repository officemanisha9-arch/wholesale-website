import type { Product } from '../types';
import { SUPPLIERS } from './suppliers';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Ultra Smart Watch AMOLED Screen Bluetooth Calling IP68 Waterproof Smartwatch with ECG Heart Rate',
    categoryId: 'electronics',
    categoryName: 'Consumer Electronics',
    subcategoryId: 'smart-wearables',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&auto=format&fit=crop&q=80'
    ],
    priceTiers: [
      { minQty: 2, maxQty: 49, price: 18.50 },
      { minQty: 50, maxQty: 199, price: 15.20 },
      { minQty: 200, maxQty: 999, price: 12.80 },
      { minQty: 1000, price: 10.50 }
    ],
    moq: 2,
    unit: 'pieces',
    supplierId: 'sup-1',
    supplier: SUPPLIERS[0],
    rating: 4.9,
    reviewsCount: 384,
    ordersCount: 14200,
    readyToShip: true,
    usLocalStock: true,
    alibabaGuaranteed: true,
    fastDispatchDays: 3,
    samplePrice: 25.00,
    sampleLeadTimeDays: 2,
    customLogoMoq: 50,
    customPackagingMoq: 200,
    graphicCustomizationMoq: 500,
    variants: [
      { id: 'v-1', name: 'Space Black / Silicone Strap', color: '#1a1a1a', sku: 'SW-BLK-SIL' },
      { id: 'v-2', name: 'Titanium Silver / Ocean Band', color: '#d1d5db', sku: 'SW-SLV-OCN' },
      { id: 'v-3', name: 'Rose Gold / Milanese Loop', color: '#e5b3a4', sku: 'SW-RSG-MIL' },
      { id: 'v-4', name: 'Midnight Blue / Alpine Loop', color: '#1e3a8a', sku: 'SW-BLU-ALP' }
    ],
    specifications: [
      { label: 'Display Size', value: '2.04 inch AMOLED HD (368*448)' },
      { label: 'Battery Capacity', value: '380mAh (7-10 Days Standby)' },
      { label: 'Waterproof Level', value: 'IP68 Professional Waterproof' },
      { label: 'Bluetooth Version', value: 'BT 5.3 Low Energy' },
      { label: 'Certifications', value: 'CE, FCC, RoHS, MSDS, UN38.3' },
      { label: 'Compatible OS', value: 'iOS 10.0+ / Android 5.0+' }
    ],
    description: 'High-performance luxury smartwatch engineered with aerospace grade titanium alloy casing, vibrant AMOLED always-on display, 24/7 dynamic biometric sensor monitoring, wireless magnetic fast charging, and customizable app notifications.',
    features: [
      '2.04 inch HD AMOLED Retina Display with sapphire glass',
      'Dual-mode Bluetooth 5.3 for crystal clear voice calls',
      '100+ Sports Fitness tracking modes with GPS track sync',
      'Comprehensive biometrics: Real-time ECG, SpO2, Heart Rate, Sleep Tracking',
      'Support multilingual firmware & custom boot animation logo'
    ],
    packagingDetails: 'Standard retail magnetic gift box: 100 pcs/carton (Gross Weight: 18.5 KG, Carton dimensions: 54x38x26 cm).',
    leadTimeTable: [
      { qtyRange: '1 - 50 pcs', leadDays: 3 },
      { qtyRange: '51 - 500 pcs', leadDays: 7 },
      { qtyRange: '501 - 2000 pcs', leadDays: 14 },
      { qtyRange: '> 2000 pcs', leadDays: 20 }
    ],
    reviews: [
      {
        id: 'r-1',
        author: 'Marcus Vance',
        country: 'United States',
        countryFlag: '🇺🇸',
        rating: 5,
        date: '2026-08-14',
        comment: 'Outstanding quality. Ordered a sample batch of 200 units with custom logo laser engraving. Battery easily lasts 6 days under heavy testing. Packaging arrived pristine.',
        verifiedPurchase: true,
        productVariant: 'Space Black / Silicone Strap'
      },
      {
        id: 'r-2',
        author: 'Elena Rossi',
        country: 'Italy',
        countryFlag: '🇮🇹',
        rating: 5,
        date: '2026-07-29',
        comment: 'Best supplier I have dealt with on Alibaba. Smooth communication via messenger and fast air express dispatch in 4 days.',
        verifiedPurchase: true
      }
    ],
    tags: ['Best Seller', 'Alibaba Guaranteed', 'Fast Dispatch', 'Ready to Ship'],
    createdAt: '2026-01-10'
  },
  {
    id: 'prod-2',
    title: 'Custom Heavyweight 450GSM Organic Cotton French Terry Oversized Drop Shoulder Hoodie Blank Streetwear',
    categoryId: 'apparel',
    categoryName: 'Apparel & Accessories',
    subcategoryId: 'mens-clothing',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80'
    ],
    priceTiers: [
      { minQty: 10, maxQty: 49, price: 16.80 },
      { minQty: 50, maxQty: 199, price: 13.50 },
      { minQty: 200, maxQty: 499, price: 10.90 },
      { minQty: 500, price: 8.90 }
    ],
    moq: 10,
    unit: 'pieces',
    supplierId: 'sup-2',
    supplier: SUPPLIERS[1],
    rating: 4.8,
    reviewsCount: 512,
    ordersCount: 38000,
    readyToShip: true,
    usLocalStock: false,
    alibabaGuaranteed: true,
    fastDispatchDays: 5,
    samplePrice: 30.00,
    sampleLeadTimeDays: 3,
    customLogoMoq: 30,
    customPackagingMoq: 100,
    graphicCustomizationMoq: 50,
    variants: [
      { id: 'v-21', name: 'Washed Charcoal Black (S / M / L / XL / XXL)', color: '#27272a', sku: 'HD-WSH-BLK' },
      { id: 'v-22', name: 'Vintage Sage Green (S / M / L / XL / XXL)', color: '#4d5d53', sku: 'HD-VNT-GRN' },
      { id: 'v-23', name: 'Raw Cream Oatmeal (S / M / L / XL / XXL)', color: '#e7dec8', sku: 'HD-RAW-CRM' },
      { id: 'v-24', name: 'Mocha Brown (S / M / L / XL / XXL)', color: '#543d2b', sku: 'HD-MCH-BRN' }
    ],
    specifications: [
      { label: 'Fabric Composition', value: '100% Combed Organic Cotton French Terry' },
      { label: 'Fabric Weight', value: '450 GSM Heavyweight Dense Knit' },
      { label: 'Fit Type', value: 'Oversized Boxy Silhouette / Drop Shoulder' },
      { label: 'Technics', value: 'Garment Enzyme Pigment Washed / Preshrunk' },
      { label: 'Seam Finish', value: 'Twin Needle Coverstitch Reinforced Seams' }
    ],
    description: 'Premium luxury streetwear blank hoodie designed for high-end fashion brands. Features heavy 450 GSM French Terry cotton with double lined hood without drawstrings, kangaroo pocket, thick 2x2 ribbed cuffs, and soft brushed interior.',
    features: [
      '100% GOTS Certified Organic Combed Cotton',
      'Ultra dense 450 GSM fabric with zero pilling and anti-shrink treatment',
      'Supports Screen Print, DTG, Puff Print, Chenille Embroidery, and Custom Woven Labels',
      'Pre-washed and pre-shrunk for consistent luxury drape'
    ],
    packagingDetails: 'Individual biodegradable frosted zipper bag with hangtag: 30 pcs/carton (21 KG).',
    leadTimeTable: [
      { qtyRange: '10 - 100 pcs', leadDays: 5 },
      { qtyRange: '101 - 500 pcs', leadDays: 10 },
      { qtyRange: '501 - 2000 pcs', leadDays: 18 }
    ],
    reviews: [
      {
        id: 'r-21',
        author: 'Jordan Reed',
        country: 'United Kingdom',
        countryFlag: '🇬🇧',
        rating: 5,
        date: '2026-08-18',
        comment: 'The 450 GSM weight is authentic and heavy. Perfect boxy streetwear drape. We ordered 400 pcs with custom puff print and silicone patch. Sold out in 2 days.',
        verifiedPurchase: true
      }
    ],
    tags: ['Customizable', 'GOTS Organic', 'Streetwear Blank', 'Trade Assurance'],
    createdAt: '2026-02-01'
  },
  {
    id: 'prod-3',
    title: 'High Precision CNC 3000W Fiber Laser Cutting Machine for Sheet Metal Stainless Steel Aluminum Carbon Plate',
    categoryId: 'machinery',
    categoryName: 'Industrial Machinery',
    subcategoryId: 'metalworking',
    images: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
    ],
    priceTiers: [
      { minQty: 1, maxQty: 2, price: 14800.00 },
      { minQty: 3, maxQty: 9, price: 13500.00 },
      { minQty: 10, price: 11900.00 }
    ],
    moq: 1,
    unit: 'set',
    supplierId: 'sup-3',
    supplier: SUPPLIERS[2],
    rating: 4.9,
    reviewsCount: 89,
    ordersCount: 420,
    readyToShip: false,
    usLocalStock: false,
    alibabaGuaranteed: true,
    fastDispatchDays: 15,
    samplePrice: 14800.00,
    sampleLeadTimeDays: 15,
    variants: [
      { id: 'v-31', name: '3000W Raycus Laser / 1500x3000mm Bed', sku: 'LSR-3000W-1530' },
      { id: 'v-32', name: '6000W IPG Laser / 2000x4000mm Exchange Bed', sku: 'LSR-6000W-2040' },
      { id: 'v-33', name: '12000W MAX Laser / Fully Enclosed Dual Table', sku: 'LSR-12000W-ENC' }
    ],
    specifications: [
      { label: 'Laser Source', value: 'Raycus / Maxphotonics / IPG (3000W - 12000W)' },
      { label: 'Working Area', value: '1500mm x 3000mm (Optional 2000x6000mm)' },
      { label: 'Positioning Accuracy', value: '±0.02 mm / Reposition ±0.01 mm' },
      { label: 'Max Moving Speed', value: '120 m/min with Japanese Yaskawa Servo Motors' },
      { label: 'Cutting Thickness', value: 'Carbon Steel up to 22mm, Stainless Steel up to 12mm' },
      { label: 'Warranty & Support', value: '3 Years Warranty + Free Overseas On-site Training' }
    ],
    description: 'Industrial-grade fiber laser cutting system engineered for metal fabrication workshops, aerospace components, automotive chassis, and elevator manufacturing. Equipped with aviation aluminum gantry, Swiss Raytools autofocus cutting head, and intelligent CypCut CNC system.',
    features: [
      'Aviation extruded aluminum lightweight rigid gantry',
      'Heavy cast iron segmented heat-treated bed frame with 20-year stability guarantee',
      'CypCut professional sheet nesting CAD software included',
      'Complete safety enclosure with OD6+ laser protection glass'
    ],
    packagingDetails: 'Standard export wooden crate with anti-rust oil seal wrap (Total Weight: 4200 KG, 40ft High Cube Container).',
    leadTimeTable: [
      { qtyRange: '1 - 3 sets', leadDays: 15 },
      { qtyRange: '4 - 10 sets', leadDays: 25 }
    ],
    reviews: [
      {
        id: 'r-31',
        author: 'Heinrich Weber',
        country: 'Germany',
        countryFlag: '🇩🇪',
        rating: 5,
        date: '2026-06-11',
        comment: 'Exceptional CNC engineering. Delivered to our Hamburg facility within 28 days via sea freight. The 3000W Raycus cuts 10mm 316 stainless with mirror edge finish.',
        verifiedPurchase: true
      }
    ],
    tags: ['Industrial Machine', 'CE Certified', 'Overseas Support', 'Trade Assurance'],
    createdAt: '2026-01-20'
  },
  {
    id: 'prod-4',
    title: 'Custom Eco-friendly Kraft Paper Magnetic Closure Rigid Gift Box Luxury Cosmetic Jewelry Packaging with Foam Insert',
    categoryId: 'packaging',
    categoryName: 'Packaging & Printing',
    subcategoryId: 'paper-packaging',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80'
    ],
    priceTiers: [
      { minQty: 100, maxQty: 499, price: 1.45 },
      { minQty: 500, maxQty: 1999, price: 0.85 },
      { minQty: 2000, maxQty: 4999, price: 0.58 },
      { minQty: 5000, price: 0.39 }
    ],
    moq: 100,
    unit: 'pieces',
    supplierId: 'sup-4',
    supplier: SUPPLIERS[3],
    rating: 4.9,
    reviewsCount: 420,
    ordersCount: 85000,
    readyToShip: false,
    usLocalStock: true,
    alibabaGuaranteed: true,
    fastDispatchDays: 7,
    samplePrice: 15.00,
    sampleLeadTimeDays: 3,
    customLogoMoq: 100,
    customPackagingMoq: 100,
    graphicCustomizationMoq: 100,
    variants: [
      { id: 'v-41', name: 'Matte Black / Gold Foil Logo (20x15x6cm)', sku: 'BX-BLK-GLD' },
      { id: 'v-42', name: 'Raw Kraft Brown / Embossed (18x12x5cm)', sku: 'BX-KRF-EMB' },
      { id: 'v-43', name: 'Pearl White / Holographic Foil (25x20x8cm)', sku: 'BX-WHT-HLG' }
    ],
    specifications: [
      { label: 'Material', value: '1200gsm Heavy Greyboard + 157gsm Art Paper' },
      { label: 'Closure Mechanism', value: 'Concealed Dual Magnetic Snaps' },
      { label: 'Surface Finish', value: 'Matte Soft-touch Lamination + Spot UV / Gold Foil' },
      { label: 'Certifications', value: 'FSC Certified, RoHS Compliant, FDA Non-toxic' }
    ],
    description: 'Custom luxury rigid cardboard packaging boxes with book-style magnetic lid. Perfect for beauty cosmetics, perfume bottles, fine jewelry, electronics, and VIP corporate PR gifting.',
    features: [
      '100% Recycled & FSC Certified Sustainable Materials',
      'Reinforced 1200gsm greyboard structure resistant to shipping crush',
      'Free 3D digital mockup and dieline support before mass production',
      'Custom die-cut EVA foam, velvet lining, or molded pulp trays available'
    ],
    packagingDetails: 'Flat-pack folding structure saves 70% shipping volume. 100 pcs per 5-layer corrugated carton.',
    leadTimeTable: [
      { qtyRange: '100 - 1000 pcs', leadDays: 7 },
      { qtyRange: '1001 - 5000 pcs', leadDays: 12 },
      { qtyRange: '> 5000 pcs', leadDays: 18 }
    ],
    reviews: [
      {
        id: 'r-41',
        author: 'Sophie Martin',
        country: 'France',
        countryFlag: '🇫🇷',
        rating: 5,
        date: '2026-08-03',
        comment: 'The soft-touch matte lamination and gold foil stamping exceeded our expectations. Our luxury skincare line looked 10x more expensive.',
        verifiedPurchase: true
      }
    ],
    tags: ['FSC Certified', 'Eco Packaging', 'Low MOQ 100', 'Top Supplier'],
    createdAt: '2026-02-15'
  },
  {
    id: 'prod-5',
    title: 'Active Noise Cancelling TWS Wireless Earbuds Bluetooth 5.4 Hi-Res Audio 45dB Hybrid ANC with Smart Touch Screen Case',
    categoryId: 'electronics',
    categoryName: 'Consumer Electronics',
    subcategoryId: 'audio-video',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ],
    priceTiers: [
      { minQty: 5, maxQty: 49, price: 14.20 },
      { minQty: 50, maxQty: 199, price: 11.50 },
      { minQty: 200, maxQty: 999, price: 9.40 },
      { minQty: 1000, price: 7.80 }
    ],
    moq: 5,
    unit: 'pieces',
    supplierId: 'sup-1',
    supplier: SUPPLIERS[0],
    rating: 4.9,
    reviewsCount: 620,
    ordersCount: 29000,
    readyToShip: true,
    usLocalStock: true,
    alibabaGuaranteed: true,
    fastDispatchDays: 2,
    samplePrice: 20.00,
    sampleLeadTimeDays: 2,
    customLogoMoq: 50,
    customPackagingMoq: 200,
    variants: [
      { id: 'v-51', name: 'Piano Glossy White / LCD Screen', color: '#ffffff', sku: 'TWS-LCD-WHT' },
      { id: 'v-52', name: 'Cyber Matte Black / LCD Screen', color: '#111827', sku: 'TWS-LCD-BLK' },
      { id: 'v-53', name: 'Titanium Grey / Metal Luster', color: '#6b7280', sku: 'TWS-LCD-GRY' }
    ],
    specifications: [
      { label: 'ANC Depth', value: '-45dB Hybrid Active Noise Cancellation + Transparency' },
      { label: 'Audio Driver', value: '13mm Titanium Diaphragm Moving Coil Drivers' },
      { label: 'Charging Case Feature', value: 'Full Color Touch Screen with Equalizer & Wallpaper' },
      { label: 'Battery Life', value: '8h Earbuds + 38h Charging Case (USB-C Fast Charge)' },
      { label: 'Latency', value: 'Ultra-low 35ms Gaming Mode' }
    ],
    description: 'Next-generation intelligent TWS wireless earbuds featuring an integrated interactive OLED touch screen on the charging case. Control EQ presets, switch ANC modes, find lost earbuds, and view battery levels directly from the case.',
    features: [
      'Interactive Smart Full Color Touch Screen charging case',
      'Dual mic Environmental Noise Cancellation (ENC) for ultra clear calls',
      'Spatial 360 Audio surround sound simulation',
      'Bluetooth 5.4 seamless dual device pairing'
    ],
    packagingDetails: 'Retail color gift box with Type-C cable & 3 pairs of silicone ear tips (100 pcs/carton, 14.2 KG).',
    leadTimeTable: [
      { qtyRange: '5 - 50 pcs', leadDays: 2 },
      { qtyRange: '51 - 500 pcs', leadDays: 6 },
      { qtyRange: '> 500 pcs', leadDays: 12 }
    ],
    reviews: [
      {
        id: 'r-51',
        author: 'David Zhang',
        country: 'Canada',
        countryFlag: '🇨🇦',
        rating: 5,
        date: '2026-08-10',
        comment: 'The touch screen on the case is a huge selling point on Amazon and TikTok shop. Sound quality is rich with deep bass.',
        verifiedPurchase: true
      }
    ],
    tags: ['Trending Tech', 'Smart Touch Screen', 'Alibaba Guaranteed', 'High Margin'],
    createdAt: '2026-03-01'
  },
  {
    id: 'prod-6',
    title: 'Commercial Digital Touchscreen Air Fryer 12L XXL Stainless Steel Visual Window Oven with Rotisserie Dehydrator',
    categoryId: 'home-kitchen',
    categoryName: 'Home & Kitchen',
    subcategoryId: 'kitchen-appliances',
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=80'
    ],
    priceTiers: [
      { minQty: 20, maxQty: 99, price: 38.50 },
      { minQty: 100, maxQty: 499, price: 32.00 },
      { minQty: 500, price: 26.50 }
    ],
    moq: 20,
    unit: 'pieces',
    supplierId: 'sup-6',
    supplier: SUPPLIERS[5],
    rating: 4.8,
    reviewsCount: 290,
    ordersCount: 16500,
    readyToShip: true,
    usLocalStock: true,
    alibabaGuaranteed: true,
    fastDispatchDays: 4,
    samplePrice: 55.00,
    sampleLeadTimeDays: 3,
    variants: [
      { id: 'v-61', name: 'US Plug 120V / Brushed Stainless Steel', sku: 'AF-12L-US' },
      { id: 'v-62', name: 'EU Plug 230V / Matte Black Finish', sku: 'AF-12L-EU' },
      { id: 'v-63', name: 'UK Plug 240V / Retro Cream White', sku: 'AF-12L-UK' }
    ],
    specifications: [
      { label: 'Capacity', value: '12 Liters XXL Family Capacity' },
      { label: 'Power Rating', value: '1800W High Efficiency 360° Turbo Airflow' },
      { label: 'Temperature Range', value: '50°C - 230°C (120°F - 450°F)' },
      { label: 'Certifications', value: 'ETL, CE, CB, GS, RoHS, LFGB, FDA' },
      { label: 'Control Type', value: '12-in-1 One-Touch Smart Digital LED Touchscreen' }
    ],
    description: 'All-in-one 12L countertop air fryer and multi-cooker oven featuring transparent dual-pane viewing glass, 360° rapid thermal cyclone technology, dishwasher-safe non-stick accessories, and rotisserie basket.',
    features: [
      '12 pre-programmed presets: Air Fry, Roast, Broil, Bake, Dehydrate, Reheat',
      'Visible tempered glass viewing window with interior LED cavity light',
      'Food-grade Teflon-free ceramic non-stick coating',
      'Includes 6 accessories: Rotisserie spit, mesh basket, drip tray, wire rack, fetch tool'
    ],
    packagingDetails: 'Heavy duty color gift box with molded foam + 5-layer master carton (Gross Weight: 8.2 KG per unit).',
    leadTimeTable: [
      { qtyRange: '20 - 200 pcs', leadDays: 5 },
      { qtyRange: '201 - 1000 pcs', leadDays: 14 }
    ],
    reviews: [
      {
        id: 'r-61',
        author: 'Liam O’Connor',
        country: 'Australia',
        countryFlag: '🇦🇺',
        rating: 5,
        date: '2026-07-15',
        comment: 'Excellent build quality. Certified for Australian SAA standard without hassle. Supplier supplied custom packaging in English.',
        verifiedPurchase: true
      }
    ],
    tags: ['US Local Stock', 'Kitchen Essential', 'ETL Certified', 'Trade Assurance'],
    createdAt: '2026-01-25'
  },
  {
    id: 'prod-7',
    title: 'Double-Walled Insulated Stainless Steel Tumbler 40oz with Ergonomic Handle Bamboo Straw Lid Leakproof Travel Mug',
    categoryId: 'home-kitchen',
    categoryName: 'Home & Kitchen',
    subcategoryId: 'cookware-tableware',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80'
    ],
    priceTiers: [
      { minQty: 24, maxQty: 99, price: 5.80 },
      { minQty: 100, maxQty: 499, price: 4.40 },
      { minQty: 500, maxQty: 1999, price: 3.50 },
      { minQty: 2000, price: 2.90 }
    ],
    moq: 24,
    unit: 'pieces',
    supplierId: 'sup-7',
    supplier: SUPPLIERS[6],
    rating: 4.9,
    reviewsCount: 780,
    ordersCount: 110000,
    readyToShip: true,
    usLocalStock: true,
    alibabaGuaranteed: true,
    fastDispatchDays: 3,
    samplePrice: 10.00,
    sampleLeadTimeDays: 2,
    customLogoMoq: 50,
    customPackagingMoq: 200,
    variants: [
      { id: 'v-71', name: 'Pastel Lavender Dream (40oz)', color: '#d8b4e2', sku: 'TMB-40-LAV' },
      { id: 'v-72', name: 'Eucalyptus Sage Green (40oz)', color: '#94a89a', sku: 'TMB-40-SGE' },
      { id: 'v-73', name: 'Midnight Matte Jet Black (40oz)', color: '#1f2937', sku: 'TMB-40-BLK' },
      { id: 'v-74', name: 'Cream Oat Milk (40oz)', color: '#f3ede2', sku: 'TMB-40-CRM' }
    ],
    specifications: [
      { label: 'Capacity', value: '40 oz (1200 ml) Car Cup-holder Compatible' },
      { label: 'Material', value: 'Food-Grade 18/8 (304) Pro Stainless Steel / BPA Free' },
      { label: 'Insulation Performance', value: 'Cold for 34 Hours / Hot for 12 Hours' },
      { label: 'Lid System', value: '3-way FlowState Rotating Lid with Spill Shield' }
    ],
    description: 'Trending 40oz vacuum insulated travel tumbler featuring high durability powder coating, ergonomic comfort-grip handle, tapered base fitting all vehicle cup holders, and reusable silicone straw.',
    features: [
      'Double-wall vacuum insulation with copper lining',
      'Laser engraved or UV 3D relief custom branding',
      'Dishwasher safe and sweat-proof powder coat finish',
      'FDA & LFGB food contact safety compliant'
    ],
    packagingDetails: 'White individual tuck box: 24 pcs/master carton (Gross Weight: 14.5 KG).',
    leadTimeTable: [
      { qtyRange: '24 - 100 pcs', leadDays: 3 },
      { qtyRange: '101 - 500 pcs', leadDays: 7 },
      { qtyRange: '> 500 pcs', leadDays: 14 }
    ],
    reviews: [
      {
        id: 'r-71',
        author: 'Chloe Bennett',
        country: 'United States',
        countryFlag: '🇺🇸',
        rating: 5,
        date: '2026-08-22',
        comment: 'Laser engraving on our brand logo came out razor sharp. 1000 units arrived in California via DDP shipping in 12 days.',
        verifiedPurchase: true
      }
    ],
    tags: ['TikTok Viral', 'US Stock', 'Laser Logo MOQ 50', 'Alibaba Guaranteed'],
    createdAt: '2026-02-10'
  },
  {
    id: 'prod-8',
    title: 'Tier 1 N-Type TOPCon 580W Bifacial Dual-Glass High Efficiency Solar Panel for Commercial Residential Power Plant',
    categoryId: 'renewable-energy',
    categoryName: 'Renewable Energy & Solar',
    subcategoryId: 'solar-panels',
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df570464756?w=800&auto=format&fit=crop&q=80'
    ],
    priceTiers: [
      { minQty: 36, maxQty: 143, price: 62.00 }, // ~0.107 $/watt
      { minQty: 144, maxQty: 575, price: 54.00 },
      { minQty: 576, price: 47.50 }
    ],
    moq: 36, // 1 Pallet
    unit: 'pieces',
    supplierId: 'sup-8',
    supplier: SUPPLIERS[7],
    rating: 5.0,
    reviewsCount: 164,
    ordersCount: 42000,
    readyToShip: true,
    usLocalStock: true,
    alibabaGuaranteed: true,
    fastDispatchDays: 7,
    samplePrice: 90.00,
    sampleLeadTimeDays: 5,
    variants: [
      { id: 'v-81', name: '580W Bifacial Dual-Glass Silver Frame', sku: 'SLR-580W-SLV' },
      { id: 'v-82', name: '580W Full Black Aesthetic Dual-Glass', sku: 'SLR-580W-BLK' }
    ],
    specifications: [
      { label: 'Cell Type', value: 'N-Type TOPCon 182*182mm (144 Half-cut cells)' },
      { label: 'Module Efficiency', value: '22.8% Maximum Efficiency' },
      { label: 'Bifaciality Factor', value: '80% ± 5% Rear Side Power Gain' },
      { label: 'Mechanical Load', value: 'Snow 5400Pa / Wind 2400Pa' },
      { label: 'Warranty', value: '15-Year Product Warranty / 30-Year Linear Power Warranty' },
      { label: 'Certifications', value: 'TUV, CE, IEC 61215/61730, UL 61730, ISO9001' }
    ],
    description: 'Tier-1 certified high output 580W TOPCon bifacial solar panel with 2.0mm dual anti-reflective tempered glass. Features ultra-low temperature coefficient (-0.30%/°C) ensuring maximum kilowatt-hour yield in high heat environments.',
    features: [
      'Advanced N-Type TOPCon technology with zero Light Induced Degradation (LID)',
      'Bifacial power generation yields up to 25% additional power from reflected ground light',
      'Anodized aluminum alloy frame with IP68 junction box & MC4-EVO2 connectors',
      '30-year 87.4% power output guarantee'
    ],
    packagingDetails: '36 pcs per heavy duty wooden export pallet (Pallet weight: 1,120 KG). 720 pcs per 40ft High Cube Container.',
    leadTimeTable: [
      { qtyRange: '36 - 288 pcs (1-8 Pallets)', leadDays: 7 },
      { qtyRange: '> 288 pcs (Full Container)', leadDays: 14 }
    ],
    reviews: [
      {
        id: 'r-81',
        author: 'Klaus Lindner',
        country: 'Germany',
        countryFlag: '🇩🇪',
        rating: 5,
        date: '2026-08-05',
        comment: 'Purchased 2 containers (1440 panels) for a solar park in Bavaria. Flash test data sheets matched the delivered batch with positive 0~+5W power tolerance.',
        verifiedPurchase: true
      }
    ],
    tags: ['TOPCon 580W', 'Tier 1 Quality', '30-Year Warranty', 'Trade Assurance'],
    createdAt: '2026-02-18'
  }
];
