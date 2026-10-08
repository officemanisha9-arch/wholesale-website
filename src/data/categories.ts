import type { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'apparel',
    name: 'Apparel & Accessories',
    slug: 'apparel-accessories',
    iconName: 'Shirt',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&auto=format&fit=crop&q=80',
    featuredProductsCount: 84000,
    popularKeywords: ['Hoodies', 'Oversized Tees', 'Activewear', 'Puffer Jackets', 'Denim Jeans'],
    subcategories: [
      { id: 'mens-clothing', name: "Men's Clothing", items: ['Hoodies & Sweatshirts', 'T-Shirts', 'Jackets & Coats', 'Pants & Trousers', 'Suits & Blazers'] },
      { id: 'womens-clothing', name: "Women's Clothing", items: ['Dresses', 'Blouses & Tops', 'Yoga Pants & Leggings', 'Swimwear', 'Sweaters'] },
      { id: 'sportswear', name: 'Sportswear & Activewear', items: ['Gym Sets', 'Cycling Jerseys', 'Running Shorts', 'Sports Bras', 'Tracksuits'] },
      { id: 'apparel-accessories', name: 'Accessories', items: ['Caps & Beanies', 'Scarves', 'Leather Belts', 'Gloves', 'Socks'] }
    ]
  },
  {
    id: 'electronics',
    name: 'Consumer Electronics',
    slug: 'consumer-electronics',
    iconName: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
    featuredProductsCount: 125000,
    popularKeywords: ['Smart Watches', 'TWS Earbuds', 'Power Banks', 'Drones', 'Bluetooth Speakers'],
    subcategories: [
      { id: 'smart-wearables', name: 'Smart Wearables', items: ['Smart Watches', 'Fitness Bands', 'Smart Rings', 'AR Glasses', 'Watch Bands'] },
      { id: 'audio-video', name: 'Audio & Video', items: ['ANC Wireless Earbuds', 'Bluetooth Speakers', 'Microphones', 'Soundbars', 'Headphones'] },
      { id: 'mobile-accessories', name: 'Mobile Phone Accessories', items: ['GaN Fast Chargers', 'Magnetic Power Banks', 'Wireless Charging Pads', 'Phone Cases', 'Cables'] },
      { id: 'camera-optics', name: 'Camera & Photo', items: ['4K Drones', 'Gimbals & Stabilizers', 'Action Cameras', 'Ring Lights', 'Tripods'] }
    ]
  },
  {
    id: 'machinery',
    name: 'Industrial Machinery',
    slug: 'industrial-machinery',
    iconName: 'Cog',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=500&auto=format&fit=crop&q=80',
    featuredProductsCount: 62000,
    popularKeywords: ['Fiber Laser Cutters', 'CNC Router', 'Packaging Machine', 'Injection Molding', 'Mini Excavator'],
    subcategories: [
      { id: 'metalworking', name: 'Metalworking Machinery', items: ['Fiber Laser Cutting Machines', 'CNC Milling Machines', 'Hydraulic Press Brakes', 'Welding Machines'] },
      { id: 'packaging-machinery', name: 'Packaging Machinery', items: ['Automatic Sealing Machines', 'Bottle Filling Lines', 'Vacuum Sealers', 'Labeling Machines'] },
      { id: 'construction-machinery', name: 'Construction Machinery', items: ['Mini Excavators', 'Forklifts', 'Concrete Mixers', 'Road Rollers'] }
    ]
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    iconName: 'Home',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=80',
    featuredProductsCount: 95000,
    popularKeywords: ['Air Fryers', 'Stainless Cookware', 'Robot Vacuums', 'Insulated Tumblers', 'Silicone Kitchenware'],
    subcategories: [
      { id: 'kitchen-appliances', name: 'Small Kitchen Appliances', items: ['Digital Air Fryers', 'Espresso Coffee Machines', 'Electric Kettles', 'Stand Mixers', 'Blenders'] },
      { id: 'cookware-tableware', name: 'Cookware & Tableware', items: ['Stainless Steel Pots', 'Cast Iron Skillets', 'Ceramic Dinner Sets', 'Knife Block Sets'] },
      { id: 'storage-organization', name: 'Storage & Organization', items: ['Food Storage Containers', 'Airtight Jars', 'Pantry Organizers', 'Closet Racks'] }
    ]
  },
  {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    slug: 'beauty-personal-care',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=80',
    featuredProductsCount: 71000,
    popularKeywords: ['Organic Skincare', 'LED Facial Mask', 'Hair Styling Tools', 'Perfume Bottles', 'Eyelashes'],
    subcategories: [
      { id: 'skincare', name: 'Skin Care & Serums', items: ['Hyaluronic Acid Serums', 'Face Creams', 'Sheet Masks', 'Sunscreen SPF 50+', 'Lip Balms'] },
      { id: 'beauty-equipment', name: 'Beauty Equipment', items: ['LED Light Therapy Masks', 'Ultrasonic Skin Scrubbers', 'IPL Laser Hair Removal', 'Facial Steamers'] },
      { id: 'makeup-tools', name: 'Makeup & Brushes', items: ['Private Label Lipsticks', 'Makeup Brush Sets', 'Eyeshadow Palettes', 'Mink Eyelashes'] }
    ]
  },
  {
    id: 'packaging',
    name: 'Packaging & Printing',
    slug: 'packaging-printing',
    iconName: 'Package',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=80',
    featuredProductsCount: 58000,
    popularKeywords: ['Custom Mailer Boxes', 'Biodegradable Pouches', 'Kraft Bags', 'Sticker Labels', 'Glass Droppers'],
    subcategories: [
      { id: 'paper-packaging', name: 'Paper & Cardboard Boxes', items: ['Rigid Gift Boxes', 'Corrugated Mailer Boxes', 'Kraft Paper Shopping Bags', 'Drawer Slide Boxes'] },
      { id: 'plastic-flexible', name: 'Flexible Packaging', items: ['Mylar Stand-Up Pouches', 'Compostable Poly Mailers', 'Spout Pouches', 'Vacuum Bags'] },
      { id: 'bottles-jars', name: 'Bottles & Containers', items: ['Glass Dropper Bottles', 'Cosmetic Jars', 'Aluminum Cans', 'Perfume Atomizers'] }
    ]
  },
  {
    id: 'sports-outdoors',
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    iconName: 'Tent',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=500&auto=format&fit=crop&q=80',
    featuredProductsCount: 68000,
    popularKeywords: ['Electric Bikes', 'Paddle Boards', 'Camping Tents', 'Pickleball Paddles', 'Dumbbells Set'],
    subcategories: [
      { id: 'camping-hiking', name: 'Camping & Hiking', items: ['Inflatable Tents', 'Sleeping Bags', 'Camping Stoves', 'Hiking Backpacks', 'Hammocks'] },
      { id: 'fitness-gym', name: 'Fitness & Bodybuilding', items: ['Adjustable Dumbbells', 'Resistance Bands', 'Pilates Reformers', 'Treadmills'] },
      { id: 'water-sports', name: 'Water Sports', items: ['Inflatable Stand-Up Paddleboards', 'Kayaks', 'Life Vests', 'Snorkel Sets'] }
    ]
  },
  {
    id: 'renewable-energy',
    name: 'Renewable Energy & Solar',
    slug: 'renewable-energy',
    iconName: 'SunMedium',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=500&auto=format&fit=crop&q=80',
    featuredProductsCount: 42000,
    popularKeywords: ['Tier 1 Solar Panels', 'LiFePO4 Batteries', 'Hybrid Solar Inverters', 'Balcony Solar Kits', 'EV Chargers'],
    subcategories: [
      { id: 'solar-panels', name: 'Solar Panels & Systems', items: ['N-Type TOPCon Panels', 'Flexible Solar Panels', 'Complete Off-Grid Solar Kits', 'Bifacial Solar Modules'] },
      { id: 'energy-storage', name: 'Energy Storage Systems', items: ['Home LiFePO4 Battery 5kWh', 'Rack Mount Server Batteries', 'Portable Power Stations'] },
      { id: 'inverters-chargers', name: 'Inverters & EV Chargers', items: ['Hybrid Solar Inverters', 'Level 2 EV Wallbox', 'MPPT Charge Controllers'] }
    ]
  },
  {
    id: 'jewelry-watches',
    name: 'Jewelry, Eyewear & Watches',
    slug: 'jewelry-eyewear-watches',
    iconName: 'Watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
    featuredProductsCount: 51000,
    popularKeywords: ['Moissanite Rings', 'Polarized Sunglasses', 'Automatic Watches', 'Stainless Steel Chains', 'Earrings'],
    subcategories: [
      { id: 'fine-fashion-jewelry', name: 'Fine & Fashion Jewelry', items: ['GRA Moissanite Rings', '18K Gold Plated Necklaces', 'Hypoallergenic Earrings', 'Custom Pendants'] },
      { id: 'watches', name: 'Wristwatches', items: ['Mechanical Automatic Watches', 'Quartz Chronograph Watches', 'Luxury Custom Brand Watches'] },
      { id: 'eyewear', name: 'Eyewear & Sunglasses', items: ['Acetate Polarized Sunglasses', 'Blue Light Blocking Glasses', 'TR90 Optical Frames'] }
    ]
  },
  {
    id: 'vehicles-parts',
    name: 'Vehicles & Auto Parts',
    slug: 'vehicles-auto-parts',
    iconName: 'Car',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=80',
    featuredProductsCount: 89000,
    popularKeywords: ['Electric Scooters', 'Car Android Screens', 'LED Headlights', 'Brake Pads', 'EV Conversion Kits'],
    subcategories: [
      { id: 'auto-electronics', name: 'Auto Electronics & Navigation', items: ['CarPlay Android Auto Screens', 'Dash Cams 4K', 'GPS Trackers', 'OBD2 Diagnostic Scanners'] },
      { id: 'lighting-parts', name: 'Auto Lighting & Bulbs', items: ['Canbus LED Headlight Bulbs', 'Ambient LED Interior Kits', 'Work Fog Lights'] },
      { id: 'light-evs', name: 'Electric Mobility', items: ['Electric City Scooters', 'Adult Electric Tricycles', 'Golf Carts', 'E-Motorcycles'] }
    ]
  }
];
