import type { RFQRequirement, RFQQuote } from '../types';
import { SUPPLIERS } from './suppliers';

export const INITIAL_RFQS: RFQRequirement[] = [
  {
    id: 'rfq-101',
    title: 'Custom Bamboo Wood Wireless Magnetic Charging Station 3-in-1 with Laser Engraved Brand Logo',
    category: 'Consumer Electronics',
    sourcingType: 'Customized Product',
    quantity: 1500,
    unit: 'pieces',
    targetPrice: 7.50,
    destinationCountry: 'United States',
    destinationPort: 'Los Angeles (LAX)',
    tradeTerms: 'DDP',
    paymentTerms: 'Trade Assurance',
    details: 'Looking for a reliable certified manufacturer for a 3-in-1 Qi2 fast wireless charger. Base must be 100% FSC certified solid bamboo wood with matte aluminum arm. Need custom laser engraved logo on the front face and luxury magnetic gift box packaging. Sample required before mass production.',
    status: 'Quotes Received',
    createdAt: '2026-08-15',
    quotesReceivedCount: 4,
    buyerName: 'Nexora Tech Brands LLC',
    buyerCountry: 'United States',
    buyerFlag: '🇺🇸',
    quotes: [
      {
        id: 'quote-1',
        rfqId: 'rfq-101',
        supplierId: 'sup-1',
        supplier: SUPPLIERS[0],
        unitPrice: 6.80,
        totalPrice: 10200.00,
        samplePrice: 35.00,
        leadTimeDays: 14,
        validUntil: '2026-11-15',
        notes: 'We can manufacture FSC bamboo charging base with Qi2 15W fast charge standard. Free sample logo engraving included. Air DDP shipping to LA is approx $1.20/pc.',
        sampleAvailable: true,
        status: 'Pending'
      },
      {
        id: 'quote-2',
        rfqId: 'rfq-101',
        supplierId: 'sup-7',
        supplier: SUPPLIERS[6],
        unitPrice: 7.10,
        totalPrice: 10650.00,
        samplePrice: 40.00,
        leadTimeDays: 12,
        validUntil: '2026-11-20',
        notes: 'Our factory specializes in natural bamboo eco-electronics with ISO9001 and CE certification. Can provide custom gift box with EVA insert.',
        sampleAvailable: true,
        status: 'Pending'
      }
    ]
  },
  {
    id: 'rfq-102',
    title: 'Organic Heavy Cotton Oversized Vintage Acid Washed T-Shirts 280GSM Custom Screen Printed',
    category: 'Apparel & Accessories',
    sourcingType: 'Customized Product',
    quantity: 3000,
    unit: 'pieces',
    targetPrice: 4.80,
    destinationCountry: 'United Kingdom',
    destinationPort: 'Southampton / London Heathrow',
    tradeTerms: 'FOB',
    paymentTerms: 'Trade Assurance',
    details: 'Need 3000 pcs across 5 colorways (Charcoal, Clay, Olive, Vintage White, Faded Navy) in sizes XS to XXL. 280 GSM 100% combed cotton with thick 1.25" neck rib and vintage mineral wash finish. Custom woven neck tag and hangtag.',
    status: 'Open',
    createdAt: '2026-08-20',
    quotesReceivedCount: 6,
    buyerName: 'Aesthetic Studios UK',
    buyerCountry: 'United Kingdom',
    buyerFlag: '🇬🇧',
    quotes: [
      {
        id: 'quote-3',
        rfqId: 'rfq-102',
        supplierId: 'sup-2',
        supplier: SUPPLIERS[1],
        unitPrice: 4.50,
        totalPrice: 13500.00,
        samplePrice: 20.00,
        leadTimeDays: 15,
        validUntil: '2026-11-30',
        notes: 'OEKO-TEX 100 certified 280GSM combed cotton with customized pigment wash and discharge printing. We will provide pre-production lab dips in 4 days.',
        sampleAvailable: true,
        status: 'Pending'
      }
    ]
  },
  {
    id: 'rfq-103',
    title: 'Custom Biodegradable Stand-up Coffee Pouches with One-Way Degassing Valve & Matte Foil Finish',
    category: 'Packaging & Printing',
    sourcingType: 'Customized Product',
    quantity: 20000,
    unit: 'pieces',
    targetPrice: 0.18,
    destinationCountry: 'Australia',
    destinationPort: 'Melbourne Port',
    tradeTerms: 'CIF',
    paymentTerms: 'Trade Assurance',
    details: 'Seeking 250g and 1kg stand up coffee bags made with compostable kraft/PLA multi-layer barrier film. Must have aroma release valve, resealable pocket zipper, and tear notches. 8-color rotogravure or digital CMYK print.',
    status: 'Open',
    createdAt: '2026-08-25',
    quotesReceivedCount: 5,
    buyerName: 'Outback Specialty Roasters',
    buyerCountry: 'Australia',
    buyerFlag: '🇦🇺',
    quotes: [
      {
        id: 'quote-4',
        rfqId: 'rfq-103',
        supplierId: 'sup-4',
        supplier: SUPPLIERS[3],
        unitPrice: 0.16,
        totalPrice: 3200.00,
        samplePrice: 25.00,
        leadTimeDays: 10,
        validUntil: '2026-12-01',
        notes: 'BPI certified 100% home compostable kraft pouch with WIPF Swiss degassing valve. High barrier oxygen & moisture protection.',
        sampleAvailable: true,
        status: 'Pending'
      }
    ]
  }
];
